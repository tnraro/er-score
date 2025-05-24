import { db } from "$lib/shared/db/client.server";
import { userRecordData, users, type UserRecord } from "$lib/shared/db/schema.server";
import { MatchingMode } from "$lib/shared/er-api/shapes";
import { single } from "$lib/utils/array/single";
import { and, eq, sql } from "drizzle-orm";

export async function updateUser(
  userId: number,
  options: Partial<Omit<typeof users.$inferInsert, "id" | "updatedAt">>,
) {
  await db
    .update(users)
    .set({
      updatedAt: sql`current_timestamp`,
      ...options,
    })
    .where(eq(users.id, userId));
}

type InsertUser = Pick<typeof users.$inferInsert, "id" | "name">;
export async function insertUsers(values: InsertUser[]) {
  if (values.length === 0) return;
  return await db.insert(users).values(values).onConflictDoNothing();
}

export async function updateUserByUserRecord(
  user: { id: number; name: string },
  userRecord: UserRecord | undefined,
) {
  if (userRecord == null) return;
  const data = single(
    await db
      .select({
        accountLevel: sql<number>`${userRecordData.data}->>'accountLevel'`
          .mapWith(Number)
          .as("account_level"),
      })
      .from(userRecordData)
      .where(
        and(
          eq(userRecordData.matchId, userRecord.matchId),
          eq(userRecordData.userId, userRecord.userId),
        ),
      ),
  );
  await updateUser(user.id, {
    updatedMatchId: userRecord.matchId,
    name: user.name !== userRecord.nickname ? userRecord.nickname : undefined,
    level: data?.accountLevel ?? undefined,
    rp: userRecord.mode === MatchingMode.Rank ? userRecord.rp : undefined,
  });
}
