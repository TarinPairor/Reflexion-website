import { HomePage } from "@/components/home/HomePage";
import { getHomeContent, normaliseLocale } from "@/i18n/content";

export default async function Page({ searchParams }: { searchParams: Promise<{ lang?: string | string[] }> }) {
  const params = await searchParams;
  const locale = normaliseLocale(params.lang);
  const content = getHomeContent(locale);
  return <HomePage locale={locale} content={content}/>;
}
