import { req, type ErApiOptions } from "./req.server";
import type { UserGamesErResponse, UserNicknameErResponse } from "./types.gen";

export function reqGames(id: number, options: ErApiOptions) {
  return req<UserGamesErResponse>(`/v1/games/${id}`, options);
}

export function reqUserNickname(nickname: string, options: ErApiOptions) {
  const url = new URL("/v1/user/nickname", options.apiHost);
  url.searchParams.append("query", nickname);
  return req<UserNicknameErResponse>(url, options);
}

export function reqUserGames(userNum: number, options: ErApiOptions, next?: number) {
  const url = new URL(`/v1/user/games/${userNum}`, options.apiHost);
  if (next != null) url.searchParams.append("next", next.toString());
  return req<UserGamesErResponse>(url, options);
}
