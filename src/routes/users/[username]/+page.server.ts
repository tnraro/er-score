import { error } from "@sveltejs/kit";

export async function load({ params: { username }, locals: { db } }) {
  try {
    const userId = await db.getUserIdByName(username);
    const matchIds = await db.getMatchIdsByUserId(userId);

    const matches = [];
    for (const matchId of matchIds) {
      const match = await db.getMatch(matchId);
      await db.syncMatchUserResults(match.id, match.size);
      const results = await db.getMatchUserResultSummaries(match, userId);

      matches.push({
        ...match,
        results,
      });
    }

    return {
      username,
      matches,
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
