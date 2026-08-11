import { describe, expect, it } from "vitest";
import { websiteMetricSchema } from "./schema";

const base = {
  visitorId: "cb8a7bb6-cf2d-49f9-a580-b882ab2224cc",
  funnelSessionId: "9f1820ad-d4f4-4a40-a88a-4d7ae85ee36d",
  path: "/get-reflexion",
  attribution: {
    trafficSource: "direct" as const,
    utmSource: null,
    utmMedium: null,
    utmCampaign: null,
    utmContent: null,
  },
};

describe("websiteMetricSchema", () => {
  it("accepts the three distinct pre-price preferences", () => {
    expect(websiteMetricSchema.safeParse({
      ...base,
      event: "pre_price_preferences",
      productId: "mirror",
      parentAcceptancePreference: "home-hub",
      caregiverPurchasePreference: "loved-one-app",
    }).success).toBe(true);
  });

  it("rejects unsupported product values", () => {
    expect(websiteMetricSchema.safeParse({
      ...base,
      event: "price_viewed",
      productId: "camera",
      mirrorPlan: null,
    }).success).toBe(false);
  });

  it("requires a funnel session for funnel events", () => {
    const withoutSession = { visitorId: base.visitorId, path: base.path };
    expect(websiteMetricSchema.safeParse({ ...withoutSession, event: "funnel_completed" }).success).toBe(false);
  });

  it("accepts an anonymous site visit without a funnel session", () => {
    expect(websiteMetricSchema.safeParse({
      visitorId: base.visitorId,
      path: "/",
      event: "site_visit",
      referrerHost: null,
      attribution: base.attribution,
    }).success).toBe(true);
  });
});
