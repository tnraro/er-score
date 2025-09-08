import { parallel } from "$lib/shared/task/parallel";
import { diff } from "$lib/utils/object/diff";
import Dexie, { liveQuery, type EntityTable } from "dexie";

interface Kv {
  key: string;
  hash: string;
  value: unknown;
}

const db = new Dexie("static-data") as Dexie & {
  kv: EntityTable<Kv, "key">;
};
db.version(1).stores({
  kv: "&key,hash",
});

export async function setupStaticData() {
  const kv = await db.kv.toArray();
  const oldHashes = Object.fromEntries(kv.map((x) => [x.key, x.hash]));
  const newHashes = await getStaticDataHashes();

  const patches = diff(oldHashes, newHashes);
  const tasks = patches.map(async (patch) => {
    switch (patch.type) {
      case "add":
        return add(patch.key);
      case "update":
        return update(patch.key);
      case "remove":
        return remove(patch.key);
    }
  });
  const [, errors] = await parallel(tasks);
  if (errors.length > 0) {
    console.error(errors);
    return;
  }
}

async function remove(key: string) {
  await db.kv.delete(key);
}

async function add(key: string) {
  const fetchedData = await getStaticData(key);
  if (fetchedData == null) return;
  await db.kv.add({
    key: key,
    hash: fetchedData.hash,
    value: fetchedData.value,
  });
}

async function update(key: string) {
  const fetchedData = await getStaticData(key);
  if (fetchedData == null) return;
  await db.kv.put({
    key: key,
    hash: fetchedData.hash,
    value: fetchedData.value,
  });
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
  return (await res.json()) as Record<string, string>;
}

export function staticData<T>(key: string) {
  return liveQuery(async () => {
    const data = await db.kv.get({ key });
    return (data?.value ?? null) as T | null;
  });
}
