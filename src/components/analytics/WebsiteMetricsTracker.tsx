"use client";

import { useEffect } from "react";
import { recordFunnelMetric, recordSiteVisit, startNewFunnelSession } from "@/lib/website-metrics/client";

export function WebsiteMetricsTracker() {
  useEffect(() => {
    if (window.location.pathname === "/metrics") return;
    recordSiteVisit();

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin || destination.pathname !== "/get-reflexion") return;

      startNewFunnelSession();
      recordFunnelMetric({ event: "get_reflexion_click" });
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
