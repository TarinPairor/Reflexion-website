import Image from "next/image";
import type { getHomeContent } from "@/i18n/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { RecognitionStrip } from "@/components/site/RecognitionStrip";

type Content = ReturnType<typeof getHomeContent>;
const principleIcons: IconName[] = ["heart", "spark", "message"];

export function TrustFounder({ content }: { content: Content }) {
  return <section className="trust" id="trust" aria-labelledby="trust-title" data-motion-chapter>
    <div className="trust__story" data-motion-item>
      <div className="trust__story-image">
        <Image src="/reflexion-assets/people/family/production-candidates/mama-family-photo.jpg" alt="Kong Kei-Lyn sharing a family moment with her grandmother, Mama" fill sizes="(max-width: 900px) 100vw, 62vw"/>
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

    <div className="trust__perspectives" data-motion-item>
      <h3>{content.trust.perspectivesTitle}</h3>
      <div className="trust__perspectives-grid">
        <figure>
          <span className="trust__perspective-portrait">
            <Image src="/reflexion-assets/generated/phase1/closed-loop-loved-one.webp" alt="Illustrative older loved one" fill sizes="84px"/>
          </span>
          <div>
            <figcaption><strong>{content.sides.lovedTab.replace("01 — ", "")}</strong><small>{content.trust.lovedPerspectiveLabel}</small></figcaption>
            <blockquote>{content.sides.lovedBody}</blockquote>
          </div>
        </figure>
        <figure>
          <span className="trust__perspective-portrait">
            <Image src="/reflexion-assets/generated/phase1/closed-loop-caregiver.webp" alt="Illustrative adult-child caregiver" fill sizes="84px"/>
          </span>
          <div>
            <figcaption><strong>{content.sides.caregiverTab.replace("02 — ", "")}</strong><small>{content.trust.caregiverPerspectiveLabel}</small></figcaption>
            <blockquote>{content.trust.quietQuote}</blockquote>
          </div>
        </figure>
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

    <RecognitionStrip title={content.trust.recognitionTitle} note={content.trust.recognitionNote} items={content.trust.recognition}/>
  </section>;
}
