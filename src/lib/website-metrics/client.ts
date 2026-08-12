"use client";

import type { ProductId, MirrorPlan } from "@/lib/get-reflexion/config";

const visitorKey = "reflexion:anonymous-visitor:v1";
const funnelKey = "reflexion:funnel-session:v1";
const visitorCookie = "reflexion_visitor_id";
const attributionKey = "reflexion:traffic-attribution:v1";

type Attribution = {
  trafficSource: "vivocity_brochure" | "vivocity_backdrop_qr" | "vivocity_easel_qr" | "instagram" | "direct" | "referral" | "campaign_other";
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
};

type FunnelMetric =
  | { event: "get_reflexion_click" | "funnel_started" | "continued_after_price" | "details_completed" | "funnel_completed" }
  | { event: "pre_price_preferences"; productId: ProductId; parentAcceptancePreference: ProductId; caregiverPurchasePreference: ProductId }
  | { event: "price_viewed"; productId: ProductId; mirrorPlan: MirrorPlan | null }
  | { event: "price_decision"; accepted: boolean }
  | { event: "price_rejection"; reason: string }
  | { event: "follow_up_selected"; followUp: string };

function getStorageId(storage: Storage, key: string) {
  const existing = storage.getItem(key);
  if (existing) return existing;
  const id = crypto.randomUUID();
  storage.setItem(key, id);
  return id;
}

export function getAnonymousVisitorId() {
  const cookieValue = document.cookie.split("; ").find((item) => item.startsWith(`${visitorCookie}=`))?.split("=")[1];
  if (cookieValue) return cookieValue;

  const visitorId = getStorageId(window.localStorage, visitorKey);
  const sharedDomain = /(^|\.)reflexion\.sg$/i.test(window.location.hostname) ? "; Domain=.reflexion.sg" : "";
  document.cookie = `${visitorCookie}=${visitorId}; Path=/; Max-Age=31536000; SameSite=Lax; Secure${sharedDomain}`;
  return visitorId;
}

export function getOrCreateFunnelSessionId() {
  return getStorageId(window.sessionStorage, funnelKey);
}

export function startNewFunnelSession() {
  const id = crypto.randomUUID();
  window.sessionStorage.setItem(funnelKey, id);
  return id;
}

export function resetFunnelSession() {
  window.sessionStorage.removeItem(funnelKey);
}

function currentContext() {
  let referrerHost: string | null = null;
  try {
    referrerHost = document.referrer ? new URL(document.referrer).hostname : null;
  } catch {
    referrerHost = null;
  }
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  const utmCampaign = params.get("utm_campaign");
  const utmContent = params.get("utm_content");
  const hasCampaign = Boolean(utmSource || utmMedium || utmCampaign || utmContent);

  let attribution: Attribution | null = null;
  if (hasCampaign) {
    const source = utmSource?.toLowerCase();
    const medium = utmMedium?.toLowerCase();
    const trafficSource = source === "vivocity" && medium === "brochure"
      ? "vivocity_brochure"
      : source === "vivocity" && medium === "backdrop_qr"
        ? "vivocity_backdrop_qr"
        : source === "vivocity" && medium === "easel_qr"
          ? "vivocity_easel_qr"
          : source === "instagram"
            ? "instagram"
            : "campaign_other";
    attribution = { trafficSource, utmSource, utmMedium, utmCampaign, utmContent };
    window.sessionStorage.setItem(attributionKey, JSON.stringify(attribution));
  } else {
    try {
      attribution = JSON.parse(window.sessionStorage.getItem(attributionKey) ?? "null") as Attribution | null;
    } catch {
      attribution = null;
    }
  }

  if (!attribution) {
    const isInstagramReferral = Boolean(referrerHost && /(^|\.)instagram\.com$/i.test(referrerHost));
    attribution = {
      trafficSource: isInstagramReferral ? "instagram" : referrerHost ? "referral" : "direct",
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmContent: null,
    };
    window.sessionStorage.setItem(attributionKey, JSON.stringify(attribution));
  }

  return { path: `${window.location.pathname}${window.location.search}`, referrerHost, attribution };
}

function send(payload: Record<string, unknown>) {
  const body = JSON.stringify(payload);
  if (navigator.sendBeacon) {
    const queued = navigator.sendBeacon("/api/website-metrics", new Blob([body], { type: "application/json" }));
    if (queued) return;
  }
  void fetch("/api/website-metrics", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
}

export function recordSiteVisit() {
  send({ event: "site_visit", visitorId: getAnonymousVisitorId(), ...currentContext() });
}

export function recordFunnelMetric(metric: FunnelMetric) {
  send({ ...metric, visitorId: getAnonymousVisitorId(), funnelSessionId: getOrCreateFunnelSessionId(), ...currentContext() });
}
