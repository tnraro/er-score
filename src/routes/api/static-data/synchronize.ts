import { synchronizeRawStaticData } from "$lib/features/raw-static-data/synchronize.server";
import { synchronizeStaticData } from "$lib/features/static-data/synchronize.server";
import { ExclusiveLock } from "$lib/shared/lock/exclusive-lock";

export function getSynchronizationStatus() {
  return { isSynchronizing: lock.locked };
}

const lock = new ExclusiveLock();
export const synchronize = ExclusiveLock.withAsync(
  async () => {
    await synchronizeRawStaticData();
    await synchronizeStaticData();
  },
  { lock },
);
