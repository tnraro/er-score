import { selectStaticDataHashes } from "$lib/features/static-data/db.server.js";
import { json } from "@sveltejs/kit";

export async function GET() {
  const data = await selectStaticDataHashes();

  return json(
    data.map((x) => ({
      key: x.key,
      hash: x.hash.toString(36),
    })),
  );
}
