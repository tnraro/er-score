import { selectLatestMatch } from "$lib/features/matches/select-latest-match";
import { getUserRecordsByMatchId } from "$lib/features/user-records/api.server";
import { ApiQueuePriority } from "$lib/shared/api-queue/index.js";
import { db } from "$lib/shared/db/client.server";
import { filledMatches, userRecords } from "$lib/shared/db/schema.server";
import { makeArray } from "$lib/utils/array/make-array.js";
import { single } from "$lib/utils/array/single";
import { formatTime } from "$lib/utils/time/format-time";
import { error, text } from "@sveltejs/kit";
import { and, asc, desc, eq, gt, lte, sql } from "drizzle-orm";

let isUpdating = false;

export async function POST({ url, locals }) {
  if (locals.adminSession == null) throw error(401);
  if (isUpdating) return text("locked");
  isUpdating = true;
  const FETCHING_TIME = Number(url.searchParams.get("fetching_time") ?? 60);
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
    const chunkSize = 10;
    for (let j = start + 1; j < end; j += chunkSize) {
      const length = Math.min(chunkSize, end - j);
      await Promise.all(
        makeArray(length)
          .map((_, i) => j + i)
          .filter((matchId) => !perfectMatchIdSet.has(matchId))
          .map((matchId) => processMatch(matchId)),
      );
    }
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
  isUpdating = false;
  return text("done");
  async function processMatch(matchId: number) {
    try {
      const records = await getUserRecordsByMatchId(matchId, { priority: ApiQueuePriority.Sub });
      const t0 = performance.now();
      const match = imperfectMatchMap.get(matchId);
      const ignoreSet = new Set(match?.userIds);

      const updateRecords = records.filter((ur) => !ignoreSet.has(ur.userId));
      if (updateRecords.length > 0) {
        await db
          .insert(userRecords)
          .values(updateRecords)
          .onConflictDoNothing({ target: [userRecords.matchId, userRecords.userId] });
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
          // console.error(`${matchId} not found`);
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
