import { queryUserRecords } from "$lib/features/user-records/query-user-records.js";
import { numberOrNullable } from "$lib/utils/number/number-or-nullable";
import { error } from "@sveltejs/kit";

export async function load({ params: { username }, url, depends }) {
  depends(`users:${username}`);
  try {
    const page = numberOrNullable(url.searchParams.get("page")) ?? 0;
    const mode = numberOrNullable(url.searchParams.get("mode")) ?? undefined;

    return await queryUserRecords(username, page, mode);
  } catch (e) {
    if (e instanceof Response) {
      if (e.status === 404) {
        error(e.status);
      }
      console.error(e);
      error(e.status, await e.text());
    }
    throw e;
  }
}
