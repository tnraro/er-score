import { createModel } from "../model";
import { matchUserResults } from "../schema";

export const matchUserResultsModel = createModel((db) => {
  return {
    async insert(results: (typeof matchUserResults.$inferInsert)[]) {
      if (results.length === 0) return;
      const pageSize = 3;
      for (let i = 0; i < results.length; i += pageSize) {
        const chunk = results.slice(i, i + pageSize);
        await db.insert(matchUserResults).values(chunk).onConflictDoNothing();
      }
    },
  };
});
