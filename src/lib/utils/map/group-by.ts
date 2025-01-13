export function groupBy<T, K extends string | number | symbol | boolean>(
  items: T[],
  fn: (item: T) => K,
): Map<K, T[]> {
  const result = new Map<K, T[]>();
  for (const item of items) {
    const key = fn(item);
    const values = result.get(key) ?? [];
    values.push(item);
    result.set(key, values);
  }
  return result;
}
