import { reqGames, reqUserGames } from "../../api/req";
import { userGameToMatch, userGameToMatchUserResult } from "../../db/utils";
import { createQuery } from "../query";

export const latestMatchSummariesQuery = createQuery((db) => {
  return {
    get(userId: number) {
      return db.latestMatchSummaries.select(userId);
    },
    async sync(
      userId: number,
      matches: { id: number; teamSize: number; results: { userId: number }[] }[],
    ) {
      const res = await reqUserGames(userId);
      const matchMap = new Map(matches.map((m) => [m.id, m]));
      const matchUserResultSet = new Set(
        matches.flatMap((m) => m.results.map((r) => `${m.id}:${r.userId}`)),
      );
      const mayNewUsers = [];
      const newMatches = [];
      const newMatchUserResults = [];
      for (const match of res.userGames.map(userGameToMatch)) {
        const mm = matchMap.get(match.id);
        if (mm == null) {
          newMatches.push(match);
          const res = await reqGames(match.id);
          const murs = res.userGames.map(userGameToMatchUserResult);
          mayNewUsers.push(...murs.map((mur) => ({ id: mur.userId, name: mur.username })));
          newMatchUserResults.push(...murs);
        } else if (mm.results.length !== mm.teamSize) {
          const res = await reqGames(match.id);
          const murs = res.userGames.map(userGameToMatchUserResult);

          const xs = murs.filter((ug) => !matchUserResultSet.has(`${ug.matchId}:${ug.userId}`));
          mayNewUsers.push(...xs.map((mur) => ({ id: mur.userId, name: mur.username })));
          newMatchUserResults.push(...xs);
        }
      }
      if (mayNewUsers.length > 0) await db.users.insert(mayNewUsers);
      if (newMatches.length > 0) await db.matches.insert(newMatches);
      if (newMatchUserResults.length > 0) await db.matchUserResults.insert(newMatchUserResults);
      return {
        changed: newMatches.length > 0 || newMatchUserResults.length > 0,
      };
    },
  };
});
