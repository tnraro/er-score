import type { Character, Item } from "$lib/client/api/api";
import { getContext, setContext } from "svelte";

const globalDataKey = Symbol("global-data");

interface GlobalData {
  characters: Map<number, Character>;
  items: Map<number, Item>;
}
export function setGlobalData(fn: () => GlobalData) {
  setContext(globalDataKey, fn);
}
export function globalData() {
  return (getContext(globalDataKey) as () => GlobalData)?.();
}
