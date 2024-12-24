import { getCharacters } from "$lib/client/api/api";

export async function load() {
  const [characters] = await Promise.all([getCharacters()]);
  return {
    staticData: {
      characters,
    },
  };
}
