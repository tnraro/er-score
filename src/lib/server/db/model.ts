import type { drizzle } from "drizzle-orm/postgres-js";
import { matchUserResults } from "./schema";

export type Database = ReturnType<typeof drizzle>;

export function createModel<T>(model: (db: Database) => T) {
  return model;
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
