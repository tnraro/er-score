import { calcScore } from "$lib/er-score";
import { reqGames, reqUserGames, reqUserNickname } from "../api/req";
import type { UserGame } from "../api/types.gen";
import {
  insertMatches,
  insertMatchUserResult,
  insertUser,
  selectLatestMatchSummaries,
  selectUserIdByName,
  type Database,
} from "./model";
import { matches, matchUserResults } from "./schema";

export type Db = ReturnType<typeof useDb>;
export function useDb(db: Database) {
  return {
    async getLatestMatchSummaries(userId: number) {
      return await selectLatestMatchSummaries(db, userId);
    },
    async syncMatches(
      userId: number,
      matches: { id: number; teamSize: number; results: { userId: number }[] }[],
    ) {
      const res = await reqUserGames(userId);
      const matchMap = new Map(matches.map((m) => [m.id, m]));
      const matchUserResultSet = new Set(
        matches.flatMap((m) => m.results.map((r) => `${m.id}:${r.userId}`)),
      );
      const mayNewUsers = [];
      const newMatches = [];
      const newMatchUserResults = [];
      for (const match of res.userGames.map(userGameToMatch)) {
        const mm = matchMap.get(match.id);
        if (mm == null) {
          newMatches.push(match);
          const res = await reqGames(match.id);
          const murs = res.userGames.map(userGameToMatchUserResult);
          mayNewUsers.push(...murs.map((mur) => ({ id: mur.userId, name: mur.username })));
          newMatchUserResults.push(...murs);
        } else if (mm.results.length !== mm.teamSize) {
          const res = await reqGames(match.id);
          const murs = res.userGames.map(userGameToMatchUserResult);

          const xs = murs.filter((ug) => !matchUserResultSet.has(`${ug.matchId}:${ug.userId}`));
          mayNewUsers.push(...xs.map((mur) => ({ id: mur.userId, name: mur.username })));
          newMatchUserResults.push(...xs);
        }
      }
      if (mayNewUsers.length > 0) await insertUser(db, mayNewUsers);
      if (newMatches.length > 0) await insertMatches(db, newMatches);
      if (newMatchUserResults.length > 0) await insertMatchUserResult(db, newMatchUserResults);
      return {
        changed: newMatches.length > 0 || newMatchUserResults.length > 0,
      };
    },
    async getUserIdByName(name: string) {
      {
        const userId = await selectUserIdByName(db, name);
        if (userId != null) return userId;
      }
      const res = await reqUserNickname(name);
      const userId = res.user.userNum;
      await insertUser(db, [{ id: userId, name }]);
      return userId;
    },
  };

  function userGameToMatch(game: UserGame): typeof matches.$inferInsert {
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
  function userGameToMatchUserResult(game: UserGame): typeof matchUserResults.$inferInsert {
    return {
      matchId: game.gameId,
      userId: game.userNum,
      username: game.nickname,
      mode: game.matchingMode,

      team: game.teamNumber,
      characterId: game.characterNum,
      skin: game.skinCode % 1000,
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
}
