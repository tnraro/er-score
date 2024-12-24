import { eq } from "drizzle-orm";
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
  console.log(`insert user ${user[0].name}: ${(performance.now() - now).toPrecision(4)}ms`);
}

export async function selectMatch(db: Database, matchId: number) {
  const now = performance.now();
  const x = (await db.select().from(matches).where(eq(matches.id, matchId)).limit(1)).at(0);
  console.log(`match ${matchId}: ${(performance.now() - now).toPrecision(4)}ms`);
  return x;
}

export async function insertMatch(db: Database, match: typeof matches.$inferInsert) {
  return await db.insert(matches).values(match).onConflictDoNothing();
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
