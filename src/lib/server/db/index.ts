import { env } from "$env/dynamic/private";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { latestMatchSummariesModel } from "./models/latest-match-summaries";
import { matchesModel } from "./models/matches";
import { statsModel } from "./models/stats";
import { userRecordsModel } from "./models/user-records";
import { usersModel } from "./models/users";

export type Db = Awaited<ReturnType<typeof useDb>>;
export async function useDb() {
  const client = new pg.Client(env.DATABASE_URL);
  await client.connect();
  const db = drizzle(client);
  return {
    raw: db,
    users: usersModel(db),
    stats: statsModel(db),
    matches: matchesModel(db),
    userRecords: userRecordsModel(db),
    latestMatchSummaries: latestMatchSummariesModel(db),
    client,
  };
}
