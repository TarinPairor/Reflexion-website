"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import type { getHomeContent, Locale } from "@/i18n/content";
import { localisedHref } from "@/lib/siteRoutes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon, type IconName } from "@/components/ui/Icon";

type Content = ReturnType<typeof getHomeContent>;
const icons: IconName[] = ["sun", "message", "check", "heart", "voice", "spark"];
const morningScene = "/reflexion-assets/generated/phase1/day-with-reflexion-0800-v1.webp";
const placeholderScene = "/reflexion-assets/generated/phase1/day-with-reflexion-founder-edited.webp";

export function DayWithReflexion({ content, locale }: { content: Content; locale: Locale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextIndex = Math.min(content.day.moments.length - 1, Math.floor(progress * content.day.moments.length));
    setActiveIndex((current) => current === nextIndex ? current : nextIndex);
  });

  const activeMoment = content.day.moments[activeIndex];
  const activeScene = activeIndex === 0 ? morningScene : placeholderScene;
  const transition = reduceMotion ? { duration: 0 } : { duration: .48, ease: [0.16, 1, 0.3, 1] as const };

  return <section ref={sectionRef} className="day day--scroll" id="day-with-reflexion" aria-labelledby="day-title" data-motion-chapter>
    <div className="day-scroll__story">
      <div className="day-scroll__sticky">
      <div className="day-scroll__layout">
        <div className="day-scroll__copy">
          <div className="day-scroll__intro">
            <p className="eyebrow">{content.day.eyebrow}</p>
            <h2 id="day-title">{content.day.title}</h2>
            <p>{content.day.intro}</p>
          </div>

          <div className="day-scroll__moment" aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={`${activeMoment[0]}-${activeMoment[1]}`}
                initial={reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10, filter: "blur(5px)" }}
                transition={transition}
              >
                <span className="day-scroll__moment-icon"><Icon name={icons[activeIndex]}/></span>
                <div><time>{activeMoment[0]}</time><h3>{activeMoment[1]}</h3><p>{activeMoment[2]}</p></div>
              </motion.article>
            </AnimatePresence>
          </div>

          <ol className="day-scroll__progress" aria-label={locale === "zh" ? "一天中的时刻" : "Moments through the day"}>
            {content.day.moments.map((moment, index) => <li key={`${moment[0]}-${moment[1]}`} data-active={index === activeIndex}><span>{moment[0]}</span></li>)}
          </ol>
        </div>

        <div className="day-scroll__visual">
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              className="day-scroll__visual-frame"
              key={activeIndex}
              initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(8% 0 0 0 round 18px)" }}
              animate={{ opacity: 1, clipPath: "inset(0% 0 0 0 round 18px)" }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={transition}
            >
              <Image src={activeScene} alt={activeIndex === 0 ? "An older adult beginning her morning with the Reflexion Mirror" : "Illustrative website scene of an older adult speaking with the Reflexion Mirror, alongside a Caregiver App representation"} fill sizes="(max-width: 820px) 100vw, 58vw" className="day-scroll__scene-image" style={{ objectPosition: activeIndex === 0 ? "center" : activeIndex % 2 === 0 ? "center" : "58% center" }}/>
            </motion.div>
          </AnimatePresence>
          <p><span>{activeMoment[0]}</span>{activeMoment[1]}</p>
        </div>
      </div>
      </div>

      <div ref={trackRef} className="day-scroll__track" aria-hidden="true">
        {content.day.moments.map((moment) => <span key={`${moment[0]}-${moment[1]}`}/>) }
      </div>
    </div>

    <div className="day__closing">
      <h3>{content.day.closingTitle}</h3>
      <p>{content.day.closingBody}</p>
      <ButtonLink href={localisedHref("/how-it-works", locale)} variant="primary">{content.hero.secondary}</ButtonLink>
    </div>
  </section>;
}
