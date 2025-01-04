import { createQuery } from "../query";

export const statsQuery = createQuery((db) => {
  return {
    async get(userId: number) {
      const stats = await db.stats.select(userId);

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
    },
  };
});

function number<T extends string | null | undefined>(x: T) {
  if (x == null) return x as unknown as T extends string ? never : null | undefined;
  return Number(x);
}
