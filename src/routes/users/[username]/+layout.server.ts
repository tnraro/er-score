import { queryUser } from "$lib/domains/user/query-user.server";
import { error } from "@sveltejs/kit";

export async function load({ params: { username }, depends }) {
  depends(`/users/${username}`);
  try {
    const user = await queryUser(username);
    return {
      user,
    };
  } catch (e) {
    if (e instanceof Response) {
      if (e.status === 404) {
        error(e.status, "찾을 수 없습니다");
      }
      console.error(e);
      error(e.status, await e.text());
    }
    throw e;
  }
}
