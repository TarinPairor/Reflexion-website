import Image from "next/image";
import type { getHomeContent, Locale } from "@/i18n/content";
import { localisedHref } from "@/lib/siteRoutes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";

type Content = ReturnType<typeof getHomeContent>;

export function HomeHero({ content, locale }: { content: Content; locale: Locale }) {
  return <section className="hero" id="top" aria-labelledby="hero-title" data-motion-hero>
    <div className="hero__artwork" data-motion-hero-artwork>
      <Image
        className="hero__art hero__art--desktop"
        src="/reflexion-assets/generated/phase1/reflexion-hero-grandma-2026-08.png"
        alt="The Reflexion Mirror and Caregiver App presented together in a bright home setting"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
      />
      <Image
        className="hero__art hero__art--mobile"
        src="/reflexion-assets/generated/phase1/reflexion-hero-grandma-2026-08.png"
        alt="The Reflexion Mirror and Caregiver App together in a bright home setting"
        width={1672}
        height={941}
        priority
        sizes="100vw"
      />
      <p className="hero__caption">21.5-inch Reflexion Mirror <span>+ Caregiver App</span></p>
    </div>
    <div className="hero__glow" aria-hidden="true"/>
    <div className="hero__copy" data-motion-hero-copy>
      <p className="eyebrow">{content.hero.eyebrow}</p>
      <h1 id="hero-title">{content.hero.headline}</h1>
      <p className="hero__support">{content.hero.supporting}</p>
      <div className="hero__actions">
        <ButtonLink href={localisedHref("/get-reflexion", locale)}>{content.hero.primary}</ButtonLink>
        <ButtonLink href={localisedHref("/how-it-works", locale)} variant="secondary">{content.hero.secondary}</ButtonLink>
      </div>
      <div className="hero__feature">
        <span className="hero__feature-icon" aria-hidden="true"><Icon name="spark" width={22} height={22}/></span>
        <div className="hero__feature-copy">
          <strong>{content.hero.feature}</strong>
          <span className="hero__feature-points">{content.pillars.slice(1).map((pillar) => <span key={pillar}>{pillar}</span>)}</span>
        </div>
      </div>
    </div>
  </section>;
}
