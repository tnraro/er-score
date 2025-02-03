import { sql } from "drizzle-orm";
import {
  boolean,
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
import type { UserRecordData } from "../../domains/api/user-records";

export const users = pgTable(
  "users",
  {
    id: integer().primaryKey().notNull(),
    name: text().notNull(),
    updatedAt: timestamp({ mode: "date", withTimezone: true }),
    updatedMatchId: integer(),
  },
  (t) => [index("users__name").on(sql`(lower(${t.name}))`)],
);

export const matches = pgTable(
  "matches",
  {
    id: integer().primaryKey().notNull(),
    seasonId: smallint().notNull(),
    mode: smallint().notNull(),
    teamSize: smallint().notNull(),
    version: text().notNull(),
    serverName: text().notNull(),
    startedAt: timestamp({ mode: "date", withTimezone: true }).notNull(),
    size: smallint().notNull(),
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
    team: smallint().notNull(),
    score: real().notNull(),
    rank: smallint().notNull(),

    nickname: text().notNull(),
    hasQuit: boolean().notNull(),
    preMadeTeamSize: smallint().notNull(),

    routeId: integer(),

    totalTime: integer().notNull(),
    playTime: integer().notNull(),

    teamKills: smallint().notNull(),
    kills: smallint().notNull(),
    deaths: smallint().notNull(),
    assists: smallint().notNull(),

    monsterKills: integer().notNull(),

    characterId: smallint().notNull(),
    characterLevel: smallint().notNull(),
    skin: smallint().notNull(),

    weaponId: smallint().notNull(),
    weaponLevel: smallint().notNull(),

    damageDealtToPlayers: integer().notNull(),
    damageTakenFromPlayers: integer().notNull(),
    damageDealtToMonsters: integer().notNull(),

    healingAmount: integer().notNull(),

    rpGain: integer().notNull(),
    scoredPoints: integer().notNull(),
    usedVFCredits: integer().notNull(),
    visionScore: integer().notNull(),

    equipments: jsonb().$type<{ [x: string]: number }>().notNull(),
    traits: jsonb().$type<{ 0: number; 1: number[]; 2: number[] }>().notNull(),
    skillOrder: integer().array().notNull(),

    isWickelineKilled: boolean().notNull(),
    isAlphaKilled: boolean().notNull(),
    isOmegaKilled: boolean().notNull(),
    isGammaKilled: boolean().notNull(),
    clutchCount: integer().notNull(),

    data: jsonb().$type<UserRecordData>().notNull(),
  },
  (t) => [
    primaryKey({
      columns: [t.matchId, t.userId],
    }),
    index("user_records__match_id").on(t.matchId),
    index("user_records__user_id").on(t.userId),
  ],
);
