import { eq, sql } from "drizzle-orm";
import type { Database } from "../client";
import { users } from "../schema";

export async function updateUserUpdatedAt(db: Database, userId: number) {
  await db
    .update(users)
    .set({
      updatedAt: sql`current_timestamp`,
    })
    .where(eq(users.id, userId));
}
