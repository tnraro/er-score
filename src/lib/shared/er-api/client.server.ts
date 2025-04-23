import { ApiQueue, ApiQueuePriority } from "$lib/shared/api-queue";
import type { UserGamesErResponse, UserNicknameErResponse } from "./types.gen";

export interface ErApiOptions {
  host: string;
  key: string;
  delay: number;
}

export interface ErApiRequestOptions {
  priority?: ApiQueuePriority;
}

export class ErApiClient {
  #host;
  #key;
  #delay;
  #queue;
  constructor(options: ErApiOptions) {
    this.#host = options.host;
    this.#key = options.key;
    this.#delay = options.delay;
    this.#queue = new ApiQueue(this.#delay);
  }
  get<T extends ErResponse>(path: string | URL, options?: ErApiRequestOptions): Promise<T> {
    return this.#queue.add(async () => {
      const url = new URL(path, this.#host);
      const res = await fetch(url, {
        headers: {
          "x-api-key": this.#key,
        },
      });
      if (!res.ok) throw res;
      const body = await res.json();
      if (!isErResponse(body)) throw body;
      if (body.code >= 400)
        throw new Response(JSON.stringify(body), {
          ...res,
          status: body.code,
          statusText: body.message,
        });
      return body as T;
    }, options?.priority);
  }
  getGames(id: number, options?: ErApiRequestOptions) {
    return this.get<UserGamesErResponse>(`/v1/games/${id}`, options);
  }
  getUserNickname(nickname: string, options?: ErApiRequestOptions) {
    const url = new URL("/v1/user/nickname", this.#host);
    url.searchParams.append("query", nickname);
    return this.get<UserNicknameErResponse>(url, options);
  }
  getUserGames(userNum: number, next?: number, options?: ErApiRequestOptions) {
    const url = new URL(`/v1/user/games/${userNum}`, this.#host);
    if (next != null) url.searchParams.append("next", next.toString());
    return this.get<UserGamesErResponse>(url, options);
  }
}

export interface ErResponse {
  code: number;
  message: string;
}

function isErResponse(x: unknown): x is ErResponse {
  return (
    typeof x === "object" &&
    x != null &&
    typeof (x as ErResponse).code === "number" &&
    typeof (x as ErResponse).message === "string"
  );
}
