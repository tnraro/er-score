import type { Locales } from "$i18n/i18n-types";
import { detectLocale, i18n, isLocale } from "$i18n/i18n-util";
import { loadAllLocales } from "$i18n/i18n-util.sync";
import { selectAdminSession } from "$lib/features/admin-auth/db.server";
import { db } from "$lib/shared/db/client.server";
import type { RequestEvent } from "@sveltejs/kit";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { initAcceptLanguageHeaderDetector } from "typesafe-i18n/detectors";

loadAllLocales();
const L = i18n();

const handleDb: Handle = async ({ event, resolve }) => {
  event.locals.db = db;

  return await resolve(event);
};

const handleAdminSession: Handle = async ({ event, resolve }) => {
  const sessionToken = extractSessionToken(event);
  if (sessionToken != null) {
    event.locals.adminSession = (await selectAdminSession(sessionToken)) ?? undefined;
  }

  return await resolve(event);
};

function extractSessionToken(event: RequestEvent): string | undefined {
  const authorization = event.request.headers.get("Authorization");
  if (authorization != null && authorization.startsWith("Bearer ")) {
    return authorization.slice(7);
  }
  const cookieToken = event.cookies.get("session-token");
  if (cookieToken != null) {
    return cookieToken;
  }
}

const handleI18n: Handle = async ({ event, resolve }) => {
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

export const handle = sequence(handleI18n, handleDb, handleAdminSession);
