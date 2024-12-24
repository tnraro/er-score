import { env } from "$env/dynamic/public";

export interface Character {
  code: number;
  name: string;
}
export async function getCharacters(): Promise<Character[]> {
  const res = await fetch(`${env.PUBLIC_STATIC_URL}/data/Character.json`);
  return await res.json();
}
