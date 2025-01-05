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
      const now = performance.now();
      await db
        .insert(users)
        .values(user)
        .onConflictDoUpdate({
          target: users.id,
          set: { name: sql`excluded.name` },
        });
      console.log(
        `insert user ${user.map((x) => x.name).join(", ")}: ${(performance.now() - now).toPrecision(4)}ms`,
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
