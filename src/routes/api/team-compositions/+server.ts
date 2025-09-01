import { selectTeamCompositionForSummary } from "$lib/features/team-compositions/db.server.js";
import { error, json } from "@sveltejs/kit";

export async function GET({ url }) {
  const version = url.searchParams.get("version");
  if (version == null) error(400, { message: "Bad Request" });
  const characters = url.searchParams.getAll("character").map(Number).filter(Number.isInteger);
  if (characters.length !== 3) error(400, { message: "Bad Request" });
  const result = await selectTeamCompositionForSummary(version, characters);
  return json(result);
}
