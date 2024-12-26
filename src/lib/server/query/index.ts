import type { Db } from "../db";
import { latestMatchSummariesQuery } from "./queries/latest-match-summaries-query";
import { userIdQuery } from "./queries/user-id-query";

export type Queries = ReturnType<typeof useQuery>;
export function useQuery(db: Db) {
  return {
    latestMatchSummaries: latestMatchSummariesQuery(db),
    userId: userIdQuery(db),
  };
}
