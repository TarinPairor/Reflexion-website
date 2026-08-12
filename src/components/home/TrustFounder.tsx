import Image from "next/image";
import type { getHomeContent } from "@/i18n/content";
import { Icon } from "@/components/ui/Icon";

type Content = ReturnType<typeof getHomeContent>;

export function TrustFounder({ content }: { content: Content }) {
  return <section className="trust" id="trust" aria-labelledby="trust-title" data-motion-chapter>
    <div className="trust__families">
      <h2 id="trust-title">{content.trust.familiesEyebrow}</h2>
      <div className="trust__family-quotes">
        {content.trust.familyQuotes.map(([quote, attribution]) => <figure key={attribution} data-motion-item>
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
            <svg viewBox="0 0 32 22" fill="none"><path fill="#ED2939" d="M1 1h30v10H1z"/><path fill="#fff" d="M1 11h30v10H1z"/><circle cx="9" cy="6" r="3.7" fill="#fff"/><circle cx="10.6" cy="5.2" r="3.2" fill="#ED2939"/><path fill="#fff" d="m14.8 2.9.7 1.5 1.6.2-1.2 1 .3 1.6-1.4-.8-1.4.8.3-1.6-1.2-1 1.6-.2.7-1.5Z"/><path fill="#fff" d="m18.8 5.2.7 1.5 1.6.2-1.2 1 .3 1.6-1.4-.8-1.4.8.3-1.6-1.2-1 1.6-.2.7-1.5Z"/><path fill="#fff" d="m14.8 8.2.7 1.5 1.6.2-1.2 1 .3 1.6-1.4-.8-1.4.8.3-1.6-1.2-1 1.6-.2.7-1.5Z"/><path fill="#fff" d="m10.8 8.2.7 1.5 1.6.2-1.2 1 .3 1.6-1.4-.8-1.4.8.3-1.6-1.2-1 1.6-.2.7-1.5Z"/><path fill="#fff" d="m18.8 2.2.7 1.5 1.6.2-1.2 1 .3 1.6-1.4-.8-1.4.8.3-1.6-1.2-1 1.6-.2.7-1.5Z"/></svg>
          </span>
          <span>{content.trust.founderLocation}</span>
        </div>
      </div>
      <figure className="trust__founders">
        <span className="trust__founders-portrait"><Image src="/reflexion-assets/people/founders/IMG_4042.JPG" alt="Kei-Lyn and Chloe, Reflexion co-founders" fill sizes="(max-width: 520px) 110px, 140px"/></span>
        <figcaption><strong>{content.trust.founderNames}</strong><span>{content.trust.founderRole}</span></figcaption>
      </figure>
    </div>
  </section>;
}
