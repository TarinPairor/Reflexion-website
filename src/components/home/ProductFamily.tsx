import Image from "next/image";
import type { getHomeContent } from "@/i18n/content";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";

type Content = ReturnType<typeof getHomeContent>;

export function ProductFamily({ content }: { content: Content }) {
  const alternatives = [
    [content.products.bearName, content.products.bear, content.products.bearBody, "bear", "/reflexion-assets/generated/phase1/product-family-bear.webp", "Illustrative Reflexion Bear prototype in a warm home setting"],
    [content.products.appName, content.products.app, content.products.appBody, "app", "/reflexion-assets/generated/phase1/product-family-loved-app.webp", "Illustrative older adult holding a phone representation of the Loved-one App"],
    [content.products.hubName, content.products.hub, content.products.hubBody, "hub", "/reflexion-assets/generated/phase1/product-family-home-hub.webp", "Illustrative Reflexion Home Hub concept on a side table"],
    [content.products.companionName, content.products.companion, content.products.companionBody, "companion", "/reflexion-assets/generated/phase1/product-family-tabletop.webp", "Illustrative Tabletop Companion future concept in a warm home setting"],
  ] as const;
  return <section className="product-family" id="find-your-reflexion" aria-labelledby="products-title">
    <div className="product-family__layout">
      <div className="product-family__primary">
        <div className="product-family__heading">
          <p className="eyebrow">{content.products.eyebrow}</p>
          <h2 id="products-title">{content.products.title}</h2>
          <p>{content.products.intro}</p>
        </div>

        <article className="flagship">
          <div className="flagship__visual">
            <Image
              src="/reflexion-assets/generated/phase1/product-family-mirror.webp"
              alt="Founder-selected website visual of the Reflexion Mirror on a wooden cabinet in a warm home setting"
              fill
              sizes="(max-width: 1100px) 100vw, 64vw"
              className="flagship__image"
            />
          </div>
          <div className="flagship__copy">
            <p className="eyebrow">{content.products.flagshipEyebrow}</p>
            <h3>{content.products.mirrorName}</h3>
            <p>{content.products.mirrorBody}</p>
            <div className="flagship__actions">
              <ButtonLink href="#get-reflexion">{content.hero.primary}</ButtonLink>
              <a href="#get-reflexion">{content.products.exploreMirror} <Icon name="arrow"/></a>
            </div>
          </div>
          <span className="maturity maturity--current">{content.products.current}</span>
        </article>
      </div>

      <aside className="product-family__alternatives" aria-labelledby="other-products-title">
        <h3 id="other-products-title">{content.products.otherTitle}</h3>
        <div className="product-family__list">
          {alternatives.map(([name, maturity, body, form, image, alt]) => <article key={name}>
            <div className={`product-family__thumb product-family__thumb--${form}`}>
              <Image src={image} alt={alt} fill sizes="(max-width: 520px) 120px, 170px"/>
            </div>
            <div className="product-family__item-copy">
              <h4>{name}</h4>
              <p className="maturity">{maturity}</p>
              <p>{body}</p>
              <a href="#get-reflexion">{content.products.learnMore} <Icon name="arrow"/></a>
            </div>
          </article>)}
        </div>
      </aside>
    </div>

    <div className="product-family__decision">
      <span aria-hidden="true"><Icon name="heart"/></span>
      <p><strong>{content.products.decisionQuestion}</strong><small>{content.products.note}</small></p>
      <ButtonLink href="#get-reflexion" variant="secondary">{content.products.decisionCta}</ButtonLink>
    </div>
  </section>;
}
