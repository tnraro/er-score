import { index, int, primaryKey, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: int("id").primaryKey().notNull(),
    name: text("name").notNull(),
  },
  (t) => ({ name: index("name").on(t.name) }),
);

export const matches = sqliteTable(
  "matches",
  {
    id: int("id").primaryKey().notNull(),
    seasonId: int("season_id").notNull(),
    serverName: text("server_name").notNull(),
    mode: int("mode").notNull(),
    size: int("size").notNull(),
    teamSize: int("team_size").notNull(),
    startedAt: int("started_at", { mode: "timestamp_ms" }).notNull(),
    totalTime: int("total_time").notNull(),
  },
  (t) => ({
    seasonId: index("seasonId").on(t.seasonId),
    mode: index("mode").on(t.mode),
  }),
);

export const matchUserResults = sqliteTable(
  "match_user_results",
  {
    matchId: int("match_id")
      .notNull()
      .references(() => matches.id, { onDelete: "cascade" }),
    userId: int("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    username: text("username").notNull(),
    mode: int("mode").notNull(),

    team: int("team").notNull(),
    characterId: int("character_id").notNull(),
    skin: int("skin").notNull(),
    rank: int("rank").notNull(),

    score: real("score").notNull(),
    k: int("k").notNull(),
    a: int("a").notNull(),
    d: int("d").notNull(),

    playTime: int("play_time").notNull(),
    characterLevel: int("character_level").notNull(),
    bestWeapon: int("best_weapon").notNull(),
    bestWeaponLevel: int("best_weapon_level").notNull(),
    giveUp: int("give_up", { mode: "boolean" }).notNull(),

    e0: int("e0"),
    e1: int("e1"),
    e2: int("e2"),
    e3: int("e3"),
    e4: int("e4"),

    damageToPlayer: int("damage").notNull(),
    damagedByPlayer: int("damaged").notNull(),
    heal: int("heal").notNull(),
    damageToMonster: int("damage_to_monster").notNull(),
    killedMonster: int("killed_monster").notNull(),

    ccTime: int("cc_time").notNull(),
    clutchs: int("clutchs").notNull(),
    usedSecurityConsoles: int("used_security_consoles").notNull(),
    usedEmpDrones: int("used_emp_drones").notNull(),
    usedCredits: int("used_credits").notNull(),
    terminatedTeams: int("terminated_teams").notNull(),
  },
  (t) => ({
    id: primaryKey({
      columns: [t.matchId, t.userId],
    }),
  }),
);
