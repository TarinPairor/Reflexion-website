"use client";

import Image from "next/image";
import { useState } from "react";
import type { getHomeContent } from "@/i18n/content";
import { MirrorScene } from "@/components/product/DeviceCompositions";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon, type IconName } from "@/components/ui/Icon";

type Content = ReturnType<typeof getHomeContent>;
type Perspective = "loved" | "caregiver";

const lovedIcons: IconName[] = ["sun", "message", "check", "heart"];
const caregiverIcons: IconName[] = ["sun", "spark", "message", "check", "heart"];

export function TwoSides({ content }: { content: Content }) {
  const [perspective, setPerspective] = useState<Perspective>("caregiver");
  const caregiver = perspective === "caregiver";
  const features = caregiver ? content.sides.caregiverFeatures : content.sides.lovedFeatures;
  const icons = caregiver ? caregiverIcons : lovedIcons;

  return <section className="two-sides" id="two-sides" aria-labelledby="two-sides-title" data-perspective={perspective} data-motion-chapter>
    <div className="two-sides__composition">
      <div className="two-sides__lead">
        <div className="two-sides__lead-copy" data-motion-item>
          <p className="eyebrow">{content.sides.eyebrow}</p>
          <h2 id="two-sides-title">{content.sides.title}</h2>
          <p>{content.sides.intro}</p>

          <div className="two-sides__perspectives" role="tablist" aria-label={content.sides.eyebrow}>
            <button type="button" role="tab" aria-selected={!caregiver} onClick={() => setPerspective("loved")}>
              <span>01</span>{content.sides.lovedTab.replace("01 — ", "")}
            </button>
            <button type="button" role="tab" aria-selected={caregiver} onClick={() => setPerspective("caregiver")}>
              <span>02</span>{content.sides.caregiverTab.replace("02 — ", "")}
            </button>
          </div>
        </div>

        <div className="two-sides__stage" aria-live="polite" data-motion-item>
          {caregiver ? <>
            <Image
              src="/reflexion-assets/generated/phase1/reflexion-hero-founder-2026-08.webp"
              alt="The Reflexion Mirror and Caregiver App presented together in a warm home setting"
              fill
              sizes="(max-width: 820px) 100vw, 60vw"
              className="two-sides__home-context"
            />
            <div className="two-sides__stage-veil" aria-hidden="true"/>
            <Image
              src="/reflexion-assets/generated/phase1/reflexion-hero-founder-2026-08.webp"
              alt="The Reflexion Mirror and Caregiver App presented together in a warm home setting"
              width={677}
              height={1302}
              sizes="(max-width: 520px) 62vw, (max-width: 820px) 42vw, 25vw"
              className="two-sides__app-phone"
            />
          </> : <>
            <div className="two-sides__mirror"><MirrorScene compact/></div>
            <div className="two-sides__stage-veil" aria-hidden="true"/>
          </>}
        </div>
      </div>

      <div className="two-sides__detail" role="tabpanel" data-motion-item>
        <p className="eyebrow">{caregiver ? content.sides.caregiverTab.replace("02 — ", "") : content.sides.lovedTab.replace("01 — ", "")}</p>
        <h3>{caregiver ? content.sides.caregiverTitle : content.sides.lovedTitle}</h3>
        <p className="two-sides__detail-intro">{caregiver ? content.sides.caregiverBody : content.sides.lovedBody}</p>
        <div className="two-sides__features">
          {features.map((feature, index) => <article key={feature[0]}>
            <span className="two-sides__feature-icon" aria-hidden="true"><Icon name={icons[index]}/></span>
            <div><h4>{feature[0]}</h4><b>{feature[1]}</b><p>{feature[2]}</p></div>
          </article>)}
        </div>
        <div className="two-sides__closing">
          <p>{content.sides.closingTitle}</p>
          <ButtonLink href="#find-your-reflexion" variant="secondary">{content.sides.cta}</ButtonLink>
        </div>
      </div>
    </div>
  </section>;
}
