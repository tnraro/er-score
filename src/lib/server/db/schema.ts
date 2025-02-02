import { type SQL, sql } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  real,
  smallint,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import type { UserRecord } from "../../domains/api/user-records";

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
  (t) => [index("matches__season_id").on(t.seasonId), index("matches__started_at").on(t.startedAt)],
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
    nickname: text("nickname")
      .notNull()
      .generatedAlwaysAs((): SQL => sql`${userRecords.data}->>'nickname'`),
    totalTime: integer("total_time")
      .notNull()
      .generatedAlwaysAs((): SQL => sql`(${userRecords.data}->'totalTime')::integer`),
    characterId: smallint("character_id")
      .notNull()
      .generatedAlwaysAs((): SQL => sql`(${userRecords.data}->'characterId')::smallint`),
    skin: smallint("skin")
      .notNull()
      .generatedAlwaysAs((): SQL => sql`(${userRecords.data}->'skin')::smallint`),
    preMade: smallint("pre_made")
      .notNull()
      .generatedAlwaysAs((): SQL => sql`(${userRecords.data}->'preMade')::smallint`),
    k: integer("k")
      .notNull()
      .generatedAlwaysAs((): SQL => sql`(${userRecords.data}->'k')::integer`),
    a: integer("a")
      .notNull()
      .generatedAlwaysAs((): SQL => sql`(${userRecords.data}->'a')::integer`),
    d: integer("d")
      .notNull()
      .generatedAlwaysAs((): SQL => sql`(${userRecords.data}->'d')::integer`),
  },
  (t) => [
    primaryKey({
      columns: [t.matchId, t.userId],
    }),
    index("user_records__match_id").on(t.matchId),
    index("user_records__user_id").on(t.userId),
  ],
);
