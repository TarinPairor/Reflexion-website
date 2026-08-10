"use client";

import { useEffect, useState } from "react";

export function StickyCta({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), { threshold: 0.08 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  return <a className="mobile-sticky-cta" data-visible={visible} href="#get-reflexion" aria-hidden={!visible} tabIndex={visible ? 0 : -1}>{label}</a>;
}
