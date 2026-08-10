import type { getHomeContent } from "@/i18n/content";
import { CaregiverPhone, MirrorScene } from "@/components/product/DeviceCompositions";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";

type Content = ReturnType<typeof getHomeContent>;

export function ClosedCareLoop({ content }: { content: Content }) {
  return <section className="care-loop" aria-labelledby="care-loop-title">
    <div className="care-loop__meet">
      <div className="care-loop__meet-copy">
        <p className="eyebrow">{content.loop.meetEyebrow}</p>
        <h2 id="care-loop-title">{content.loop.meetTitle}</h2>
        <p>{content.loop.meetBody}</p>
        <div className="care-loop__sides">
          <p><span className="care-loop__mini-avatar" aria-hidden="true"/>{content.loop.lovedSide}</p>
          <p><span className="care-loop__mini-avatar" aria-hidden="true"/>{content.loop.caregiverSide}</p>
        </div>
      </div>
      <div className="care-loop__devices">
        <div className="care-loop__mirror"><MirrorScene compact/></div>
        <div className="care-loop__device-phone"><CaregiverPhone mode="today"/></div>
      </div>
    </div>

    <div className="care-loop__why">
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

    <div className="care-loop__closed">
      <div className="care-loop__closed-copy">
        <p className="eyebrow">{content.loop.closedEyebrow}</p>
        <h3>{content.loop.closedTitle}</h3>
        <p>{content.loop.closedBody}</p>
        <ButtonLink href="#day-with-reflexion">{content.hero.secondary}</ButtonLink>
      </div>
      <div className="care-loop__diagram" aria-label="Loved one and caregiver connected through insight, companionship, support and connection">
        <svg className="care-loop__lines" viewBox="0 0 700 220" aria-hidden="true"><path d="M92 110C190 8 510 8 608 110"/><path d="M608 110C510 212 190 212 92 110"/></svg>
        <div className="care-loop__endpoint care-loop__endpoint--loved"><span className="care-loop__avatar-placeholder" aria-hidden="true"/><b>{content.loop.steps[0][0]}</b><small>Image placeholder</small></div>
        <div className="care-loop__brand-center"><strong>Reflexion</strong><small>Mirror + Caregiver App</small></div>
        <div className="care-loop__endpoint care-loop__endpoint--caregiver"><span className="care-loop__avatar-placeholder" aria-hidden="true"/><b>Caregiver</b><small>Image placeholder</small></div>
        {content.pillars.map((pillar, index) => <span className={`care-loop__value care-loop__value--${index + 1}`} key={pillar}><Icon name={index === 0 ? "spark" : index === 1 ? "message" : index === 2 ? "check" : "heart"}/><small>{pillar}</small></span>)}
      </div>
    </div>
  </section>;
}
