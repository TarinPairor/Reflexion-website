"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/content";

export function MobileNav({ locale, labels, getLabel }: { locale: Locale; labels: readonly string[]; getLabel: string }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.classList.remove("nav-open");
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const home = locale === "zh" ? "/?lang=zh" : "/";
  const anchors = ["#day-with-reflexion", "#find-your-reflexion", "#trust", "#faq"].map((anchor) => `${home}${anchor}`);
  const getHref = locale === "zh" ? "/get-reflexion?lang=zh" : "/get-reflexion";
  return <div className="mobile-nav">
    <button ref={buttonRef} className="nav-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen((value) => !value)}>
      <span/><span/>
    </button>
    <div className="mobile-menu" id="mobile-menu" data-open={open}>
      <nav aria-label="Mobile navigation">
        {labels.map((label, index) => <a href={anchors[index]} key={label} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
      <div className="mobile-menu__locales" aria-label="Language">
        <Link href="/?lang=en" lang="en" aria-current={locale === "en" ? "page" : undefined}>EN</Link>
        <span>/</span>
        <Link href="/?lang=zh" lang="zh-Hans" aria-current={locale === "zh" ? "page" : undefined}>中文</Link>
      </div>
      <Link className="button button--light" href={getHref} onClick={() => setOpen(false)}>{getLabel}</Link>
    </div>
  </div>;
}
