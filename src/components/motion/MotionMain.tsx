"use client";

import { useEffect, type ReactNode } from "react";
import { stagger, useAnimate, useReducedMotion } from "motion/react";

const arrivalEase = [0.16, 1, 0.3, 1] as const;

function clearMotionStyles(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-motion-hero-artwork], [data-motion-hero-copy] > *, [data-motion-item]").forEach((element) => {
    element.style.removeProperty("clip-path");
    element.style.removeProperty("opacity");
    element.style.removeProperty("transform");
  });
  root.querySelectorAll<SVGPathElement>("[data-motion-path]").forEach((path) => {
    path.style.removeProperty("opacity");
    path.style.removeProperty("stroke-dasharray");
    path.style.removeProperty("stroke-dashoffset");
  });
}

export function MotionMain({ children }: { children: ReactNode }) {
  const [scope, animate] = useAnimate<HTMLElement>();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    const reducedMotionRequested = shouldReduceMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotionRequested) {
      clearMotionStyles(root);
      return;
    }
    if (!("IntersectionObserver" in window)) return;

    const runningAnimations: Array<{ stop: () => void }> = [];
    const heroArtwork = root.querySelector<HTMLElement>("[data-motion-hero-artwork]");
    const heroCopy = root.querySelectorAll<HTMLElement>("[data-motion-hero-copy] > *");

    if (heroArtwork) {
      runningAnimations.push(animate(heroArtwork, {
        clipPath: ["inset(3% 3% 3% 3% round 24px)", "inset(0% 0% 0% 0% round 0px)"],
        opacity: [0, 1],
        scale: [1.015, 1],
      }, { duration: 0.72, ease: arrivalEase }));
    }

    if (heroCopy.length) {
      runningAnimations.push(animate(heroCopy, {
        opacity: [0, 1],
        y: [24, 0],
      }, {
        delay: stagger(0.055, { startDelay: 0.04 }),
        duration: 0.64,
        ease: arrivalEase,
      }));
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        const chapter = entry.target as HTMLElement;
        const items = chapter.querySelectorAll<HTMLElement>("[data-motion-item]");
        const paths = chapter.querySelectorAll<SVGPathElement>("[data-motion-path]");

        if (items.length) {
          runningAnimations.push(animate(items, {
            opacity: [0, 1],
            y: [28, 0],
          }, {
            delay: stagger(0.045),
            duration: 0.62,
            ease: arrivalEase,
          }));
        }

        if (paths.length) {
          runningAnimations.push(animate(paths, {
            opacity: [0.18, 1],
            pathLength: [0, 1],
          }, {
            delay: stagger(0.14, { startDelay: 0.18 }),
            duration: 0.9,
            ease: arrivalEase,
          }));
        }

        observer.unobserve(chapter);
      }
    }, { rootMargin: "0px 0px -5% 0px", threshold: 0.08 });

    root.querySelectorAll<HTMLElement>("[data-motion-chapter]").forEach((chapter) => observer.observe(chapter));

    return () => {
      observer.disconnect();
      runningAnimations.forEach((animation) => animation.stop());
    };
  }, [animate, scope, shouldReduceMotion]);

  return <main id="main" ref={scope}>{children}</main>;
}
