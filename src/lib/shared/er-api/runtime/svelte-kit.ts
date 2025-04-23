import { env } from "$env/dynamic/private";
import { ErApiClient } from "$lib/shared/er-api/client.server";

export const erApiClient = new ErApiClient({
  host: env.API_HOST,
  key: env.API_KEY,
  delay: Number(env.API_DELAY),
});
