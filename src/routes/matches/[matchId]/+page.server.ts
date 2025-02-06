import { getUserRecordsByMatchId } from "$lib/features/user-records/api.server.js";
import { toMatch } from "$lib/features/user-records/to-match.js";
import { db } from "$lib/features/db/client.server";
import { userRecords } from "$lib/features/db/schema.server";
import { error } from "@sveltejs/kit";
import { eq, sql } from "drizzle-orm";

export async function load({ params: { matchId } }) {
  const match = await queryMatch(Number(matchId));
  if (match == null) error(404);
  return {
    match,
  };
}

async function queryMatch(matchId: number) {
  const match = await selectMatch(matchId);
  if (match != null && match.size === match.records.length) return match;
  const ids = new Set(match?.records.map((record) => record.userId));

  const records = await getUserRecordsByMatchId(matchId);
  await db.insert(userRecords).values(records.filter((record) => !ids.has(record.userId)));
  return toMatch(records);
}

async function selectMatch(matchId: number) {
  const rows = await selectMatchPlan.execute({ matchId });
  return toMatch(rows);
}

const selectMatchPlan = db
  .select({
    matchId: userRecords.matchId,
    seasonId: userRecords.seasonId,
    mode: userRecords.mode,
    teamSize: userRecords.teamSize,
    version: userRecords.version,
    serverName: userRecords.serverName,
    startedAt: userRecords.startedAt,
    size: userRecords.size,
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
  .from(userRecords)
  .where(eq(userRecords.matchId, sql.placeholder("matchId")))
  .orderBy(userRecords.rank)
  .prepare("select_match_plan");
