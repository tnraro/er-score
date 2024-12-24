import { InMemoryCache } from "./memory";

const inMemoryCache = new InMemoryCache();

export async function useCache<T>(
  key: string,
  resolver: () => Promise<T> | T,
): Promise<Awaited<T>> {
  const cachedValue = await inMemoryCache.get<T>(key);
  if (cachedValue != null) {
    console.info(`Cache hit(${inMemoryCache.id()}): ${key}`);
    return cachedValue;
  }
  const result = await resolver();
  await inMemoryCache.set(key, result);
  return result;
}
