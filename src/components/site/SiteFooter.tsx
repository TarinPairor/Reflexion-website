import type { FooterContent, Locale } from "@/i18n/content";
import { Fragment } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { localisedHref, visibleNavigationItems } from "@/lib/siteRoutes";

export function SiteFooter({ locale, footer, nav, currentPath = "/" }: { locale: Locale; footer: FooterContent; nav: readonly string[]; currentPath?: string }) {
  return <footer className="site-footer">
    <div className="site-footer__top">
      <Link className="wordmark wordmark--footer" href={localisedHref("/", locale)}>Reflexion<span aria-hidden="true">.</span></Link>
      <p className="site-footer__line">{footer.line}</p>
    </div>
    <div className="site-footer__details">
      <div className="site-footer__columns">
        <div className="site-footer__group">
          <h2 id="footer-explore">{footer.explore}</h2>
          <nav aria-labelledby="footer-explore">
            {visibleNavigationItems(nav).map(({ label, path }) => <Link href={localisedHref(path, locale)} aria-current={currentPath === path ? "page" : undefined} key={path}>{label}</Link>)}
          </nav>
        </div>
        <div className="site-footer__group">
          <h2 id="footer-connect">{footer.connect}</h2>
          <address aria-labelledby="footer-connect">
            <a href={footer.instagramHref} rel="noreferrer">{footer.instagram}</a>
            <a className="site-footer__email" href={footer.emailHref}>
              <span>{footer.emailLabel}</span>{" "}
              {footer.emailParts.map((part, index) => <Fragment key={part}><span>{part}</span>{index < footer.emailParts.length - 1 ? <wbr/> : null}</Fragment>)}
            </a>
            <a href={footer.phoneHref} target="_blank" rel="noreferrer">{footer.phone}</a>
          </address>
        </div>
      </div>
      <Link className="site-footer__cta" href={localisedHref("/get-reflexion", locale)}>
        <span>{footer.cta}</span>
        <Icon name="arrow" width={18} height={18} aria-hidden="true" />
      </Link>
      <div className="site-footer__divider" aria-hidden="true" />
      <p className="site-footer__disclaimer">{footer.disclaimer}</p>
      <div className="site-footer__meta">
        <p>© 2026 Reflexion</p>
        <div className="site-footer__meta-group" aria-label={locale === "zh" ? "法律信息" : "Legal information"}>
          <span>{footer.privacy}</span>
          <span aria-hidden="true">·</span>
          <span>{footer.terms}</span>
        </div>
        <div className="site-footer__meta-group site-footer__locale" aria-label={locale === "zh" ? "语言" : "Language"}>
          <Link href={localisedHref(currentPath, "en")} lang="en" aria-current={locale === "en" ? "page" : undefined}>EN</Link>
          <span aria-hidden="true">/</span>
          <Link href={localisedHref(currentPath, "zh")} lang="zh-Hans" aria-current={locale === "zh" ? "page" : undefined}>中文</Link>
        </div>
      </div>
    </div>
  </footer>;
}
