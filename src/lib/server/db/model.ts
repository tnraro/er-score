import { and, desc, eq, sql } from "drizzle-orm";
import type { drizzle } from "drizzle-orm/postgres-js";
import { matches, matchUserResults, users } from "./schema";

export type Database = ReturnType<typeof drizzle>;

export async function selectUserIdByName(db: Database, name: string): Promise<number | undefined> {
  const result = await db
    .select({
      id: users.id,
    })
    .from(users)
    .where(eq(users.name, name))
    .limit(1);
  return result.at(0)?.id;
}

export async function insertUser(db: Database, user: (typeof users.$inferInsert)[]) {
  const now = performance.now();
  await db.insert(users).values(user).onConflictDoNothing();
  console.log(
    `insert user ${user.map((x) => x.name).join(", ")}: ${(performance.now() - now).toPrecision(4)}ms`,
  );
}
export async function insertMatches(db: Database, values: (typeof matches.$inferInsert)[]) {
  return await db.insert(matches).values(values).onConflictDoNothing();
}
export async function selectAllMatchUserResults(db: Database, matchId: number) {
  return await db.select().from(matchUserResults).where(eq(matchUserResults.matchId, matchId));
}

export async function insertMatchUserResult(
  db: Database,
  results: (typeof matchUserResults.$inferInsert)[],
) {
  if (results.length === 0) return;
  const pageSize = 3;
  for (let i = 0; i < results.length; i += pageSize) {
    const chunk = results.slice(i, i + pageSize);
    await db.insert(matchUserResults).values(chunk).onConflictDoNothing();
  }
}

export async function selectLatestMatchSummaries(db: Database, userId: number) {
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
}
