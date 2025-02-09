import { loadLocaleAsync } from "$i18n/i18n-util.async.js";
import { getCharacters, getItems } from "$lib/client/api/api";
import { measureTime } from "$lib/utils/time/measureTime";

export async function load({ fetch, data: { locale } }) {
  const [characters, items] = await Promise.all([
    measureTime("get-characters", () => getCharacters(fetch)),
    measureTime("get-items", () => getItems(fetch)),
    loadLocaleAsync(locale),
  ]);
  return {
    staticData: {
      characters,
      items,
    },
    locale,
  };
}
