import type { getHomeContent, Locale } from "@/i18n/content";
import { localisedHref } from "@/lib/siteRoutes";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Content = ReturnType<typeof getHomeContent>;

export function HomeTransitionCta({ content, locale }: { content: Content; locale: Locale }) {
  return <section className="home-transition" aria-labelledby="home-transition-title" data-motion-chapter>
    <div className="home-transition__card" data-motion-item>
      <h2 id="home-transition-title">{content.day.closingTitle}</h2>
      <p>{content.day.closingBody}</p>
      <div className="home-transition__actions">
        <ButtonLink href={localisedHref("/how-it-works", locale)}>{content.hero.secondary}</ButtonLink>
        <ButtonLink href={localisedHref("/products", locale)} variant="secondary">{content.products.exploreCta}</ButtonLink>
      </div>
    </div>
  </section>;
}
