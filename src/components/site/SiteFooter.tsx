import type { Locale } from "@/i18n/content";
import Link from "next/link";
import { localisedHref, visibleNavigationItems } from "@/lib/siteRoutes";

export function SiteFooter({ locale, line, note, nav, currentPath = "/" }: { locale: Locale; line: string; note: string; nav: readonly string[]; currentPath?: string }) {
  return <footer className="site-footer">
    <div className="site-footer__top">
      <Link className="wordmark wordmark--footer" href={localisedHref("/", locale)}>Reflexion<span aria-hidden="true">.</span></Link>
      <p className="site-footer__line">{line}</p>
    </div>
    <div className="site-footer__bottom">
      <nav aria-label="Footer navigation">
        {visibleNavigationItems(nav).map(({ label, path }) => <Link href={localisedHref(path, locale)} aria-current={currentPath === path ? "page" : undefined} key={path}>{label}</Link>)}
      </nav>
      <p>{note}</p>
      <p>© 2026 Reflexion · <a href="https://instagram.com/reflexion.sg" rel="noreferrer">@reflexion.sg</a> · {locale === "zh" ? "简体中文开发译文，待人工审核" : "Singapore"}</p>
    </div>
  </footer>;
}
