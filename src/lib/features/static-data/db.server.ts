import { db } from "$lib/shared/db/client.server";
import { staticData } from "$lib/shared/db/schema.server";
import { single } from "$lib/utils/array/single";
import { eq, sql } from "drizzle-orm";

export async function selectStaticData<Data>(key: string) {
  const row = single(
    await db.select({ value: staticData.value }).from(staticData).where(eq(staticData.key, key)),
  );
  return row?.value as Data | null;
}
export async function insertStaticData(key: string, value: unknown) {
  return await db
    .insert(staticData)
    .values({ key, value })
    .onConflictDoUpdate({
      target: staticData.key,
      set: { value: sql.raw(`excluded.${staticData.value.name}`) },
    });
}
export async function deleteStaticData(key: string) {
  return await db.delete(staticData).where(eq(staticData.key, key));
}
