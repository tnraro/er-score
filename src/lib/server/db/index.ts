import { createDb } from "./client";
import { latestMatchSummariesModel } from "./models/latest-match-summaries";
import { matchesModel } from "./models/matches";
import { statsModel } from "./models/stats";
import { userRecordsModel } from "./models/user-records";
import { usersModel } from "./models/users";

export type Db = ReturnType<typeof useDb>;
export function useDb() {
  const db = createDb();
  return {
    raw: db,
    users: usersModel(db),
    stats: statsModel(db),
    matches: matchesModel(db),
    userRecords: userRecordsModel(db),
    latestMatchSummaries: latestMatchSummariesModel(db),
  };
}
