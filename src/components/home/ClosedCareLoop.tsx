import Image from "next/image";
import type { getHomeContent, Locale } from "@/i18n/content";
import { localisedHref } from "@/lib/siteRoutes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";

type Content = ReturnType<typeof getHomeContent>;

export function ClosedCareLoop({ content, locale }: { content: Content; locale: Locale }) {
  return <section className="care-loop" aria-labelledby="care-loop-title" data-motion-chapter>
    <div className="care-loop__meet" data-motion-item>
      <div className="care-loop__meet-shell">
        <div className="care-loop__meet-copy">
          <p className="eyebrow">{content.loop.meetEyebrow}</p>
          <h2 id="care-loop-title">{content.loop.meetTitle}</h2>
          <p>{content.loop.meetBody}</p>
          <div className="care-loop__audiences">
            <div><span><Image src="/reflexion-assets/generated/phase1/closed-loop-loved-one.webp" alt="" fill sizes="44px"/></span><p>{locale === "zh" ? "为 Margaret：陪伴与日常支持。" : "For Margaret: companionship and routine support."}</p></div>
            <div><span><Image src="/reflexion-assets/generated/phase1/closed-loop-caregiver.webp" alt="" fill sizes="44px"/></span><p>{locale === "zh" ? "为 Mei：有意义的了解与联系。" : "For Mei: meaningful awareness and connection."}</p></div>
          </div>
        </div>
        <div className="care-loop__meet-visual">
          <Image className="care-loop__meet-scene" src="/reflexion-assets/generated/phase1/closed-loop-mirror.webp" alt="Margaret interacting with the Reflexion Mirror" fill sizes="(max-width: 820px) 100vw, 70vw"/>
          <div className="care-loop__meet-fade" aria-hidden="true"/>
          <Image className="care-loop__meet-phone" src="/reflexion-assets/generated/phase1/two-sides-caregiver-app-cutout.webp" alt="Reflexion Caregiver App showing useful context from Margaret’s morning" width={677} height={1302} sizes="(max-width: 520px) 52vw, (max-width: 820px) 42vw, 23vw"/>
        </div>
      </div>
    </div>

    <div className="care-loop__why" data-motion-item>
      <div className="care-loop__why-intro">
        <p className="eyebrow">{content.loop.eyebrow}</p>
        <h3>{content.loop.title}</h3>
        <p>{content.loop.intro}</p>
      </div>
      <div className="care-loop__comparisons">
        {content.loop.comparisons.map((comparison, index) => <article key={comparison[0]}>
          <span><Icon name={index === 0 ? "voice" : index === 1 ? "sun" : "heart"}/></span>
          <h4>{comparison[0]}</h4>
          <p>{comparison[1]}</p>
        </article>)}
      </div>
      <div className="care-loop__comparison-accordions">
        {content.loop.comparisons.map((comparison, index) => <details key={comparison[0]}>
          <summary>
            <span className="care-loop__comparison-icon"><Icon name={index === 0 ? "voice" : index === 1 ? "sun" : "heart"}/></span>
            <strong>{comparison[0]}</strong>
            <Icon className="care-loop__comparison-chevron" name="arrow"/>
          </summary>
          <p>{comparison[1]}</p>
        </details>)}
      </div>
    </div>

    <div className="care-loop__closed" data-motion-item data-sticky-cta-suppression>
      <div className="care-loop__closed-copy">
        <p className="eyebrow">{content.loop.closedEyebrow}</p>
        <h3>{content.loop.closedTitle}</h3>
        <p>{content.loop.closedBody}</p>
        <ButtonLink href={localisedHref("/how-it-works", locale)}>{content.hero.secondary}</ButtonLink>
      </div>
      <div className="care-loop__diagram" aria-label="Loved one and caregiver connected through insight, companionship, support and connection">
        <svg className="care-loop__lines" viewBox="0 0 700 220" aria-hidden="true">
          <defs><marker id="care-loop-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 10 5 0 10Z"/></marker></defs>
          <path data-motion-path markerEnd="url(#care-loop-arrow)" d="M92 110C190 8 510 8 608 110"/><path data-motion-path markerEnd="url(#care-loop-arrow)" d="M608 110C510 212 190 212 92 110"/>
        </svg>
        <div className="care-loop__endpoint care-loop__endpoint--loved"><span className="care-loop__avatar"><Image src="/reflexion-assets/generated/phase1/closed-loop-loved-one.webp" alt="Illustrative older loved one" fill sizes="84px"/></span><b>{content.loop.steps[0][0]}</b><small>Older adult</small></div>
        <div className="care-loop__brand-center"><Image className="care-loop__brand-mark" src="/reflexion-assets/generated/phase1/reflexion-loop-logo-v1.png" alt="Reflexion" width={72} height={72}/></div>
        <div className="care-loop__endpoint care-loop__endpoint--caregiver"><span className="care-loop__avatar"><Image src="/reflexion-assets/generated/phase1/closed-loop-caregiver.webp" alt="Illustrative adult-child caregiver" fill sizes="84px"/></span><b>Caregiver</b><small>Adult child</small></div>
        {content.pillars.map((pillar, index) => <span className={`care-loop__value care-loop__value--${index + 1}`} key={pillar}><Icon name={index === 0 ? "spark" : index === 1 ? "message" : index === 2 ? "check" : "heart"}/><small>{pillar}</small></span>)}
      </div>
    </div>
  </section>;
}
