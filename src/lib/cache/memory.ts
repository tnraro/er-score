import { CacheBase } from "./base";

export class InMemoryCache extends CacheBase {
  #cache;
  #size;
  constructor(size = 100) {
    super();
    this.#cache = new Map<string, unknown>();
    this.#size = size;
  }
  id() {
    return "memory";
  }
  async get<T>(key: string): Promise<T | undefined | null> {
    return this.#cache.get(key) as T | undefined;
  }
  async set<T>(key: string, value: T): Promise<void> {
    this.#cache.delete(key);
    this.#cache.set(key, value);

    this.#gc();
  }
  async delete(key: string): Promise<void> {
    this.#cache.delete(key);
  }

  #gc() {
    const delSize = this.#cache.size - this.#size;
    if (delSize > 0) {
      const it = this.#cache.keys();
      for (let i = 0; i < delSize; i++) {
        const key = it.next().value;
        if (key != null) this.#cache.delete(key);
      }
    }
  }
}
