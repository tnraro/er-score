export function groupBy<T, K extends keyof T>(items: T[], fn: (item: T) => T[K]): Map<T[K], T[]> {
  return items.reduce((map, item) => {
    const key = fn(item);

    const array = map.get(key) ?? [];
    array.push(item);
    map.set(key, array);

    return map;
  }, new Map());
}
