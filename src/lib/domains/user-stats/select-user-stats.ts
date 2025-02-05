import { avg, count, desc, eq, gte, sql } from "drizzle-orm";
import { db } from "../../server/db/client";
import { matches, userRecords } from "../../server/db/schema";

export type UserStats = Awaited<ReturnType<typeof selectUserStats>>;
const plan = prepareSelectUserStats();
export async function selectUserStats(userId: number) {
  const rows = await plan.execute({ userId });

  return rows.map((stat) => {
    return {
      mode: stat.mode!,
      count: stat.count,
      scoreAvg: number(stat.scoreAvg!),
      scoreSd: number(stat.scoreSd),
      rankAvg: number(stat.rankAvg!),
      damageDealtToPlayersAvg: number(stat.damageDealtToPlayersAvg!),
      mostPlayedCharacterId: stat.mostPlayedCharacterId,
    };
  });
}
function number<T extends string | null | undefined>(x: T) {
  if (x == null) return x as unknown as T extends string ? never : null | undefined;
  return Number(x);
}

function prepareSelectUserStats() {
  const tur = db.$with("target_user_records").as(
    db
      .select({
        matchId: userRecords.matchId,
        score: userRecords.score,
        rank: userRecords.rank,
        damageDealtToPlayers: userRecords.damageDealtToPlayers,
        characterId: userRecords.characterId,
      })
      .from(userRecords)
      .where(eq(userRecords.userId, sql.placeholder("userId")))
      .orderBy(desc(userRecords.matchId))
      .limit(100),
  );
  const tr = db.$with("target_records").as(
    db
      .with(tur)
      .select({
        mode: matches.mode,
        score: tur.score,
        rank: tur.rank,
        damageDealtToPlayers: tur.damageDealtToPlayers,
        characterId: tur.characterId,
      })
      .from(tur)
      .leftJoin(matches, eq(tur.matchId, matches.id))
      .where(gte(matches.startedAt, sql`current_timestamp - interval '14 days'`)),
  );
  return db
    .with(tr)
    .select({
      mode: tr.mode,
      count: count(tr.mode),
      scoreAvg: avg(tr.score),
      scoreSd: sql<string | null>`stddev(${tr.score})`,
      rankAvg: avg(tr.rank),
      damageDealtToPlayersAvg: avg(tr.damageDealtToPlayers),
      mostPlayedCharacterId: sql<number>`mode() within group(order by ${tr.characterId})`,
    })
    .from(tr)
    .groupBy(tr.mode)
    .prepare("select_user_stats_plan");
}
