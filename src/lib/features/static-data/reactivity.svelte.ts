import { staticData } from "./browser";
import type { StaticDataCharacter, StaticDataItem } from "./synchronize.server";

export class StaticData {
  #characters = $state(new Map<number, StaticDataCharacter>());
  get characters() {
    return this.#characters;
  }

  #items = $state(new Map<number, StaticDataItem>());
  get items() {
    return this.#items;
  }

  constructor(key: Symbol) {
    if (key !== StaticData.#key) throw new Error("Use StaticData.instance instead of constructor");
    const characterDataObserver = staticData<StaticDataCharacter[]>("characters");
    characterDataObserver.subscribe((value) => {
      if (value == null) return;
      this.#characters = new Map(value.map((x) => [x.id, x]));
    });

    const itemDataObserver = staticData<StaticDataItem[]>("items");
    itemDataObserver.subscribe((value) => {
      if (value == null) return;
      this.#items = new Map(value.map((x) => [x.id, x]));
    });
  }

  static #key = Symbol();
  static #instance: StaticData;
  static get instance() {
    if (this.#instance == null) {
      this.#instance = new StaticData(StaticData.#key);
    }
    return this.#instance;
  }
}
