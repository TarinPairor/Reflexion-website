import type { Metadata } from "next";
import { FaqPage } from "@/components/pages/FaqPage";
import { InteriorShell } from "@/components/site/InteriorShell";
import { getHomeContent, normaliseLocale } from "@/i18n/content";
import { getPageContent } from "@/i18n/pages";

export const metadata: Metadata = {
  title: "FAQ — Reflexion",
  description: "Clear answers about Reflexion fit, morning check-ins, caregiver context, privacy, limitations and getting started.",
};

export default async function FaqRoute({ searchParams }: { searchParams: Promise<{ lang?: string | string[] }> }) {
  const locale = normaliseLocale((await searchParams).lang);
  const home = getHomeContent(locale);
  const content = getPageContent(locale);
  return <InteriorShell locale={locale} content={home} currentPath="/faq"><FaqPage locale={locale} home={home} page={content.faq} common={content.common}/></InteriorShell>;
}
