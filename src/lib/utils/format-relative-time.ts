export function formatRelativeTime(
  date: Date | number,
  lang: string,
  options?: Intl.RelativeTimeFormatOptions,
): string {
  const time = typeof date === "number" ? date : date.getTime();
  const deltaSeconds = Math.trunc((time - Date.now()) / 1000);
  const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Number.POSITIVE_INFINITY];
  const units: Intl.RelativeTimeFormatUnit[] = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
    "year",
  ];

  const unitIndex = cutoffs.findIndex((cutoff) => cutoff > Math.abs(deltaSeconds));
  const divider = unitIndex ? cutoffs[unitIndex - 1] : 1;
  const rtf = new Intl.RelativeTimeFormat(lang, options);
  return rtf.format(Math.floor(deltaSeconds / divider), units[unitIndex]);
}
