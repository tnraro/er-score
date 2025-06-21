import type { UserRecord } from "$lib/shared/db/schema.server";
import { selectMatchesCount } from "../match-summary/select-matches-count.server";
import {
  recentMatchesSize,
  selectRecentMatches,
  type RecentMatches,
} from "../match-summary/select-recent-matches.server";
import { selectUserStats } from "../user-stats/select-user-stats.server";
import { updateUserByUserRecord } from "../user/db.server";
import { queryUser, type UserQueryResult } from "../user/query-user.server";
import { getRecentUserRecords, getUserRecordsByMatchId } from "./api.server";
import { insertUserRecords } from "./db.server";

export async function queryUserRecords(username: string, page?: number, mode?: number) {
  const user = await queryUser(username);
  const [stats, matches, matchesCount] = await Promise.all([
    selectUserStats(user.id, mode),
    selectRecentMatches(user.id, page, mode),
    selectMatchesCount(user.id, mode),
  ]);
  const isUpdatedPromise = update(user, matches, page);

  return {
    user,
    stats,
    matches,
    maxPages: Math.ceil(matchesCount / recentMatchesSize),
    isUpdatedPromise,
  };
}

async function update(user: UserQueryResult, matches: RecentMatches, page: number | undefined) {
  const elapsedTime = Date.now() - (user.updatedAt?.getTime() ?? 0);
  const updatedUserRecordMap = new Map<string, UserRecord>();
  if (page === 0 && elapsedTime >= 5000) {
    const recentUserRecords = await getRecentUserRecords(user.id, {
      maxPages: 10,
      beforeMatchId: user.updatedMatchId ?? undefined,
    });
    for (const ur of recentUserRecords) {
      updatedUserRecordMap.set(`${ur.matchId}-${ur.userId}`, ur);
    }
    const latestUserRecord = recentUserRecords.at(0);
    await updateUserByUserRecord(user, latestUserRecord);
  }

  {
    for (const match of matches) {
      /**
       * 각 팀에 필요한 최소한의 플레이어 수
       *
       * Bot이 포함된 전적의 경우, 한 팀에 team size보다 적은 수의 플레이어가 존재할 수 있음.
       * 무한 루프가 발생하지 않으면서, 최대한 많은 플레이어를 불러오도록 구현.
       */
      const minimumRequiredTeamSize = ((match.size - 1) % match.teamSize) + 1;
      if (match.records.length >= minimumRequiredTeamSize) continue;
      const userRecords = await getUserRecordsByMatchId(match.matchId);
      for (const ur of userRecords) {
        updatedUserRecordMap.set(`${ur.matchId}-${ur.userId}`, ur);
      }
    }
  }

  const updatedUserRecords = updatedUserRecordMap.values().toArray();
  await insertUserRecords(updatedUserRecords);
  const updated = updatedUserRecords.length > 0;
  return updated;
}
