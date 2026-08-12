import type { Locale } from "@/i18n/content";

export const primaryPaths = ["/how-it-works", "/products", "/about", "/faq"] as const;
const temporarilyHiddenNavigationPaths = new Set<string>(["/how-it-works", "/products"]);

export function visibleNavigationItems(labels: readonly string[]) {
  return primaryPaths
    .map((path, index) => ({ path, label: labels[index] }))
    .filter((item): item is { path: typeof primaryPaths[number]; label: string } => Boolean(item.label) && !temporarilyHiddenNavigationPaths.has(item.path));
}

export function localisedHref(path: string, locale: Locale) {
  if (locale === "en") return path;
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}lang=zh`;
}
