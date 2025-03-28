import type { Locales } from "$i18n/i18n-types";
import { detectLocale, i18n, isLocale } from "$i18n/i18n-util";
import { loadAllLocales } from "$i18n/i18n-util.sync";
import { db } from "$lib/features/db/client.server";
import type { RequestEvent } from "@sveltejs/kit";
import { redirect, type Handle } from "@sveltejs/kit";
import { initAcceptLanguageHeaderDetector } from "typesafe-i18n/detectors";

loadAllLocales();
const L = i18n();

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.db = db;

  const [, lang] = event.url.pathname.split("/");

  if (!isLocale(lang) && !event.url.pathname.startsWith("/api")) {
    const locale = getPreferredLocale(event);
    const url = event.url.href.slice(event.url.origin.length);
    redirect(307, `/${locale}${url}`);
  }

  const locale = isLocale(lang) ? (lang as Locales) : getPreferredLocale(event);
  const LL = L[locale];

  event.locals.locale = locale;
  event.locals.LL = LL;

  return await resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%typesafe-i18n.lang%", locale),
  });
};

export function getPreferredLocale({ request }: RequestEvent) {
  const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request);

  return detectLocale(acceptLanguageDetector);
}
