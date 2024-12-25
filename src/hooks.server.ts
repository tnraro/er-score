import { createDb } from "$lib/server/db/client";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.db = createDb();
  return await resolve(event);
};
