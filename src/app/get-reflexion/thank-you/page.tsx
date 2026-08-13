import type { Metadata } from "next";
import { PilotThankYou } from "@/components/pilot/PilotThankYou";
import { getHomeContent, normaliseLocale } from "@/i18n/content";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export const metadata: Metadata = {
  title: "Thank you — Reflexion Home Pilot",
  description: "Thank you for joining the Reflexion Home Pilot.",
  robots: { index: false, follow: false },
};

export default async function PilotThankYouPage({ searchParams }: { searchParams: Promise<{ lang?: string | string[] }> }) {
  const locale = normaliseLocale((await searchParams).lang);
  const content = getHomeContent(locale);

  return <div lang={locale === "zh" ? "zh-Hans" : "en"} className="pilot-page">
    <SiteHeader locale={locale} labels={content.nav} getLabel={content.hero.primary} currentPath="/get-reflexion"/>
    <PilotThankYou/>
    <SiteFooter locale={locale} footer={content.footer} nav={content.nav} currentPath="/get-reflexion"/>
  </div>;
}
