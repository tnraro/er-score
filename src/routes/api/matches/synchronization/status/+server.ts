import { getMatchesSynchronizationStatus } from "$lib/features/matches/synchronize-matches.server.js";
import { error, json } from "@sveltejs/kit";

export async function GET({ locals }) {
  if (locals.adminSession == null) throw error(401);

  return json(getMatchesSynchronizationStatus());
}
