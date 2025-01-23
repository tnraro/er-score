export function single<T>(items: T[]): T | null {
  if (items.length === 0) return null;
  if (items.length === 1) return items[0];
  throw new Error("Too many items", { cause: items });
}
