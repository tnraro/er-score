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
        })
        .from(users)
        .where(eq(sql`lower(${users.name})`, name.toLowerCase()))
        .limit(1);
      return result.at(0);
    },
    async insert(user: (typeof users.$inferInsert)[]) {
      const now = performance.now();
      await db.insert(users).values(user).onConflictDoNothing();
      console.log(
        `insert user ${user.map((x) => x.name).join(", ")}: ${(performance.now() - now).toPrecision(4)}ms`,
      );
    },
  };
});
