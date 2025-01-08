import type { drizzle } from "drizzle-orm/node-postgres";

export type Database = ReturnType<typeof drizzle>;

export function createModel<T>(model: (db: Database) => T) {
  return model;
}
