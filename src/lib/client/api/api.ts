export interface Character {
  code: number;
  name: string;
}
export async function getCharacters(fetch: typeof window.fetch): Promise<Character[]> {
  const res = await fetch(`/api/static-data/Character`);
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
  const res = await Promise.all([requestItems("ItemWeapon"), requestItems("ItemArmor")]);
  return res.flat();

  async function requestItems(name: string) {
    const res = await fetch(`/api/static-data/${name}`);
    return await res.json();
  }
}
