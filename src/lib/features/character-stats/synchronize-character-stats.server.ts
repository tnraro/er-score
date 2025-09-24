import { db } from "$lib/shared/db/client.server";
import { characterStats, userRecords } from "$lib/shared/db/schema.server";
import { cast, percentileCont } from "$lib/shared/db/utils.server";
import { single } from "$lib/utils/array/single";
import { and, avg, count, eq, gte, lte, not, SQL, sql } from "drizzle-orm";

export type CharacterStat = Awaited<
  ReturnType<typeof groupUserRecordsByCharacterIdAndWeaponId>
>[number];

export async function synchronizeCharacterStats(version: string, mode: number) {
  const playTimePercentile = await selectPlayTimePercentile(mode, version);
  if (playTimePercentile == null) throw new Error("play time percentile is null");

  const stats = await groupUserRecordsByCharacterIdAndWeaponId(
    mode,
    version,
    playTimePercentile.p10,
    playTimePercentile.p90,
  );

  await updateCharacterStats({
    version,
    mode,
    data: stats,
  });

  return {
    stats,
  };
}

async function selectPlayTimePercentile(mode: number, version: string) {
  return single(
    await db
      .select({
        p10: percentileCont(0.1, userRecords.playTime),
        p90: percentileCont(0.9, userRecords.playTime),
      })
      .from(userRecords)
      .where(and(eq(userRecords.version, version), eq(userRecords.mode, mode))),
  );
}

async function groupUserRecordsByCharacterIdAndWeaponId(
  mode: number,
  version: string,
  p10: number,
  p90: number,
) {
  // prettier-ignore
  const precomputed = db.$with("pc").as(
    db
      .select({
        characterId: userRecords.characterId,
        weaponId: userRecords.weaponId,
        score: cast(userRecords.score, "float4").as("score"),
        rpGain: cast(userRecords.rpGain, "float4").as("rp_gain"),
        halfRate: cast(userRecords.halfRate, "float4").as("half_rate"),
        damageDealtToPlayers: sql`${cast(userRecords.damageDealtToPlayers, "float4")}`.as("a"),
        damageTakenFromPlayers: sql`${cast(userRecords.damageTakenFromPlayers, "float4")}`.as("b"),
        healingAmount: sql`${cast(userRecords.healingAmount, "float4")}`.as("c"),
        kills: sql`${cast(userRecords.kills, "float4")}`.as("d"),
        deaths: sql`${cast(userRecords.deaths, "float4")}`.as("e"),
        assists: sql`${cast(userRecords.assists, "float4")}`.as("f"),
        monsterKills: sql`${cast(userRecords.monsterKills, "float4")}`.as("g"),
        visionScore: sql`${cast(userRecords.visionScore, "float4")}`.as("h"),
      })
      .from(userRecords)
      .where(
        and(
          eq(userRecords.version, version),
          eq(userRecords.mode, mode),
          gte(userRecords.playTime, Math.round(p10)),
          lte(userRecords.playTime, Math.round(p90)),
          not(userRecords.hasQuit),
        ),
      ),
  );
  return await db
    .with(precomputed)
    .select({
      characterId: precomputed.characterId,
      weaponId: precomputed.weaponId,
      count: count(),
      ...agg("score"),
      ...agg("rpGain"),
      ...agg("halfRate"),
      ...agg("damageDealtToPlayers"),
      ...agg("damageTakenFromPlayers"),
      ...agg("healingAmount"),
      ...agg("kills"),
      ...agg("deaths"),
      ...agg("assists"),
      ...agg("monsterKills"),
      ...agg("visionScore"),
    })
    .from(precomputed)
    .groupBy(precomputed.characterId, precomputed.weaponId);
  function agg<T extends keyof (typeof precomputed)["_"]["selectedFields"]>(columnName: T) {
    return {
      [`${columnName}Avg`]: avg(precomputed[columnName]).mapWith(Number),
      [`${columnName}Q1`]: percentileCont(0.25, precomputed[columnName]).mapWith(Number),
      [`${columnName}Q2`]: percentileCont(0.5, precomputed[columnName]).mapWith(Number),
      [`${columnName}Q3`]: percentileCont(0.75, precomputed[columnName]).mapWith(Number),
    } as Record<`${T}Avg` | `${T}Q1` | `${T}Q2` | `${T}Q3`, SQL<number>>;
  }
}

async function updateCharacterStats(value: typeof characterStats.$inferInsert) {
  await db
    .insert(characterStats)
    .values(value)
    .onConflictDoUpdate({
      target: [characterStats.version, characterStats.mode],
      set: {
        data: sql.raw(`excluded.${characterStats.data.name}`),
        updatedAt: sql.raw(`current_timestamp`),
      },
    });
}
