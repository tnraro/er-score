import { getUserGames, toMatch } from "$lib/server/api/get/matches";
import { toUserRecord } from "$lib/server/api/get/user-records";
import { createQuery } from "../query";

export const matchesQuery = createQuery((db) => {
  return {
    async sync(userId: number, pages = 1) {
      const userGames = await getUserGames(userId, pages);
      const matches = userGames.map(toMatch);
      const userRecords = userGames.map(toUserRecord);

      await db.matches.insert(matches);
      await db.userRecords.insert(userRecords);
    },
  };
});
