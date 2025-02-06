import { reqGames, reqUserGames } from "$lib/features/er-api/primitive.server";
import { toUserRecord } from "./to-user-record";

export async function getUserRecordsByUserId(userId: number, next?: number) {
  const res = await reqUserGames(userId, next);
  return res.userGames.map(toUserRecord);
}

export async function getUserRecordsByMatchId(matchId: number) {
  const res = await reqGames(matchId);
  return res.userGames.map(toUserRecord);
}

export async function getRecentUserRecords(
  userId: number,
  options?: { maxPages?: number; afterMatchId?: number; beforeMatchId?: number },
) {
  if (
    options?.afterMatchId != null &&
    options?.beforeMatchId != null &&
    options?.afterMatchId > options?.beforeMatchId
  )
    return [];
  const result = [];
  loop: for await (const game of genUserGames(userId, {
    pages: options?.maxPages,
    afterMatchId: options?.afterMatchId,
  })) {
    if (options?.beforeMatchId != null && game.gameId <= options?.beforeMatchId) {
      break loop;
    }
    result.push(toUserRecord(game));
  }
  result.sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime());
  return result;
}

export async function* genUserGames(
  userId: number,
  options?: { pages?: number; afterMatchId?: number },
) {
  const pages = options?.pages ?? 1;
  const fromMatchId = options?.afterMatchId ?? undefined;
  let next: number | undefined = fromMatchId;
  for (let i = 0; i < pages; i++) {
    const res = await reqUserGames(userId, next);
    const userGames = res.userGames.sort(
      (a, b) => new Date(b.startDtm).getTime() - new Date(a.startDtm).getTime(),
    );
    for (const game of userGames) {
      yield game;
    }
    next = res.next;
    if (res.next == null) break;
  }
}
