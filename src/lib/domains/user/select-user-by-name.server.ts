import { db } from "$lib/server/db/client";
import { users } from "$lib/server/db/schema";
import { single } from "$lib/utils/array/single";
import { eq, sql } from "drizzle-orm";

const selectUserPlan = db
  .select({
    id: users.id,
    name: users.name,
    updatedAt: users.updatedAt,
    updatedMatchId: users.updatedMatchId,
  })
  .from(users)
  .where(eq(sql`lower(${users.name})`, sql.placeholder("name")))
  .limit(1)
  .prepare("select_user_plan");
export async function selectUserByName(name: string) {
  const rows = await selectUserPlan.execute({ name });
  return single(rows);
}
