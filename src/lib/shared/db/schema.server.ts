import type { CharacterStat } from "$lib/features/character-stats/synchronize-character-stats.server";
import type { UserRecordData } from "$lib/features/user-records/to-user-record";
import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  integer,
  json,
  jsonb,
  pgTable,
  primaryKey,
  real,
  smallint,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const adminSessions = pgTable(
  "admin_sessions",
  {
    id: uuid().primaryKey().notNull().defaultRandom(),
    tag: text().notNull(),
    expiresAt: timestamp({ mode: "date", withTimezone: true }).notNull(),
    createdAt: timestamp({ mode: "date", withTimezone: true }).notNull().defaultNow(),
    isValid: boolean().notNull().default(true),
  },
  (t) => [index("admin_sessions__expires_at").on(t.expiresAt)],
);

export const users = pgTable(
  "users",
  {
    id: integer().primaryKey().notNull(),
    name: text().notNull(),
    updatedAt: timestamp({ mode: "date", withTimezone: true }),
    updatedMatchId: integer(),
    level: integer(),
    rp: integer(),
  },
  (t) => [index("users__name").on(sql`(lower(${t.name}))`)],
);

export type UserRecord = typeof userRecords.$inferSelect;
export const userRecords = pgTable(
  "user_records",
  {
    matchId: integer().notNull(),
    seasonId: smallint().notNull(),
    mode: smallint().notNull(),
    teamSize: smallint().notNull(),
    botSize: smallint().notNull().default(0),
    version: text().notNull(),
    serverName: text().notNull(),
    startedAt: timestamp({ mode: "date", withTimezone: true }).notNull(),
    size: smallint().notNull(),

    userId: integer().notNull(),
    team: smallint().notNull(),
    score: real().notNull(),
    rank: smallint().notNull(),
    halfRate: real().notNull(),

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

    matchingAverageRp: integer(),
    rp: integer(),
    rpGain: integer(),
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
  },
  (t) => [
    primaryKey({
      columns: [t.matchId, t.userId],
    }),
    index("user_records__match_id").on(t.matchId),
    index("user_records__user_id").on(t.userId),
    index("user_records__mode").on(t.mode),
    index("user_records__version").on(t.version),
  ],
);

export const userRecordData = pgTable(
  "user_record_data",
  {
    matchId: integer().notNull(),
    userId: integer().notNull(),
    data: jsonb().$type<UserRecordData>(),
  },
  (t) => [
    primaryKey({
      columns: [t.matchId, t.userId],
    }),
  ],
);

export const filledMatches = pgTable("filled_matches", {
  version: text().primaryKey(),
  latestMatchId: integer().notNull(),
  createdAt: timestamp({ mode: "date", withTimezone: true }).notNull().defaultNow(),
});

export const characterStats = pgTable(
  "character_stats",
  {
    version: text().notNull(),
    mode: smallint().notNull(),
    data: json().$type<CharacterStat[]>().notNull(),
    updatedAt: timestamp({ mode: "date", withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.version, t.mode] })],
);

export const rawStaticData = pgTable("raw_static_data", {
  key: text().primaryKey(),
  value: json().notNull(),
});

export const staticData = pgTable("static_data", {
  key: text().primaryKey(),
  hash: bigint({ mode: "bigint" }).notNull(),
  value: json().notNull(),
});

export const teamCompositions = pgTable(
  "team_compositions",
  {
    version: text().notNull(),
    characters: smallint().array(3).notNull(),
    score: real("score").notNull(),
    rpGainRank: integer("rp_gain_rank").notNull(),
    avgHalfRate: real("avg_half_rate").notNull(),
    avgRpGain: real("avg_rp_gain").notNull(),
    count: integer().notNull(),
    updatedAt: timestamp({ mode: "date", withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    primaryKey({ columns: [t.version, t.characters] }),
    index("team_compositions__version").on(t.version),
    index("team_compositions__characters").using("gin", t.characters),
  ],
);
