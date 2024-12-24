export function distinct<T>(items: T[], resolver: (item: T) => T[keyof T]) {
  return new Map(items.map((item) => [resolver(item), item]));
}
