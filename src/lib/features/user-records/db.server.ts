import { db } from "$lib/shared/db/client.server";
import { userRecordData, userRecords } from "$lib/shared/db/schema.server";

type InsertUserRecord = typeof userRecords.$inferInsert;
type InsertUserRecordData = typeof userRecordData.$inferInsert;
export async function insertUserRecords(values: (InsertUserRecord & InsertUserRecordData)[]) {
  if (values.length === 0) return;
  const urs: InsertUserRecord[] = [];
  const urd: InsertUserRecordData[] = [];
  for (const { data, ...userRecord } of values) {
    urs.push(userRecord);
    urd.push({
      matchId: userRecord.matchId,
      userId: userRecord.userId,
      data,
    });
  }
  await Promise.allSettled([
    db.insert(userRecords).values(urs).onConflictDoNothing(),
    db.insert(userRecordData).values(urd).onConflictDoNothing(),
  ]);
}
