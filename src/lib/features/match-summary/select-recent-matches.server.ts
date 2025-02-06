import { db } from "$lib/features/db/client.server";
import { userRecords } from "$lib/features/db/schema.server";
import { and, desc, eq, SQL, sql } from "drizzle-orm";

export type RecentMatches = Awaited<ReturnType<typeof selectRecentMatches>>;
export const recentMatchesSize = 6;
export async function selectRecentMatches(userId: number, page = 0, mode?: number) {
  const size = recentMatchesSize;
  if (mode != null) {
    return selectRecentMatchesWithModePlan.execute({
      userId,
      size,
      offset: page * size,
      mode,
    });
  }
  return selectRecentMatchesPlan.execute({
    userId,
    size,
    offset: page * size,
  });
}

const selectRecentMatchesPlan = preparePlan("select_recent_matches_plan", []);
const selectRecentMatchesWithModePlan = preparePlan("select_recent_matches_with_mode_plan", [
  eq(userRecords.mode, sql.placeholder("mode")),
]);
function preparePlan(name: string, filters: SQL[]) {
  const rm = db.$with("recent_matches").as(
    db
      .select({
        matchId: userRecords.matchId,
        team: userRecords.team,
      })
      .from(userRecords)
      .where(and(eq(userRecords.userId, sql.placeholder("userId")), ...filters))
      .orderBy(desc(userRecords.startedAt))
      .offset(sql.placeholder("offset"))
      .limit(sql.placeholder("size")),
  );
  return db
    .with(rm)
    .select({
      matchId: userRecords.matchId,
      seasonId: userRecords.seasonId,
      mode: userRecords.mode,
      size: userRecords.size,
      teamSize: userRecords.teamSize,
      startedAt: userRecords.startedAt,
      records: sql<
        Pick<
          typeof userRecords.$inferSelect,
          | "userId"
          | "score"
          | "team"
          | "rank"
          | "damageDealtToPlayers"
          | "nickname"
          | "totalTime"
          | "characterId"
          | "skin"
          | "preMadeTeamSize"
          | "kills"
          | "assists"
          | "deaths"
        >[]
      >`json_agg(json_build_object(
            'userId', ${userRecords.userId}
          , 'score', ${userRecords.score}
          , 'team', ${userRecords.team}
          , 'rank', ${userRecords.rank}
          , 'damageDealtToPlayers', ${userRecords.damageDealtToPlayers}
          , 'nickname', ${userRecords.nickname}
          , 'totalTime', ${userRecords.totalTime}
          , 'characterId', ${userRecords.characterId}
          , 'skin', ${userRecords.skin}
          , 'preMadeTeamSize', ${userRecords.preMadeTeamSize}
          , 'kills', ${userRecords.kills}
          , 'assists', ${userRecords.assists}
          , 'deaths', ${userRecords.deaths}
        ))`,
    })
    .from(userRecords)
    .innerJoin(rm, and(eq(rm.matchId, userRecords.matchId), eq(rm.team, userRecords.team)))
    .groupBy(
      userRecords.matchId,
      userRecords.seasonId,
      userRecords.mode,
      userRecords.size,
      userRecords.teamSize,
      userRecords.startedAt,
    )
    .orderBy(desc(userRecords.startedAt))
    .prepare(name);
}
