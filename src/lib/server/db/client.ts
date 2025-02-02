import { env } from "$env/dynamic/private";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
const { Pool } = pg;
// const { Pool } = pg.native!;

export type Database = typeof db;

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});
export const db = drizzle({ client: pool });
