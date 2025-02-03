import type { Database } from "$lib/server/db/client";
import { users } from "$lib/server/db/schema";
import { eq, sql } from "drizzle-orm";

export async function selectUserByName(db: Database, name: string) {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      updatedAt: users.updatedAt,
      updatedMatchId: users.updatedMatchId,
    })
    .from(users)
    .where(eq(sql`lower(${users.name})`, name.toLowerCase()))
    .limit(1);
  return result.at(0);
}
