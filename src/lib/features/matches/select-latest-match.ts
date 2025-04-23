import { single } from "$lib/utils/array/single";
import { desc } from "drizzle-orm";
import { db } from "$lib/shared/db/client.server";
import { userRecords } from "$lib/shared/db/schema.server";

export async function selectLatestMatch() {
  const rows = await db
    .select({ matchId: userRecords.matchId, version: userRecords.version })
    .from(userRecords)
    .orderBy(desc(userRecords.matchId))
    .limit(1);
  return single(rows);
}
