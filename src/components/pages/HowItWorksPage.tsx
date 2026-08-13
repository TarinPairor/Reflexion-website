import Image from "next/image";
import type { Locale, getHomeContent } from "@/i18n/content";
import type { PageContent } from "@/i18n/pages";
import { localisedHref } from "@/lib/siteRoutes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ClosedCareLoop } from "@/components/home/ClosedCareLoop";
import { DayWithReflexion } from "@/components/home/DayWithReflexion";
import { TwoSides } from "@/components/home/TwoSides";

type HomeContent = ReturnType<typeof getHomeContent>;
const momentIcons: IconName[] = ["sun", "message", "check", "heart"];
const trustIcons: IconName[] = ["heart", "message", "check", "spark"];

export function HowItWorksPage({ locale, home, page, common }: { locale: Locale; home: HomeContent; page: PageContent["how"]; common: PageContent["common"] }) {
  return <div className="how-it-works-page">
    <section className="interior-hero interior-hero--how interior-hero--text-only" id="top" aria-labelledby="how-title" data-motion-chapter>
      <div className="interior-hero__copy" data-motion-item>
        <p className="eyebrow">{home.nav[1]}</p>
        <h1 id="how-title">{page.heroTitle}</h1>
        <p>{page.heroBody}</p>
        <div className="hero__actions"><ButtonLink href={localisedHref("/get-reflexion", locale)}>{common.get}</ButtonLink></div>
      </div>
    </section>

    <div className="how-it-works-page__home-sections" aria-label={locale === "zh" ? "Reflexion 如何融入家庭生活" : "How Reflexion fits into family life"}>
      <ClosedCareLoop content={home} locale={locale}/>
      <DayWithReflexion content={home} locale={locale}/>
      <TwoSides content={home} locale={locale}/>
    </div>

    <section className="how-day interior-section" aria-labelledby="their-day-title" data-motion-chapter>
      <div className="interior-section__heading" data-motion-item>
        <p className="chapter-index">01 · {locale === "zh" ? "他们的一天" : "Their day with Reflexion"}</p>
        <h2 id="their-day-title">{page.dayTitle}</h2>
        <p>{page.dayBody}</p>
      </div>
      <div className="how-day__scene" data-motion-item>
        <Image src="/reflexion-assets/generated/phase1/product-family-mirror-home-section.png" alt="An older adult having a morning check-in with the Reflexion Mirror" fill sizes="(max-width: 820px) 100vw, 52vw"/>
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
        <div className="family-exchange__phone family-exchange__phone--reference">
          <Image src="/reflexion-assets/generated/phase1/how-it-works-caregiver-chat.png" alt="Caregiver family chat with a message, photo and voice reply" fill sizes="(max-width: 767px) 42vw, 220px"/>
        </div>
      </div>
      <ol className="family-exchange__flow" data-motion-item>
        {page.familyFlow.map((item, index) => <li key={item[0]}><span>0{index + 1}</span><div><h3>{item[0]}</h3><p>{item[1]}</p></div></li>)}
      </ol>
    </section>

    <section className="caregiver-questions interior-section" aria-labelledby="caregiver-app-title" data-motion-chapter>
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
        {page.relationshipPoints.map((item, index) => <article key={item}><span><Icon name={trustIcons[index]}/></span><h3>{item}</h3></article>)}
      </div>
      <div className="interior-final-actions" data-motion-item>
        <ButtonLink href={localisedHref("/get-reflexion", locale)}>{common.get}</ButtonLink>
        <ButtonLink href={localisedHref("/products", locale)} variant="secondary">{common.products}</ButtonLink>
      </div>
    </section>
  </div>;
}
