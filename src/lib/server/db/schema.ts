import { desc, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  primaryKey,
  real,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

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
    serverName: text("server_name").notNull(),
    mode: integer("mode").notNull(),
    size: integer("size").notNull(),
    teamSize: integer("team_size").notNull(),
    startedAt: timestamp("started_at", { mode: "date", withTimezone: true }).notNull(),
    totalTime: integer("total_time").notNull(),
  },
  (t) => ({
    seasonId: index("season_id").on(t.seasonId),
    mode: index("mode").on(t.mode),
    startedAt: index("started_at").on(desc(t.startedAt)),
  }),
);

export const matchUserResults = pgTable(
  "match_user_results",
  {
    matchId: integer("match_id")
      .notNull()
      .references(() => matches.id, { onDelete: "cascade" }),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    username: text("username").notNull(),
    mode: integer("mode").notNull(),

    team: integer("team").notNull(),
    characterId: integer("character_id").notNull(),
    skin: integer("skin").notNull(),
    preMadeTeam: integer("pre_made_team"),

    rank: integer("rank").notNull(),
    score: real("score").notNull(),
    k: integer("k").notNull(),
    a: integer("a").notNull(),
    d: integer("d").notNull(),

    playTime: integer("play_time").notNull(),
    characterLevel: integer("character_level").notNull(),
    bestWeapon: integer("best_weapon").notNull(),
    bestWeaponLevel: integer("best_weapon_level").notNull(),
    giveUp: boolean("give_up").notNull(),

    e0: integer("e0"),
    e1: integer("e1"),
    e2: integer("e2"),
    e3: integer("e3"),
    e4: integer("e4"),

    damageToPlayer: integer("damage").notNull(),
    damagedByPlayer: integer("damaged").notNull(),
    heal: integer("heal").notNull(),
    damageToMonster: integer("damage_to_monster").notNull(),
    killedMonster: integer("killed_monster").notNull(),

    ccTime: real("cc_time").notNull(),
    clutchs: integer("clutchs").notNull(),
    usedSecurityConsoles: integer("used_security_consoles").notNull(),
    usedEmpDrones: integer("used_emp_drones").notNull(),
    usedCredits: integer("used_credits").notNull(),
    terminatedTeams: integer("terminated_teams").notNull(),
  },
  (t) => ({
    id: primaryKey({
      columns: [t.matchId, t.userId],
    }),
    matchId: index("match_id").on(desc(t.matchId)),
  }),
);
