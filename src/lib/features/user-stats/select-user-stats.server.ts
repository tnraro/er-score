import { numberOrNullable } from "$lib/utils/number/number-or-nullable";
import { and, avg, count, desc, eq, gte, type SQL, sql } from "drizzle-orm";
import { db } from "../db/client.server";
import { userRecords } from "../db/schema.server";

export type UserStats = Awaited<ReturnType<typeof selectUserStats>>;
export async function selectUserStats(userId: number, mode?: number) {
  const rows = await select(userId, mode);

  return rows.map((stat) => {
    return {
      characterId: stat.characterId,
      count: stat.count,
      scoreAvg: numberOrNullable(stat.scoreAvg!),
      scoreSd: numberOrNullable(stat.scoreSd),
      halfRateAvg: numberOrNullable(stat.halfRateAvg!),
      damageDealtToPlayersAvg: numberOrNullable(stat.damageDealtToPlayersAvg!),
    };
  });
}
async function select(userId: number, mode?: number) {
  if (mode == null) {
    return await selectUserStatsPlan.execute({ userId });
  }
  return selectUserStatsWithModePlan.execute({ userId, mode });
}

const selectUserStatsWithModePlan = prepareSelectUserStatsPlan("select_user_stats_with_mode_plan", [
  eq(userRecords.mode, sql.placeholder("mode")),
]);
const selectUserStatsPlan = prepareSelectUserStatsPlan("select_user_stats_plan", []);
function prepareSelectUserStatsPlan(name: string, filters: SQL[]) {
  const tur = db.$with("target_user_records").as(
    db
      .select({
        characterId: userRecords.characterId,
        score: userRecords.score,
        halfRate: userRecords.halfRate,
        damageDealtToPlayers: userRecords.damageDealtToPlayers,
      })
      .from(userRecords)
      .where(
        and(
          eq(userRecords.userId, sql.placeholder("userId")),
          gte(userRecords.startedAt, sql`current_timestamp - interval '14 days'`),
          ...filters,
        ),
      )
      .orderBy(desc(userRecords.startedAt), desc(userRecords.halfRate))
      .limit(100),
  );
  return db
    .with(tur)
    .select({
      characterId: tur.characterId,
      count: count(),
      scoreAvg: avg(tur.score),
      scoreSd: sql<string | null>`stddev(${tur.score})`,
      halfRateAvg: avg(tur.halfRate),
      damageDealtToPlayersAvg: avg(tur.damageDealtToPlayers),
    })
    .from(tur)
    .groupBy(tur.characterId)
    .orderBy(sql`count desc`)
    .prepare(name);
}
