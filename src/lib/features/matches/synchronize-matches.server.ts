import { ApiQueuePriority } from "$lib/shared/api-queue";
import { db } from "$lib/shared/db/client.server";
import { filledMatches, userRecords, type UserRecord } from "$lib/shared/db/schema.server";
import { parallel } from "$lib/shared/task/parallel";
import { makeArray } from "$lib/utils/array/make-array";
import { single } from "$lib/utils/array/single";
import { chunks } from "$lib/utils/generator/chunks";
import { groupBy } from "$lib/utils/map/group-by";
import { formatTime } from "$lib/utils/time/format-time";
import { and, desc, gte, lt, sql } from "drizzle-orm";
import { getUserRecordsByMatchId } from "../user-records/api.server";

export const matchesSynchronizationState = {
  isSynchronizing: false,
};

export async function synchronizeMatches(options: {
  targetMatchId?: number;
  fetchCount?: number;
  startFromMatchId?: number;
  chunkSize?: number;
  failRatioForEarlyStop?: number;
}) {
  if (matchesSynchronizationState.isSynchronizing) throw new Error("synchronizing");
  matchesSynchronizationState.isSynchronizing = true;
  const start = options.startFromMatchId ?? ((await selectLastUpdatedMatchId()) ?? -1) + 1;
  const end = Math.max(options.targetMatchId ?? 0, start + (options.fetchCount ?? 0) - 1);
  const chunkSize = options.chunkSize ?? 10;
  const failRatioForEarlyStop = options.failRatioForEarlyStop ?? 2;

  const matches = await selectMatchesByIdRange(start, end);
  const perfectMatchIdSet = getPerfectMatchIdSet(matches);
  const imperfectMatchMap = getImperfectMatchMap(matches);

  console.info(
    `A total of ${end - start + 1} matches will be synchronized from ${start} to ${end}. Estimated to take ${formatTime(30 * (end - start + 1))}`,
  );
  const t0 = performance.now();
  const deferredTasks: Promise<void>[] = [];
  let count = 0;
  try {
    for (const chunk of chunks(start, end, chunkSize)) {
      count += 1;
      const [start, end] = chunk;

      const [newUserRecords, errors] = await getNewUserRecordsByIdRange(start, end);

      deferredTasks.push(deferrableTask(newUserRecords, errors));
      if (errors.length >= failRatioForEarlyStop * chunkSize) {
        console.info(`early break: ${start}`);
        break;
      }
    }
    const [_, errors] = await parallel(deferredTasks);
    if (errors.length > 0) throw errors;
  } catch (error) {
    throw error;
  } finally {
    const elapsedTime = performance.now() - t0;

    console.info(
      `A total of ${count * chunkSize} matches synchronized from ${start} to ${start + count * chunkSize}. It took ${formatTime(elapsedTime)} (${formatTime(elapsedTime / (count * chunkSize))} per match)`,
    );
    matchesSynchronizationState.isSynchronizing = false;
  }

  return;
  async function deferrableTask(newUserRecords: UserRecord[], errors: any[]) {
    await insertNewUserRecords(newUserRecords);
    await applyToFilledMatches(newUserRecords);
    handleErrors(errors);
  }
  async function getNewUserRecords(matchId: number): Promise<UserRecord[]> {
    const records = await getUserRecordsByMatchId(matchId, {
      priority: ApiQueuePriority.Sub,
    });
    const ignoreSet = getIgnoreSet(matchId);
    return records.filter((ur) => !ignoreSet.has(ur.userId));
  }
  function getIgnoreSet(matchId: number) {
    const match = imperfectMatchMap.get(matchId);
    return new Set(match?.userIds);
  }
  async function getNewUserRecordsByIdRange(
    start: number,
    end: number,
  ): Promise<[UserRecord[], any[]]> {
    const [newUserRecordsList, errors] = await parallel(
      makeArray(end - start + 1)
        .map((_, i) => start + i)
        .filter((matchId) => !perfectMatchIdSet.has(matchId))
        .map((matchId) => getNewUserRecords(matchId)),
    );
    return [newUserRecordsList.flat(), errors];
  }
}

function handleErrors(errors: unknown[]) {
  for (const error of errors) {
    if (error instanceof Response) {
      if (error.status === 429) {
        throw error;
      }
      if (error.status !== 404) {
        console.error(error.status, error.statusText);
      }
    } else {
      console.error(error);
    }
  }
}
async function insertNewUserRecords(newRecords: UserRecord[]) {
  if (newRecords.length > 0) {
    await db
      .insert(userRecords)
      .values(newRecords)
      .onConflictDoNothing({ target: [userRecords.matchId, userRecords.userId] });
  }
}
async function applyToFilledMatches(newUserRecords: UserRecord[]) {
  const userRecordsByVersion = groupBy(newUserRecords, ({ version }) => version);
  for (const [version, userRecords] of userRecordsByVersion) {
    const lastMatchId = Math.max(...userRecords.map((ur) => ur.matchId));

    await db
      .insert(filledMatches)
      .values({
        version,
        latestMatchId: lastMatchId,
      })
      .onConflictDoUpdate({
        target: filledMatches.version,
        set: { latestMatchId: lastMatchId },
        setWhere: lt(filledMatches.latestMatchId, lastMatchId),
      });
  }
}
function getPerfectMatchIdSet(
  matches: {
    matchId: number;
    size: number;
    userIds: number[];
  }[],
) {
  return new Set(matches.filter((m) => m.userIds.length === m.size).map((m) => m.matchId));
}
function getImperfectMatchMap(
  matches: {
    matchId: number;
    size: number;
    userIds: number[];
  }[],
) {
  return new Map(matches.filter((m) => m.userIds.length < m.size).map((m) => [m.matchId, m]));
}

async function selectMatchesByIdRange(start: number, end: number) {
  const scanPlan = db.$with("sp").as(
    db
      .select({
        matchId: userRecords.matchId,
        userId: userRecords.userId,
        size: userRecords.size,
      })
      .from(userRecords)
      .where(and(gte(userRecords.matchId, start), lt(userRecords.matchId, end))),
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

async function selectLastUpdatedMatchId() {
  const rows = await db
    .select({ latestMatchId: filledMatches.latestMatchId })
    .from(filledMatches)
    .orderBy(desc(filledMatches.latestMatchId))
    .limit(1);
  return single(rows)?.latestMatchId;
}
