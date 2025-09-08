import { parallel } from "$lib/shared/task/parallel";
import { error } from "@sveltejs/kit";
import { selectRawStaticData } from "../raw-static-data/db.server";
import { deleteStaticData, insertStaticData, selectStaticDataHashes } from "./db.server";

export async function synchronizeStaticData() {
  console.info("Synchronizing static data...");
  const oldHashes = await selectStaticDataHashes();
  const newData = await createNewStaticData();

  const [, deletionErrors] = await parallel(
    Object.keys(oldHashes)
      .filter((key) => !Object.hasOwn(newData, key))
      .map((key) => deleteStaticData(key)),
  );
  if (deletionErrors.length > 0) {
    console.error(deletionErrors);
    throw error(500, { message: "Failed to synchronize static data" });
  }

  const [, insertionErrors] = await parallel(
    Object.entries(newData).map(([key, value]) => insertStaticData(key, value)),
  );
  if (insertionErrors.length > 0) {
    console.error(insertionErrors);
    throw error(500, { message: "Failed to synchronize static data" });
  }
  console.info("Static data synchronized successfully.");
}

async function createNewStaticData() {
  const [characters, items] = await Promise.all([createCharacters(), createItems()]);

  return {
    characters,
    items,
  };
}

interface Character {
  code: number;
  name: string;
}
async function createCharacters() {
  const rawCharacters = (await selectRawStaticData<Character[]>("Character")) ?? [];
  return rawCharacters.map((c) => ({ id: c.code, name: c.name }));
}
export type StaticDataCharacter = Awaited<ReturnType<typeof createCharacters>>[number];

interface Item {
  code: number;
  modeType: number;
  itemType: string;
  weaponType?: string;
  itemGrade: "Common" | "Uncommon" | "Rare" | "Epic" | "Legend" | "Mythic";
}
async function createItems() {
  const rawWeapon = (await selectRawStaticData<Item[]>("ItemWeapon")) ?? [];
  const rawArmor = (await selectRawStaticData<Item[]>("ItemArmor")) ?? [];

  return [...rawWeapon, ...rawArmor].map((item) => ({
    id: item.code,
    mode: item.modeType,
    type: item.itemType,
    weapon: item.weaponType,
    grade: item.itemGrade,
  }));
}
export type StaticDataItem = Awaited<ReturnType<typeof createItems>>[number];
