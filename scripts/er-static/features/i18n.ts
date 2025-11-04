import { readTranslationFromDisk } from "typesafe-i18n/exporter";
import { storeTranslationToDisk } from "typesafe-i18n/importer";
import type { BaseTranslation, Locales } from "../../../src/i18n/i18n-types";
import { ErApiClient } from "../../../src/lib/shared/er-api/client.server";

const client = new ErApiClient({
  host: Bun.env.API_HOST!,
  key: Bun.env.API_KEY!,
  delay: Number(Bun.env.API_DELAY),
});

export async function getI18n(lang: string) {
  const rawString = await client.getL10n(lang);

  const rules = [
    { key: "characterName", pattern: /^Character\/Name\/(?<key>\d+)┃(?<value>.+)$/gm },
    { key: "itemType", pattern: /^ItemType\/(?<key>[^┃/]+)┃(?<value>.+)$/gm },
    { key: "weaponType", pattern: /^WeaponType\/(?<key>[^┃/]+)┃(?<value>.+)$/gm },
    { key: "armorType", pattern: /^ArmorType\/(?<key>[^┃/]+)┃(?<value>.+)$/gm },
    { key: "specialItemType", pattern: /^SpecialItemType\/(?<key>[^┃/]+)┃(?<value>.+)$/gm },
    { key: "miscItemType", pattern: /^MiscItemType\/(?<key>[^┃/]+)┃(?<value>.+)$/gm },
    { key: "consumableItemType", pattern: /^ItemConsumableType\/(?<key>[^┃/]+)┃(?<value>.+)$/gm },
    { key: "masteryType", pattern: /^MasteryType\/(?<key>[^┃/]+)┃(?<value>.+)$/gm },
    { key: "itemGrade", pattern: /^ItemGrade\/(?<key>[^┃/]+)┃(?<value>.+)$/gm },
    { key: "skinName", pattern: /^Skin\/Name\/(?<key>\d+)┃(?<value>.+)$/gm },
    { key: "traitName", pattern: /^Trait\/Name\/(?<key>\d+)┃(?<value>.+)$/gm },
  ];

  return Object.fromEntries(
    rules.map((rule) => [
      rule.key,
      Object.fromEntries(
        rawString.matchAll(rule.pattern).map((match) => [match.groups!.key, match.groups!.value]),
      ),
    ]),
  );
}

export async function setI18n(locale: Locales, translations: BaseTranslation) {
  const mapping = await readTranslationFromDisk(locale);
  return await storeTranslationToDisk({
    locale,
    translations: {
      ...mapping.translations,
      api: translations,
    },
    namespaces: mapping.namespaces,
  });
}
