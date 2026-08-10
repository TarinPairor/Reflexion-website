import type { Metadata } from "next";
import { ProductsPage } from "@/components/pages/ProductsPage";
import { InteriorShell } from "@/components/site/InteriorShell";
import { getHomeContent, normaliseLocale } from "@/i18n/content";
import { getPageContent } from "@/i18n/pages";

export const metadata: Metadata = {
  title: "Products — Reflexion",
  description: "Compare the Reflexion Mirror, Loved-one App, Bear, Home Hub and Tabletop Companion by human fit and development stage.",
};

export default async function ProductsRoute({ searchParams }: { searchParams: Promise<{ lang?: string | string[] }> }) {
  const locale = normaliseLocale((await searchParams).lang);
  const home = getHomeContent(locale);
  const content = getPageContent(locale);
  return <InteriorShell locale={locale} content={home} currentPath="/products"><ProductsPage locale={locale} home={home} page={content.products} common={content.common}/></InteriorShell>;
}
