import { db, type Database } from "$lib/server/db/client";
import { matches, userRecords } from "$lib/server/db/schema";
import { eq, sql } from "drizzle-orm";

const prepared = db
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
    damageDealtToPlayers: userRecords.damageDealtToPlayers,
    damageTakenFromPlayers: userRecords.damageTakenFromPlayers,
    healingAmount: userRecords.healingAmount,
    totalTime: userRecords.totalTime,
    nickname: userRecords.nickname,
    characterId: userRecords.characterId,
    skin: userRecords.skin,
    preMadeTeamSize: userRecords.preMadeTeamSize,
    kills: userRecords.kills,
    deaths: userRecords.deaths,
    assists: userRecords.assists,
    equipments: userRecords.equipments,
  })
  .from(matches)
  .innerJoin(userRecords, eq(matches.id, userRecords.matchId))
  .where(eq(matches.id, sql.placeholder("matchId")))
  .orderBy(userRecords.rank)
  .prepare("select-match");

export async function selectMatch(db: Database, matchId: number) {
  return prepared.execute({ matchId });
}
