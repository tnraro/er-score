import { env } from "$env/dynamic/public";

export interface Character {
  code: number;
  name: string;
}
export async function getCharacters(fetch: typeof window.fetch): Promise<Character[]> {
  const res = await fetch(`${env.PUBLIC_STATIC_URL}/data/character.json`);
  return await res.json();
}

export interface Item {
  code: number;
  modeType: number;
  itemType: string;
  weaponType?: string;
  itemGrade: "Common" | "Uncommon" | "Rare" | "Epic" | "Legend" | "Mythic";
}

export async function getItems(fetch: typeof window.fetch): Promise<Item[]> {
  const res = await Promise.all([requestItems("item-weapon"), requestItems("item-armor")]);
  return res.flat();

  async function requestItems(name: string) {
    const res = await fetch(`${env.PUBLIC_STATIC_URL}/data/${name}.json`);
    return await res.json();
  }
}
