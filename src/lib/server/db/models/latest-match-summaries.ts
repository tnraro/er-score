import { and, desc, eq, sql } from "drizzle-orm";
import { createModel } from "../model";
import { matches, userRecords } from "../schema";

export const latestMatchSummariesModel = createModel((db) => {
  return {
    async select(userId: number, n = 12) {
      const fm = db.$with("filtered_matches").as(
        db
          .select({
            id: matches.id,
            seasonId: matches.seasonId,
            mode: matches.mode,
            size: matches.size,
            teamSize: matches.teamSize,
            startedAt: matches.startedAt,
            team: userRecords.team,
          })
          .from(matches)
          .innerJoin(
            userRecords,
            and(eq(userRecords.userId, userId), eq(matches.id, userRecords.matchId)),
          )
          .orderBy(desc(matches.startedAt))
          .limit(n),
      );

      const res = await db
        .with(fm)
        .select({
          id: fm.id,
          seasonId: fm.seasonId,
          mode: fm.mode,
          size: fm.size,
          teamSize: fm.teamSize,
          startedAt: fm.startedAt,
          records: sql<
            Pick<
              typeof userRecords.$inferSelect,
              "userId" | "score" | "team" | "rank" | "damageToPlayer" | "data"
            >[]
          >`json_agg(json_build_object(
              'userId', ${userRecords.userId}
            , 'score', ${userRecords.score}
            , 'team', ${userRecords.team}
            , 'rank', ${userRecords.rank}
            , 'damageToPlayer', ${userRecords.damageToPlayer}
            , 'data', ${userRecords.data}
          ))`,
        })
        .from(fm)
        .leftJoin(userRecords, and(eq(fm.id, userRecords.matchId), eq(fm.team, userRecords.team)))
        .groupBy(fm.id, fm.seasonId, fm.mode, fm.size, fm.teamSize, fm.startedAt)
        .orderBy(desc(fm.startedAt));
      return res;
    },
  };
});
