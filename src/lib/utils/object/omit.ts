export function omit<T extends Record<string, unknown>, K extends keyof T>(
  item: T,
  keys: K[],
): Omit<T, K> {
  if (keys.length === 0) return { ...item };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = item;
  for (let i = 0; i < keys.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [keys[i]]: _, ...rest } = result;
    result = rest;
  }
  return result;
}
