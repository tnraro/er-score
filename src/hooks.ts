import { isLocale } from "$i18n/i18n-util";

export const reroute = (event) => {
  const [, lang, ...rest] = event.url.pathname.split("/");
  if (isLocale(lang)) {
    return `/${rest.join("/")}`;
  }
};
