import { env } from "$env/dynamic/public";

export interface Character {
  code: number;
  name: string;
}
export async function getCharacters(): Promise<Character[]> {
  const res = await fetch(`${env.PUBLIC_STATIC_URL}/data/Character.json`);
  return await res.json();
}

export interface Item {
  code: number;
  modeType: number;
  itemType: string;
  weaponType?: string;
  itemGrade: "Common" | "Uncommon" | "Rare" | "Epic" | "Legend" | "Mythic";
}

export async function getItems(): Promise<Item[]> {
  const res = await Promise.all([requestItems("ItemWeapon"), requestItems("ItemArmor")]);
  return res.flat();

  async function requestItems(name: string) {
    const res = await fetch(`${env.PUBLIC_STATIC_URL}/data/${name}.json`);
    return await res.json();
  }
}
