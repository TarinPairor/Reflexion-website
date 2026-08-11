"use client";

import { useEffect, useState } from "react";

export function StickyCta({ label, href = "/get-reflexion" }: { label: string; href?: string }) {
  const [heroPassed, setHeroPassed] = useState(false);
  const [suppressed, setSuppressed] = useState(false);
  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const heroObserver = new IntersectionObserver(([entry]) => setHeroPassed(!entry.isIntersecting), { threshold: 0.08 });
    const suppressor = document.querySelector("[data-sticky-cta-suppression]");
    const suppressionObserver = suppressor ? new IntersectionObserver(([entry]) => setSuppressed(entry.isIntersecting), { threshold: 0.12 }) : null;
    heroObserver.observe(hero);
    if (suppressor && suppressionObserver) suppressionObserver.observe(suppressor);
    return () => { heroObserver.disconnect(); suppressionObserver?.disconnect(); };
  }, []);
  const visible = heroPassed && !suppressed;
  return <a className="mobile-sticky-cta" data-visible={visible} href={href} aria-hidden={!visible} tabIndex={visible ? 0 : -1}>{label}</a>;
}
