import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/shared/db/schema.server.ts",
  out: "./drizzle/migrations",
  verbose: true,
  strict: true,
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  casing: "snake_case",
  tablesFilter: ["!pg_stat_statements*"],
});
