import { and, desc, eq, sql } from "drizzle-orm";
import type { Database } from "$lib/server/db/client";
import { matches, userRecords } from "$lib/server/db/schema";

export async function selectRecentMatches(db: Database, userId: number, n = 12) {
  const rur = db.$with("recent_user_records").as(
    db
      .select({
        matchId: userRecords.matchId,
        team: userRecords.team,
      })
      .from(userRecords)
      .where(eq(userRecords.userId, userId))
      .orderBy(desc(userRecords.matchId))
      .limit(n),
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

  const res = await db
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
          | "damageToPlayer"
          | "nickname"
          | "totalTime"
          | "characterId"
          | "skin"
          | "preMade"
          | "k"
          | "a"
          | "d"
        >[]
      >`json_agg(json_build_object(
            'userId', ${userRecords.userId}
          , 'score', ${userRecords.score}
          , 'team', ${userRecords.team}
          , 'rank', ${userRecords.rank}
          , 'damageToPlayer', ${userRecords.damageToPlayer}
          , 'nickname', ${userRecords.nickname}
          , 'totalTime', ${userRecords.totalTime}
          , 'characterId', ${userRecords.characterId}
          , 'skin', ${userRecords.skin}
          , 'preMade', ${userRecords.preMade}
          , 'k', ${userRecords.k}
          , 'a', ${userRecords.a}
          , 'd', ${userRecords.d}
        ))`,
    })
    .from(rm)
    .leftJoin(userRecords, and(eq(rm.id, userRecords.matchId), eq(rm.team, userRecords.team)))
    .groupBy(rm.id, rm.seasonId, rm.mode, rm.size, rm.teamSize, rm.startedAt)
    .orderBy(desc(rm.startedAt));
  return res;
}
