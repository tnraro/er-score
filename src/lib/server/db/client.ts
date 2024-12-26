import { env } from "$env/dynamic/private";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export function createDb() {
  // Disable prefetch as it is not supported for "Transaction" pool mode
  const client = postgres(env.DATABASE_URL, { prepare: false });
  const db = drizzle(client);
  return db;
}
