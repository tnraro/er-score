import { measureTime } from "$lib/utils/time";
import { error } from "@sveltejs/kit";

export async function load({ params: { username }, locals: { query, db }, depends }) {
  try {
    depends(`/users/${username}`);
    return await measureTime(`/users/${username}`, async () => {
      const user = await measureTime("user", () => query.user.get(username));
      let matchSummaries = await measureTime("get ", () => query.latestMatchSummaries.get(user.id));
      if (
        matchSummaries.length === 0 ||
        user.updatedAt == null ||
        Date.now() - user.updatedAt.getTime() > 14 * 86400000 /** 14 days */
      ) {
        await measureTime("user sync", () => query.matches.sync(user.id, 10));
        await measureTime("user updated", () => db.users.update(user.id));
      }
      const { changed } = await measureTime("sync", () =>
        query.latestMatchSummaries.sync(user.id, matchSummaries),
      );
      if (changed) {
        matchSummaries = await measureTime("get2", () => query.latestMatchSummaries.get(user.id));
      }
      const stats = await measureTime("stats", () => query.stats.get(user.id));

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
