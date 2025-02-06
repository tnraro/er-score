import { getRecentUserRecords } from "./api.server";
import { insertUserRecords } from "./db.server";

export async function updateUserRecords(userId: number, updatedMatchId?: number) {
  const recentUserRecords = await getRecentUserRecords(userId, {
    maxPages: 10,
    beforeMatchId: updatedMatchId,
  });
  await insertUserRecords(recentUserRecords);
  return recentUserRecords;
}
