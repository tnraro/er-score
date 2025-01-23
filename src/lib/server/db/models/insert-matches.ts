import type { Database } from "../client";
import { matches } from "../schema";

export async function insertMatches(db: Database, values: (typeof matches.$inferInsert)[]) {
  if (values.length === 0) return;
  return db.insert(matches).values(values).onConflictDoNothing();
}
