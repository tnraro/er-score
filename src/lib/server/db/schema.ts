import { desc, sql } from "drizzle-orm";
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
  },
  (t) => ({ name: index("name").on(sql`(lower(${t.name}))`) }),
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
  (t) => ({
    seasonId: index("season_id").on(t.seasonId),
    mode: index("mode").on(t.mode),
    startedAt: index("started_at").on(desc(t.startedAt)),
  }),
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
  (t) => ({
    id: primaryKey({
      columns: [t.matchId, t.userId],
    }),
    matchId: index("match_id").on(t.matchId),
    userId: index("user_id").on(t.userId),
  }),
);
