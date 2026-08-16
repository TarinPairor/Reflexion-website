import Image from "next/image";
import type { Locale, getHomeContent } from "@/i18n/content";
import type { PageContent } from "@/i18n/pages";
import { productOptions, type ProductId } from "@/lib/get-reflexion/config";
import { localisedHref } from "@/lib/siteRoutes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { ProductSelection } from "./ProductSelection";
import { productFormImages } from "@/lib/productAssets";

type HomeContent = ReturnType<typeof getHomeContent>;
const mirrorProductsImage = "/reflexion-assets/generated/phase1/products-mirror-family-landscape.png";

export function ProductsPage({ locale, home, page, common }: { locale: Locale; home: HomeContent; page: PageContent["products"]; common: PageContent["common"] }) {
  const alternatives = productOptions.filter((product) => product.id !== "mirror");
  const localizedProductLabels = {
    mirror: { name: home.products.mirrorName, maturity: home.products.current },
    "loved-one-app": { name: home.products.appName, maturity: home.products.app },
    bear: { name: home.products.bearName, maturity: home.products.bear },
    "home-hub": { name: home.products.hubName, maturity: home.products.hub },
    "tabletop-companion": { name: home.products.companionName, maturity: home.products.companion },
  } satisfies Record<ProductId, { name: string; maturity: string }>;
  const localizedProductCopy = {
    mirror: home.products.mirrorBody,
    "loved-one-app": home.products.appBody,
    bear: home.products.bearBody,
    "home-hub": home.products.hubBody,
    "tabletop-companion": home.products.companionBody,
  } satisfies Record<ProductId, string>;
  return <>
    <section className="interior-hero interior-hero--products interior-hero--text-only" id="top" aria-labelledby="products-page-title" data-motion-chapter>
      <div className="interior-hero__copy" data-motion-item><p className="eyebrow">{home.nav[2]}</p><h1 id="products-page-title">{page.heroTitle}</h1>{page.heroBody ? <p>{page.heroBody}</p> : null}<div className="hero__actions"><ButtonLink href="#choose-form">{locale === "zh" ? "选择你的 Reflexion" : "Choose your Reflexion"}</ButtonLink></div></div>
    </section>

    <section className="product-mirror interior-section" aria-labelledby="mirror-title" data-motion-chapter>
      <div className="product-mirror__visual" data-motion-item><Image src={mirrorProductsImage} alt="Reflexion Mirror and caregiver phone in a warm home setting" fill sizes="(max-width: 820px) 100vw, 60vw"/></div>
      <div className="product-mirror__copy" data-motion-item><p className="maturity maturity--current">{localizedProductLabels.mirror.maturity}</p><h2 id="mirror-title">{page.mirrorTitle}</h2><p>{page.mirrorBody}</p><ul>{productOptions[0].included.map((item) => <li key={item}>{item}</li>)}</ul><ButtonLink href={localisedHref("/get-reflexion?form=mirror", locale)}>{common.get}</ButtonLink></div>
    </section>

    <section className="product-forms interior-section" aria-labelledby="other-forms-title" data-motion-chapter>
      <div className="interior-section__heading" data-motion-item><h2 id="other-forms-title">{page.otherTitle}</h2><p>{page.otherBody}</p></div>
      <div className="product-family__list product-forms__list--compact">
        {alternatives.map((product) => <article id={`form-${product.id}`} data-motion-item key={product.id}>
          <div className={`product-family__thumb product-family__thumb--${product.id}`}><Image src={productFormImages[product.id]} alt={`${localizedProductLabels[product.id].name} product direction`} fill sizes="(max-width: 767px) 92px, 170px"/></div>
          <div className="product-family__item-copy"><h3>{localizedProductLabels[product.id].name}</h3><p className="maturity">{localizedProductLabels[product.id].maturity}</p><p>{localizedProductCopy[product.id]}</p><a href={localisedHref(`/get-reflexion?form=${product.id}`, locale)}>{home.products.learnMore} <Icon name="arrow"/></a></div>
          <span className="product-family__item-arrow" aria-hidden="true"><Icon name="arrow"/></span>
        </article>)}
      </div>
    </section>

    <div id="choose-form" className="product-selection-wrap interior-section" data-motion-chapter><ProductSelection locale={locale} labels={localizedProductLabels} title={page.selectTitle} body={page.selectBody} cta={common.get}/></div>

    <section className="caregiver-connection interior-section interior-section--sage" aria-labelledby="caregiver-connection-title" data-motion-chapter>
      <div className="caregiver-connection__copy" data-motion-item><h2 id="caregiver-connection-title">{page.caregiverTitle}</h2><p>{page.caregiverBody}</p><ButtonLink href={localisedHref("/how-it-works", locale)} variant="secondary">{common.how}</ButtonLink></div>
      <div className="caregiver-connection__phone" data-motion-item><Image className="caregiver-phone-asset" src="/reflexion-assets/generated/phase1/caregiver-app-home-high-quality-transparent.png" alt="Reflexion Caregiver App showing a morning update for Mum" fill sizes="(max-width: 767px) 58vw, 275px" unoptimized/></div>
    </section>

    <section className="decision-support decision-support--single interior-section" aria-labelledby="decision-support-title" data-motion-chapter>
      <div data-motion-item><p className="eyebrow">{page.proofLabel}</p><h2 id="decision-support-title">{page.supportTitle}</h2><p>{page.supportBody}</p></div>
      <div className="interior-final-actions" data-motion-item><ButtonLink href={localisedHref("/get-reflexion", locale)}>{common.get}</ButtonLink></div>
    </section>
  </>;
}
