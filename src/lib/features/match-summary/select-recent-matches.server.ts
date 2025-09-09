import { db } from "$lib/shared/db/client.server";
import { userRecords } from "$lib/shared/db/schema.server";
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
      seasonId: sql<number>`min(${userRecords.seasonId})`.as("season_id"),
      mode: sql<number>`min(${userRecords.mode})`.as("mode"),
      size: sql<number>`min(${userRecords.size})`.as("size"),
      teamSize: sql<number>`min(${userRecords.teamSize})`.as("team_size"),
      startedAt: userRecords.startedAt,
      version: userRecords.version,
      records: sql<
        Pick<
          typeof userRecords.$inferSelect,
          | "userId"
          | "score"
          | "team"
          | "rank"
          | "rp"
          | "rpGain"
          | "damageDealtToPlayers"
          | "nickname"
          | "totalTime"
          | "characterId"
          | "skin"
          | "preMadeTeamSize"
          | "kills"
          | "assists"
          | "deaths"
          | "isAlphaKilled"
          | "isOmegaKilled"
          | "isGammaKilled"
          | "isWickelineKilled"
          | "hasQuit"
        >[]
      >`json_agg(json_build_object(
            'userId', ${userRecords.userId}
          , 'score', ${userRecords.score}
          , 'team', ${userRecords.team}
          , 'rank', ${userRecords.rank}
          , 'rp', ${userRecords.rp}
          , 'rpGain', ${userRecords.rpGain}
          , 'damageDealtToPlayers', ${userRecords.damageDealtToPlayers}
          , 'nickname', ${userRecords.nickname}
          , 'totalTime', ${userRecords.totalTime}
          , 'characterId', ${userRecords.characterId}
          , 'skin', ${userRecords.skin}
          , 'preMadeTeamSize', ${userRecords.preMadeTeamSize}
          , 'kills', ${userRecords.kills}
          , 'assists', ${userRecords.assists}
          , 'deaths', ${userRecords.deaths}
          , 'isAlphaKilled', ${userRecords.isAlphaKilled}
          , 'isOmegaKilled', ${userRecords.isOmegaKilled}
          , 'isGammaKilled', ${userRecords.isGammaKilled}
          , 'isWickelineKilled', ${userRecords.isWickelineKilled}
          , 'hasQuit', ${userRecords.hasQuit}
        ))`,
    })
    .from(userRecords)
    .innerJoin(rm, and(eq(rm.matchId, userRecords.matchId), eq(rm.team, userRecords.team)))
    .groupBy(userRecords.matchId, userRecords.startedAt, userRecords.version)
    .orderBy(desc(userRecords.startedAt))
    .prepare(name);
}
