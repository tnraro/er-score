export function diff<U extends Record<string, any>, V extends Record<string, any>>(
  u: U | null | undefined,
  v: V | null | undefined,
) {
  const result: (
    | { type: "add"; key: string; value: any }
    | { type: "remove"; key: string }
    | { type: "update"; key: string; oldValue: any; newValue: any }
  )[] = [];
  u ??= {} as U;
  v ??= {} as V;
  const keys = new Set([...Object.keys(u), ...Object.keys(v)]);
  for (const key of keys) {
    if (!Object.hasOwn(u, key)) {
      result.push({ type: "add", key, value: v[key] });
    } else if (!Object.hasOwn(v, key)) {
      result.push({ type: "remove", key });
    } else if (!Object.is(u[key], v[key])) {
      result.push({ type: "update", key, oldValue: u[key], newValue: v[key] });
    }
  }
  return result;
}
