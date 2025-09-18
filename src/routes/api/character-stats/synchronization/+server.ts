import { synchronizeCharacterStats } from "$lib/features/character-stats/synchronize-character-stats.server";
import { selectLatestMatch } from "$lib/features/matches/select-latest-match";
import { MatchingMode } from "$lib/shared/er-api/shapes";
import { parallel } from "$lib/shared/task/parallel";
import { error, json } from "@sveltejs/kit";

export async function POST({ locals, url }) {
  if (locals.adminSession == null) throw error(401);
  const modes = [MatchingMode.Rank, MatchingMode.Cobalt];

  const version = await getVersion();

  console.info("synchronize character stats", version, modes);
  const [_, errors] = await parallel(
    modes.map(async (mode) => {
      await synchronizeCharacterStats(version, mode);
    }),
  );
  if (errors.length > 0) console.error(errors);
  return json({
    version,
    modes,
    done: true,
  });

  async function getVersion() {
    const version = url.searchParams.get("version");
    if (version != null) return version;
    const match = await selectLatestMatch();
    if (match == null) throw error(404);

    return match.version;
  }
}
