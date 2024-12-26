import { calcScore } from "$lib/er-score";
import type { UserGame } from "../api/types.gen";
import type { matches, matchUserResults } from "./schema";

export function userGameToMatch(game: UserGame): typeof matches.$inferInsert {
  return {
    id: game.gameId,
    seasonId: game.seasonId,
    serverName: game.serverName,
    size: game.matchSize,
    teamSize: game.matchingTeamMode,
    mode: game.matchingMode,
    totalTime: game.totalTime * 1000,
    startedAt: new Date(game.startDtm),
  };
}
export function userGameToMatchUserResult(game: UserGame): typeof matchUserResults.$inferInsert {
  return {
    matchId: game.gameId,
    userId: game.userNum,
    username: game.nickname,
    mode: game.matchingMode,

    team: game.teamNumber,
    characterId: game.characterNum,
    skin: game.skinCode % 1000,
    preMadeTeam: game.preMade,

    rank: game.gameRank,
    score: calcScore(game),
    k: game.playerKill,
    a: game.playerAssistant,
    d: game.playerDeaths,

    playTime: game.playTime,
    characterLevel: game.characterLevel,
    bestWeapon: game.bestWeapon,
    bestWeaponLevel: game.bestWeaponLevel,
    giveUp: !!game.giveUp,

    e0: game.equipment[0],
    e1: game.equipment[1],
    e2: game.equipment[2],
    e3: game.equipment[3],
    e4: game.equipment[4],

    damageToPlayer: game.damageToPlayer,
    damagedByPlayer: game.damageFromPlayer,
    heal: game.healAmount,
    damageToMonster: game.damageToMonster,
    killedMonster: game.monsterKill,

    ccTime: game.ccTimeToPlayer,
    clutchs: game.clutchCount,
    usedSecurityConsoles: game.useSecurityConsole,
    usedEmpDrones: game.useEmpDrone,
    usedCredits: game.totalUseVFCredit,
    terminatedTeams: game.terminateCount,
  };
}
