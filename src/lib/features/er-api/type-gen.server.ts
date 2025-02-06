import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { InputData, jsonInputForTargetLanguage, quicktype } from "quicktype-core";
import { reqGames, reqUserGames, reqUserNickname } from "./primitive.server";

export async function genErApiTypes() {
  if (import.meta.env.PROD) return;
  const UserNicknameErResponse = await reqUserNickname("리당");

  const UserGamesErResponse = await reqUserGames(UserNicknameErResponse.user.userNum);

  const GamesErResponse = await reqGames(UserGamesErResponse.userGames[0].gameId);

  const ts = await jsonToType({
    UserNicknameErResponse,
    UserGamesErResponse,
    GamesErResponse,
  });

  console.log(ts.annotations);

  const path = join(import.meta.dirname, "types.gen.ts");
  await writeFile(path, ts.lines.join("\n"));
}

async function jsonToType(json: unknown) {
  const jsonString = JSON.stringify(json);
  const jsonInput = jsonInputForTargetLanguage("typescript");
  await jsonInput.addSource({
    name: "Root",
    samples: [jsonString],
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  return await quicktype({
    inputData,
    lang: "typescript",

    rendererOptions: {
      "just-types": true,
      // "prefer-unions": true,
      "prefer-const-values": true,
    },
  });
}
