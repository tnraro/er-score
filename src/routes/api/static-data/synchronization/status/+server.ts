import { error, json } from "@sveltejs/kit";
import { getSynchronizationStatus } from "../../synchronize.js";

export async function GET({ locals }) {
  if (locals.adminSession == null) throw error(401);

  return json(getSynchronizationStatus());
}
