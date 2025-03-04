import type { Locales, TranslationFunctions } from "$i18n/i18n-types";
import type { Database } from "$lib/features/db/client.server";

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      db: Database;
      locale: Locales;
      LL: TranslationFunctions;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
