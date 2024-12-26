import { and, desc, eq, sql } from "drizzle-orm";
import { createModel } from "../model";
import { matches, matchUserResults } from "../schema";

export const latestMatchSummariesModel = createModel((db) => {
  return {
    async select(userId: number) {
      const now = performance.now();
      const fm = db.$with("filtered_matches").as(
        db
          .select({
            id: matches.id,
            seasonId: matches.seasonId,
            mode: matches.mode,
            size: matches.size,
            teamSize: matches.teamSize,
            startedAt: matches.startedAt,
            totalTime: matches.totalTime,
            team: matchUserResults.team,
          })
          .from(matches)
          .innerJoin(
            matchUserResults,
            and(eq(matches.id, matchUserResults.matchId), eq(matchUserResults.userId, userId)),
          )
          .orderBy(desc(matches.startedAt))
          .limit(10),
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
          totalTime: fm.totalTime,
          results: sql<
            Pick<
              typeof matchUserResults.$inferSelect,
              | "userId"
              | "username"
              | "mode"
              | "team"
              | "characterId"
              | "skin"
              | "preMadeTeam"
              | "rank"
              | "score"
              | "k"
              | "a"
              | "d"
              | "giveUp"
            >[]
          >`json_agg(json_build_object(
              'userId', ${matchUserResults.userId}
            , 'username', ${matchUserResults.username}
            , 'mode', ${matchUserResults.mode}
            , 'team', ${matchUserResults.team}
            , 'characterId', ${matchUserResults.characterId}
            , 'skin', ${matchUserResults.skin}
            , 'preMadeTeam', ${matchUserResults.preMadeTeam}
            , 'rank', ${matchUserResults.rank}
            , 'score', ${matchUserResults.score}
            , 'k', ${matchUserResults.k}
            , 'a', ${matchUserResults.a}
            , 'd', ${matchUserResults.d}
            , 'giveUp', ${matchUserResults.giveUp}
          ))`,
        })
        .from(fm)
        .leftJoin(
          matchUserResults,
          and(eq(fm.id, matchUserResults.matchId), eq(fm.team, matchUserResults.team)),
        )
        .groupBy(
          fm.id,
          fm.seasonId,
          fm.mode,
          fm.size,
          fm.teamSize,
          fm.startedAt,
          fm.totalTime,
          fm.team,
          matchUserResults.team,
        )
        .orderBy(desc(fm.startedAt));
      console.log(`latest matches ${userId}: ${(performance.now() - now).toPrecision(4)}ms`);
      return res;
    },
  };
});
