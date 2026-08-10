import Image from "next/image";
import type { getHomeContent } from "@/i18n/content";
import { Icon, type IconName } from "@/components/ui/Icon";

type Content = ReturnType<typeof getHomeContent>;
const principleIcons: IconName[] = ["heart", "spark", "message"];

export function TrustFounder({ content }: { content: Content }) {
  return <section className="trust" id="trust" aria-labelledby="trust-title">
    <div className="trust__manifesto">
      <div className="trust__heading">
        <p className="eyebrow eyebrow--light">{content.trust.eyebrow}</p>
        <h2 id="trust-title">{content.trust.title}</h2>
        <p>{content.trust.intro}</p>
      </div>
      <div className="trust__principles">
        {content.trust.principles.map((principle, index) => <article key={principle[0]}><Icon name={principleIcons[index]}/><h3>{principle[0]}</h3><p>{principle[1]}</p></article>)}
      </div>
    </div>
    <div className="founder-story">
      <div className="founder-story__image">
        <Image src="/reflexion-assets/people/family/production-candidates/mama-family-photo.jpg" alt="Kong Kei-Lyn sharing a family moment with her grandmother, Mama" fill sizes="(max-width: 768px) 100vw, 48vw"/>
      </div>
      <div className="founder-story__copy">
        <p className="eyebrow">{content.trust.founderEyebrow}</p>
        <h3>{content.trust.founderTitle}</h3>
        <p>{content.trust.founderBody}</p>
        <p className="founder-story__names">{content.trust.founders}</p>
      </div>
    </div>
    <div className="recognition" aria-labelledby="recognition-title">
      <div><p className="eyebrow">REFLEXION</p><h3 id="recognition-title">{content.trust.recognitionTitle}</h3><p>{content.trust.recognitionNote}</p></div>
      <ul>{content.trust.recognition.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  </section>;
}
