import { measureTime } from "$lib/utils/time/measureTime";
import type { Database } from "../client";
import { users } from "../schema";

export async function insertUsers(db: Database, user: (typeof users.$inferInsert)[]) {
  return await measureTime(`insert ${user.length} users`, () =>
    db.insert(users).values(user).onConflictDoNothing(),
  );
}
