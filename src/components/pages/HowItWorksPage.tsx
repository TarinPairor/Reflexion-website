import Image from "next/image";
import type { Locale, getHomeContent } from "@/i18n/content";
import type { PageContent } from "@/i18n/pages";
import { localisedHref } from "@/lib/siteRoutes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CaregiverPhone } from "@/components/product/DeviceCompositions";

type HomeContent = ReturnType<typeof getHomeContent>;
const momentIcons: IconName[] = ["sun", "message", "check", "heart"];
const trustIcons: IconName[] = ["heart", "message", "check", "spark", "sun"];

export function HowItWorksPage({ locale, home, page, common }: { locale: Locale; home: HomeContent; page: PageContent["how"]; common: PageContent["common"] }) {
  return <>
    <section className="interior-hero interior-hero--how" id="top" aria-labelledby="how-title" data-motion-chapter>
      <div className="interior-hero__image" data-motion-item>
        <Image src="/reflexion-assets/generated/phase1/day-with-reflexion-founder-edited.webp" alt="A grounded visualisation of the Reflexion Mirror in an older adult’s home" fill priority sizes="(max-width: 820px) 100vw, 58vw"/>
      </div>
      <div className="interior-hero__copy" data-motion-item>
        <p className="eyebrow">{home.nav[0]}</p>
        <h1 id="how-title">{page.heroTitle}</h1>
        <p>{page.heroBody}</p>
        <div className="hero__actions"><ButtonLink href={localisedHref("/get-reflexion", locale)}>{common.get}</ButtonLink></div>
        <p className="interior-hero__note">{page.heroNote}</p>
      </div>
    </section>

    <section className="how-day interior-section" aria-labelledby="their-day-title" data-motion-chapter>
      <div className="interior-section__heading" data-motion-item>
        <p className="chapter-index">01 · {locale === "zh" ? "他们的一天" : "Their day with Reflexion"}</p>
        <h2 id="their-day-title">{page.dayTitle}</h2>
        <p>{page.dayBody}</p>
      </div>
      <div className="how-day__scene" data-motion-item>
        <Image src="/reflexion-assets/generated/phase1/reflexion-mirror-home.webp" alt="The Reflexion Mirror represented in a warm home setting" fill sizes="(max-width: 820px) 100vw, 52vw"/>
        <div className="how-day__scene-copy"><span>{locale === "zh" ? "每日认知与身心状态交流" : "Daily cognitive & wellbeing check-in"}</span><strong>{page.heroNote}</strong></div>
      </div>
      <ol className="how-day__moments" data-motion-item>
        {page.dayMoments.map((item, index) => <li key={item[0]}><span><Icon name={momentIcons[index]}/></span><div><small>0{index + 1}</small><h3>{item[0]}</h3><p>{item[1]}</p></div></li>)}
      </ol>
    </section>

    <section className="family-exchange interior-section interior-section--dark" aria-labelledby="family-flow-title" data-motion-chapter>
      <div className="family-exchange__intro" data-motion-item>
        <p className="chapter-index">{locale === "zh" ? "家庭联系" : "Family connection"}</p>
        <h2 id="family-flow-title">{page.familyTitle}</h2>
        <p>{page.familyBody}</p>
      </div>
      <div className="family-exchange__visual" data-motion-item>
        <div className="family-exchange__portrait"><Image src="/reflexion-assets/generated/phase1/closed-loop-loved-one.webp" alt="Illustrative older loved one" fill sizes="240px"/></div>
        <div className="family-exchange__phone"><CaregiverPhone mode="message"/></div>
      </div>
      <ol className="family-exchange__flow" data-motion-item>
        {page.familyFlow.map((item, index) => <li key={item[0]}><span>0{index + 1}</span><div><h3>{item[0]}</h3><p>{item[1]}</p></div></li>)}
      </ol>
      <p className="product-note product-note--dark" data-motion-item>{page.voiceGate}</p>
    </section>

    <section className="caregiver-questions interior-section" aria-labelledby="caregiver-app-title" data-motion-chapter>
      <div className="caregiver-questions__visual" data-motion-item>
        <div className="caregiver-questions__phone caregiver-questions__phone--today"><CaregiverPhone mode="today"/></div>
        <div className="caregiver-questions__phone caregiver-questions__phone--context"><CaregiverPhone mode="context"/></div>
        <div className="caregiver-questions__phone caregiver-questions__phone--message"><CaregiverPhone mode="message"/></div>
      </div>
      <div className="caregiver-questions__content">
        <div className="interior-section__heading" data-motion-item>
          <p className="chapter-index">02 · {locale === "zh" ? "你的照护者 App" : "Your Caregiver App"}</p>
          <h2 id="caregiver-app-title">{page.appTitle}</h2>
          <p>{page.appBody}</p>
        </div>
        <div className="question-led-list" data-motion-item>
          {page.caregiverQuestions.map((item, index) => <article key={item[0]}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item[0]}</h3><p>{item[1]}</p></div></article>)}
        </div>
      </div>
    </section>

    <section className="relationship-close interior-section" aria-labelledby="relationship-title" data-motion-chapter>
      <div className="interior-section__heading interior-section__heading--center" data-motion-item>
        <p className="chapter-index">03 · {locale === "zh" ? "围绕关系" : "Designed around the relationship"}</p>
        <h2 id="relationship-title">{page.relationshipTitle}</h2>
        <p>{page.relationshipBody}</p>
      </div>
      <div className="relationship-close__principles" data-motion-item>
        {page.relationshipPoints.map((item, index) => <article key={item[0]}><span><Icon name={trustIcons[index]}/></span><h3>{item[0]}</h3><p>{item[1]}</p></article>)}
      </div>
      <p className="relationship-close__limitation" data-motion-item>{common.limitation}</p>
      <div className="interior-final-actions" data-motion-item>
        <ButtonLink href={localisedHref("/get-reflexion", locale)}>{common.get}</ButtonLink>
        <ButtonLink href={localisedHref("/products", locale)} variant="secondary">{common.products}</ButtonLink>
      </div>
    </section>
  </>;
}
