import { queryMatch } from "$lib/domains/matches/query-match.server.js";
import { measureTime } from "$lib/utils/time/measureTime";
import { error } from "@sveltejs/kit";

export async function load({ params: { matchId } }) {
  const match = await measureTime("match", () => queryMatch(matchId));
  if (match == null) error(404);
  return {
    match,
  };
}
