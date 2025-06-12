import { getStaticDataSynchronizationStatus } from "$lib/features/static-data/synchronize-static-data.server";
import { error, json } from "@sveltejs/kit";

export async function GET({ locals }) {
  if (locals.adminSession == null) throw error(401);

  return json(getStaticDataSynchronizationStatus());
}
