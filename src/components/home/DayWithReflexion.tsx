"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import type { getHomeContent, Locale } from "@/i18n/content";
import { Icon, type IconName } from "@/components/ui/Icon";

type Content = ReturnType<typeof getHomeContent>;
const icons: IconName[] = ["sun", "message", "heart", "voice", "check", "spark", "heart"];
const scenes = [
  "/reflexion-assets/generated/phase1/day-with-reflexion-0930-morning-check-in.png",
  "/reflexion-assets/generated/phase1/day-with-reflexion-1130-everyday-companionship.png",
  "/reflexion-assets/generated/phase1/day-with-reflexion-1400-family-message.png",
  "/reflexion-assets/generated/phase1/day-with-reflexion-1405-voice-reply.png",
  "/reflexion-assets/generated/phase1/day-with-reflexion-1800-routine-support.png",
  "/reflexion-assets/generated/phase1/day-with-reflexion-caregiver-insight-phone.png",
  "/reflexion-assets/generated/phase1/day-with-reflexion-family-connection.png",
];
const sceneAlts = [
  "Margaret beginning a morning cognitive and wellbeing check-in with Reflexion",
  "Margaret having an everyday companionship conversation with Reflexion",
  "Margaret receiving a family message through Reflexion",
  "Margaret replying by voice to Mei through Reflexion",
  "Margaret receiving gentle evening routine support through Reflexion",
  "Reflexion Caregiver App showing Margaret’s daily update for Mei",
  "Margaret and Mei sharing a warm family moment at home",
];

