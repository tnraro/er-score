import { redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const username = formData.get("username");
    if (typeof username !== "string") throw new Error("Invalid username");

    redirect(303, `/users/${encodeURIComponent(username)}`);
  },
};
