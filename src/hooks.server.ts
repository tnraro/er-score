import { createDb } from "$lib/server/db/client";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const db = createDb();
  event.locals.db = db;
  return await resolve(event);
};
