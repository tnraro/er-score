import { eq, sql } from "drizzle-orm";
import { db } from "$lib/shared/db/client.server";
import { users } from "$lib/shared/db/schema.server";

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
