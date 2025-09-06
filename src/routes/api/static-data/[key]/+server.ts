import { selectStaticData } from "$lib/features/static-data/db.server.js";
import { error, json } from "@sveltejs/kit";

export async function GET({ params, request, setHeaders }) {
  const data = await selectStaticData(params.key);
  if (data == null) error(404);

  const etag = request.headers.get("If-None-Match");
  const hash = data.hash?.toString(36);
  if (etag != null && etag === hash) {
    return new Response(null, {
      status: 304,
    });
  }

  if (hash != null)
    setHeaders({
      ETag: hash,
    });

  return json(data.value);
}
