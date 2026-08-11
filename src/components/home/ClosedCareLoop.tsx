import Image from "next/image";
import type { getHomeContent, Locale } from "@/i18n/content";
import { localisedHref } from "@/lib/siteRoutes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";

type Content = ReturnType<typeof getHomeContent>;

export function ClosedCareLoop({ content, locale }: { content: Content; locale: Locale }) {
  return <section className="care-loop" aria-labelledby="care-loop-title" data-motion-chapter>
    <div className="care-loop__meet" data-motion-item>
      <div className="care-loop__meet-copy">
        <p className="eyebrow">{content.loop.meetEyebrow}</p>
        <h2 id="care-loop-title">{content.loop.meetTitle}</h2>
        <p>{content.loop.meetBody}</p>
      </div>
      <div className="care-loop__experience-cards">
        <article className="care-loop__experience-card care-loop__experience-card--margaret">
          <div className="care-loop__experience-copy">
            <p>{locale === "zh" ? "为 Margaret" : "For Margaret"}</p>
            <h3>{locale === "zh" ? "陪伴与日常支持。" : "Companionship and routine support."}</h3>
          </div>
          <Image className="care-loop__margaret-scene" src="/reflexion-assets/generated/phase1/closed-loop-mirror.webp" alt="Illustrative Margaret interacting with the Reflexion Mirror" fill sizes="(max-width: 820px) 100vw, 58vw"/>
        </article>
        <article className="care-loop__experience-card care-loop__experience-card--mei">
          <div className="care-loop__experience-copy">
            <p>{locale === "zh" ? "为 Mei" : "For Mei"}</p>
            <h3>{locale === "zh" ? "有意义的了解与联系。" : "Meaningful awareness and connection."}</h3>
          </div>
          <span className="care-loop__mei-portrait"><Image src="/reflexion-assets/generated/phase1/closed-loop-caregiver.webp" alt="Illustrative Mei using her phone" fill sizes="96px"/></span>
          <Image className="care-loop__caregiver-app" src="/reflexion-assets/generated/phase1/two-sides-caregiver-app-cutout.webp" alt="Website representation of the Reflexion Caregiver App showing Margaret’s weekly context" width={677} height={1302} sizes="(max-width: 520px) 58vw, (max-width: 820px) 46vw, 25vw"/>
        </article>
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
    </div>

    <div className="care-loop__closed" data-motion-item>
      <div className="care-loop__closed-copy">
        <p className="eyebrow">{content.loop.closedEyebrow}</p>
        <h3>{content.loop.closedTitle}</h3>
        <p>{content.loop.closedBody}</p>
        <ButtonLink href={localisedHref("/how-it-works", locale)}>{content.hero.secondary}</ButtonLink>
      </div>
      <div className="care-loop__diagram" aria-label="Loved one and caregiver connected through insight, companionship, support and connection">
        <svg className="care-loop__lines" viewBox="0 0 700 220" aria-hidden="true"><path data-motion-path d="M92 110C190 8 510 8 608 110"/><path data-motion-path d="M608 110C510 212 190 212 92 110"/></svg>
        <div className="care-loop__endpoint care-loop__endpoint--loved"><span className="care-loop__avatar"><Image src="/reflexion-assets/generated/phase1/closed-loop-loved-one.webp" alt="Illustrative older loved one" fill sizes="84px"/></span><b>{content.loop.steps[0][0]}</b><small>Older adult</small></div>
        <div className="care-loop__brand-center"><strong>Reflexion</strong><small>Mirror + Caregiver App</small></div>
        <div className="care-loop__endpoint care-loop__endpoint--caregiver"><span className="care-loop__avatar"><Image src="/reflexion-assets/generated/phase1/closed-loop-caregiver.webp" alt="Illustrative adult-child caregiver" fill sizes="84px"/></span><b>Caregiver</b><small>Adult child</small></div>
        {content.pillars.map((pillar, index) => <span className={`care-loop__value care-loop__value--${index + 1}`} key={pillar}><Icon name={index === 0 ? "spark" : index === 1 ? "message" : index === 2 ? "check" : "heart"}/><small>{pillar}</small></span>)}
      </div>
    </div>
  </section>;
}
