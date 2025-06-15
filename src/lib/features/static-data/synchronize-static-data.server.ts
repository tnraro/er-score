import { ApiQueuePriority } from "$lib/shared/api-queue";
import { ExclusiveLock } from "$lib/shared/lock/exclusive-lock";
import { parallel } from "$lib/shared/task/parallel";
import { diff } from "$lib/utils/object/diff";
import { error } from "@sveltejs/kit";
import { getStaticData, getStaticDataHash } from "./api.server";
import { deleteStaticData, insertStaticData, selectStaticData } from "./db.server";

export function getStaticDataSynchronizationStatus() {
  return { isSynchronizing: lock.locked };
}

const lock = new ExclusiveLock();
export const synchronizeStaticData = ExclusiveLock.withAsync(
  async () => {
    console.info("Synchronizing static data...");
    const oldHashes = await selectStaticData<Record<string, unknown>>("hash");
    const newHashes = await getStaticDataHash({ priority: ApiQueuePriority.Sub });
    const patches = diff(oldHashes, newHashes);
    console.log(patches);
    const tasks = patches.map(async (patch) => {
      switch (patch.type) {
        case "add":
        case "update": {
          const data = await getStaticData(patch.key, { priority: ApiQueuePriority.Sub });
          await insertStaticData(patch.key, data);
          break;
        }
        case "remove": {
          await deleteStaticData(patch.key);
          break;
        }
      }
    });
    const [, errors] = await parallel(tasks);
    if (errors.length > 0) {
      console.error(errors);
      throw error(500, { message: "Failed to synchronize static data" });
    }
    await insertStaticData("hash", newHashes);
    console.info("Static data synchronized successfully.");
  },
  { lock },
);
