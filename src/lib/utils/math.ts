export function lerp(t: number, min: number, max: number) {
  return (t - min) / (max - min);
}
export function clamp(x: number, min: number, max: number) {
  return Math.min(Math.max(x, min), max);
}
export function map(x: number, a: number, b: number, c: number, d: number) {
  const ratio = lerp(x, a, b);
  return ratio * (d - c) + c;
}
