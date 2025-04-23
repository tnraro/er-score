import { db } from "$lib/shared/db/client.server";
import { userRecords } from "$lib/shared/db/schema.server";
import { single } from "$lib/utils/array/single";
import { and, count, eq, SQL, sql } from "drizzle-orm";

export async function selectMatchesCount(userId: number, mode?: number) {
  return single(await result())?.count ?? 0;
  function result() {
    if (mode != null) {
      return selectMatchesCountWithModePlan.execute({
        userId,
        mode,
      });
    }
    return selectMatchesCountPlan.execute({
      userId,
    });
  }
}

const selectMatchesCountPlan = preparePlan("select_matches_count_plan", []);
const selectMatchesCountWithModePlan = preparePlan("select_matches_count_with_mode_plan", [
  eq(userRecords.mode, sql.placeholder("mode")),
]);
function preparePlan(name: string, filters: SQL[]) {
  return db
    .select({
      count: count(),
    })
    .from(userRecords)
    .where(and(eq(userRecords.userId, sql.placeholder("userId")), ...filters))
    .prepare(name);
}
