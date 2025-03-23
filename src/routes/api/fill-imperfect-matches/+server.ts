import { db } from "$lib/features/db/client.server";
import { filledMatches, userRecords } from "$lib/features/db/schema.server";
import { getUserRecordsByMatchId } from "$lib/features/user-records/api.server";
import { makeArray } from "$lib/utils/array/make-array.js";
import { single } from "$lib/utils/array/single";
import { error, text } from "@sveltejs/kit";
import { and, asc, desc, eq, gt, lte, sql } from "drizzle-orm";

export async function POST({ url }) {
  if (!import.meta.env.DEV) throw error(404);
  const FETCHING_TIME = Number(url.searchParams.get("fetching_time") ?? 30);
  const MAX_WAITING_TIME = Number(url.searchParams.get("max_waiting_time") ?? 60000);

  const latestMatch = await selectLatestMatch();
  if (latestMatch == null) return error(404);

  const start = await getFirstMatchId(latestMatch.version);
  if (start == null) return error(500); // should not reach here
  const end = Math.min(start + Math.round(MAX_WAITING_TIME / FETCHING_TIME), latestMatch.matchId);
  const matches = await selectMatches({
    start,
    end,
    version: latestMatch?.version,
  });
  const perfectMatchIdSet = new Set(
    matches.filter((m) => m.userIds.length === m.size).map((m) => m.matchId),
  );
  const imperfectMatchMap = new Map(
    matches.filter((m) => m.userIds.length < m.size).map((m) => [m.matchId, m]),
  );
  const total = end - start - perfectMatchIdSet.size;
  console.info(
    `Total ${total} rows to update. from ${start + 1} to ${end}. Estimated time: ${formatTime(FETCHING_TIME * total)}`,
  );

  const rtt: number[] = [];
  let lastMatch: { matchId: number; version: string } | undefined;
  let addedMatches = 0;
  let err: unknown;

  const t0 = performance.now();

  try {
    await Promise.all(
      makeArray(end - start)
        .map((_, i) => start + i + 1)
        .filter((matchId) => !perfectMatchIdSet.has(matchId))
        .map((matchId) => processMatch(matchId)),
    );
  } catch (e) {
    err = e;
  }
  if (err) {
    console.error(err);
  }
  console.info(`Total elapsed time: ${formatTime(performance.now() - t0)}`);
  console.info(
    `RTT: ${formatTime(rtt.reduce((a, b) => a + b, 0) / rtt.length)}, max: ${formatTime(Math.max(...rtt))}`,
  );

  if (lastMatch != null) {
    await db
      .insert(filledMatches)
      .values({
        version: lastMatch.version,
        latestMatchId: lastMatch.matchId,
      })
      .onConflictDoUpdate({
        target: filledMatches.version,
        set: { latestMatchId: lastMatch.matchId },
      });
    console.info(`last match id: ${lastMatch.matchId}, version: ${lastMatch.version}`);
  }
  console.info(`${addedMatches} matches are added`);
  return text("done");
  async function processMatch(matchId: number) {
    try {
      const records = await getUserRecordsByMatchId(matchId);
      const t0 = performance.now();
      const match = imperfectMatchMap.get(matchId);
      const ignoreSet = new Set(match?.userIds);

      const updateRecords = records.filter((ur) => !ignoreSet.has(ur.userId));
      if (updateRecords.length > 0) {
        await db.insert(userRecords).values(updateRecords);
      }
      lastMatch = {
        matchId,
        version: records[0].version,
      };
      addedMatches++;
      rtt.push(performance.now() - t0);
    } catch (e) {
      if (e instanceof Response) {
        if (e.status === 404) {
          console.error(`${matchId} not found`);
          return;
        } else {
          console.error(e.status, e.statusText);
        }
      }
      throw e;
    }
  }
}

async function getFirstMatchId(version: string | undefined) {
  const matchId = await selectLastUpdatedMatchId(version);
  if (matchId != null) return matchId;
  return await selectFirstMatchIdByVersion(version);
}
async function selectLastUpdatedMatchId(version: string | undefined) {
  const filters = [];
  if (version != null) {
    filters.push(eq(filledMatches.version, version));
  }
  const rows = await db
    .select({ latestMatchId: filledMatches.latestMatchId })
    .from(filledMatches)
    .where(and(...filters))
    .orderBy(desc(filledMatches.latestMatchId))
    .limit(1);
  return single(rows)?.latestMatchId;
}
async function selectFirstMatchIdByVersion(version: string | undefined) {
  const filters = [];
  if (version != null) {
    filters.push(eq(userRecords.version, version));
  }
  const rows = await db
    .select({ matchId: userRecords.matchId })
    .from(userRecords)
    .orderBy(asc(userRecords.matchId))
    .where(and(...filters))
    .limit(1);
  return single(rows)?.matchId;
}
async function selectLatestMatch() {
  const rows = await db
    .select({ matchId: userRecords.matchId, version: userRecords.version })
    .from(userRecords)
    .orderBy(desc(userRecords.matchId))
    .limit(1);
  return single(rows);
}

async function selectMatches(options?: {
  start: number | undefined;
  end: number | undefined;
  version: string | undefined;
}) {
  const filters = [];
  if (options?.start != null) {
    filters.push(gt(userRecords.matchId, options.start));
  }
  if (options?.end != null) {
    filters.push(lte(userRecords.matchId, options.end));
  }
  if (options?.version != null) {
    filters.push(eq(userRecords.version, options.version));
  }
  const scanPlan = db.$with("sp").as(
    db
      .select({
        matchId: userRecords.matchId,
        userId: userRecords.userId,
        size: userRecords.size,
      })
      .from(userRecords)
      .where(and(...filters)),
  );
  const rows = await db
    .with(scanPlan)
    .select({
      matchId: scanPlan.matchId,
      size: scanPlan.size,
      userIds: sql<number[]>`json_agg(${scanPlan.userId})`,
    })
    .from(scanPlan)
    .groupBy(scanPlan.matchId, scanPlan.size);
  return rows;
}
const cutoffs = [
  1,
  60,
  3600,
  86400,
  7 * 86400,
  30 * 86400,
  365 * 86400,
  Number.POSITIVE_INFINITY,
].map((x) => x * 1000);
const units = ["ms", "s", "m", "h", "d", "w", "M", "y"];
function formatTime(time: number): string {
  const ms = Math.trunc(time);
  if (ms === 0) return "0s";

  const unitIndex = cutoffs.findIndex((cutoff) => cutoff > Math.abs(ms));
  const divider = unitIndex !== 0 ? cutoffs[unitIndex - 1] : 1;
  const unit = units[unitIndex];
  return `${Math.trunc(ms / divider)}${unit}`;
}
