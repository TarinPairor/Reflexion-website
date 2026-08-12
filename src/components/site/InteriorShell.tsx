import type { ReactNode } from "react";
import type { Locale, getHomeContent } from "@/i18n/content";
import { MotionMain } from "@/components/motion/MotionMain";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { StickyCta } from "./StickyCta";
import { localisedHref } from "@/lib/siteRoutes";

type HomeContent = ReturnType<typeof getHomeContent>;

export function InteriorShell({ locale, content, currentPath, children }: { locale: Locale; content: HomeContent; currentPath: string; children: ReactNode }) {
  return <div lang={locale === "zh" ? "zh-Hans" : "en"} className="interior-page">
    <SiteHeader locale={locale} labels={content.nav} getLabel={content.hero.primary} currentPath={currentPath}/>
    <MotionMain>{children}</MotionMain>
    <SiteFooter locale={locale} footer={content.footer} nav={content.nav} currentPath={currentPath}/>
    <StickyCta label={content.hero.primary} href={localisedHref("/get-reflexion", locale)}/>
  </div>;
}
