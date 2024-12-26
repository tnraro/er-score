import { reqUserNickname } from "../../api/req";
import { createQuery } from "../query";

export const userIdQuery = createQuery((db) => {
  return {
    async get(name: string) {
      {
        const userId = await db.users.selectUserIdByName(name);
        if (userId != null) return userId;
      }
      const res = await reqUserNickname(name);
      const userId = res.user.userNum;
      await db.users.insert([{ id: userId, name }]);
      return userId;
    },
  };
});
