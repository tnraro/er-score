import type { Character } from "$lib/client/api/api";
import { getContext, setContext } from "svelte";

const globalDataKey = Symbol("global-data");

interface GlobalData {
  characters: Map<number, Character>;
}
export function setGlobalData(fn: () => GlobalData) {
  setContext(globalDataKey, fn);
}
export function globalData() {
  return (getContext(globalDataKey) as () => GlobalData)?.();
}
