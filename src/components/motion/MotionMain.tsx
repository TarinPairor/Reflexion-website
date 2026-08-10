"use client";

import { useLayoutEffect, type ReactNode } from "react";
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

function prepareMotionStyles(root: HTMLElement) {
  const heroArtwork = root.querySelector<HTMLElement>("[data-motion-hero-artwork]");
  if (heroArtwork) {
    heroArtwork.style.opacity = "0";
    heroArtwork.style.transform = "scale(1.015)";
    heroArtwork.style.clipPath = "inset(3% 3% 3% 3% round 24px)";
  }

  root.querySelectorAll<HTMLElement>("[data-motion-hero-copy] > *").forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(24px)";
  });

  root.querySelectorAll<HTMLElement>("[data-motion-item]").forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(28px)";
  });
}

export function MotionMain({ children }: { children: ReactNode }) {
  const [scope, animate] = useAnimate<HTMLElement>();
  const shouldReduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;

    const reducedMotionRequested = shouldReduceMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotionRequested) {
      clearMotionStyles(root);
      return;
    }
    if (!("IntersectionObserver" in window)) return;

    // Apply initial animation styles only after React has mounted. The server
    // render therefore stays visible if hydration or the client bundle fails.
    prepareMotionStyles(root);

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

        const item = entry.target as HTMLElement;
        const paths = item.querySelectorAll<SVGPathElement>("[data-motion-path]");

        runningAnimations.push(animate(item, {
          opacity: [0, 1],
          y: [28, 0],
        }, {
          duration: 0.62,
          ease: arrivalEase,
        }));

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

        observer.unobserve(item);
      }
    }, { rootMargin: "0px 0px -7% 0px", threshold: 0.1 });

    root.querySelectorAll<HTMLElement>("[data-motion-item]").forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      runningAnimations.forEach((animation) => animation.stop());
    };
  }, [animate, scope, shouldReduceMotion]);

  return <main id="main" ref={scope}>{children}</main>;
}
