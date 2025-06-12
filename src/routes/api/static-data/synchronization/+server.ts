import {
  getStaticDataSynchronizationStatus,
  synchronizeStaticData,
} from "$lib/features/static-data/synchronize-static-data.server";
import { error, json } from "@sveltejs/kit";

export async function POST({ locals }) {
  if (locals.adminSession == null) throw error(401);

  if (getStaticDataSynchronizationStatus().isSynchronizing)
    throw error(503, { message: "synchronization already in progress" });
  synchronizeStaticData();

  return json({ message: "Static data synchronization has started" }, { status: 202 });
}
