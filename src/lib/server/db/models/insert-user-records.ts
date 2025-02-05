import { measureTime } from "$lib/utils/time/measureTime";
import type { DatabaseOrTransaction } from "../client";
import { userRecords } from "../schema";

export async function insertUserRecords(
  db: DatabaseOrTransaction,
  results: (typeof userRecords.$inferInsert)[],
) {
  if (results.length === 0) return;
  await measureTime("insertUserRecords", () =>
    db.insert(userRecords).values(results).onConflictDoNothing(),
  );
}
