import { sql } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  real,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import type { UserRecord } from "../api/get/user-records";

export const users = pgTable(
  "users",
  {
    id: integer("id").primaryKey().notNull(),
    name: text("name").notNull(),
    updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true }),
  },
  (t) => [index("users__name").on(sql`(lower(${t.name}))`)],
);

export const matches = pgTable(
  "matches",
  {
    id: integer("id").primaryKey().notNull(),
    seasonId: integer("season_id").notNull(),
    mode: integer("mode").notNull(),
    teamSize: integer("team_size").notNull(),
    version: text("version").notNull(),
    serverName: text("server_name").notNull(),
    startedAt: timestamp("started_at", { mode: "date", withTimezone: true }).notNull(),
    size: integer("size").notNull(),
  },
  (t) => [
    index("matches__season_id").on(t.seasonId),
    index("matches__mode").on(t.mode),
    index("matches__started_at").on(t.startedAt),
  ],
);

export const userRecords = pgTable(
  "user_records",
  {
    matchId: integer("match_id")
      .notNull()
      .references(() => matches.id, { onDelete: "cascade" }),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    team: integer("team").notNull(),
    score: real("score").notNull(),
    rank: integer("rank").notNull(),
    damageToPlayer: integer("damage_to_player").notNull(),
    data: jsonb("data").$type<UserRecord["data"]>().notNull(),
  },
  (t) => [
    primaryKey({
      columns: [t.matchId, t.userId],
    }),
    index("user_records__match_id").on(t.matchId),
    index("user_records__user_id").on(t.userId),
  ],
);
