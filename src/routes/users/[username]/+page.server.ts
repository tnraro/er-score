import { error } from "@sveltejs/kit";

export async function load({ params: { username }, locals: { db } }) {
  try {
    const now = performance.now();
    const userId = await db.getUserIdByName(username);
    let matchSummaries = await db.getLatestMatchSummaries(userId);
    const { changed } = await db.syncMatches(userId, matchSummaries);
    if (changed) {
      matchSummaries = await db.getLatestMatchSummaries(userId);
    }
    console.info(`/users/${username}: ${(performance.now() - now).toPrecision(4)}ms`);

    return {
      username,
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
