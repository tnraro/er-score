import { PUBLIC_STATIC_URL } from "$env/static/public";

export interface Character {
  code: number;
  name: string;
}
export async function getCharacters(): Promise<Character[]> {
  const res = await fetch(`${PUBLIC_STATIC_URL}/data/Character.json`);
  return await res.json();
}
