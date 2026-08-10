import type { Locale } from "@/i18n/content";

export const primaryPaths = ["/how-it-works", "/products", "/about", "/faq"] as const;

export function localisedHref(path: string, locale: Locale) {
  if (locale === "en") return path;
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}lang=zh`;
}
