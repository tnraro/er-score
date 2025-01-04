import { and, avg, between, count, desc, eq, sql } from "drizzle-orm";
import { createModel } from "../model";
import { matches, userRecords } from "../schema";

export const statsModel = createModel((db) => {
  return {
    select(userId: number) {
      const r = db.$with("records").as(
        db
          .select({
            mode: matches.mode,
            score: userRecords.score,
            rank: userRecords.rank,
            damageToPlayer: userRecords.damageToPlayer,
            characterId: sql`${userRecords.data}->'characterId'`.as("character_id"),
          })
          .from(userRecords)
          .leftJoin(matches, eq(userRecords.matchId, matches.id))
          .where(
            and(
              eq(userRecords.userId, userId),
              between(
                matches.startedAt,
                sql`current_timestamp - interval '14 days'`,
                sql`current_timestamp`,
              ),
            ),
          )
          .orderBy(desc(matches.startedAt))
          .limit(100),
      );
      return db
        .with(r)
        .select({
          mode: r.mode,
          count: count(r.mode),
          scoreAvg: avg(r.score),
          scoreSd: sql<string | null>`stddev(${r.score})`,
          rankAvg: avg(r.rank),
          rankSd: sql<string | null>`stddev(${r.rank})`,
          damageToPlayerAvg: avg(r.damageToPlayer),
          damageToPlayerSd: sql<string | null>`stddev(${r.damageToPlayer})`,
          mostPlayedCharacterId: sql<number>`mode() within group(order by ${r.characterId})`,
        })
        .from(r)
        .groupBy(r.mode);
    },
  };
});
