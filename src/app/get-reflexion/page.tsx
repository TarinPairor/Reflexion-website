import type { Metadata } from "next";
import { JoinPilotForm } from "@/components/pilot/JoinPilotForm";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { getHomeContent, normaliseLocale } from "@/i18n/content";
import { isProductId } from "@/lib/get-reflexion/config";

export const metadata: Metadata = {
  title: "Join our pilot — Reflexion",
  description: "Join the Reflexion Home Pilot and help shape the future of everyday support for ageing adults and their families.",
};

export default async function JoinPilotPage({ searchParams }: { searchParams: Promise<{ lang?: string | string[]; form?: string }> }) {
  const params = await searchParams;
  const locale = normaliseLocale(params.lang);
  const content = getHomeContent(locale);
  const initialProduct = isProductId(params.form) ? params.form : undefined;

  return <div lang={locale === "zh" ? "zh-Hans" : "en"} className="pilot-page">
    <SiteHeader locale={locale} labels={content.nav} getLabel={content.hero.primary} currentPath="/get-reflexion"/>
    {locale === "zh" ? <p className="pilot-language-note">Join the Pilot 表格目前以英文显示；简体中文版本仍待人工审核。</p> : null}
    <JoinPilotForm initialProduct={initialProduct}/>
    <SiteFooter locale={locale} footer={content.footer} nav={content.nav} currentPath="/get-reflexion"/>
  </div>;
}
