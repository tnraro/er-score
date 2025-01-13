export function formatNumber(
  n: number,
  locales?: Intl.LocalesArgument,
  options?: Intl.NumberFormatOptions,
) {
  return new Intl.NumberFormat(locales, options).format(n);
}
