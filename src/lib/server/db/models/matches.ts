import { createModel } from "../model";
import { matches } from "../schema";

export const matchesModel = createModel((db) => {
  return {
    insert(values: (typeof matches.$inferInsert)[]) {
      return db.insert(matches).values(values).onConflictDoNothing();
    },
  };
});
