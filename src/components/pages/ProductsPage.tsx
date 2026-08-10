import Image from "next/image";
import type { Locale, getHomeContent } from "@/i18n/content";
import type { PageContent } from "@/i18n/pages";
import { productOptions } from "@/lib/get-reflexion/config";
import { localisedHref } from "@/lib/siteRoutes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CaregiverPhone } from "@/components/product/DeviceCompositions";
import { ProductSelection } from "./ProductSelection";

type HomeContent = ReturnType<typeof getHomeContent>;

const formImages = {
  mirror: "/reflexion-assets/generated/phase1/product-family-mirror.webp",
  "loved-one-app": "/reflexion-assets/generated/phase1/product-family-loved-app-user.webp",
  bear: "/reflexion-assets/generated/phase1/product-family-bear.webp",
  "home-hub": "/reflexion-assets/generated/phase1/product-family-home-hub.webp",
  "tabletop-companion": "/reflexion-assets/generated/phase1/product-family-tabletop.webp",
} as const;

export function ProductsPage({ locale, home, page, common }: { locale: Locale; home: HomeContent; page: PageContent["products"]; common: PageContent["common"] }) {
  const alternatives = productOptions.filter((product) => product.id !== "mirror");
  return <>
    <section className="interior-hero interior-hero--products" id="top" aria-labelledby="products-page-title" data-motion-chapter>
      <div className="interior-hero__image" data-motion-item><Image src="/reflexion-assets/generated/phase1/product-family-mirror.webp" alt="Reflexion Mirror in a warm home setting" fill priority sizes="(max-width: 820px) 100vw, 58vw"/></div>
      <div className="interior-hero__copy" data-motion-item><p className="eyebrow">{home.nav[1]}</p><h1 id="products-page-title">{page.heroTitle}</h1><p>{page.heroBody}</p><div className="hero__actions"><ButtonLink href="#choose-form">{locale === "zh" ? "选择形态" : "Choose a form"}</ButtonLink></div></div>
    </section>

    <section className="product-mirror interior-section" aria-labelledby="mirror-title" data-motion-chapter>
      <div className="product-mirror__visual" data-motion-item><Image src="/reflexion-assets/generated/phase1/reflexion-mirror-home.webp" alt="A source-grounded representation of the 21.5-inch Reflexion Mirror at home" fill sizes="(max-width: 820px) 100vw, 60vw"/></div>
      <div className="product-mirror__copy" data-motion-item><p className="maturity maturity--current">{productOptions[0].maturity}</p><h2 id="mirror-title">{page.mirrorTitle}</h2><p>{page.mirrorBody}</p><ul>{productOptions[0].included.map((item) => <li key={item}>{item}</li>)}</ul><ButtonLink href={localisedHref("/get-reflexion?form=mirror", locale)}>{common.get}</ButtonLink></div>
    </section>

    <section className="product-forms interior-section" aria-labelledby="other-forms-title" data-motion-chapter>
      <div className="interior-section__heading" data-motion-item><h2 id="other-forms-title">{page.otherTitle}</h2><p>{page.otherBody}</p></div>
      <div className="product-forms__list">
        {alternatives.map((product, index) => <article id={`form-${product.id}`} data-motion-item key={product.id}>
          <div className="product-forms__image"><Image src={formImages[product.id]} alt={`${product.name} product direction`} fill sizes="(max-width: 520px) 100vw, (max-width: 1100px) 48vw, 24vw"/></div>
          <div className="product-forms__copy"><span>0{index + 2}</span><p className="maturity">{product.maturity}</p><h3>{product.name}</h3><p>{product.description}</p><ButtonLink href={localisedHref(`/get-reflexion?form=${product.id}`, locale)} variant="secondary">{common.get}</ButtonLink></div>
        </article>)}
      </div>
    </section>

    <section className="product-compare interior-section" aria-labelledby="compare-title" data-motion-chapter>
      <div className="interior-section__heading" data-motion-item><h2 id="compare-title">{page.compareTitle}</h2><p>{page.compareBody}</p></div>
      <div className="product-compare__scroll" data-motion-item><table><thead><tr>{page.compareHeadings.map((heading) => <th scope="col" key={heading}>{heading}</th>)}</tr></thead><tbody>{page.compareRows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th scope="row" key={cell}>{cell}</th> : <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>
    </section>

    <div id="choose-form" className="product-selection-wrap interior-section" data-motion-chapter><ProductSelection locale={locale} title={page.selectTitle} body={page.selectBody} cta={common.get}/></div>

    <section className="caregiver-connection interior-section interior-section--sage" aria-labelledby="caregiver-connection-title" data-motion-chapter>
      <div className="caregiver-connection__copy" data-motion-item><h2 id="caregiver-connection-title">{page.caregiverTitle}</h2><p>{page.caregiverBody}</p><ButtonLink href={localisedHref("/how-it-works", locale)} variant="secondary">{common.how}</ButtonLink></div>
      <div className="caregiver-connection__phone" data-motion-item><CaregiverPhone mode="today"/></div>
    </section>

    <section className="decision-support interior-section" aria-labelledby="decision-support-title" data-motion-chapter>
      <div data-motion-item><p className="eyebrow">{page.proofLabel}</p><h2 id="decision-support-title">{page.supportTitle}</h2><p>{page.supportBody}</p></div>
      <aside data-motion-item><p>{page.proofBody}</p></aside>
      <div className="interior-final-actions" data-motion-item><ButtonLink href={localisedHref("/get-reflexion", locale)}>{common.get}</ButtonLink></div>
    </section>
  </>;
}
