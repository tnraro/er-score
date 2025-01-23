import { reqUserNickname } from "$lib/server/api/req";

export async function getUser(name: string) {
  const res = await reqUserNickname(name);

  return {
    id: res.user.userNum,
    name: res.user.nickname,
  };
}
