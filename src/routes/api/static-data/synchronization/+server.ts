import { error, json } from "@sveltejs/kit";
import { getSynchronizationStatus, synchronize } from "../synchronize.js";

export async function POST({ locals }) {
  if (locals.adminSession == null) throw error(401);

  if (getSynchronizationStatus().isSynchronizing)
    throw error(503, { message: "synchronization already in progress" });
  synchronize();

  return json({ message: "Static data synchronization has started" }, { status: 202 });
}
