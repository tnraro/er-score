import { erApiOptionsSvelteKit } from "../er-api/er-api-options-sveltekit.server";
import { reqUserNickname } from "../er-api/primitive.server";

export async function getUser(name: string) {
  const res = await reqUserNickname(name, erApiOptionsSvelteKit);

  return {
    id: res.user.userNum,
    name: res.user.nickname,
  };
}
