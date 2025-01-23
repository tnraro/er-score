import { queryMatch } from "$lib/domains/matches/query-match.js";
import { measureTime } from "$lib/utils/time/measureTime";
import { error } from "@sveltejs/kit";

export async function load({ params: { matchId }, locals: { db } }) {
  const match = await measureTime("match", () => queryMatch(db, matchId));
  if (match == null) error(404);
  return {
    match,
  };
}
