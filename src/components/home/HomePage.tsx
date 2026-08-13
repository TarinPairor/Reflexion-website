import type { getHomeContent, Locale } from "@/i18n/content";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { StickyCta } from "@/components/site/StickyCta";
import { MotionMain } from "@/components/motion/MotionMain";
import { HomeHero } from "./HomeHero";
import { CaregivingTension } from "./CaregivingTension";
import { ClosedCareLoop } from "./ClosedCareLoop";
import { DayWithReflexion } from "./DayWithReflexion";
import { TwoSides } from "./TwoSides";
import { ProductFamily } from "./ProductFamily";
import { TrustFounder } from "./TrustFounder";
import { FaqFinal } from "./FaqFinal";

type Content = ReturnType<typeof getHomeContent>;

export function HomePage({ locale, content }: { locale: Locale; content: Content }) {
  return <div lang={locale === "zh" ? "zh-Hans" : "en"}>
    <SiteHeader locale={locale} labels={content.nav} getLabel={content.hero.primary}/>
    <MotionMain>
      <HomeHero content={content} locale={locale}/>
      <CaregivingTension content={content}/>
      <ClosedCareLoop content={content} locale={locale}/>
      <DayWithReflexion content={content} locale={locale}/>
      <TwoSides content={content} locale={locale}/>
      <ProductFamily content={content}/>
      <TrustFounder content={content}/>
      <FaqFinal content={content} locale={locale}/>
    </MotionMain>
    <SiteFooter locale={locale} footer={content.footer} nav={content.nav}/>
    <StickyCta label={content.hero.primary} href={locale === "zh" ? "/get-reflexion?lang=zh" : "/get-reflexion"}/>
  </div>;
}
