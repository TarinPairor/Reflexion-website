import type { Metadata } from "next";
import { GetReflexionForm } from "@/components/get-reflexion/GetReflexionForm";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { getHomeContent, normaliseLocale } from "@/i18n/content";
import { isProductId } from "@/lib/get-reflexion/config";

export const metadata: Metadata = {
  title: "Get Reflexion — Archived interest flow",
  description: "Archived Get Reflexion commercial-intent flow retained for restoration and historical review.",
  robots: { index: false, follow: false },
};

export default async function LegacyGetReflexionPage({ searchParams }: { searchParams: Promise<{ lang?: string | string[]; form?: string }> }) {
  const params = await searchParams;
  const locale = normaliseLocale(params.lang);
  const content = getHomeContent(locale);
  const initialProduct = isProductId(params.form) ? params.form : undefined;

  return <div lang={locale === "zh" ? "zh-Hans" : "en"} className="get-reflexion-page">
    <SiteHeader locale={locale} labels={content.nav} getLabel={content.hero.primary} currentPath="/get-reflexion-legacy"/>
    {locale === "zh" ? <p className="language-qa-note">Archived Get Reflexion 表格目前以英文显示；简体中文版本仍待人工审核。</p> : null}
    <GetReflexionForm initialProduct={initialProduct}/>
    <SiteFooter locale={locale} footer={content.footer} nav={content.nav} currentPath="/get-reflexion-legacy"/>
  </div>;
}
