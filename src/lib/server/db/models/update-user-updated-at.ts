import { eq, sql } from "drizzle-orm";
import type { Database } from "../client";
import { users } from "../schema";

export async function updateUserUpdatedAt(db: Database, userId: number, updatedMatchId: number) {
  await db
    .update(users)
    .set({
      updatedAt: sql`current_timestamp`,
      updatedMatchId,
    })
    .where(eq(users.id, userId));
}
