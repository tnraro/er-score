import { getCharacterStats } from "$lib/features/character-stats/get-character-stats.server";
import { synchronizeCharacterStats } from "$lib/features/character-stats/synchronize-character-stats.server";
import { error, json } from "@sveltejs/kit";

export async function GET({ params }) {
  const version = params.version;
  const mode = Number(params.mode);

  const characterStats = await getCharacterStats(version, mode);
  return json(characterStats);
}

export async function POST({ params, locals }) {
  if (locals.adminSession == null) throw error(401);
  const version = params.version;
  const mode = Number(params.mode);

  console.info("synchronize character stats", version, mode);
  await synchronizeCharacterStats(version, mode);

  return json({
    version,
    mode,
    done: true,
  });
}
