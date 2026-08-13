import { z } from "zod";

export const metricProductIdSchema = z.enum(["mirror", "loved-one-app", "bear", "home-hub", "tabletop-companion"]);
const mirrorPlanSchema = z.enum(["a", "b"]);
const followUpSchema = z.enum(["pilot", "orders", "availability", "progress", "none"]);
const pilotRecipientSchema = z.enum(["My parent", "My grandparent", "My spouse", "Myself", "Someone else"]);
const attributionSchema = z.object({
  trafficSource: z.enum(["vivocity_brochure", "vivocity_backdrop_qr", "vivocity_easel_qr", "instagram", "direct", "referral", "campaign_other"]),
  utmSource: z.string().max(100).nullable(),
  utmMedium: z.string().max(100).nullable(),
  utmCampaign: z.string().max(100).nullable(),
  utmContent: z.string().max(100).nullable(),
}).strict();

const baseMetricSchema = z.object({
  visitorId: z.uuid(),
  funnelSessionId: z.uuid().optional(),
  path: z.string().startsWith("/").max(300),
  referrerHost: z.string().max(255).nullable().optional(),
  attribution: attributionSchema,
});

export const websiteMetricSchema = z.discriminatedUnion("event", [
  baseMetricSchema.extend({ event: z.literal("site_visit") }),
  baseMetricSchema.extend({ event: z.literal("get_reflexion_click"), funnelSessionId: z.uuid() }),
  baseMetricSchema.extend({ event: z.literal("join_pilot_click"), funnelSessionId: z.uuid() }),
  baseMetricSchema.extend({ event: z.literal("funnel_started"), funnelSessionId: z.uuid() }),
  baseMetricSchema.extend({ event: z.literal("pilot_started"), funnelSessionId: z.uuid() }),
  baseMetricSchema.extend({ event: z.literal("pilot_details_completed"), funnelSessionId: z.uuid() }),
  baseMetricSchema.extend({ event: z.literal("pilot_form_factor_selected"), funnelSessionId: z.uuid(), productId: metricProductIdSchema }),
  baseMetricSchema.extend({
    event: z.literal("pilot_submitted"),
    funnelSessionId: z.uuid(),
    productId: metricProductIdSchema,
    recipient: pilotRecipientSchema,
    referralSource: z.string().max(100).nullable(),
  }),
  baseMetricSchema.extend({ event: z.literal("pilot_referral_shared"), funnelSessionId: z.uuid(), method: z.enum(["whatsapp", "copy"]) }),
  baseMetricSchema.extend({
    event: z.literal("pre_price_preferences"),
    funnelSessionId: z.uuid(),
    productId: metricProductIdSchema,
    parentAcceptancePreference: metricProductIdSchema,
    caregiverPurchasePreference: metricProductIdSchema,
  }),
  baseMetricSchema.extend({
    event: z.literal("price_viewed"),
    funnelSessionId: z.uuid(),
    productId: metricProductIdSchema,
    mirrorPlan: mirrorPlanSchema.nullable(),
  }),
  baseMetricSchema.extend({ event: z.literal("continued_after_price"), funnelSessionId: z.uuid() }),
  baseMetricSchema.extend({ event: z.literal("details_completed"), funnelSessionId: z.uuid() }),
  baseMetricSchema.extend({ event: z.literal("price_decision"), funnelSessionId: z.uuid(), accepted: z.boolean() }),
  baseMetricSchema.extend({ event: z.literal("price_rejection"), funnelSessionId: z.uuid(), reason: z.string().trim().min(1).max(160) }),
  baseMetricSchema.extend({ event: z.literal("follow_up_selected"), funnelSessionId: z.uuid(), followUp: followUpSchema }),
  baseMetricSchema.extend({ event: z.literal("funnel_completed"), funnelSessionId: z.uuid() }),
]);

export type WebsiteMetric = z.infer<typeof websiteMetricSchema>;
