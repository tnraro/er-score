import type { Db } from "$lib/server/db";
import type { Queries } from "$lib/server/query";

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      db: Db;
      query: Queries;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
