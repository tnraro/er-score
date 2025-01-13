import { getCharacters, getItems } from "$lib/client/api/api";
import { measureTime } from "$lib/utils/time/measureTime";

export async function load() {
  const [characters, items] = await Promise.all([
    measureTime("get-characters", () => getCharacters()),
    measureTime("get-items", () => getItems()),
  ]);
  return {
    staticData: {
      characters,
      items,
    },
  };
}
