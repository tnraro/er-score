import { reqUserGames } from "$lib/server/api/req";
import type { UserGame } from "$lib/server/api/types.gen";
import type { matches } from "$lib/server/db/schema";

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

export async function* genUserGames(userId: number, pages = 1) {
  let next: number | undefined = undefined;
  for (let i = 0; i < pages; i++) {
    const res = await reqUserGames(userId, next);
    yield res.userGames.sort(
      (a, b) => new Date(b.startDtm).getTime() - new Date(a.startDtm).getTime(),
    );
    next = res.next;
    if (res.next == null) break;
  }
}

export async function getRecentUserGames(
  userId: number,
  until?: { matchId?: number | null; pages?: number },
) {
  const untilMatchId = until?.matchId;
  const untilPages = until?.pages ?? 1;

  const result = [];
  loop: for await (const chunk of genUserGames(userId, untilPages)) {
    for (const game of chunk) {
      if (untilMatchId != null && game.gameId <= untilMatchId) {
        break loop;
      }
      result.push(game);
    }
  }
  result.sort((a, b) => new Date(b.startDtm).getTime() - new Date(a.startDtm).getTime());
  return result;
}

export function toMatch(game: UserGame): typeof matches.$inferSelect {
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
