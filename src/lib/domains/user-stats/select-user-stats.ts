import { avg, count, desc, eq, gte, sql } from "drizzle-orm";
import type { Database } from "../../server/db/client";
import { matches, userRecords } from "../../server/db/schema";

export async function selectUserStats(db: Database, userId: number) {
  const tur = db.$with("target_user_records").as(
    db
      .select({
        matchId: userRecords.matchId,
        score: userRecords.score,
        rank: userRecords.rank,
        damageToPlayer: userRecords.damageToPlayer,
        characterId: userRecords.characterId,
      })
      .from(userRecords)
      .where(eq(userRecords.userId, userId))
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
        damageToPlayer: tur.damageToPlayer,
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
      damageToPlayerAvg: avg(tr.damageToPlayer),
      mostPlayedCharacterId: sql<number>`mode() within group(order by ${tr.characterId})`,
    })
    .from(tr)
    .groupBy(tr.mode);
}
