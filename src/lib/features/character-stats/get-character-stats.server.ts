import { db } from "$lib/shared/db/client.server";
import { cacheCharacterStats } from "$lib/shared/db/schema.server";
import { and, eq } from "drizzle-orm";

export async function getCharacterStats(version: string, mode: number) {
  const rows = await db
    .select({
      data: cacheCharacterStats.data,
    })
    .from(cacheCharacterStats)
    .where(and(eq(cacheCharacterStats.version, version), eq(cacheCharacterStats.mode, mode)));

  return rows.map((r) => r.data);
}
