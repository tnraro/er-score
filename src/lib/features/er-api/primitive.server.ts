import { env } from "$env/dynamic/private";
import { req } from "./req.server";
import type { UserGamesErResponse, UserNicknameErResponse } from "./types.gen";

export function reqGames(id: number) {
  return req<UserGamesErResponse>(`/v1/games/${id}`);
}

export function reqUserNickname(nickname: string) {
  const url = new URL("/v1/user/nickname", env.API_HOST);
  url.searchParams.append("query", nickname);
  return req<UserNicknameErResponse>(url);
}

export function reqUserGames(userNum: number, next?: number) {
  const url = new URL(`/v1/user/games/${userNum}`, env.API_HOST);
  if (next != null) url.searchParams.append("next", next.toString());
  return req<UserGamesErResponse>(url);
}
