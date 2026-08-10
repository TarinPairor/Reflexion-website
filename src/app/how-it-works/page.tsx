import type { Metadata } from "next";
import { HowItWorksPage } from "@/components/pages/HowItWorksPage";
import { InteriorShell } from "@/components/site/InteriorShell";
import { getHomeContent, normaliseLocale } from "@/i18n/content";
import { getPageContent } from "@/i18n/pages";

export const metadata: Metadata = {
  title: "How It Works — Reflexion",
  description: "Imagine a day with Reflexion: morning check-in, companionship, family connection and meaningful caregiver context.",
};

export default async function HowItWorksRoute({ searchParams }: { searchParams: Promise<{ lang?: string | string[] }> }) {
  const locale = normaliseLocale((await searchParams).lang);
  const home = getHomeContent(locale);
  const content = getPageContent(locale);
  return <InteriorShell locale={locale} content={home} currentPath="/how-it-works"><HowItWorksPage locale={locale} home={home} page={content.how} common={content.common}/></InteriorShell>;
}
