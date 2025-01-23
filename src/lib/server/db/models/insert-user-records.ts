import type { Database } from "../client";
import { userRecords } from "../schema";

export async function insertUserRecords(
  db: Database,
  results: (typeof userRecords.$inferInsert)[],
) {
  if (results.length === 0) return;
  await db.insert(userRecords).values(results).onConflictDoNothing();
}
