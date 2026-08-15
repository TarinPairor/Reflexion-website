import Image from "next/image";
import type { getHomeContent } from "@/i18n/content";
import { Icon, type IconName } from "@/components/ui/Icon";

type Content = ReturnType<typeof getHomeContent>;

const principleIcons: IconName[] = ["heart", "spark", "message"];

const recognitionMarks = [
  { src: "/reflexion-assets/awards/partnerLogo-NUSMedicineDigitalAdvancedTechnologyAccelerator(DATA)-fe4fd070-6cb0-471c-828c-4b523dff2129.png", alt: "HealthHack Singapore" },
  { src: "/reflexion-assets/awards/tigerlaunch_logo.jpeg", alt: "TigerLaunch Asia" },
  { src: "/reflexion-assets/awards/images.png", alt: "Mapletree" },
  { src: "/reflexion-assets/awards/Huawei_Standard_logo.svg.webp", alt: "Huawei" },
  { src: "/reflexion-assets/awards/medtech actuator.jpeg", alt: "MedTech Actuator" },
  { src: "/reflexion-assets/awards/blk 71 1.png", alt: "BLOCK71" },
] as const;

export function TrustFounder({ content }: { content: Content }) {
  return <section className="trust" id="trust" aria-labelledby="trust-families-title" data-motion-chapter>
    <div className="trust__families" data-motion-item>
      <h3 id="trust-families-title">{content.trust.familiesEyebrow}</h3>
      <div className="trust__family-quotes">
        {content.trust.familyQuotes.map(([quote, attribution]) => <figure key={attribution}>
          <div className="trust__quote-copy">
            <span className="trust__quote-mark" aria-hidden="true">“</span>
            <blockquote>{quote}</blockquote>
          </div>
          <figcaption><cite>{attribution}</cite><span className="trust__quote-heart" aria-hidden="true"><Icon name="heart"/></span></figcaption>
        </figure>)}
      </div>
    </div>

    <div className="trust__founder-panel" data-motion-item>
      <div className="trust__founder-copy">
        <h3>{content.trust.founderPanelTitle}</h3>
        <p>{content.trust.founderPanelBody}</p>
        <div className="trust__built-in">
          <span className="trust__singapore-badge" aria-hidden="true">
            <Image src="/reflexion-assets/generated/phase1/singapore-flag-round.png" alt="" fill sizes="32px" />
          </span>
          <span>{content.trust.founderLocation}</span>
        </div>
      </div>
      <figure className="trust__founders">
        <span className="trust__founders-portrait"><Image src="/reflexion-assets/people/founders/IMG_4042.JPG" alt="Kei-Lyn and Chloe, Reflexion co-founders" fill sizes="(max-width: 520px) 150px, 260px" /></span>
        <figcaption><strong>{content.trust.founderNames}</strong><span>{content.trust.founderRole}</span></figcaption>
      </figure>
    </div>

    <div className="trust__principles" aria-label="Principles behind Reflexion" data-motion-item>
      <ul>
        {content.trust.principles.map(([title, body], index) => <li key={title}>
          <span className="trust__principle-icon" aria-hidden="true"><Icon name={principleIcons[index]}/></span>
          <div><h3>{title}</h3><p>{body}</p></div>
        </li>)}
      </ul>
    </div>

    <div className="trust__recognition" aria-labelledby="trust-recognition-title" data-motion-item>
      <p className="trust__recognition-eyebrow" id="trust-recognition-title">{content.trust.recognitionEyebrow}</p>
      <ul className="trust__recognition-grid">
        {content.trust.recognition.map((item, index) => {
          const mark = recognitionMarks[index];
          return <li key={item}>
            <span className="trust__recognition-mark"><Image src={mark.src} alt={mark.alt} fill sizes="(max-width: 520px) 28vw, (max-width: 820px) 22vw, 170px" /></span>
            <p>{item}</p>
          </li>;
        })}
      </ul>
    </div>
  </section>;
}
