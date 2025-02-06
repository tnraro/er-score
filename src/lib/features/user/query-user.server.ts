import { db } from "$lib/features/db/client.server";
import { users } from "$lib/features/db/schema.server";
import { single } from "$lib/utils/array/single";
import { eq, sql } from "drizzle-orm";
import { getUser } from "./api.server";
import { insertUsers } from "./db.server";

export type UserQueryResult = Awaited<ReturnType<typeof queryUser>>;
export async function queryUser(username: string) {
  {
    const user = await selectUserByName(username);
    if (user != null) return user;
  }
  const user = await getUser(username);
  await insertUsers([user]);
  return {
    ...user,
    updatedAt: null,
    updatedMatchId: null,
  };
}

export async function selectUserByName(name: string) {
  const rows = await selectUserByNamePlan.execute({ name: name.toLowerCase() });
  return single(rows);
}

const selectUserByNamePlan = db
  .select({
    id: users.id,
    name: users.name,
    updatedAt: users.updatedAt,
    updatedMatchId: users.updatedMatchId,
  })
  .from(users)
  .where(eq(sql`lower(${users.name})`, sql.placeholder("name")))
  .limit(1)
  .prepare("select_user_by_name_plan");
