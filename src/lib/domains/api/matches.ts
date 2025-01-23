import { reqUserGames } from "$lib/server/api/req";
import type { UserGame } from "$lib/server/api/types.gen";

export async function getMatches(userId: number, pages = 1) {
  const userGames = await getUserGames(userId, pages);
  return userGames.map(toMatch);
}

export async function getUserGames(userId: number, pages = 1) {
  let next: number | undefined = undefined;
  const result = [];
  for (let i = 0; i < pages; i++) {
    const res = await reqUserGames(userId, next);
    result.push(...res.userGames);
    next = res.next;
    if (res.next == null) break;
  }
  result.sort((a, b) => new Date(b.startDtm).getTime() - new Date(a.startDtm).getTime());
  return result;
}

export function toMatch(game: UserGame) {
  return {
    id: game.gameId,
    seasonId: game.seasonId,
    mode: game.matchingMode,
    teamSize: game.matchingTeamMode,
    version: `${game.versionMajor}.${game.versionMinor}`,
    serverName: game.serverName,
    startedAt: new Date(game.startDtm),
    size: game.matchSize,
  };
}
