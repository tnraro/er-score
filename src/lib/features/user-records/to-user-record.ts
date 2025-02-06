import { calcScore } from "$lib/features/score/calc-score";
import type { UserRecord } from "$lib/features/db/schema.server";
import type { UserGame } from "$lib/features/er-api/types.gen";
import { omit } from "$lib/utils/object/omit";

export function toUserRecord(game: UserGame): UserRecord {
  return {
    matchId: game.gameId,
    userId: game.userNum,
    seasonId: game.seasonId,
    mode: game.matchingMode,
    teamSize: game.matchingTeamMode,
    version: `${game.versionMajor}.${game.versionMinor}`,
    serverName: game.serverName,
    startedAt: new Date(game.startDtm),
    size: game.matchSize,

    team: game.teamNumber,
    score: calcScore(game),
    rank: game.gameRank,
    halfRate: calcHalfRate(game),
    nickname: game.nickname,
    hasQuit: game.giveUp > 0,
    preMadeTeamSize: game.preMade,
    routeId: game.routeSlotId > 0 ? game.routeSlotId : null,
    totalTime: game.totalTime,
    playTime: game.playTime,
    teamKills: game.teamKill,
    kills: game.playerKill,
    deaths: game.playerDeaths,
    assists: game.playerAssistant,
    monsterKills: game.monsterKill,
    characterId: game.characterNum,
    characterLevel: game.characterLevel,
    skin: game.skinCode % 1000,
    weaponId: game.bestWeapon,
    weaponLevel: game.bestWeaponLevel,
    damageDealtToPlayers: game.damageToPlayer,
    damageTakenFromPlayers: game.damageFromPlayer,
    damageDealtToMonsters: game.damageToMonster,
    healingAmount: game.healAmount,
    rpGain: game.mmrGainInGame,
    scoredPoints: game.scoredPoint.reduce((a, b) => a + b, 0),
    usedVFCredits: game.sumUsedVFCredits,
    visionScore: game.viewContribution,
    equipments: game.equipment,
    traits: {
      0: game.traitFirstCore,
      1: game.traitFirstSub,
      2: game.traitSecondSub,
    },
    skillOrder: skillOrder(game.skillOrderInfo),
    isWickelineKilled: hasMonster(game.killMonsters, 7),
    isAlphaKilled: hasMonster(game.killMonsters, 8),
    isOmegaKilled: hasMonster(game.killMonsters, 9),
    isGammaKilled: game.killGamma,
    clutchCount: game.clutchCount,

    data: toData(game),
  };
}
function calcHalfRate({
  gameRank,
  matchSize,
  matchingTeamMode,
}: Pick<UserGame, "gameRank" | "matchSize" | "matchingTeamMode">) {
  const teams = matchSize / matchingTeamMode - 1;
  const rank = gameRank - 1;

  return 1 - rank / teams;
}
function skillOrder(raw: { [key: string]: number }) {
  return Array.from(
    Object.entries(raw).reduce((a, [i, v]) => {
      a[Number(i) - 1] = v;
      return a;
    }, [] as number[]),
  );
}
function hasMonster(
  monsters: {
    [key: string]: number;
  },
  monsterId: number,
) {
  return Object.keys(monsters).some((key) => Number(key) % 10 === monsterId);
}

export type UserRecordData = ReturnType<typeof toData>;
function toData(game: UserGame) {
  return omit(game, [
    "battleZone1AreaCode",
    "battleZone1BattleMark",
    "battleZone1BattleMarkCount",
    "battleZone1Winner",
    "battleZone2AreaCode",
    "battleZone2BattleMark",
    "battleZone2BattleMarkCount",
    "battleZone2Winner",
    "battleZone3AreaCode",
    "battleZone3BattleMark",
    "battleZone3BattleMarkCount",
    "battleZone3Winner",
    "battleZoneDeaths",
    "battleZonePlayerKill",
    "bestWeapon",
    "bestWeaponLevel",
    "bonusCoin",
    "botAdded",
    "botRemain",
    "characterLevel",
    "characterNum",
    "clutchCount",
    "damageFromPlayer",
    "damageToMonster",
    "damageToPlayer",
    "equipment",
    "gameId",
    "gameRank",
    "giveUp",
    "guideRobotFlagShip",
    "guideRobotRadial",
    "guideRobotSignature",
    "healAmount",
    "killGamma",
    "mainWeather",
    "matchingMode",
    "matchingTeamMode",
    "mmrGainInGame",
    "monsterKill",
    "nickname",
    "playTime",
    "playerAssistant",
    "playerDeaths",
    "playerKill",
    "preMade",
    "premadeMatchingType",
    "restrictedAreaAccelerated",
    "routeSlotId",
    "seasonId",
    "serverName",
    "skillOrderInfo",
    "skinCode",
    "startDtm",
    "subWeather",
    "sumUsedVFCredits",
    "teamBattleZoneDown",
    "teamKill",
    "teamNumber",
    "totalExtraKill",
    "totalTime",
    "traitFirstCore",
    "traitFirstSub",
    "traitSecondSub",
    "useGuideRobot",
    "userNum",
    "versionMajor",
    "versionMinor",
    "viewContribution",
  ]);
}
