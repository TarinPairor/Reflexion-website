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
      if (destination.origin !== window.location.origin) return;
      const isPilotEntry = destination.pathname === "/get-reflexion";
      const isLegacyEntry = destination.pathname === "/get-reflexion-legacy";
      if (!isPilotEntry && !isLegacyEntry) return;

      startNewFunnelSession();
      if (isPilotEntry) {
        recordFunnelMetric({ event: "join_pilot_click" });
        return;
      }
      recordFunnelMetric({ event: "get_reflexion_click" });
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
