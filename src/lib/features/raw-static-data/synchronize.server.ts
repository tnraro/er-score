import { ApiQueuePriority } from "$lib/shared/api-queue";
import { parallel } from "$lib/shared/task/parallel";
import { diff } from "$lib/utils/object/diff";
import { error } from "@sveltejs/kit";
import { getStaticData, getStaticDataHash } from "./api.server";
import { deleteRawStaticData, insertRawStaticData, selectRawStaticData } from "./db.server";

export async function synchronizeRawStaticData() {
  console.info("Synchronizing raw static data...");
  const oldHashes = await selectRawStaticData<Record<string, unknown>>("hash");
  const newHashes = await getStaticDataHash({ priority: ApiQueuePriority.Sub });
  const patches = diff(oldHashes, newHashes);
  console.info(patches);
  const tasks = patches.map(async (patch) => {
    switch (patch.type) {
      case "add":
      case "update": {
        const data = await getStaticData(patch.key, { priority: ApiQueuePriority.Sub });
        await insertRawStaticData(patch.key, data);
        break;
      }
      case "remove": {
        await deleteRawStaticData(patch.key);
        break;
      }
    }
  });
  const [, errors] = await parallel(tasks);
  if (errors.length > 0) {
    console.error(errors);
    throw error(500, { message: "Failed to synchronize raw static data" });
  }
  await insertRawStaticData("hash", newHashes);
  console.info("Raw static data synchronized successfully.");
}
