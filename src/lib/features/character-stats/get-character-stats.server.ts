import { db } from "$lib/shared/db/client.server";
import { characterStats } from "$lib/shared/db/schema.server";
import { single } from "$lib/utils/array/single";
import { and, eq } from "drizzle-orm";

export async function getCharacterStats(version: string, mode: number) {
  return single(
    await db
      .select({
        version: characterStats.version,
        mode: characterStats.mode,
        stats: characterStats.data,
        updatedAt: characterStats.updatedAt,
      })
      .from(characterStats)
      .where(and(eq(characterStats.version, version), eq(characterStats.mode, mode))),
  );
}
