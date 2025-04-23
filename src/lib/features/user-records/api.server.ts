import type { ErApiRequestOptions } from "$lib/shared/er-api/client.server";
import { erApiClient } from "$lib/shared/er-api/runtime/svelte-kit";
import { toUserRecord } from "./to-user-record";

export async function getUserRecordsByUserId(
  userId: number,
  next?: number,
  options?: ErApiRequestOptions,
) {
  const res = await erApiClient.getUserGames(userId, next, options);
  return res.userGames.map(toUserRecord);
}

export async function getUserRecordsByMatchId(matchId: number, options?: ErApiRequestOptions) {
  const res = await erApiClient.getGames(matchId, options);
  return res.userGames.map(toUserRecord);
}

export async function getRecentUserRecords(
  userId: number,
  {
    maxPages,
    afterMatchId,
    beforeMatchId,
  }: { maxPages?: number; afterMatchId?: number; beforeMatchId?: number },
  requestOptions?: ErApiRequestOptions,
) {
  if (afterMatchId != null && beforeMatchId != null && afterMatchId > beforeMatchId) return [];
  const result = [];
  loop: for await (const game of genUserGames(userId, maxPages, afterMatchId, requestOptions)) {
    if (beforeMatchId != null && game.gameId <= beforeMatchId) {
      break loop;
    }
    result.push(toUserRecord(game));
  }
  result.sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime());
  return result;
}

export async function* genUserGames(
  userId: number,
  pages = 1,
  fromMatchId?: number,
  requestOptions?: ErApiRequestOptions,
) {
  let next: number | undefined = fromMatchId;
  for (let i = 0; i < pages; i++) {
    const res = await erApiClient.getUserGames(userId, next, requestOptions);
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
