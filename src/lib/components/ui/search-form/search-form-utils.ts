import { goto } from "$app/navigation";
import type { Locales } from "$i18n/i18n-types";

export function gotoUsers(usernames: string[], locale: Locales) {
  if (usernames.length === 1) {
    goto(`/${locale}/users/${encodeURIComponent(usernames[0])}`);
  } else {
    const sp = new URLSearchParams();
    usernames.forEach((username) => sp.append("u", username));
    goto(`/${locale}/stats?${sp.toString()}`);
  }
}

export function parseUsernames(form: HTMLFormElement) {
  const formData = new FormData(form);
  const username = formData.get("username");
  if (typeof username !== "string") throw new Error("Invalid username");
  const usernames = username
    .trim()
    .split(/\s*,\s*/g)
    .filter((x) => x.length > 0);
  return usernames;
}
