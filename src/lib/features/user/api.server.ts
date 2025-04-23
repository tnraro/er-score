import type { ErApiRequestOptions } from "$lib/shared/er-api/client.server";
import { erApiClient } from "$lib/shared/er-api/runtime/svelte-kit";

export async function getUser(name: string, options?: ErApiRequestOptions) {
  const res = await erApiClient.getUserNickname(name, options);

  return {
    id: res.user.userNum,
    name: res.user.nickname,
  };
}
