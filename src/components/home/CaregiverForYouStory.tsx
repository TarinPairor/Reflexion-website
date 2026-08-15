"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import type { getHomeContent, Locale } from "@/i18n/content";

type Content = ReturnType<typeof getHomeContent>;
type CaregiverFeature = Content["sides"]["caregiverFeatures"][number];
const storyImages = [
  "/reflexion-assets/generated/phase1/caregiver-story-01-cutout.png",
  "/reflexion-assets/generated/phase1/caregiver-story-02-cutout.png",
  "/reflexion-assets/generated/phase1/caregiver-story-03-cutout.png",
  "/reflexion-assets/generated/phase1/caregiver-story-04-cutout.png",
  "/reflexion-assets/generated/phase1/caregiver-story-05-cutout.png",
] as const;

function stateTitle(feature: CaregiverFeature) {
  return feature[0];
}

export function CaregiverForYouStory({ content, locale }: { content: Content; locale: Locale }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const { scrollYProgress: mobileScrollYProgress } = useScroll({ target: mobileTrackRef, offset: ["start start", "end end"] });
  const features = content.sides.caregiverFeatures;

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextIndex = Math.min(features.length - 1, Math.floor(progress * features.length));
    setActiveIndex((current) => current === nextIndex ? current : nextIndex);
  });

  useMotionValueEvent(mobileScrollYProgress, "change", (progress) => {
    const nextIndex = Math.min(features.length - 1, Math.floor(progress * features.length));
    setMobileActiveIndex((current) => current === nextIndex ? current : nextIndex);
  });

  const activeFeature = features[activeIndex];
  const mobileActiveFeature = features[mobileActiveIndex];
  const transition = reduceMotion ? { duration: 0 } : { duration: .52, ease: [0.16, 1, 0.3, 1] as const };

  return <div id="caregiver-story" className="caregiver-story" data-story-state={activeIndex + 1} aria-label={locale === "zh" ? "照护者 App 功能" : "Caregiver App features"}>
    <div className="caregiver-story__desktop-story">
      <div className="caregiver-story__sticky">
        <div className="caregiver-story__layout">
          <div className="caregiver-story__copy" aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                className="caregiver-story__state-copy"
                key={`${activeIndex}-${activeFeature[0]}`}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -14 }}
                transition={transition}
              >
                <span className="caregiver-story__state-number">0{activeIndex + 1}</span>
                <p className="eyebrow">{locale === "zh" ? "给你" : "FOR YOU"}</p>
                <h3>{stateTitle(activeFeature)}</h3>
                <p className="caregiver-story__state-subtitle">{activeFeature[1]}</p>
              </motion.div>
            </AnimatePresence>

            <ol className="caregiver-story__progress" aria-label={locale === "zh" ? "照护者 App 功能顺序" : "Caregiver App feature sequence"}>
              {features.map((feature, index) => <li key={feature[0]} data-active={index === activeIndex} data-complete={index < activeIndex}>
                <span className="caregiver-story__progress-marker" aria-hidden="true">{index < activeIndex ? "" : String(index + 1).padStart(2, "0")}</span>
                <span><strong>{stateTitle(feature)}</strong><small>{feature[1]}</small></span>
              </li>)}
            </ol>
          </div>

          <div className="caregiver-story__visual">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                className="caregiver-story__phone-frame"
                key={storyImages[activeIndex]}
                initial={false}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 1, y: -18, scale: .985 }}
                transition={transition}
              >
                <div className="caregiver-story__image-wrap">
                  <Image src={storyImages[activeIndex]} alt="" width={1024} height={1536} priority={activeIndex === 0} unoptimized className="caregiver-story__image" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div ref={trackRef} className="caregiver-story__track" aria-hidden="true">
        {features.map((feature) => <span key={feature[0]}/>) }
      </div>

      <div className="caregiver-story__closing">
        <p>{content.sides.closingTitle}</p>
        <small>{content.sides.closingBody}</small>
      </div>
    </div>

    <div className="caregiver-story__mobile-story" aria-label={locale === "zh" ? "照护者 App 功能顺序" : "Caregiver App features in order"}>
      <div className="caregiver-story__mobile-sticky">
        <div className="caregiver-story__mobile-layout">
          <div className="caregiver-story__copy" aria-live="polite" aria-atomic="true">
            <div className="caregiver-story__state-copy">
              <span className="caregiver-story__state-number">0{mobileActiveIndex + 1}</span>
              <p className="eyebrow">{locale === "zh" ? "给你" : "FOR YOU"}</p>
              <h3 id="caregiver-story-mobile-title">{stateTitle(mobileActiveFeature)}</h3>
              <p className="caregiver-story__state-subtitle">{mobileActiveFeature[1]}</p>
            </div>

            <ol className="caregiver-story__progress" aria-label={locale === "zh" ? "照护者 App 功能顺序" : "Caregiver App feature sequence"}>
              {features.map((feature, index) => <li key={feature[0]} data-active={index === mobileActiveIndex} data-complete={index < mobileActiveIndex}>
                <span className="caregiver-story__progress-marker" aria-hidden="true">{index < mobileActiveIndex ? "" : String(index + 1).padStart(2, "0")}</span>
                <span><strong>{stateTitle(feature)}</strong><small>{feature[1]}</small></span>
              </li>)}
            </ol>
          </div>

          <div className="caregiver-story__visual">
            <div className="caregiver-story__phone-frame">
              <div className="caregiver-story__image-wrap">
                <Image src={storyImages[mobileActiveIndex]} alt="" width={1024} height={1536} priority={mobileActiveIndex === 0} unoptimized className="caregiver-story__image" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={mobileTrackRef} className="caregiver-story__mobile-track" aria-hidden="true">
        {features.map((feature) => <span key={feature[0]}/>) }
      </div>

      <div className="caregiver-story__closing">
        <p>{content.sides.closingTitle}</p>
        <small>{content.sides.closingBody}</small>
      </div>
    </div>
  </div>;
}
