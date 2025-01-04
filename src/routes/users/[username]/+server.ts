import { error, text } from "@sveltejs/kit";

export const POST = async ({ params, locals: { query } }) => {
  if (import.meta.env.DEV) {
    const user = await query.user.get(params.username);

    await query.matches.sync(user.id, 10);
    return text("Ok");
  }
  error(404);
};
