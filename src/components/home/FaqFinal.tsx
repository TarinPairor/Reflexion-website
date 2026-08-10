import type { getHomeContent, Locale } from "@/i18n/content";
import { localisedHref } from "@/lib/siteRoutes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MirrorScene } from "@/components/product/DeviceCompositions";

type Content = ReturnType<typeof getHomeContent>;

export function FaqFinal({ content, locale }: { content: Content; locale: Locale }) {
  return <section className="faq-final" id="faq" aria-labelledby="faq-title" data-motion-chapter>
    <div className="faq-preview">
      <div className="faq-preview__heading" data-motion-item><p className="eyebrow">{content.faq.eyebrow}</p><h2 id="faq-title">{content.faq.title}</h2></div>
      <div className="faq-preview__items" data-motion-item>
        {content.faq.items.map((item, index) => <details key={item[0]} open={index === 0}>
          <summary><span>{String(index + 1).padStart(2, "0")}</span>{item[0]}<i aria-hidden="true"/></summary>
          <p>{item[1]}</p>
        </details>)}
      </div>
    </div>
    <div className="final-cta" id="get-reflexion" data-motion-item>
      <div className="final-cta__copy">
        <p className="eyebrow eyebrow--light">{content.faq.finalEyebrow}</p>
        <h2>{content.faq.finalTitle}</h2>
        <p>{content.faq.finalBody}</p>
        <div className="hero__actions"><ButtonLink href={localisedHref("/get-reflexion", locale)} variant="light">{content.hero.primary}</ButtonLink><ButtonLink href={localisedHref("/how-it-works", locale)} variant="secondary">{content.hero.secondary}</ButtonLink></div>
        <small>Explore proposed Singapore launch offers. No payment will be taken today.</small>
      </div>
      <div className="final-cta__visual" aria-hidden="true">
        <MirrorScene
          compact
          imageSrc="/reflexion-assets/generated/phase1/reflexion-hero-founder-2026-08.webp"
          imageAlt="The Reflexion Mirror and Caregiver App presented together in a warm home setting"
        />
        <span className="final-cta__halo"/>
      </div>
    </div>
  </section>;
}
