import { selectLatestMatch } from "$lib/features/matches/select-latest-match";
import { error } from "@sveltejs/kit";

export async function load({ locals }) {
  if (locals.adminSession == null) throw error(401);

  const latestMatch = await selectLatestMatch();

  if (latestMatch == null) throw error(404);

  return {
    currentVersion: latestMatch?.version,
  };
}
