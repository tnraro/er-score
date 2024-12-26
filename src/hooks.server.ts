import { useDb } from "$lib/server/db";
import { useQuery } from "$lib/server/query";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const db = useDb();
  event.locals.db = db;
  event.locals.query = useQuery(db);
  return await resolve(event);
};
