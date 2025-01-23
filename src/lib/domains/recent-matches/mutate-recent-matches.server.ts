import { getMatches } from "$lib/domains/api/matches";
import { getUserRecords } from "$lib/domains/api/user-records";
import type { Database } from "$lib/server/db/client";
import { insertMatches } from "$lib/server/db/models/insert-matches";
import { insertUserRecords } from "$lib/server/db/models/insert-user-records";
import { insertUsers } from "$lib/server/db/models/insert-users";

export async function mutateRecentMatches(
  db: Database,
  userId: number,
  prevMatches: { id: number; teamSize: number; records: { userId: number }[] }[],
) {
  const matches = await getMatches(userId);
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
  if (mayNewUsers.length > 0) await insertUsers(db, mayNewUsers);
  if (newMatches.length > 0) await insertMatches(db, newMatches);
  if (newUserRecords.length > 0) await insertUserRecords(db, newUserRecords);
  return {
    changed: newMatches.length > 0 || newUserRecords.length > 0,
  };
}
