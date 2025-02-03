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
    id: integer().primaryKey().notNull(),
    name: text().notNull(),
    updatedAt: timestamp({ mode: "date", withTimezone: true }),
  },
  (t) => [index("users__name").on(sql`(lower(${t.name}))`)],
);

export const matches = pgTable(
  "matches",
  {
    id: integer().primaryKey().notNull(),
    seasonId: integer().notNull(),
    mode: integer().notNull(),
    teamSize: integer().notNull(),
    version: text().notNull(),
    serverName: text().notNull(),
    startedAt: timestamp({ mode: "date", withTimezone: true }).notNull(),
    size: integer().notNull(),
  },
  (t) => [index("matches__season_id").on(t.seasonId), index("matches__started_at").on(t.startedAt)],
);

export const userRecords = pgTable(
  "user_records",
  {
    matchId: integer()
      .notNull()
      .references(() => matches.id, { onDelete: "cascade" }),
    userId: integer()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    team: integer().notNull(),
    score: real().notNull(),
    rank: integer().notNull(),
    damageToPlayer: integer().notNull(),
    data: jsonb().$type<UserRecord["data"]>().notNull(),
    nickname: text()
      .notNull()
      .generatedAlwaysAs((): SQL => sql`${userRecords.data}->>'nickname'`),
    totalTime: integer()
      .notNull()
      .generatedAlwaysAs((): SQL => sql`(${userRecords.data}->'totalTime')::integer`),
    characterId: smallint()
      .notNull()
      .generatedAlwaysAs((): SQL => sql`(${userRecords.data}->'characterId')::smallint`),
    skin: smallint()
      .notNull()
      .generatedAlwaysAs((): SQL => sql`(${userRecords.data}->'skin')::smallint`),
    preMade: smallint()
      .notNull()
      .generatedAlwaysAs((): SQL => sql`(${userRecords.data}->'preMade')::smallint`),
    k: integer()
      .notNull()
      .generatedAlwaysAs((): SQL => sql`(${userRecords.data}->'k')::integer`),
    a: integer()
      .notNull()
      .generatedAlwaysAs((): SQL => sql`(${userRecords.data}->'a')::integer`),
    d: integer()
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
