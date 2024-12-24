import { eq } from "drizzle-orm";
import type { drizzle } from "drizzle-orm/d1";
import { matches, matchUserResults, users } from "./schema";

export type Database = ReturnType<typeof drizzle>;

export async function selectUserIdByName(db: Database, name: string): Promise<number | undefined> {
  const result = await db
    .select({
      id: users.id,
    })
    .from(users)
    .where(eq(users.name, name))
    .get();
  return result?.id;
}

export async function insertUser(db: Database, user: (typeof users.$inferInsert)[]) {
  return await db.insert(users).values(user).onConflictDoNothing();
}

export async function selectMatch(db: Database, matchId: number) {
  return await db.select().from(matches).where(eq(matches.id, matchId)).get();
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
