import { db } from "$lib/features/db/client.server";
import { userRecords } from "$lib/features/db/schema.server";

type InsertUserRecord = typeof userRecords.$inferInsert;
export async function insertUserRecords(values: InsertUserRecord[]) {
  if (values.length === 0) return;
  await db.insert(userRecords).values(values).onConflictDoNothing();
}
