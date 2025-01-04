import { calcScore } from "$lib/er-score";
import { omit } from "$lib/utils/object/omit";
import { reqGames } from "../req";
import type { UserGame } from "../types.gen";

export type UserRecord = Awaited<ReturnType<typeof getUserRecords>>[0];
export async function getUserRecords(matchId: number) {
  const res = await reqGames(matchId);

  return res.userGames.map(toUserRecord);
}

export function toUserRecord(game: UserGame) {
  return {
    matchId: game.gameId,
    userId: game.userNum,
    team: game.teamNumber,
    rank: game.gameRank,
    damageToPlayer: game.damageToPlayer,
    score: calcScore(game),
    data: toData(game),
  };
}

function toData(game: UserGame) {
  return {
    ...base(),
    characterId: game.characterNum,
    skin: game.skinCode % 1000,
    k: game.playerKill,
    a: game.playerAssistant,
    d: game.playerDeaths,
  };
  function base() {
    return omit(game, [
      "gameId",
      "userNum",
      "seasonId",
      "matchingMode",
      "matchingTeamMode",
      "teamNumber",
      "gameRank",
      "characterNum",
      "skinCode",
      "playerKill",
      "playerAssistant",
      "playerDeaths",
      "damageToPlayer",
      "versionMajor",
      "versionMinor",
      "serverName",
      "bonusCoin",
      "startDtm",
      "botAdded",
      "botRemain",
      "restrictedAreaAccelerated",
      "totalExtraKill",
      "battleZone1AreaCode",
      "battleZone1BattleMark",
      "battleZone2AreaCode",
      "battleZone2BattleMark",
      "battleZone3AreaCode",
      "battleZone3BattleMark",
      "battleZonePlayerKill",
      "battleZoneDeaths",
      "battleZone1Winner",
      "battleZone2Winner",
      "battleZone3Winner",
      "battleZone1BattleMarkCount",
      "battleZone2BattleMarkCount",
      "battleZone2BattleMarkCount",
      "battleZone2BattleMarkCount",
      "battleZone3BattleMarkCount",
      "teamBattleZoneDown",
      "premadeMatchingType",
      "mainWeather",
      "subWeather",
      "useGuideRobot",
      "guideRobotRadial",
      "guideRobotFlagShip",
      "guideRobotSignature",
    ]);
  }
}
