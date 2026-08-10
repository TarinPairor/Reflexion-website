import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/content";
import { localisedHref, primaryPaths } from "@/lib/siteRoutes";
import { MobileNav } from "./MobileNav";

export function SiteHeader({ locale, labels, getLabel, currentPath = "/" }: { locale: Locale; labels: readonly string[]; getLabel: string; currentPath?: string }) {
  const getHref = localisedHref("/get-reflexion", locale);
  return <header className="site-header">
    <a className="skip-link" href="#main">Skip to content</a>
    <Link className="announcement" href={getHref}>
      <span>{locale === "zh" ? "8月13日至19日 · VivoCity 与 Reflexion 见面" : "Meet Reflexion at VivoCity · 13–19 Aug"}</span>
      <span aria-hidden="true">→</span>
    </Link>
    <div className="site-header__inner">
      <Link className="brand-lockup" href={locale === "zh" ? "/?lang=zh" : "/"} aria-label="Reflexion home">
        <Image src="/reflexion-assets/reflexion logo/Reflexion logo-Photoroom.png" alt="Reflexion — Care. Connected." width={185} height={72} priority/>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {labels.map((label, index) => <Link href={localisedHref(primaryPaths[index], locale)} aria-current={currentPath === primaryPaths[index] ? "page" : undefined} key={label}>{label}</Link>)}
      </nav>
      <div className="header-actions">
        <div className="locale-switch" aria-label="Language">
          <Link href={currentPath} lang="en" aria-current={locale === "en" ? "page" : undefined}>EN</Link><span>/</span><Link href={localisedHref(currentPath, "zh")} lang="zh-Hans" aria-current={locale === "zh" ? "page" : undefined}>中文</Link>
        </div>
        <Link className="header-cta" href={getHref}>{getLabel}</Link>
      </div>
      <MobileNav locale={locale} labels={labels} getLabel={getLabel} currentPath={currentPath}/>
    </div>
  </header>;
}
