import type { UserRecord } from "$lib/features/db/schema.server.js";
import { MatchingMode } from "$lib/features/er-api/shapes";
import { getRecentUserRecords } from "$lib/features/user-records/api.server.js";
import { insertUserRecords } from "$lib/features/user-records/db.server.js";
import { selectUserStats } from "$lib/features/user-stats/select-user-stats.server.js";
import { updateUser } from "$lib/features/user/db.server.js";
import { queryUser, type UserQueryResult } from "$lib/features/user/query-user.server.js";
import { numberOrNullable } from "$lib/utils/number/number-or-nullable";

export const ssr = false;

export async function load({ url }) {
  const mode = numberOrNullable(url.searchParams.get("mode")) ?? undefined;
  const usernames = [...new Set(url.searchParams.getAll("u"))];

  return {
    mode,
    results: usernames.map((username) => ({ username, promise: getUserStats(username, mode) })),
  };
}
async function getUserStats(username: string, mode?: number) {
  const user = await queryUser(username);
  await update(user);
  const stats = await selectUserStats(user.id, mode);

  return {
    user,
    stats,
  };
}
async function update(user: UserQueryResult) {
  const elapsedTime = Date.now() - (user.updatedAt?.getTime() ?? 0);
  const updatedUserRecords: UserRecord[] = [];
  if (elapsedTime >= 5000) {
    const recentUserRecords = await getRecentUserRecords(user.id, {
      maxPages: 10,
      beforeMatchId: user.updatedMatchId ?? undefined,
    });
    for (const ur of recentUserRecords) {
      updatedUserRecords.push(ur);
    }
    const latestUserRecord = recentUserRecords.at(0);
    await updateUser(user.id, {
      updatedMatchId: latestUserRecord?.matchId,
      name:
        latestUserRecord != null && user.name !== latestUserRecord.nickname
          ? latestUserRecord.nickname
          : undefined,
      level: latestUserRecord?.data?.accountLevel ?? undefined,
      rp: latestUserRecord?.mode === MatchingMode.Rank ? latestUserRecord?.rp : undefined,
    });
  }

  await insertUserRecords(updatedUserRecords);
  const updated = updatedUserRecords.length > 0;
  return updated;
}
