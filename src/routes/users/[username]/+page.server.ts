import { mutateMatches } from "$lib/domains/matches/mutate-matches.server.js";
import { mutateRecentMatches } from "$lib/domains/recent-matches/mutate-recent-matches.server.js";
import { queryRecentMatches } from "$lib/domains/recent-matches/query-recent-matches.server.js";
import { queryUserStats } from "$lib/domains/user-stats/query-user-stats.server.js";
import { queryUser } from "$lib/domains/user/query-user.server.js";
import { updateUserUpdatedAt } from "$lib/server/db/models/update-user-updated-at";
import { measureTime } from "$lib/utils/time/measureTime";
import { error } from "@sveltejs/kit";

export async function load({ params: { username }, locals: { db }, depends }) {
  try {
    depends(`/users/${username}`);
    return await measureTime(`/users/${username}`, async () => {
      const user = await measureTime("user", () => queryUser(db, username));
      let matchSummaries = await measureTime("get ", () => queryRecentMatches(db, user.id));
      if (
        matchSummaries.length === 0 ||
        user.updatedAt == null ||
        Date.now() - user.updatedAt.getTime() > 14 * 86400000 /** 14 days */
      ) {
        await measureTime("user sync", () => mutateMatches(db, user.id, 10));
        await measureTime("user updated", () => updateUserUpdatedAt(db, user.id));
      }
      const { changed } = await measureTime("sync", () =>
        mutateRecentMatches(db, user.id, matchSummaries),
      );
      if (changed) {
        matchSummaries = await measureTime("get2", () => queryRecentMatches(db, user.id));
      }
      const stats = await measureTime("stats", () => queryUserStats(db, user.id));

      return {
        user,
        stats,
        matches: matchSummaries,
      };
    });
  } catch (e) {
    if (e instanceof Response) {
      if (e.status === 404) {
        error(e.status, "찾을 수 없습니다");
      }
      console.error(e);
      error(e.status, await e.text());
    }
    throw e;
  }
}
