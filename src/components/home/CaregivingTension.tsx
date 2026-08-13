import Image from "next/image";
import type { getHomeContent } from "@/i18n/content";
import { Icon, type IconName } from "@/components/ui/Icon";

type Content = ReturnType<typeof getHomeContent>;

export function CaregivingTension({ content }: { content: Content }) {
  const concernIcons: IconName[] = ["moon", "check", "cup", "message"];
  const responseIcons: IconName[] = ["voice", "message"];
  return <section className="tension" aria-labelledby="tension-title" data-motion-chapter>
    <div className="tension__lead" data-motion-item>
      <p className="eyebrow eyebrow--light">{content.tension.eyebrow}</p>
      <h2 id="tension-title">{content.tension.title}</h2>
      <p className="tension__lead-note">“{content.tension.prompt}”</p>
    </div>
    <ul className="tension__questions" aria-label="Questions caregivers may carry" data-motion-item>
      {content.tension.concerns.map((concern, index) => <li key={concern}>
        <Icon name={concernIcons[index]}/>
        <span>{concern}</span>
      </li>)}
    </ul>
    <div className="tension__signal" data-motion-item>
      <div className="tension__signal-stage">
        <div className="tension__signal-image">
          <Image src="/reflexion-assets/generated/phase1/caregiving-stressed-phone.png" alt="Illustrative adult daughter calling her ageing mother during the workday" fill sizes="(max-width: 820px) 100vw, 36vw"/>
          <div className="tension__signal-veil" aria-hidden="true"/>
        </div>
        <div className="tension__signal-copy">
          <p>{content.tension.intro}</p>
          <strong>“{content.tension.fineAnswer}”</strong>
        </div>
      </div>
      <ul className="tension__responses" aria-label="Why caregivers need more than a phone call">
        {content.tension.limits.map((limit, index) => <li key={limit}>
          <span className="tension__response-icon"><Icon name={responseIcons[index]}/></span>
          <span>{limit}</span>
        </li>)}
      </ul>
    </div>
    <p className="tension__change" data-motion-item>{content.tension.change}</p>
    <figure className="tension__quote" data-motion-item>
      <span className="tension__quote-mark" aria-hidden="true">“</span>
      <div>
        <figcaption>{content.tension.quoteLabel}</figcaption>
        <blockquote>{content.tension.quote}</blockquote>
        <cite>{content.tension.quoteAttribution}</cite>
      </div>
    </figure>
    <p className="tension__closing" data-motion-item>{content.tension.closing}<span aria-hidden="true">⌄</span></p>
  </section>;
}
