export function lerp(t: number, min: number, max: number) {
  return (t - min) / (max - min);
}
export function clamp(x: number, min: number, max: number) {
  return Math.min(Math.max(x, min), max);
}
