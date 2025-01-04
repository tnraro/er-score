import { createModel } from "../model";
import { userRecords } from "../schema";

export const userRecordsModel = createModel((db) => {
  return {
    async insert(results: (typeof userRecords.$inferInsert)[]) {
      if (results.length === 0) return;
      await db.insert(userRecords).values(results).onConflictDoNothing();
    },
  };
});
