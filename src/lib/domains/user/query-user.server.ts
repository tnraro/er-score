import { getUser } from "$lib/domains/api/user";
import type { Database } from "$lib/server/db/client";
import { insertUsers } from "$lib/server/db/models/insert-users";
import { selectUserByName } from "./select-user-by-name.server";

export async function queryUser(db: Database, username: string) {
  {
    const user = await selectUserByName(db, username);
    if (user != null) return user;
  }
  const user = await getUser(username);
  await insertUsers(db, [user]);
  return {
    ...user,
    updatedAt: null,
    updatedMatchId: null,
  };
}
