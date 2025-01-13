import { eq } from "drizzle-orm";
import { createModel } from "../model";
import { matches, userRecords } from "../schema";

export const matchesModel = createModel((db) => {
  return {
    get(matchId: number) {
      return db
        .select({
          seasonId: matches.seasonId,
          mode: matches.mode,
          teamSize: matches.teamSize,
          version: matches.version,
          serverName: matches.serverName,
          startedAt: matches.startedAt,
          size: matches.size,
          userId: userRecords.userId,
          team: userRecords.team,
          score: userRecords.score,
          rank: userRecords.rank,
          damageToPlayer: userRecords.damageToPlayer,
          data: userRecords.data,
        })
        .from(matches)
        .innerJoin(userRecords, eq(matches.id, userRecords.matchId))
        .where(eq(matches.id, matchId))
        .orderBy(userRecords.rank);
    },
    insert(values: (typeof matches.$inferInsert)[]) {
      return db.insert(matches).values(values).onConflictDoNothing();
    },
  };
});
