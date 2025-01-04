import { getMatches } from "$lib/server/api/get/matches";
import { getUserRecords } from "$lib/server/api/get/user-records";
import { createQuery } from "../query";

export const latestMatchSummariesQuery = createQuery((db) => {
  return {
    get(userId: number) {
      return db.latestMatchSummaries.select(userId);
    },
    async sync(
      userId: number,
      prevMatches: { id: number; teamSize: number; records: { userId: number }[] }[],
    ) {
      const matches = await getMatches(userId, 2);
      const matchMap = new Map(prevMatches.map((m) => [m.id, m]));
      const userRecordSet = new Set(
        prevMatches.flatMap((m) => m.records.map((r) => `${m.id}:${r.userId}`)),
      );
      const mayNewUsers = [];
      const newMatches = [];
      const newUserRecords = [];
      for (const match of matches) {
        const mm = matchMap.get(match.id);
        if (mm == null) {
          newMatches.push(match);
          const userRecords = await getUserRecords(match.id);
          mayNewUsers.push(...userRecords.map((ur) => ({ id: ur.userId, name: ur.data.nickname })));
          newUserRecords.push(...userRecords);
        } else if (mm.records.length !== mm.teamSize) {
          const userRecords = await getUserRecords(match.id);

          const xs = userRecords.filter((ug) => !userRecordSet.has(`${ug.matchId}:${ug.userId}`));
          mayNewUsers.push(...xs.map((ur) => ({ id: ur.userId, name: ur.data.nickname })));
          newUserRecords.push(...xs);
        }
      }
      if (mayNewUsers.length > 0) await db.users.insert(mayNewUsers);
      if (newMatches.length > 0) await db.matches.insert(newMatches);
      if (newUserRecords.length > 0) await db.userRecords.insert(newUserRecords);
      return {
        changed: newMatches.length > 0 || newUserRecords.length > 0,
      };
    },
  };
});
