import { db } from "$lib/shared/db/client.server";
import { staticData } from "$lib/shared/db/schema.server";
import { single } from "$lib/utils/array/single";
import { and, eq, sql } from "drizzle-orm";

export async function selectStaticData<Data>(key: string, hash?: bigint) {
  const filters = [eq(staticData.key, key)];
  if (hash != null) {
    filters.push(eq(staticData.hash, hash));
  }

  const row = single(
    await db
      .select({
        value: staticData.value,
        hash: staticData.hash,
      })
      .from(staticData)
      .where(and(...filters)),
  );
  if (row == null) return null;
  return {
    value: row.value as Data,
    hash: row.hash + 9223372036854775808n,
  };
}
export async function insertStaticData(key: string, value: unknown) {
  const hash = Bun.hash.wyhash(JSON.stringify(value)) - 9223372036854775808n;

  return await db
    .insert(staticData)
    .values({ key, hash, value })
    .onConflictDoUpdate({
      target: staticData.key,
      set: {
        hash: sql.raw(`excluded.${staticData.hash.name}`),
        value: sql.raw(`excluded.${staticData.value.name}`),
      },
    });
}
export async function deleteStaticData(key: string) {
  return await db.delete(staticData).where(eq(staticData.key, key));
}
