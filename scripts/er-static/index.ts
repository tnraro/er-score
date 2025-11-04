import type { Locales } from "../../src/i18n/i18n-types";
import { getI18n, setI18n } from "./features/i18n";

await processI18n("Korean", "ko");
await processI18n("English", "en");

async function processI18n(lang: string, locale: Locales) {
  const translations = await getI18n(lang);
  const result = await setI18n(locale, translations);
  console.log(`translations imported for locale ${result}`);
}
