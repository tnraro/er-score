import type { ErApiRequestOptions } from "$lib/shared/er-api/client.server";
import { erApiClient } from "$lib/shared/er-api/runtime/svelte-kit";

export async function getStaticData<Data>(key: string, options?: ErApiRequestOptions) {
  const res = await erApiClient.getData(key, options);
  return res.data as Data;
}

export async function getStaticDataHash(options?: ErApiRequestOptions) {
  return await getStaticData<Record<string, number>>("hash", options);
}
