import { useDb } from "$lib/server/db";
import type { Handle } from "@sveltejs/kit";
import { drizzle } from "drizzle-orm/d1";

export const handle: Handle = async ({ event, resolve }) => {
  const db = drizzle(event.platform!.env!.DB);
  event.locals.db = useDb(db);
  return await resolve(event);
};
