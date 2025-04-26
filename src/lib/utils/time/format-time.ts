const cutoffs = [
  1,
  60,
  3600,
  86400,
  7 * 86400,
  30 * 86400,
  365 * 86400,
  Number.POSITIVE_INFINITY,
].map((x) => x * 1000);
const units = ["ms", "s", "m", "h", "d", "w", "M", "y"];
export function formatTime(time: number): string {
  const ms = Math.trunc(time);
  if (ms === 0 || Number.isNaN(ms)) return "0s";

  const unitIndex = cutoffs.findIndex((cutoff) => cutoff > Math.abs(ms));
  const divider = unitIndex !== 0 ? cutoffs[unitIndex - 1] : 1;
  const unit = units[unitIndex];
  return `${Math.trunc(ms / divider)}${unit}`;
}
