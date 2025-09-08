import { db } from "$lib/shared/db/client.server";
import { staticData } from "$lib/shared/db/schema.server";
import { single } from "$lib/utils/array/single";
import { and, eq, sql } from "drizzle-orm";

export async function selectStaticDataHashes() {
  const rows = await db.select({ key: staticData.key, hash: staticData.hash }).from(staticData);
  return Object.fromEntries(rows.map((x) => [x.key, fromPgHash(x.hash)]));
}
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
    hash: fromPgHash(row.hash),
  };
}
export async function insertStaticData(key: string, value: unknown) {
  const hash = toPgHash(value);

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

function toPgHash(value: unknown) {
  return Bun.hash.wyhash(JSON.stringify(value)) - 9223372036854775808n;
}
function fromPgHash(value: bigint) {
  return (value + 9223372036854775808n).toString(36);
}
