import Image from "next/image";
import type { Locale, getHomeContent } from "@/i18n/content";
import type { PageContent } from "@/i18n/pages";
import { localisedHref } from "@/lib/siteRoutes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon, type IconName } from "@/components/ui/Icon";
import { RecognitionStrip } from "@/components/site/RecognitionStrip";
import { CaregiverPhone } from "@/components/product/DeviceCompositions";

type HomeContent = ReturnType<typeof getHomeContent>;
const whyIcons: IconName[] = ["message", "sun", "spark", "voice"];
const buildIcons: IconName[] = ["heart", "check", "message", "spark"];

export function AboutPage({ locale, home, page, common }: { locale: Locale; home: HomeContent; page: PageContent["about"]; common: PageContent["common"] }) {
  return <>
    <section className="about-origin" id="top" aria-labelledby="about-title" data-motion-chapter>
      <div className="about-origin__image" data-motion-item><Image src="/reflexion-assets/people/family/production-candidates/mama-family-photo.jpg" alt="Kong Kei-Lyn sharing a family moment with her grandmother, Mama" fill priority sizes="(max-width: 820px) 100vw, 58vw"/></div>
      <div className="about-origin__copy" data-motion-item><p className="eyebrow">{home.nav[2]}</p><h1 id="about-title">{page.heroTitle}</h1><p>{page.heroBody}</p></div>
    </section>

    <section className="about-story interior-section" aria-labelledby="about-story-title" data-motion-chapter>
      <div className="about-story__lead" data-motion-item><h2 id="about-story-title">{page.storyTitle}</h2></div>
      <p data-motion-item>{page.storyBody}</p>
    </section>

    <section className="about-why interior-section interior-section--dark" aria-labelledby="about-why-title" data-motion-chapter>
      <div className="interior-section__heading" data-motion-item><h2 id="about-why-title">{page.whyTitle}</h2></div>
      <div className="about-why__points" data-motion-item>{page.whyPoints.map((item, index) => <article key={item[0]}><span><Icon name={whyIcons[index]}/></span><h3>{item[0]}</h3><p>{item[1]}</p></article>)}</div>
    </section>

    <section className="about-system interior-section" aria-labelledby="about-system-title" data-motion-chapter>
      <div className="about-system__copy" data-motion-item><h2 id="about-system-title">{page.builtTitle}</h2><p>{page.builtBody}</p><ButtonLink href={localisedHref("/how-it-works", locale)} variant="secondary">{common.how}</ButtonLink></div>
      <div className="about-system__visual" data-motion-item>
        <div className="about-system__mirror"><Image src="/reflexion-assets/generated/phase1/closed-loop-mirror.webp" alt="Reflexion Mirror represented in a warm home setting" fill sizes="(max-width: 820px) 100vw, 48vw"/></div>
        <div className="about-system__phone"><CaregiverPhone mode="message"/></div>
      </div>
    </section>

    <section className="about-build interior-section" aria-labelledby="about-build-title" data-motion-chapter>
      <div className="interior-section__heading interior-section__heading--center" data-motion-item><h2 id="about-build-title">{page.buildTitle}</h2></div>
      <div className="about-build__principles" data-motion-item>{page.buildPoints.map((item, index) => <article key={item[0]}><span><Icon name={buildIcons[index]}/></span><h3>{item[0]}</h3><p>{item[1]}</p></article>)}</div>
    </section>

    <section className="about-founders interior-section interior-section--sage" aria-labelledby="founders-title" data-motion-chapter>
      <div className="interior-section__heading" data-motion-item><h2 id="founders-title">{page.foundersTitle}</h2></div>
      <div className="about-founders__list" data-motion-item>{page.founders.map((founder, index) => <article key={founder[0]}><span>0{index + 1}</span><h3>{founder[0]}</h3><b>{founder[1]}</b><p>{founder[2]}</p></article>)}</div>
      <figure className="about-founders__photo" data-motion-item>
        <div className="about-founders__photo-media"><Image src="/reflexion-assets/people/founders/IMG_4042.JPG" alt="Kong Kei-Lyn and Chloe Tan together" fill sizes="(max-width: 767px) calc(100vw - 40px), 52vw"/></div>
        <figcaption><span>{page.founders[0][1]}</span><strong>{page.founders.map(([name]) => name).join(" + ")}</strong></figcaption>
      </figure>
    </section>

    <section className="about-journey interior-section" aria-labelledby="journey-title" data-motion-chapter>
      <div className="interior-section__heading" data-motion-item><h2 id="journey-title">{page.journeyTitle}</h2></div>
      <ol data-motion-item>{page.journey.map((item, index) => <li key={item[0]}><span>0{index + 1}</span><div><h3>{item[0]}</h3><p>{item[1]}</p></div></li>)}</ol>
    </section>

    <section className="about-recognition interior-section" data-motion-chapter>
      <RecognitionStrip title={home.trust.recognitionTitle} note={home.trust.recognitionNote} items={home.trust.recognition}/>
    </section>

    <section className="about-future interior-section" aria-labelledby="future-title" data-motion-chapter>
      <div className="about-future__image" data-motion-item><Image src="/reflexion-assets/generated/phase1/reflexion-hero-founder-2026-08.webp" alt="An older adult at home with Reflexion nearby" fill sizes="100vw"/></div>
      <div className="about-future__copy" data-motion-item><h2 id="future-title">{page.futureTitle}</h2><p>{page.futureBody}</p><div className="interior-final-actions"><ButtonLink href={localisedHref("/get-reflexion", locale)}>{common.get}</ButtonLink><ButtonLink href={localisedHref("/how-it-works", locale)} variant="secondary">{common.how}</ButtonLink></div></div>
    </section>
  </>;
}
