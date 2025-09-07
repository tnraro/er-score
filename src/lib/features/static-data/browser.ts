import Dexie, { liveQuery, type EntityTable } from "dexie";

interface Kv {
  key: string;
  hash: string;
  value: unknown;
}

const db = new Dexie("static-data") as Dexie & {
  kv: EntityTable<Kv, "key">;
};

export async function setupStaticData() {
  db.version(1).stores({
    kv: "&key,hash",
  });

  const newHashes = await getStaticDataHashes();
  await db.kv.filter((x) => !newHashes.has(x.key)).delete();
  const kv = await db.kv.toArray();
  const updatePromises = Promise.allSettled(
    kv
      .filter((x) => {
        const y = newHashes.get(x.key);
        return x.hash !== y?.hash;
      })
      .map(async (x) => {
        const fetchedData = await getStaticData(x.key);
        if (fetchedData == null) return;
        await db.kv.put({
          key: x.key,
          hash: fetchedData.hash,
          value: fetchedData.value,
        });
      }),
  );
  const addPromises = Promise.allSettled(
    [...newHashes.values()]
      .filter((y) => !kv.some((x) => x.key === y.key))
      .map(async (y) => {
        const fetchedData = await getStaticData(y.key);
        if (fetchedData == null) return;
        await db.kv.add({
          key: y.key,
          hash: fetchedData.hash,
          value: fetchedData.value,
        });
      }),
  );
  await Promise.allSettled([updatePromises, addPromises]);
}

async function getStaticData(key: string) {
  const res = await fetch(`/api/static-data/${key}`);
  if (!res.ok) return null;

  return {
    hash: res.headers.get("ETag")!,
    value: await res.json(),
  };
}

async function getStaticDataHashes() {
  const res = await fetch("/api/static-data");
  const data = (await res.json()) as { key: string; hash: string }[];
  return new Map(data.map((x) => [x.key, x]));
}

export function staticData<T>(key: string) {
  return liveQuery(async () => {
    const data = await db.kv.get({ key });
    return (data?.value ?? null) as T | null;
  });
}
