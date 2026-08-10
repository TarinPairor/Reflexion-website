import Image from "next/image";
import type { getHomeContent } from "@/i18n/content";
import { Icon, type IconName } from "@/components/ui/Icon";

type Content = ReturnType<typeof getHomeContent>;
const principleIcons: IconName[] = ["heart", "spark", "message"];

export function TrustFounder({ content }: { content: Content }) {
  return <section className="trust" id="trust" aria-labelledby="trust-title" data-motion-chapter>
    <div className="trust__story" data-motion-item>
      <div className="trust__story-image">
        <Image src="/reflexion-assets/generated/phase1/reflexion-hero-founder-2026-08.webp" alt="The Reflexion Mirror and Caregiver App presented together in a warm home setting" fill sizes="(max-width: 900px) 100vw, 62vw"/>
      </div>
      <div className="trust__story-copy">
        <p className="eyebrow">{content.trust.builtEyebrow}</p>
        <h2 id="trust-title">{content.trust.independenceTitle}</h2>
        <p>{content.trust.intro}</p>
        <div className="trust__quiet-proof">
          <p className="eyebrow">{content.trust.quietEyebrow}</p>
          {/* SYNTHETIC / ILLUSTRATIVE marketing perspective. No real-person attribution. */}
          <blockquote>“{content.trust.quietQuote}”</blockquote>
          <small>{content.trust.quietQuoteLabel}</small>
        </div>
      </div>
    </div>

    <div className="trust__origin" data-motion-item>
      <p className="eyebrow">{content.trust.founderEyebrow}</p>
      <div>
        <h3>{content.trust.founderTitle}</h3>
        <p>{content.trust.founderBody}</p>
      </div>
      <p className="trust__founders">{content.trust.founders}</p>
    </div>

    <div className="trust__principles" data-motion-item>
      {content.trust.principles.map((principle, index) => <article key={principle[0]}><span><Icon name={principleIcons[index]}/></span><div><h3>{principle[0]}</h3><p>{principle[1]}</p></div></article>)}
    </div>

    <div className="recognition" aria-labelledby="recognition-title" data-motion-item>
      <div className="recognition__heading"><p className="eyebrow">RECOGNISED FOR INNOVATION AND IMPACT</p><h3 id="recognition-title">{content.trust.recognitionTitle}</h3><p>{content.trust.recognitionNote}</p></div>
      <ul>{content.trust.recognition.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ul>
    </div>
  </section>;
}
