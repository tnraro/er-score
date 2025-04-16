import { error } from "@sveltejs/kit";

export async function load({ locals }) {
  if (locals.adminSession == null) throw error(401);
  return {};
}
