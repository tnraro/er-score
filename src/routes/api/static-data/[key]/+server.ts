import { selectStaticData } from "$lib/features/static-data/db.server.js";
import { error, json } from "@sveltejs/kit";

export async function GET({ params }) {
  const data = await selectStaticData(params.key);
  if (data == null) error(404);

  return json(data);
}
