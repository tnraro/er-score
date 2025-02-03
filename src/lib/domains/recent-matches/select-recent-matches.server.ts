import { db, type Database } from "$lib/server/db/client";
import { matches, userRecords } from "$lib/server/db/schema";
import { and, desc, eq, sql } from "drizzle-orm";

const rur = db.$with("recent_user_records").as(
  db
    .select({
      matchId: userRecords.matchId,
      team: userRecords.team,
    })
    .from(userRecords)
    .where(eq(userRecords.userId, sql.placeholder("userId")))
    .orderBy(desc(userRecords.matchId))
    .limit(sql.placeholder("n")),
);
const rm = db.$with("recent_matches").as(
  db
    .with(rur)
    .select({
      id: matches.id,
      seasonId: matches.seasonId,
      mode: matches.mode,
      size: matches.size,
      teamSize: matches.teamSize,
      startedAt: matches.startedAt,
      team: rur.team,
    })
    .from(matches)
    .innerJoin(rur, eq(matches.id, rur.matchId)),
);
const prepared = db
  .with(rm)
  .select({
    id: rm.id,
    seasonId: rm.seasonId,
    mode: rm.mode,
    size: rm.size,
    teamSize: rm.teamSize,
    startedAt: rm.startedAt,
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
  .from(rm)
  .leftJoin(userRecords, and(eq(rm.id, userRecords.matchId), eq(rm.team, userRecords.team)))
  .groupBy(rm.id, rm.seasonId, rm.mode, rm.size, rm.teamSize, rm.startedAt)
  .orderBy(desc(rm.startedAt))
  .prepare("select-recent-matches");
export async function selectRecentMatches(db: Database, userId: number, n = 12) {
  return prepared.execute({
    userId,
    n,
  });
}
