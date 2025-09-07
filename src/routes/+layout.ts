import { loadLocaleAsync } from "$i18n/i18n-util.async.js";

export async function load({ data: { locale } }) {
  await loadLocaleAsync(locale);

  return {
    locale,
  };
}
