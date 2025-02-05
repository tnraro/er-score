import { getMatches } from "$lib/domains/api/matches";
import { getUserRecords } from "$lib/domains/api/user-records";
import { db } from "$lib/server/db/client";
import { insertMatches } from "$lib/server/db/models/insert-matches";
import { insertUserRecords } from "$lib/server/db/models/insert-user-records";
import { insertUsers } from "$lib/server/db/models/insert-users";

export async function mutateRecentMatches(
  userId: number,
  prevMatches: { id: number; teamSize: number; records: { userId: number }[] }[],
) {
  const { mayNewUsers, newMatches, newUserRecords } = await fetchThings();
  await db.transaction(async (tx) => {
    if (mayNewUsers.length > 0) await insertUsers(tx, mayNewUsers);
    if (newMatches.length > 0) await insertMatches(tx, newMatches);
    if (newUserRecords.length > 0) await insertUserRecords(tx, newUserRecords);
  });
  return {
    changed: newMatches.length > 0 || newUserRecords.length > 0,
  };

  async function fetchThings() {
    const matches = (await getMatches(userId)).slice(0, 6);
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
        mayNewUsers.push(...userRecords.map((ur) => ({ id: ur.userId, name: ur.nickname })));
        newUserRecords.push(...userRecords);
      } else if (mm.records.length !== mm.teamSize) {
        const userRecords = await getUserRecords(match.id);

        const xs = userRecords.filter((ug) => !userRecordSet.has(`${ug.matchId}:${ug.userId}`));
        mayNewUsers.push(...xs.map((ur) => ({ id: ur.userId, name: ur.nickname })));
        newUserRecords.push(...xs);
      }
    }
    return {
      mayNewUsers,
      newMatches,
      newUserRecords,
    };
  }
}
