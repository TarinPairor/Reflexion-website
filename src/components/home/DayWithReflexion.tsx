import Image from "next/image";
import type { getHomeContent, Locale } from "@/i18n/content";
import { localisedHref } from "@/lib/siteRoutes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon, type IconName } from "@/components/ui/Icon";

type Content = ReturnType<typeof getHomeContent>;
const icons: IconName[] = ["sun", "message", "check", "heart", "voice", "spark"];

export function DayWithReflexion({ content, locale }: { content: Content; locale: Locale }) {
  return <section className="day" id="day-with-reflexion" aria-labelledby="day-title" data-motion-chapter>
    <div className="day__layout">
      <div className="day__intro" data-motion-item>
        <p className="eyebrow">{content.day.eyebrow}</p>
        <h2 id="day-title">{content.day.title}</h2>
        <p>{content.day.intro}</p>
      </div>
      <ol className="day__moments" data-motion-item>
        {content.day.moments.map((moment, index) => <li key={`${moment[0]}-${moment[1]}`}>
          <span className="day__rail" aria-hidden="true"/>
          <div className="day__moment-icon"><Icon name={icons[index]}/></div>
          <div><span className="day__time">{moment[0]}</span><h3>{moment[1]}</h3><p>{moment[2]}</p></div>
        </li>)}
      </ol>
      <div className="day__experience" data-motion-item>
        <div className="day__visual">
          <Image
            src="/reflexion-assets/generated/phase1/day-with-reflexion-founder-edited.webp"
            alt="Illustrative website scene of an older adult speaking with the Reflexion Mirror, alongside a Caregiver App representation"
            fill
            sizes="(max-width: 820px) 100vw, 65vw"
            className="day__scene-image"
          />
        </div>
        <div className="day__closing">
          <h3>{content.day.closingTitle}</h3>
          <p>{content.day.closingBody}</p>
          <ButtonLink href={localisedHref("/how-it-works", locale)} variant="primary">{content.hero.secondary}</ButtonLink>
        </div>
      </div>
    </div>
    <p className="product-note" data-motion-item>{content.day.note}</p>
  </section>;
}
