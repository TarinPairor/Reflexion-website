import type { Locale, getHomeContent } from "@/i18n/content";
import type { PageContent } from "@/i18n/pages";
import { localisedHref } from "@/lib/siteRoutes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ContactForm } from "./ContactForm";

type HomeContent = ReturnType<typeof getHomeContent>;

export function FaqPage({ locale, home, page, common }: { locale: Locale; home: HomeContent; page: PageContent["faq"]; common: PageContent["common"] }) {
  return <>
    <section className="faq-hero" id="top" aria-labelledby="faq-page-title" data-motion-chapter>
      <div data-motion-item><h1 id="faq-page-title">{page.heroTitle}</h1><p>{page.heroBody}</p></div>
      <nav aria-label={locale === "zh" ? "常见问题类别" : `${home.nav[3]} categories`} data-motion-item>{page.categories.map((category, index) => <a href={`#faq-category-${index + 1}`} key={category[0]}>{category[0]}</a>)}</nav>
    </section>

    <section className="faq-featured interior-section" aria-labelledby="featured-questions-title" data-motion-chapter>
      <div className="interior-section__heading" data-motion-item><h2 id="featured-questions-title">{locale === "zh" ? "从这里开始" : "Start here"}</h2></div>
      <div className="faq-featured__grid" data-motion-item>{page.featured.map((item, index) => <article key={item[0]}><span>0{index + 1}</span><h3>{item[0]}</h3><p>{item[1]}</p></article>)}</div>
    </section>

    <section className="faq-library interior-section" aria-labelledby="faq-library-title" data-motion-chapter>
      <div className="faq-library__intro" data-motion-item><p className="eyebrow">{locale === "zh" ? "按主题浏览" : "Browse by what matters"}</p><h2 id="faq-library-title">{locale === "zh" ? "只展开与你有关的问题。" : "Open only the questions relevant to you."}</h2><p>{common.limitation}</p></div>
      <div className="faq-library__categories">
        {page.categories.map((category, categoryIndex) => <section id={`faq-category-${categoryIndex + 1}`} aria-labelledby={`faq-category-title-${categoryIndex + 1}`} data-motion-item key={category[0]}>
          <h3 id={`faq-category-title-${categoryIndex + 1}`}>{category[0]}</h3>
          <div>{category[1].map((item, questionIndex) => <details key={item[0]}><summary><span>{String(questionIndex + 1).padStart(2, "0")}</span>{item[0]}<i aria-hidden="true"/></summary><p>{item[1]}{categoryIndex === page.categories.length - 1 && questionIndex === 0 ? <> <a href="https://instagram.com/reflexion.sg" rel="noreferrer">@reflexion.sg</a></> : null}</p></details>)}</div>
        </section>)}
      </div>
    </section>

    <section className="faq-close interior-section interior-section--dark" aria-labelledby="faq-close-title" data-motion-chapter>
      <div data-motion-item><h2 id="faq-close-title">{locale === "zh" ? "准备好探索适合你家庭的选择了吗？" : "Ready to explore what could fit your family?"}</h2><p>{locale === "zh" ? "选择一种形态，查看适用的新加坡发布优惠。今天不会收取付款。" : "Choose a form and see the applicable Singapore launch offer. No payment will be taken today."}</p><div className="interior-final-actions"><ButtonLink href={localisedHref("/get-reflexion", locale)} variant="light">{common.get}</ButtonLink><ButtonLink href={localisedHref("/products", locale)} variant="secondary">{common.products}</ButtonLink></div></div>
    </section>

    <section className="faq-contact interior-section" id="contact-us" aria-labelledby="faq-contact-title" data-motion-chapter>
      <div className="faq-contact__inner" data-motion-item>
        <h2 id="faq-contact-title">{page.contactTitle}</h2>
        <p>{page.contactBody}</p>
        <ContactForm locale={locale}/>
      </div>
    </section>
  </>;
}
