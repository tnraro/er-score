import type { matches } from "$lib/server/db/schema";
import { omit } from "$lib/utils/object/omit";
import { selectMatch } from "./select-match.server";

export async function queryMatch(matchId: string | number) {
  const id = Number(matchId);
  const rows = await selectMatch(id);
  if (rows.length === 0) return null;
  const match: Omit<typeof matches.$inferSelect, "id"> = {
    mode: rows[0].mode,
    seasonId: rows[0].seasonId,
    serverName: rows[0].serverName,
    size: rows[0].size,
    startedAt: rows[0].startedAt,
    teamSize: rows[0].teamSize,
    version: rows[0].version,
  };
  return {
    id,
    ...match,
    records: rows.map((x) =>
      omit(x, ["mode", "seasonId", "serverName", "size", "startedAt", "teamSize", "version"]),
    ),
  };
}
