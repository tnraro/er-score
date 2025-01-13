import { measureTime } from "$lib/utils/time/measureTime";
import { error } from "@sveltejs/kit";

export async function load({ params: { matchId }, locals: { query } }) {
  const match = await measureTime("match", () => query.matches.get(matchId));
  if (match == null) error(404);
  return {
    match,
  };
}
