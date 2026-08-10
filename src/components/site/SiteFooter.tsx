import type { Locale } from "@/i18n/content";

export function SiteFooter({ locale, line, note, nav }: { locale: Locale; line: string; note: string; nav: readonly string[] }) {
  const home = locale === "zh" ? "/?lang=zh" : "/";
  return <footer className="site-footer">
    <div className="site-footer__top">
      <a className="wordmark wordmark--footer" href="#top">Reflexion<span aria-hidden="true">.</span></a>
      <p className="site-footer__line">{line}</p>
    </div>
    <div className="site-footer__bottom">
      <nav aria-label="Footer navigation">
        <a href={`${home}#day-with-reflexion`}>{nav[0]}</a><a href={`${home}#find-your-reflexion`}>{nav[1]}</a><a href={`${home}#trust`}>{nav[2]}</a><a href={`${home}#faq`}>{nav[3]}</a>
      </nav>
      <p>{note}</p>
      <p>© 2026 Reflexion · <a href="https://instagram.com/reflexion.sg" rel="noreferrer">@reflexion.sg</a> · {locale === "zh" ? "简体中文开发译文，待人工审核" : "Singapore"}</p>
    </div>
  </footer>;
}
