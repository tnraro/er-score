export function numberOrNullable<T extends string | null | undefined>(x: T) {
  if (x == null) return x as T extends string ? never : T;
  return Number(x);
}
