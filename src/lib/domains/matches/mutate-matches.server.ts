import { getRecentUserGames, toMatch } from "$lib/domains/api/matches";
import { toUserRecord } from "$lib/domains/api/user-records";
import { db } from "$lib/server/db/client";
import { insertMatches } from "$lib/server/db/models/insert-matches";
import { insertUserRecords } from "$lib/server/db/models/insert-user-records";

export async function mutateMatches(
  userId: number,
  until?: { matchId?: number | null; pages?: number },
) {
  const userGames = await getRecentUserGames(userId, until);

  const matches = userGames.map(toMatch);
  const userRecords = userGames.map(toUserRecord);

  await db.transaction(async (tx) => {
    await insertMatches(tx, matches);
    await insertUserRecords(tx, userRecords);
  });

  return matches.at(0)?.id ?? until?.matchId;
}
