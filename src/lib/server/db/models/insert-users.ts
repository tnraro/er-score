import { measureTime } from "$lib/utils/time/measureTime";
import type { DatabaseOrTransaction } from "../client";
import { users } from "../schema";

type InsertUser = Pick<typeof users.$inferInsert, "id" | "name">;
export async function insertUsers(db: DatabaseOrTransaction, user: InsertUser[]) {
  return await measureTime(`insertUsers`, () =>
    db.insert(users).values(user).onConflictDoNothing(),
  );
}
