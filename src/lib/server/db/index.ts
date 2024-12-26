import { createDb } from "./client";
import { latestMatchSummariesModel } from "./models/latest-match-summaries";
import { matchUserResultsModel } from "./models/match-user-results";
import { matchesModel } from "./models/matches";
import { usersModel } from "./models/users";

export type Db = ReturnType<typeof useDb>;
export function useDb() {
  const db = createDb();
  return {
    raw: db,
    users: usersModel(db),
    matches: matchesModel(db),
    matchUserResults: matchUserResultsModel(db),
    latestMatchSummaries: latestMatchSummariesModel(db),
  };
}
