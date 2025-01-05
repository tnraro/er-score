import { getUser } from "$lib/server/api/get/user";
import { createQuery } from "../query";

export const userQuery = createQuery((db) => {
  return {
    async get(username: string) {
      {
        const user = await db.users.selectUserByName(username);
        if (user != null) return user;
      }
      const user = await getUser(username);
      await db.users.insert([user]);
      return {
        ...user,
        updatedAt: null,
      };
    },
  };
});
