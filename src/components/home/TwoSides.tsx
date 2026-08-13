"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type TouchEvent, type WheelEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { getHomeContent, Locale } from "@/i18n/content";
import { localisedHref } from "@/lib/siteRoutes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CaregiverForYouStory } from "./CaregiverForYouStory";

type Content = ReturnType<typeof getHomeContent>;
type Perspective = "loved" | "caregiver";

const lovedIcons: IconName[] = ["sun", "message", "check", "heart"];
const lovedSlideAdvanceDelay = 5200;
const scrollTransitionThreshold = 120;
const wheelTransitionThreshold = 180;

function isInteractiveTarget(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest("button, a, input, select, textarea"));
}

export function TwoSides({ content, locale }: { content: Content; locale: Locale }) {
  const detailRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  const wheelDistance = useRef(0);
  const wheelResetTimer = useRef<number | null>(null);
  const revealCaregiverOnScroll = useRef(false);
  const [perspective, setPerspective] = useState<Perspective>("loved");
  const [lovedSlide, setLovedSlide] = useState(0);
  const reduceMotion = useReducedMotion();
  const caregiver = perspective === "caregiver";

  useEffect(() => {
    if (caregiver || reduceMotion) return;

    const timer = window.setTimeout(() => {
      setLovedSlide((current) => current === 0 ? 1 : 0);
    }, lovedSlideAdvanceDelay);

    return () => window.clearTimeout(timer);
  }, [caregiver, lovedSlide, reduceMotion]);

  useEffect(() => {
    if (perspective !== "caregiver" || !revealCaregiverOnScroll.current) return;

    revealCaregiverOnScroll.current = false;
    if (window.matchMedia("(max-width: 820px)").matches) return;

    const frame = window.requestAnimationFrame(() => {
      const caregiverStory = document.getElementById("caregiver-story");
      (detailRef.current ?? caregiverStory)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [perspective, reduceMotion]);

  useEffect(() => () => {
    if (wheelResetTimer.current !== null) window.clearTimeout(wheelResetTimer.current);
  }, []);

  const choosePerspective = (next: Perspective) => {
    revealCaregiverOnScroll.current = next === "caregiver";
    setPerspective(next);
    if (next === "loved") setLovedSlide(0);
  };

  const moveLovedSlide = (offset: number) => {
    if (Math.abs(offset) > 42) setLovedSlide((current) => current === 0 ? 1 : 0);
  };

  const showCaregiverFromScroll = () => {
    if (caregiver) return;

    revealCaregiverOnScroll.current = true;
    setPerspective("caregiver");
  };

  const handleWheel = (event: WheelEvent<HTMLElement>) => {
    if (caregiver || event.deltaY <= 0 || isInteractiveTarget(event.target)) return;

    wheelDistance.current += event.deltaY;
    if (wheelResetTimer.current !== null) window.clearTimeout(wheelResetTimer.current);
    wheelResetTimer.current = window.setTimeout(() => {
      wheelDistance.current = 0;
      wheelResetTimer.current = null;
    }, 280);

    if (wheelDistance.current < wheelTransitionThreshold) return;

    wheelDistance.current = 0;
    showCaregiverFromScroll();
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    if (!caregiver) touchStartY.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const startY = touchStartY.current;
    const endY = event.changedTouches[0]?.clientY;
    touchStartY.current = null;

    if (caregiver || startY === null || endY === undefined || startY - endY <= scrollTransitionThreshold || isInteractiveTarget(event.target)) return;

    showCaregiverFromScroll();
  };

  return <section className="two-sides" id="two-sides" aria-labelledby="two-sides-title" data-perspective={perspective} data-motion-chapter data-sticky-cta-suppression onWheel={handleWheel} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
    <div className="two-sides__composition">
      <div className="two-sides__lead">
        <div className="two-sides__lead-copy" data-motion-item>
          <p className="eyebrow">{content.sides.eyebrow}</p>
          <h2 id="two-sides-title">{content.sides.title}</h2>
          <p>{content.sides.intro}</p>

          <div className="two-sides__perspectives" role="tablist" aria-label={content.sides.eyebrow}>
            <button type="button" role="tab" aria-selected={!caregiver} aria-controls="two-sides-detail" onClick={() => choosePerspective("loved")}>
              <span>01</span>{content.sides.lovedTab.replace("01 — ", "")}
            </button>
            <button type="button" role="tab" aria-selected={caregiver} aria-controls="caregiver-story" onClick={() => choosePerspective("caregiver")}>
              <span>02</span>{content.sides.caregiverTab.replace("02 — ", "")}
            </button>
          </div>
        </div>

        {caregiver ? <CaregiverForYouStory content={content} locale={locale}/> : <div className="two-sides__stage" id="two-sides-stage" aria-live="polite" data-motion-item>
          <div className="two-sides__loved-carousel">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                className="two-sides__loved-slide"
                key={lovedSlide}
                drag={reduceMotion ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={.18}
                onDragEnd={(_, info) => moveLovedSlide(info.offset.x)}
                initial={reduceMotion ? false : { opacity: 0, x: lovedSlide === 0 ? -28 : 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: lovedSlide === 0 ? 28 : -28 }}
                transition={{ duration: reduceMotion ? 0 : .42, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image src={lovedSlide === 0 ? "/reflexion-assets/generated/phase1/two-sides-loved-one-v2.webp" : "/reflexion-assets/generated/phase1/two-sides-loved-one-check-in.png"} alt={lovedSlide === 0 ? "An older adult beginning a morning check-in with the Reflexion Mirror" : "An older adult using the Reflexion Mirror during a morning check-in"} fill sizes="(max-width: 820px) 100vw, 60vw"/>
                <div className="two-sides__loved-overlay">
                  <p>{locale === "zh" ? "为你的挚爱家人" : "FOR YOUR LOVED ONE"}</p>
                  <h3>{lovedSlide === 0 ? content.sides.lovedTitle : locale === "zh" ? "融入她生活的支持。" : "Support that belongs in her day."}</h3>
                  <div className="two-sides__loved-points">
                    {(lovedSlide === 0 ? content.sides.lovedFeatures.slice(0, 2).map((feature) => [feature[0], feature[2]]) : locale === "zh" ? [["温和的日常支持", "贴心提醒，不让她觉得被管理。"], ["家人联系", "通过 Reflexion 接收家人的文字、语音和照片。"]] : [["Gentle routine support", "Helpful reminders without making her feel managed."], ["Family connection", "Receive text, voice and photos from family through Reflexion."]]).map((point) => <div key={point[0]}><Icon name={point[0].toLowerCase().includes("family") || point[0].includes("家人") ? "heart" : lovedSlide === 0 ? "sun" : "check"}/><span><strong>{point[0]}</strong><small>{point[1]}</small></span></div>)}
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
            <div className="two-sides__loved-dots" aria-label={locale === "zh" ? "挚爱家人幻灯片" : "Loved-one slides"}>
              {[0, 1].map((slide) => <button type="button" key={slide} aria-label={`${locale === "zh" ? "幻灯片" : "Slide"} ${slide + 1}`} aria-current={slide === lovedSlide ? "true" : undefined} onClick={() => setLovedSlide(slide)}/>) }
            </div>
          </div>
        </div>}
      </div>

      {!caregiver && <div ref={detailRef} className="two-sides__detail" id="two-sides-detail" role="tabpanel" data-motion-item>
        <p className="eyebrow">{content.sides.lovedTab.replace("01 — ", "")}</p>
        <h3>{content.sides.lovedTitle}</h3>
        <p className="two-sides__detail-intro">{content.sides.lovedBody}</p>
        <div className="two-sides__features">
          {content.sides.lovedFeatures.map((feature, index) => <article key={feature[0]}>
            <span className="two-sides__feature-icon" aria-hidden="true"><Icon name={lovedIcons[index]}/></span>
            <div><h4>{feature[0]}</h4><b>{feature[1]}</b><p>{feature[2]}</p></div>
          </article>)}
        </div>
        <div className="two-sides__closing">
          <p>{content.sides.closingTitle}</p>
          <ButtonLink href={localisedHref("/products", locale)} variant="secondary">{content.sides.cta}</ButtonLink>
        </div>
      </div>}
    </div>
  </section>;
}
