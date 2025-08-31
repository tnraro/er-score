import { selectLatestMatch } from "$lib/features/matches/select-latest-match.js";
import {
  selectTeamCompositions,
  selectTeamCompositionsUpdatedAt,
} from "$lib/features/team-compositions/db.server.js";
import { error } from "@sveltejs/kit";

export async function load({ url }) {
  const version = url.searchParams.get("version") ?? (await selectLatestMatch())?.version;
  const characters = url.searchParams.getAll("character").map(Number);
  const pageIndex = Number(url.searchParams.get("page") ?? 1) - 1;

  if (version == null) error(404);

  const [teamCompositions, updatedAt] = await Promise.all([
    selectTeamCompositions(version, characters, pageIndex),
    selectTeamCompositionsUpdatedAt(version),
  ]);

  return {
    version,
    characters,
    teamCompositions,
    maxPages: 1,
    updatedAt,
  };
}
