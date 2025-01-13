import { getUserGames, toMatch } from "$lib/server/api/get/matches";
import { toUserRecord } from "$lib/server/api/get/user-records";
import type { matches } from "$lib/server/db/schema";
import { omit } from "$lib/utils/object/omit";
import { measureTime } from "$lib/utils/time/measureTime";
import { createQuery } from "../query";

export const matchesQuery = createQuery((db) => {
  return {
    async get(matchId: string | number) {
      const id = Number(matchId);
      const res = await measureTime("get", () => db.matches.get(id));
      if (res.length === 0) return null;
      const match: Omit<typeof matches.$inferSelect, "id"> = {
        mode: res[0].mode,
        seasonId: res[0].seasonId,
        serverName: res[0].serverName,
        size: res[0].size,
        startedAt: res[0].startedAt,
        teamSize: res[0].teamSize,
        version: res[0].version,
      };
      return {
        id,
        ...match,
        records: res.map((x) =>
          omit(x, ["mode", "seasonId", "serverName", "size", "startedAt", "teamSize", "version"]),
        ),
      };
    },
    async sync(userId: number, pages = 1) {
      const userGames = await getUserGames(userId, pages);
      const matches = userGames.map(toMatch);
      const userRecords = userGames.map(toUserRecord);

      await db.matches.insert(matches);
      await db.userRecords.insert(userRecords);
    },
  };
});
