import Image from "next/image";
import type { getHomeContent, Locale } from "@/i18n/content";
import { localisedHref } from "@/lib/siteRoutes";
import { Icon, type IconName } from "@/components/ui/Icon";
import { RecognitionStrip } from "@/components/site/RecognitionStrip";

type Content = ReturnType<typeof getHomeContent>;
const principleIcons: IconName[] = ["heart", "spark", "message"];

export function TrustFounder({ content, locale }: { content: Content; locale: Locale }) {
  return <section className="trust" id="trust" aria-labelledby="trust-title" data-motion-chapter>
    <div className="trust__story" data-motion-item>
      <div className="trust__story-image">
        <Image src="/reflexion-assets/generated/phase1/trust-family-scene-v2.png" alt="Illustrative older adult and her daughter sharing a family photograph at home, with Reflexion nearby" fill sizes="(max-width: 900px) 100vw, 62vw"/>
      </div>
      <div className="trust__story-copy">
        <div className="trust__story-lead">
          <p className="eyebrow">{content.trust.builtEyebrow}</p>
          <h2 id="trust-title">{content.trust.independenceTitle}</h2>
          <p>{content.trust.intro}</p>
        </div>
        <div className="trust__quiet-proof">
          <p className="eyebrow">{content.trust.quietEyebrow}</p>
          <p className="trust__proof-statement">{content.trust.quietQuote}</p>
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
            <p className="trust__perspective-statement">{content.sides.lovedBody}</p>
          </div>
        </figure>
        <figure>
          <span className="trust__perspective-portrait">
            <Image src="/reflexion-assets/generated/phase1/closed-loop-caregiver.webp" alt="Illustrative adult-child caregiver" fill sizes="84px"/>
          </span>
          <div>
            <figcaption><strong>{content.sides.caregiverTab.replace("02 — ", "")}</strong><small>{content.trust.caregiverPerspectiveLabel}</small></figcaption>
            <p className="trust__perspective-statement">{content.trust.quietQuote}</p>
          </div>
        </figure>
      </div>
    </div>

    <div className="trust__principles" data-motion-item>
      {content.trust.principles.map((principle, index) => <article key={principle[0]}><span><Icon name={principleIcons[index]}/></span><div><h3>{principle[0]}</h3><p>{principle[1]}</p></div></article>)}
    </div>

    <RecognitionStrip title={content.trust.recognitionTitle} note={content.trust.recognitionNote} items={content.trust.recognition}/>
    <div className="trust__faq-prompt" data-motion-item>
      <span aria-hidden="true">?</span>
      <p>{locale === "zh" ? "还有关于隐私、适配或如何开始的问题？" : "Still have questions about privacy, fit or getting started?"}</p>
      <a href={localisedHref("/faq", locale)}>{locale === "zh" ? "查看全部常见问题" : "Explore all FAQs"}<Icon name="arrow"/></a>
    </div>
  </section>;
}
