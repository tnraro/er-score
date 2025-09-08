import { selectStaticData } from "$lib/features/static-data/db.server";
import { error, json } from "@sveltejs/kit";

export async function GET({ params, request, setHeaders }) {
  const data = await selectStaticData(params.key);
  if (data == null) error(404);

  const etag = request.headers.get("If-None-Match");
  if (etag != null && etag === data.hash) {
    return new Response(null, {
      status: 304,
    });
  }

  if (data.hash != null)
    setHeaders({
      ETag: data.hash,
    });

  return json(data.value);
}
