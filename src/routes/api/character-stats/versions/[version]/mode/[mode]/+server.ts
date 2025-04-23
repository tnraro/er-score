import { db } from "$lib/shared/db/client.server";
import { cacheCharacterStats, userRecords } from "$lib/shared/db/schema.server";
import { cast, percentileCont } from "$lib/shared/db/utils.server";
import { single } from "$lib/utils/array/single";
import { error, json } from "@sveltejs/kit";
import { and, avg, count, eq, gte, lte, not, SQL, sql } from "drizzle-orm";

export type CharacterStat = Awaited<
  ReturnType<typeof groupUserRecordsByCharacterIdAndWeaponId>
>[number];

export async function GET({ params }) {
  const version = params.version;
  const mode = Number(params.mode);

  const result = await db
    .select({
      data: cacheCharacterStats.data,
    })
    .from(cacheCharacterStats)
    .where(and(eq(cacheCharacterStats.version, version), eq(cacheCharacterStats.mode, mode)));

  const stats = result.map((r) => r.data);
  return json({
    version,
    mode,
    stats,
  });
}

export async function POST({ params, locals }) {
  if (locals.adminSession == null) throw error(401);
  const version = params.version;
  const mode = Number(params.mode);
  await update(version, mode);

  return json({
    version,
    mode,
    done: true,
  });
}

async function update(version: string, mode: number) {
  const playTimePercentile = await selectPlayTimePercentile(mode, version);
  if (playTimePercentile == null) throw new Error("play time percentile is null");

  const stats = await groupUserRecordsByCharacterIdAndWeaponId(
    mode,
    version,
    playTimePercentile.p10,
    playTimePercentile.p90,
  );

  await db
    .insert(cacheCharacterStats)
    .values(
      stats.map((stat) => ({
        version,
        mode,
        characterId: stat.characterId,
        weaponId: stat.weaponId,
        data: stat,
      })),
    )
    .onConflictDoUpdate({
      target: [
        cacheCharacterStats.version,
        cacheCharacterStats.mode,
        cacheCharacterStats.characterId,
        cacheCharacterStats.weaponId,
      ],
      set: {
        data: sql.raw(`excluded.${cacheCharacterStats.data.name}`),
      },
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
        score: userRecords.score,
        halfRate: cast(userRecords.halfRate, "float4").as("half_rate"),
        damageDealtToPlayersPerMin: sql`${cast(userRecords.damageDealtToPlayers, "float4")}/${userRecords.playTime}*60`.as("a"),
        damageTakenFromPlayersPerMin: sql`${cast(userRecords.damageTakenFromPlayers, "float4")}/${userRecords.playTime}*60`.as("b"),
        healingAmountPerMin: sql`${cast(userRecords.healingAmount, "float4")}/${userRecords.playTime}*60`.as("c"),
        killsPerMin: sql`${cast(userRecords.kills, "float4")}/${userRecords.playTime}*60`.as("d"),
        deathsPerMin: sql`${cast(userRecords.deaths, "float4")}/${userRecords.playTime}*60`.as("e"),
        assistsPerMin: sql`${cast(userRecords.assists, "float4")}/${userRecords.playTime}*60`.as("f"),
        monsterKillsPerMin: sql`${cast(userRecords.monsterKills, "float4")}/${userRecords.playTime}*60`.as("g"),
        visionScorePerMin: sql`${cast(userRecords.visionScore, "float4")}/${userRecords.playTime}*60`.as("h"),
      })
      .from(userRecords)
      .where(
        and(
          eq(userRecords.version, version),
          eq(userRecords.mode, mode),
          gte(userRecords.playTime, p10),
          lte(userRecords.playTime, p90),
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
      score: avg(precomputed.score).mapWith(Number),
      ...agg("halfRate"),
      ...agg("damageDealtToPlayersPerMin"),
      ...agg("damageTakenFromPlayersPerMin"),
      ...agg("healingAmountPerMin"),
      ...agg("killsPerMin"),
      ...agg("deathsPerMin"),
      ...agg("assistsPerMin"),
      ...agg("monsterKillsPerMin"),
      ...agg("visionScorePerMin"),
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
