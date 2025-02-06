// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function pick<T extends Record<string, any>, K extends keyof T>(
  item: T,
  keys: readonly K[],
): Pick<T, K> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (item[key] == null) continue;
    result = {
      ...result,
      [key]: item[key],
    };
  }
  return result;
}
