import { error } from "@sveltejs/kit";

export async function load({ params: { username }, locals: { query }, depends }) {
  try {
    depends(`/users/${username}`);
    const now = performance.now();
    const user = await query.user.get(username);
    let matchSummaries = await query.latestMatchSummaries.get(user.id);
    const { changed } = await query.latestMatchSummaries.sync(user.id, matchSummaries);
    if (changed) {
      matchSummaries = await query.latestMatchSummaries.get(user.id);
    }
    const stats = await query.stats.get(user.id);
    console.info(`/users/${username}: ${(performance.now() - now).toPrecision(4)}ms`);

    return {
      user,
      stats,
      matches: matchSummaries,
    };
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
