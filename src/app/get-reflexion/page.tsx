import type { Metadata } from "next";
import { GetReflexionForm } from "@/components/get-reflexion/GetReflexionForm";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { getHomeContent, normaliseLocale } from "@/i18n/content";
import { isProductId } from "@/lib/get-reflexion/config";

export const metadata: Metadata = {
  title: "Get Reflexion — Express your interest",
  description: "Explore Reflexion forms and Singapore launch pricing. No payment will be taken today.",
};

export default async function GetReflexionPage({ searchParams }: { searchParams: Promise<{ lang?: string | string[]; form?: string; preview?: string }> }) {
  const params = await searchParams;
  const locale = normaliseLocale(params.lang);
  const content = getHomeContent(locale);
  const initialProduct = isProductId(params.form) ? params.form : undefined;
  const previewStep = params.preview === "step-5" ? 5 : params.preview === "step-6" ? 6 : undefined;

  return <div lang={locale === "zh" ? "zh-Hans" : "en"} className="get-reflexion-page">
    <SiteHeader locale={locale} labels={content.nav} getLabel={content.hero.primary} currentPath="/get-reflexion"/>
    {locale === "zh" ? <p className="language-qa-note">Get Reflexion 表格目前以英文显示；简体中文版本仍待人工审核。</p> : null}
    <GetReflexionForm initialProduct={initialProduct} previewStep={previewStep}/>
    <SiteFooter locale={locale} footer={content.footer} nav={content.nav} currentPath="/get-reflexion"/>
  </div>;
}
