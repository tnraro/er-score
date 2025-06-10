import { getCharacterStats } from "$lib/features/character-stats/get-character-stats.server.js";
import { selectLatestMatch } from "$lib/features/matches/select-latest-match.js";
import { MatchingMode } from "$lib/shared/er-api/shapes.js";
import { numberOrNullable } from "$lib/utils/number/number-or-nullable";
import { error } from "@sveltejs/kit";

export async function load({ url }) {
  const mode = numberOrNullable(url.searchParams.get("mode")) ?? MatchingMode.Rank;
  const version = url.searchParams.get("version") ?? (await selectLatestMatch())?.version;

  if (version == null) error(404);

  const result = await getCharacterStats(version, mode);

  if (result == null) error(404);

  return result;
}
