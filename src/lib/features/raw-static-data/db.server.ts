import { db } from "$lib/shared/db/client.server";
import { rawStaticData } from "$lib/shared/db/schema.server";
import { single } from "$lib/utils/array/single";
import { eq, sql } from "drizzle-orm";

export async function selectRawStaticData<Data>(key: string) {
  const row = single(
    await db
      .select({
        value: rawStaticData.value,
      })
      .from(rawStaticData)
      .where(eq(rawStaticData.key, key)),
  );
  return row?.value as Data | null;
}
export async function insertRawStaticData(key: string, value: unknown) {
  return await db
    .insert(rawStaticData)
    .values({ key, value })
    .onConflictDoUpdate({
      target: rawStaticData.key,
      set: {
        value: sql.raw(`excluded.${rawStaticData.value.name}`),
      },
    });
}
export async function deleteRawStaticData(key: string) {
  return await db.delete(rawStaticData).where(eq(rawStaticData.key, key));
}
