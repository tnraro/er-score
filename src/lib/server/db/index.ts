import { calcScore } from "$lib/er-score";
import { and, desc, eq } from "drizzle-orm";
import { reqGames, reqUserGames, reqUserNickname } from "../api/req";
import type { UserGame } from "../api/types.gen";
import {
  insertMatch,
  insertMatchUserResult,
  insertUser,
  selectMatch,
  selectUserIdByName,
  type Database,
} from "./model";
import { matches, matchUserResults } from "./schema";

export type Db = ReturnType<typeof useDb>;
export function useDb(db: Database) {
  return {
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
    async getMatchIdsByUserId(userId: number) {
      const res = await reqUserGames(userId);
      return res.userGames.map((game) => game.gameId);
    },
    async getMatch(matchId: number) {
      const match = await selectMatch(db, matchId);
      if (match != null) return match;
      const res = await reqGames(matchId);
      const result = userGameToMatch(res.userGames[0]);
      await insertMatch(db, result);
      return result as NonNullable<typeof match>;
    },
    async syncMatchUserResults(matchId: number, matchSize: number) {
      const x = await db
        .select({ userId: matchUserResults.userId })
        .from(matchUserResults)
        .where(eq(matchUserResults.matchId, matchId));
      if (x.length === matchSize) return;
      const res = await reqGames(matchId);
      await insertUser(
        db,
        res.userGames.map((x) => ({ id: x.userNum, name: x.nickname })),
      );
      await insertMatchUserResult(db, res.userGames.map(userGameToMatchUserResult));
    },
    async getMatchUserResultSummaries(match: { id: number; size: number }, userId: number) {
      const myTeam = await getMyTeam(userId);
      if (myTeam == null) throw new Response("", { status: 404 });
      const results = await db
        .select({
          matchId: matchUserResults.matchId,
          userId: matchUserResults.userId,
          rank: matchUserResults.rank,
          username: matchUserResults.username,
          mode: matchUserResults.mode,
          team: matchUserResults.team,
          characterId: matchUserResults.characterId,
          skin: matchUserResults.skin,
          score: matchUserResults.score,
          k: matchUserResults.k,
          a: matchUserResults.a,
          d: matchUserResults.d,
          giveUp: matchUserResults.giveUp,
        })
        .from(matchUserResults)
        .where(and(eq(matchUserResults.matchId, match.id), eq(matchUserResults.team, myTeam)))
        .orderBy(desc(matchUserResults.score));
      return results;

      async function getMyTeam(userId: number) {
        const result = await db
          .select({ myTeam: matchUserResults.team })
          .from(matchUserResults)
          .where(and(eq(matchUserResults.matchId, match.id), eq(matchUserResults.userId, userId)))
          .limit(1);
        return result.at(0)?.myTeam;
      }
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
