import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/content";
import { MobileNav } from "./MobileNav";

export function SiteHeader({ locale, labels, getLabel }: { locale: Locale; labels: readonly string[]; getLabel: string }) {
  const anchors = ["#day-with-reflexion", "#find-your-reflexion", "#trust", "#faq"];
  return <header className="site-header">
    <a className="skip-link" href="#main">Skip to content</a>
    <a className="announcement" href="#get-reflexion">
      <span>{locale === "zh" ? "8月13日至19日 · VivoCity 与 Reflexion 见面" : "Meet Reflexion at VivoCity · 13–19 Aug"}</span>
      <span aria-hidden="true">→</span>
    </a>
    <div className="site-header__inner">
      <Link className="brand-lockup" href={locale === "zh" ? "/?lang=zh" : "/"} aria-label="Reflexion home">
        <Image src="/reflexion-assets/reflexion logo/Reflexion logo-Photoroom.png" alt="Reflexion — Care. Connected." width={185} height={72} priority/>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {labels.map((label, index) => <a href={anchors[index]} key={label}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <div className="locale-switch" aria-label="Language">
          <Link href="/?lang=en" lang="en" aria-current={locale === "en" ? "page" : undefined}>EN</Link><span>/</span><Link href="/?lang=zh" lang="zh-Hans" aria-current={locale === "zh" ? "page" : undefined}>中文</Link>
        </div>
        <a className="header-cta" href="#get-reflexion">{getLabel}</a>
      </div>
      <MobileNav locale={locale} labels={labels} getLabel={getLabel}/>
    </div>
  </header>;
}
