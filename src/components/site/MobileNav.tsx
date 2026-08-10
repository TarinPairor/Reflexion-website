"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/content";
import { localisedHref, primaryPaths } from "@/lib/siteRoutes";

export function MobileNav({ locale, labels, getLabel, currentPath = "/" }: { locale: Locale; labels: readonly string[]; getLabel: string; currentPath?: string }) {
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

  const getHref = localisedHref("/get-reflexion", locale);
  return <div className="mobile-nav">
    <button ref={buttonRef} className="nav-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen((value) => !value)}>
      <span/><span/>
    </button>
    <div className="mobile-menu" id="mobile-menu" data-open={open}>
      <nav aria-label="Mobile navigation">
        {labels.map((label, index) => <Link href={localisedHref(primaryPaths[index], locale)} aria-current={currentPath === primaryPaths[index] ? "page" : undefined} key={label} onClick={() => setOpen(false)}>{label}</Link>)}
      </nav>
      <div className="mobile-menu__locales" aria-label="Language">
        <Link href={currentPath} lang="en" aria-current={locale === "en" ? "page" : undefined}>EN</Link>
        <span>/</span>
        <Link href={localisedHref(currentPath, "zh")} lang="zh-Hans" aria-current={locale === "zh" ? "page" : undefined}>中文</Link>
      </div>
      <Link className="button button--light" href={getHref} onClick={() => setOpen(false)}>{getLabel}</Link>
    </div>
  </div>;
}
