import type { UserRecord } from "$lib/shared/db/schema.server";
import { selectMatchesCount } from "../match-summary/select-matches-count.server";
import {
  recentMatchesSize,
  selectRecentMatches,
  type RecentMatches,
} from "../match-summary/select-recent-matches.server";
import { selectTeamCompositionForSummary } from "../team-compositions/db.server";
import { selectUserStats } from "../user-stats/select-user-stats.server";
import { updateUserByUserRecords } from "../user/db.server";
import { queryUser, type UserQueryResult } from "../user/query-user.server";
import { getRecentUserRecords, getUserRecordsByMatchId } from "./api.server";
import { insertUserRecords } from "./db.server";

export async function queryUserRecords(username: string, page?: number, mode?: number) {
  const { user, stats, matches, matchesCount } = await getData();
  if (await update(user, matches, page)) {
    const { user, stats, matches, matchesCount } = await getData();
    return {
      user,
      stats,
      matches: await wrapMatches(matches),
      maxPages: Math.ceil(matchesCount / recentMatchesSize),
    };
  }

  return {
    user,
    stats,
    matches: await wrapMatches(matches),
    maxPages: Math.ceil(matchesCount / recentMatchesSize),
  };

  async function getData() {
    const user = await queryUser(username);
    const [stats, matches, matchesCount] = await Promise.all([
      selectUserStats(user.id, mode),
      selectRecentMatches(user.id, page, mode),
      selectMatchesCount(user.id, mode),
    ]);
    return {
      user,
      stats,
      matches,
      matchesCount,
    };
  }
}

async function wrapMatches(matches: RecentMatches) {
  return await Promise.all(matches.map(toMatch));
}

async function toMatch(match: RecentMatches[number]) {
  const characters = match.records.map((record) => record.characterId);
  const teamComposition =
    characters.length === 3
      ? await selectTeamCompositionForSummary(match.version, characters)
      : null;
  return {
    ...match,
    teamComposition,
  };
}

async function update(user: UserQueryResult, matches: RecentMatches, page: number | undefined) {
  const elapsedTime = Date.now() - (user.updatedAt?.getTime() ?? 0);
  const userRecordsToUpdate: UserRecord[] = [];
  const ignoreSet = new Set<string>();
  const matchesToUpdate: Pick<
    RecentMatches[number],
    "matchId" | "size" | "teamSize" | "records"
  >[] = matches.slice();
  if (page === 0 && elapsedTime >= 5000) {
    const recentUserRecords = await getRecentUserRecords(user.id, {
      maxPages: 10,
      beforeMatchId: user.updatedMatchId ?? undefined,
    });
    for (const ur of recentUserRecords) {
      matchesToUpdate.push({
        matchId: ur.matchId,
        size: ur.size,
        teamSize: ur.teamSize,
        records: [ur],
      });
    }
    await updateUserByUserRecords(user, recentUserRecords);
  }

  {
    for (const match of matches) {
      for (const record of match.records) {
        ignoreSet.add(
          key({
            matchId: match.matchId,
            userId: record.userId,
          }),
        );
      }
    }
  }

  {
    for (const match of matchesToUpdate) {
      const hasQuit = match.records.find((record) => record.userId === user.id)?.hasQuit;
      /**
       * 각 팀에 필요한 최소한의 플레이어 수
       *
       * Bot이 포함된 전적의 경우, 한 팀에 team size보다 적은 수의 플레이어가 존재할 수 있음.
       * 무한 루프가 발생하지 않으면서, 최대한 많은 플레이어를 불러오도록 구현.
       *
       * 조기 종료했다면 팀보다 일찍 끝났을 수 있으므로 갱신하지 않음.
       */
      const minimumRequiredTeamSize = hasQuit ? 1 : ((match.size - 1) % match.teamSize) + 1;

      if (match.records.length >= minimumRequiredTeamSize) continue;
      const userRecords = await getUserRecordsByMatchId(match.matchId);
      for (const ur of userRecords) {
        if (ignoreSet.has(key(ur))) continue;
        userRecordsToUpdate.push(ur);
      }
    }
  }

  await insertUserRecords(userRecordsToUpdate);
  const updated = userRecordsToUpdate.length > 0;
  return updated;

  function key(ur: Pick<UserRecord, "matchId" | "userId">) {
    return `${ur.matchId}-${ur.userId}`;
  }
}
