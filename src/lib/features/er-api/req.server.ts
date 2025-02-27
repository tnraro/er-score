export interface ErApiOptions {
  apiHost: string;
  apiKey: string;
}

export async function req<T extends ErResponse>(
  path: string | URL,
  { apiHost, apiKey }: ErApiOptions,
): Promise<T> {
  const url = new URL(path, apiHost);
  const res = await fetch(url, {
    headers: {
      accept: "application/json",
      "x-api-key": apiKey,
    },
  });
  if (!res.ok) throw res;
  const body = await res.json();
  if (!isErResponse(body)) throw body;
  if (body.code >= 400)
    throw new Response(JSON.stringify(body), {
      ...res,
      status: body.code,
      statusText: body.message,
    });
  return body as T;
}

export interface ErResponse {
  code: number;
  message: string;
}

function isErResponse(x: unknown): x is ErResponse {
  return (
    typeof x === "object" &&
    x != null &&
    typeof (x as ErResponse).code === "number" &&
    typeof (x as ErResponse).message === "string"
  );
}
