import { mutateMatches } from "$lib/domains/matches/mutate-matches.server";
import { mutateRecentMatches } from "$lib/domains/recent-matches/mutate-recent-matches.server";
import { selectRecentMatches } from "$lib/domains/recent-matches/select-recent-matches.server.js";
import { selectUserStats } from "$lib/domains/user-stats/select-user-stats.js";
import { updateUserUpdatedAt } from "$lib/server/db/models/update-user-updated-at";

export async function load({ params: { username }, depends, parent }) {
  depends(`/users/${username}`);
  const { user } = await parent();
  const staleStatsPromise = selectUserStats(user.id);
  const staleMatchesPromise = selectRecentMatches(user.id);

  const freshPromise = update();

  return {
    staleStatsPromise,
    staleMatchesPromise,
    freshPromise,
  };
  async function update() {
    console.log(1);
    if (user.updatedAt != null && Date.now() - user.updatedAt.getTime() <= 1000 /** 1 second */)
      return Promise.resolve(null);

    console.log(2);
    const updatedMatchId = await mutateMatches(user.id, {
      matchId: user.updatedMatchId,
      pages: 10,
    });
    const hasNewMatches = updatedMatchId != null && updatedMatchId != user.updatedMatchId;
    console.log(3, updatedMatchId, hasNewMatches);
    if (!hasNewMatches) return Promise.resolve(null);
    await updateUserUpdatedAt(user.id, updatedMatchId);
    console.log(4);
    const staleMatches = await staleMatchesPromise;
    const { changed } = await mutateRecentMatches(user.id, staleMatches);
    console.log(5, changed);
    if (!changed) return Promise.resolve(null);
    const [stats, matches] = await Promise.allSettled([
      selectUserStats(user.id),
      selectRecentMatches(user.id),
    ]);
    return {
      stats,
      matches,
    };
  }
}
