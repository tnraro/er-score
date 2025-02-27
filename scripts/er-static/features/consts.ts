import { env } from "bun";
import { resolve } from "node:path";

export const rootPath = resolve(import.meta.dirname, "../../..", env.ER_STATIC_PATH!);
export const publicPath = resolve(import.meta.dirname, "../../../static");
