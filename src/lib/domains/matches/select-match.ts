import { eq } from "drizzle-orm";
import type { Database } from "$lib/server/db/client";
import { matches, userRecords } from "$lib/server/db/schema";

export async function selectMatch(db: Database, matchId: number) {
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
}
