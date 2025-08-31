import { ExclusiveLock } from "$lib/shared/lock/exclusive-lock";
import { measureFnTime } from "$lib/utils/time/measure-time";
import { selectLatestMatch } from "../matches/select-latest-match";
import { analyzeTeamCompositions, insertTeamCompositions } from "./db.server";

export function getTeamCompositionsSynchronizationStatus() {
  return { isSynchronizing: lock.locked };
}

const lock = new ExclusiveLock();
export const synchronizeTeamCompositions = ExclusiveLock.withAsync(
  async (options: { version?: string }) => {
    console.info("Synchronizing team compositions...");
    const version = options?.version ?? (await selectLatestMatch())?.version;
    if (version == null) throw "";
    console.info(`version:`, version);
    const data = await measureFnTime(analyzeTeamCompositions, version);
    await measureFnTime(insertTeamCompositions, data);

    console.info("Team compositions synchronized successfully.");
  },
  { lock },
);
