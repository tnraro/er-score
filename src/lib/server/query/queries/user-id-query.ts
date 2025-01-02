import { reqUserNickname } from "../../api/req";
import { createQuery } from "../query";

export const userIdQuery = createQuery((db) => {
  return {
    async get(username: string) {
      {
        const user = await db.users.selectUserByName(username);
        if (user != null) return user;
      }
      const res = await reqUserNickname(username);
      const user = {
        id: res.user.userNum,
        name: res.user.nickname,
      };
      await db.users.insert([user]);
      return user;
    },
  };
});
