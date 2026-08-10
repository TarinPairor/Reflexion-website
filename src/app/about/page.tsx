import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";
import { InteriorShell } from "@/components/site/InteriorShell";
import { getHomeContent, normaliseLocale } from "@/i18n/content";
import { getPageContent } from "@/i18n/pages";

export const metadata: Metadata = {
  title: "About — Reflexion",
  description: "The family origin, product philosophy and people behind Reflexion.",
};

export default async function AboutRoute({ searchParams }: { searchParams: Promise<{ lang?: string | string[] }> }) {
  const locale = normaliseLocale((await searchParams).lang);
  const home = getHomeContent(locale);
  const content = getPageContent(locale);
  return <InteriorShell locale={locale} content={home} currentPath="/about"><AboutPage locale={locale} home={home} page={content.about} common={content.common}/></InteriorShell>;
}
