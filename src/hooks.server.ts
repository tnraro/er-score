import { useDb } from "$lib/server/db";
import { db } from "$lib/server/db/client";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.db = useDb(db);
  return await resolve(event);
};
