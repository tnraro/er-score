import { db } from "$lib/shared/db/client.server";
import { users } from "$lib/shared/db/schema.server";
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
    level: null,
    rp: null,
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
    level: users.level,
    rp: users.rp,
  })
  .from(users)
  .where(eq(sql`lower(${users.name})`, sql.placeholder("name")))
  .limit(1)
  .prepare("select_user_by_name_plan");
