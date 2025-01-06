import { measureTime } from "$lib/utils/time/measureTime";
import { eq, sql } from "drizzle-orm";
import { createModel } from "../model";
import { users } from "../schema";

export const usersModel = createModel((db) => {
  return {
    async selectUserByName(name: string) {
      const result = await db
        .select({
          id: users.id,
          name: users.name,
          updatedAt: users.updatedAt,
        })
        .from(users)
        .where(eq(sql`lower(${users.name})`, name.toLowerCase()))
        .limit(1);
      return result.at(0);
    },
    async insert(user: (typeof users.$inferInsert)[]) {
      return await measureTime(`insert ${user.length} users`, () =>
        db.insert(users).values(user).onConflictDoNothing(),
      );
    },
    async update(userId: number) {
      await db
        .update(users)
        .set({
          updatedAt: sql`current_timestamp`,
        })
        .where(eq(users.id, userId));
    },
  };
});
