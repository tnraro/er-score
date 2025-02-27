import { file } from "bun";
import { readdir } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { readTranslationFromDisk } from "typesafe-i18n/exporter";
import { storeTranslationToDisk } from "typesafe-i18n/importer";
import type { BaseTranslation, Locales } from "../../../src/i18n/i18n-types";
import { parallel } from "../utils";
import { rootPath } from "./consts";

export async function getI18n(lang: string) {
  const i18nPath = resolve(rootPath, "i18n", lang);
  const filenames = await readdir(i18nPath).then((filenames) =>
    filenames.filter((filename) => filename.endsWith(".json")),
  );
  return Object.fromEntries(
    await parallel(
      filenames.map(async (filename) => {
        const filePath = resolve(i18nPath, filename);
        const data = await file(filePath).json();
        const name = basename(filename, ".json");
        return [name.replaceAll(/-([a-z])/g, (_, $1: string) => $1.toUpperCase()), data] as [
          string,
          Record<string, string>,
        ];
      }),
    ),
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
