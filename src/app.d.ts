import type { Db } from "$lib/server/db";
import { D1Database } from "@cloudflare/workers-types";

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      db: Db;
    }
    // interface PageData {}
    // interface PageState {}
    interface Platform {
      env?: {
        DB: D1Database;
      };
    }
  }
}

export {};
