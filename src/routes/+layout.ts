import { getCharacters, getItems } from "$lib/client/api/api";
import { measureTime } from "$lib/utils/time/measureTime";

export async function load({ fetch }) {
  const [characters, items] = await Promise.all([
    measureTime("get-characters", () => getCharacters(fetch)),
    measureTime("get-items", () => getItems(fetch)),
  ]);
  return {
    staticData: {
      characters,
      items,
    },
  };
}
