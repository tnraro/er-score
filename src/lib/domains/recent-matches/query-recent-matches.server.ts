import type { Database } from "$lib/server/db/client";
import { selectRecentMatches } from "./select-recent-matches.server";

export async function queryRecentMatches(db: Database, userId: number) {
  return selectRecentMatches(db, userId, 6);
}
