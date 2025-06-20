import { queryUserRecords } from "$lib/features/user-records/query-user-records";
import { numberOrNullable } from "$lib/utils/number/number-or-nullable";

export const ssr = false;

export async function load({ url }) {
  const mode = numberOrNullable(url.searchParams.get("mode")) ?? undefined;
  const usernames = [...new Set(url.searchParams.getAll("u"))];

  return {
    mode,
    results: usernames.map((username) => ({
      username,
      promise: queryUserRecords(username, 0, mode),
    })),
  };
}
