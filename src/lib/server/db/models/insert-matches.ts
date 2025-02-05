import { measureTime } from "$lib/utils/time/measureTime";
import type { DatabaseOrTransaction } from "../client";
import { matches } from "../schema";

export async function insertMatches(
  db: DatabaseOrTransaction,
  values: (typeof matches.$inferInsert)[],
) {
  if (values.length === 0) return;
  return await measureTime("insertMatches", () =>
    db.insert(matches).values(values).onConflictDoNothing(),
  );
}