export function DayWithReflexion({ content, locale }: { content: Content; locale: Locale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileStartXRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextIndex = Math.min(content.day.moments.length - 1, Math.floor(progress * content.day.moments.length));
    setActiveIndex((current) => current === nextIndex ? current : nextIndex);
  });

  const activeMoment = content.day.moments[activeIndex];
  const activeScene = scenes[activeIndex] ?? scenes[0];
  const visualVariant = activeIndex === 5 ? " day-scroll__visual--phone" : activeIndex === 6 ? " day-scroll__visual--family" : "";
  const mobileMoment = content.day.moments[mobileIndex] ?? content.day.moments[0];
  const mobileScene = scenes[mobileIndex] ?? scenes[0];
  const mobileVisualVariant = mobileIndex === 5 ? " day-scroll__visual--phone" : mobileIndex === 6 ? " day-scroll__visual--family" : "";
  const transition = reduceMotion ? { duration: 0 } : { duration: .48, ease: [0.16, 1, 0.3, 1] as const };

  const changeMobileMoment = (direction: 1 | -1) => {
    setMobileIndex((current) => Math.max(0, Math.min(content.day.moments.length - 1, current + direction)));
  };

  const handleMobilePointerDown = (event: PointerEvent<HTMLElement>) => {
    mobileStartXRef.current = event.clientX;
  };

  const handleMobilePointerUp = (event: PointerEvent<HTMLElement>) => {
    const startX = mobileStartXRef.current;
    mobileStartXRef.current = null;
    if (startX === null) return;

    const deltaX = event.clientX - startX;
    if (Math.abs(deltaX) < 48) return;
    changeMobileMoment(deltaX > 0 ? 1 : -1);
  };

  const handleMobilePointerCancel = () => {
    mobileStartXRef.current = null;
  };

  const handleMobileKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    changeMobileMoment(event.key === "ArrowRight" ? 1 : -1);
  };

  return <section ref={sectionRef} className="day day--scroll" id="day-with-reflexion" aria-label={content.day.title} data-motion-chapter>
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

        <div className={`day-scroll__visual${visualVariant}`}>
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              className="day-scroll__visual-frame"
              key={activeIndex}
              initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(8% 0 0 0 round 18px)" }}
              animate={{ opacity: 1, clipPath: "inset(0% 0 0 0 round 18px)" }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={transition}
            >
              <Image src={activeScene} alt={sceneAlts[activeIndex] ?? sceneAlts[0]} fill sizes="(max-width: 820px) 100vw, 58vw" className="day-scroll__scene-image" style={{ objectPosition: activeIndex === 2 || activeIndex === 4 ? "56% center" : "center center" }}/>
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

    <div
      className="day-scroll__mobile"
      role="region"
      aria-label={locale === "zh" ? "Reflexion 一天中的时刻" : "Moments through a day with Reflexion"}
      tabIndex={0}
      onPointerDown={handleMobilePointerDown}
      onPointerUp={handleMobilePointerUp}
      onPointerCancel={handleMobilePointerCancel}
      onKeyDown={handleMobileKeyDown}
    >
      <article className="day-scroll__mobile-slide" aria-label={`${mobileMoment[0]} — ${mobileMoment[1]}`}>
        <div className="day-scroll__layout day-scroll__mobile-slide-layout">
          <div className="day-scroll__copy">
            <div className="day-scroll__intro">
              <p className="eyebrow">{content.day.eyebrow}</p>
              <h2>{content.day.title}</h2>
              <p>{content.day.intro}</p>
            </div>

            <div className="day-scroll__moment" aria-live="polite" aria-atomic="true">
              <AnimatePresence mode="wait" initial={false}>
                <motion.article
                  key={`${mobileMoment[0]}-${mobileMoment[1]}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10, filter: "blur(5px)" }}
                  transition={transition}
                >
                  <span className="day-scroll__moment-icon"><Icon name={icons[mobileIndex]}/></span>
                  <div><time>{mobileMoment[0]}</time><h3>{mobileMoment[1]}</h3><p>{mobileMoment[2]}</p></div>
                </motion.article>
              </AnimatePresence>
            </div>

            <ol className="day-scroll__progress" aria-label={locale === "zh" ? "一天中的时刻" : "Moments through the day"}>
              {content.day.moments.map((moment, index) => <li key={`${moment[0]}-${moment[1]}`} data-active={index === mobileIndex}><span>{moment[0]}</span></li>)}
            </ol>
            <div className="day-scroll__mobile-controls" role="group" aria-label={locale === "zh" ? "切换一天中的时刻" : "Switch moments through the day"}>
              <button type="button" className="day-scroll__mobile-control" onClick={() => changeMobileMoment(-1)} disabled={mobileIndex === 0} aria-label={locale === "zh" ? "上一个时刻" : "Previous moment"}>←</button>
              <span className="day-scroll__swipe-hint">{locale === "zh" ? "向右滑动查看下一个时刻" : "Swipe right for the next moment"}</span>
              <button type="button" className="day-scroll__mobile-control" onClick={() => changeMobileMoment(1)} disabled={mobileIndex === content.day.moments.length - 1} aria-label={locale === "zh" ? "下一个时刻" : "Next moment"}>→</button>
            </div>
          </div>

          <div className={`day-scroll__visual${mobileVisualVariant}`}>
            <AnimatePresence mode="sync" initial={false}>
              <motion.div
                className="day-scroll__visual-frame"
                key={mobileIndex}
                initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(8% 0 0 0 round 18px)" }}
                animate={{ opacity: 1, clipPath: "inset(0% 0 0 0 round 18px)" }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                transition={transition}
              >
                <Image src={mobileScene} alt={sceneAlts[mobileIndex] ?? sceneAlts[0]} fill sizes="(max-width: 820px) 100vw, 58vw" className="day-scroll__scene-image" style={{ objectPosition: mobileIndex === 2 || mobileIndex === 4 ? "56% center" : "center center" }}/>
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={`${mobileMoment[0]}-${mobileMoment[1]}-caption`}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                transition={transition}
              ><span>{mobileMoment[0]}</span>{mobileMoment[1]}</motion.p>
            </AnimatePresence>
          </div>
        </div>
      </article>
    </div>
  </section>;
}
