"use client";

import { useEffect, useState } from "react";

export function StickyCta({ label, href = "/get-reflexion" }: { label: string; href?: string }) {
  const [heroPassed, setHeroPassed] = useState(false);
  const [suppressed, setSuppressed] = useState(false);
  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const heroObserver = new IntersectionObserver(([entry]) => setHeroPassed(!entry.isIntersecting), { threshold: 0.08 });
    const suppressors = document.querySelectorAll("[data-sticky-cta-suppression]");
    const intersecting = new Set<Element>();
    const suppressionObserver = suppressors.length ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting ? intersecting.add(entry.target) : intersecting.delete(entry.target));
      setSuppressed(intersecting.size > 0);
    }, { threshold: 0.01 }) : null;
    heroObserver.observe(hero);
    if (suppressionObserver) suppressors.forEach((suppressor) => suppressionObserver.observe(suppressor));
    return () => { heroObserver.disconnect(); suppressionObserver?.disconnect(); };
  }, []);
  const visible = heroPassed && !suppressed;
  return <a className="mobile-sticky-cta" data-visible={visible} href={href} aria-hidden={!visible} tabIndex={visible ? 0 : -1}>{label}</a>;
}
