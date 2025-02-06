import { db } from "$lib/features/db/client.server";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.db = db;
  return await resolve(event);
};
