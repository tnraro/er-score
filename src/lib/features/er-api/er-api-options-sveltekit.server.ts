import { env } from "$env/dynamic/private";
import type { ErApiOptions } from "./req.server";

export const erApiOptionsSvelteKit: ErApiOptions = {
  apiHost: env.API_HOST,
  apiKey: env.API_KEY,
};
