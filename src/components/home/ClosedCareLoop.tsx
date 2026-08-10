import Image from "next/image";
import type { getHomeContent } from "@/i18n/content";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";

type Content = ReturnType<typeof getHomeContent>;

export function ClosedCareLoop({ content }: { content: Content }) {
  return <section className="care-loop" aria-labelledby="care-loop-title" data-motion-chapter>
    <div className="care-loop__meet" data-motion-item>
      <div className="care-loop__meet-copy">
        <p className="eyebrow">{content.loop.meetEyebrow}</p>
        <h2 id="care-loop-title">{content.loop.meetTitle}</h2>
        <p>{content.loop.meetBody}</p>
        <div className="care-loop__sides">
          <p><span className="care-loop__mini-avatar"><Image src="/reflexion-assets/generated/phase1/closed-loop-loved-one.webp" alt="" fill sizes="38px"/></span>{content.loop.lovedSide}</p>
          <p><span className="care-loop__mini-avatar"><Image src="/reflexion-assets/generated/phase1/closed-loop-caregiver.webp" alt="" fill sizes="38px"/></span>{content.loop.caregiverSide}</p>
        </div>
      </div>
      <div className="care-loop__devices">
        <Image className="care-loop__scene" src="/reflexion-assets/generated/phase1/closed-loop-mirror.webp" alt="Illustrative older adult using a website representation of the Reflexion Mirror, with the Caregiver App at the edge of the scene" fill sizes="(max-width: 820px) 100vw, 65vw"/>
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
        <ButtonLink href="#day-with-reflexion">{content.hero.secondary}</ButtonLink>
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
