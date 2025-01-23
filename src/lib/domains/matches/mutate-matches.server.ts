import { getUserGames, toMatch } from "$lib/domains/api/matches";
import { toUserRecord } from "$lib/domains/api/user-records";
import type { Database } from "$lib/server/db/client";
import { insertMatches } from "$lib/server/db/models/insert-matches";
import { insertUserRecords } from "$lib/server/db/models/insert-user-records";

export async function mutateMatches(db: Database, userId: number, pages = 1) {
  const userGames = await getUserGames(userId, pages);
  const matches = userGames.map(toMatch);
  const userRecords = userGames.map(toUserRecord);

  await insertMatches(db, matches);
  await insertUserRecords(db, userRecords);
}
