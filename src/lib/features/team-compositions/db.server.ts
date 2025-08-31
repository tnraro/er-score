import { db } from "$lib/shared/db/client.server";
import { teamCompositions, userRecords } from "$lib/shared/db/schema.server";
import { single } from "$lib/utils/array/single";
import { chunks } from "$lib/utils/generator/chunks";
import { and, avg, count, desc, eq, gte, min, Param, sql } from "drizzle-orm";

type TeamComposition = Awaited<ReturnType<typeof analyzeTeamCompositions>>[0];
export async function analyzeTeamCompositions(version: string) {
  const step0 = db.$with("step0").as(
    db
      .select({
        matchId: userRecords.matchId,
        team: userRecords.team,
        halfRate: min(userRecords.halfRate).as("half_rate"),
        avgRpGain: avg(userRecords.rpGain).as("avg_rp_gain"),
        characters: sql<
          number[]
        >`array_agg(${userRecords.characterId} order by ${userRecords.characterId})`.as(
          "characters",
        ),
      })
      .from(userRecords)
      .where(
        and(
          eq(userRecords.version, version),
          eq(userRecords.mode, 3),
          gte(userRecords.matchingAverageRp, 5000),
        ),
      )
      .groupBy(userRecords.matchId, userRecords.team)
      .having(sql`count(distinct ${userRecords.characterId}) = 3`),
  );
  const step1 = db.$with("step1").as(
    db
      .select({
        characters: step0.characters,
        avgHalfRate: sql<number>`(avg(${step0.halfRate})*count(*)+0.5)/(count(*)+2.0)`
          .mapWith(Number)
          .as("avg_half_rate"),
        avgRpGain: sql<number>`(avg(${step0.avgRpGain})*count(*))/(count(*)+2.0)`
          .mapWith(Number)
          .as("avg_rp_gain"),
        count: count().as("count"),
      })
      .from(step0)
      .groupBy(step0.characters)
      .having(gte(count(), 5)),
  );
  const step2 = db.$with("step2").as(
    db
      .select({
        characters: step1.characters,
        rpGainRank: sql<number>`rank() over (order by ${desc(step1.avgRpGain)})`
          .mapWith(Number)
          .as("rp_gain_rank"),
        rpGainPercentRank: sql<number>`percent_rank() over (order by ${step1.avgRpGain})`.as(
          "rp_gain_percent_rank",
        ),
        avgHalfRate: step1.avgHalfRate,
        avgRpGain: step1.avgRpGain,
        count: step1.count,
      })
      .from(step1),
  );

  const rows = await db
    .with(step0, step1, step2)
    .select({
      characters: step2.characters,
      rpGainRank: step2.rpGainRank,
      score:
        sql<number>`(${step2.rpGainPercentRank}-0.5+${step2.avgHalfRate}-0.5+${step2.avgRpGain}/50.0)/3.0*2.0`
          .mapWith(Number)
          .as("score"),
      avgHalfRate: step2.avgHalfRate,
      avgRpGain: step2.avgRpGain,
      count: step2.count,
    })
    .from(step2);
  return rows.map((row) => ({
    ...row,
    version,
  }));
}

export async function insertTeamCompositions(values: TeamComposition[]) {
  const chunkSize = 1000;
  await db.transaction(async () => {
    await Promise.all(
      chunks(0, values.length, chunkSize)
        .map(([a, b]) => values.slice(a, b))
        .map((values) =>
          db
            .insert(teamCompositions)
            .values(values)
            .onConflictDoUpdate({
              target: [teamCompositions.version, teamCompositions.characters],
              set: {
                score: sql.raw(`excluded.${teamCompositions.score.name}`),
                avgHalfRate: sql.raw(`excluded.${teamCompositions.avgHalfRate.name}`),
                rpGainRank: sql.raw(`excluded.${teamCompositions.rpGainRank.name}`),
                avgRpGain: sql.raw(`excluded.${teamCompositions.avgRpGain.name}`),
                count: sql.raw(`excluded.${teamCompositions.count.name}`),
                updatedAt: sql.raw(`current_timestamp`),
              },
            }),
        )
        .toArray(),
    );
  });
}

export async function selectTeamCompositions(version: string, characters: number[], pageIndex = 0) {
  const limitSize = 10;
  return await db
    .select({
      characters: teamCompositions.characters,
      score: teamCompositions.score,
      rpGainRank: teamCompositions.rpGainRank,
      avgHalfRate: teamCompositions.avgHalfRate,
      avgRpGain: teamCompositions.avgRpGain,
      count: teamCompositions.count,
    })
    .from(teamCompositions)
    .where(
      and(
        eq(teamCompositions.version, version),
        sql`${teamCompositions.characters} @> ${new Param(characters)}`,
      ),
    )
    .orderBy(desc(teamCompositions.avgRpGain))
    .limit(limitSize)
    .offset(limitSize * pageIndex);
}

export async function selectTeamCompositionsUpdatedAt(version: string) {
  return single(
    await db
      .select({
        updatedAt: teamCompositions.updatedAt,
      })
      .from(teamCompositions)
      .where(eq(teamCompositions.version, version))
      .limit(1),
  )?.updatedAt;
}
