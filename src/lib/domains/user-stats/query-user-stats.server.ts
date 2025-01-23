import type { Database } from "$lib/server/db/client";
import { selectUserStats } from "./select-user-stats";

export async function queryUserStats(db: Database, userId: number) {
  const stats = await selectUserStats(db, userId);

  return stats.map((stat) => {
    return {
      mode: stat.mode!,
      count: stat.count,
      scoreAvg: number(stat.scoreAvg!),
      scoreSd: number(stat.scoreSd),
      rankAvg: number(stat.rankAvg!),
      damageToPlayerAvg: number(stat.damageToPlayerAvg!),
      mostPlayedCharacterId: stat.mostPlayedCharacterId,
    };
  });
}

function number<T extends string | null | undefined>(x: T) {
  if (x == null) return x as unknown as T extends string ? never : null | undefined;
  return Number(x);
}
