import Image from "next/image";
import type { getHomeContent } from "@/i18n/content";
import { Icon, type IconName } from "@/components/ui/Icon";

type Content = ReturnType<typeof getHomeContent>;

export function CaregivingTension({ content }: { content: Content }) {
  const concernIcons: IconName[] = ["moon", "check", "cup", "message"];
  return <section className="tension" aria-labelledby="tension-title" data-motion-chapter>
    <div className="tension__hero" data-motion-item>
      <Image className="tension__image" src="/reflexion-assets/generated/phase1/caregiving-distance-v2.webp" alt="Illustrative scene of an independent older mother at home and her adult daughter pausing during a busy workday" fill sizes="100vw"/>
      <div className="tension__veil" aria-hidden="true"/>
      <div className="tension__hero-content">
        <p className="eyebrow eyebrow--light">{content.tension.eyebrow}</p>
        <h2 id="tension-title">{content.tension.title}</h2>
        <p className="tension__prompt">“{content.tension.prompt}”</p>
        <p className="tension__intro">{content.tension.intro}</p>
        <ul className="tension__concerns" aria-label="Questions caregivers may carry">
          {content.tension.concerns.map((concern, index) => <li key={concern}><Icon name={concernIcons[index]}/><span>{concern}</span></li>)}
        </ul>
      </div>
    </div>
    <div className="tension__fine" data-motion-item>
      <div className="tension__fine-image"><Image src="/reflexion-assets/generated/phase1/caregiving-distance-v2.webp" alt="Illustrative adult daughter pausing with her phone during the workday" fill sizes="(max-width: 820px) 100vw, 38vw"/></div>
      <div className="tension__fine-copy"><p>{content.tension.fineLead}</p><strong>“{content.tension.fineAnswer}”</strong></div>
      <ul>{content.tension.limits.map((limit, index) => <li key={limit}><Icon name={index === 0 ? "voice" : "message"}/><span>{limit}</span></li>)}</ul>
    </div>
    <p className="tension__change" data-motion-item>{content.tension.change}</p>
    {/* SYNTHETIC / ILLUSTRATIVE marketing perspective. No real-person attribution. */}
    <figure className="tension__quote" data-motion-item>
      <span aria-hidden="true">“</span>
      <div><figcaption>{content.tension.quoteLabel}</figcaption><blockquote>“{content.tension.quote}”</blockquote><cite>{content.tension.quoteAttribution}</cite></div>
    </figure>
    <div className="tension__why" data-motion-item>
      <p>{content.tension.question}</p>
      <p>{content.tension.body}</p>
    </div>
    <p className="tension__closing" data-motion-item>{content.tension.closing}<span aria-hidden="true">⌄</span></p>
  </section>;
}
