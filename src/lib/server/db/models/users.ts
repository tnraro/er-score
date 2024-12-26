import { eq } from "drizzle-orm";
import { createModel } from "../model";
import { users } from "../schema";

export const usersModel = createModel((db) => {
  return {
    async selectUserIdByName(name: string): Promise<number | undefined> {
      const result = await db
        .select({
          id: users.id,
        })
        .from(users)
        .where(eq(users.name, name))
        .limit(1);
      return result.at(0)?.id;
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
