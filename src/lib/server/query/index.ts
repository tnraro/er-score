import type { Db } from "../db";
import { latestMatchSummariesQuery } from "./queries/latest-match-summaries-query";
import { matchesQuery } from "./queries/matches-query";
import { statsQuery } from "./queries/stats-query";
import { userQuery } from "./queries/user-id-query";

export type Queries = ReturnType<typeof useQuery>;
export function useQuery(db: Db) {
  return {
    latestMatchSummaries: latestMatchSummariesQuery(db),
    user: userQuery(db),
    stats: statsQuery(db),
    matches: matchesQuery(db),
  };
}
