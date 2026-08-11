import { MongoServerError, type Collection, type Document, type UpdateFilter } from "mongodb";
import { getExactPrice } from "@/lib/get-reflexion/config";
import { getRefDatabase } from "@/lib/mongodb";
import type { WebsiteMetric } from "./schema";

const metricVersion = "2026-08-12";
type WebsiteMetricDocument = Document & { _id: string };

async function upsertMetricDocument(collection: Collection<WebsiteMetricDocument>, id: string, update: UpdateFilter<WebsiteMetricDocument>) {
  try {
    await collection.updateOne({ _id: id }, update, { upsert: true });
  } catch (error) {
    if (!(error instanceof MongoServerError) || error.code !== 11000) throw error;
    await collection.updateOne({ _id: id }, update);
  }
}

function funnelUpdate(metric: Exclude<WebsiteMetric, { event: "site_visit" }>, now: Date): UpdateFilter<WebsiteMetricDocument> {
  const set: Document = {
    updatedAt: now,
    lastEvent: metric.event,
    lastPath: metric.path,
  };

  switch (metric.event) {
    case "get_reflexion_click":
      set.getReflexionClickedAt = now;
      break;
    case "funnel_started":
      set.funnelStartedAt = now;
      break;
    case "pre_price_preferences":
      set.prePricePreferencesRecordedAt = now;
      set.formFactorPreference = metric.productId;
      set.parentAcceptancePreference = metric.parentAcceptancePreference;
      set.caregiverPurchasePreference = metric.caregiverPurchasePreference;
      break;
    case "price_viewed":
      set.exactPriceReachedAt = now;
      set.productId = metric.productId;
      set.mirrorPlan = metric.mirrorPlan;
      set.exactPrice = getExactPrice(metric.productId, metric.mirrorPlan ?? "a");
      break;
    case "continued_after_price":
      set.continuedAfterPriceAt = now;
      break;
    case "details_completed":
      set.detailsCompletedAt = now;
      break;
    case "price_decision":
      set.priceDecisionRecordedAt = now;
      set.exactPriceAccepted = metric.accepted;
      break;
    case "price_rejection":
      set.priceRejectedAt = now;
      set.priceRejectionReason = metric.reason;
      break;
    case "follow_up_selected":
      set.followUpSelectedAt = now;
      set.followUp = metric.followUp;
      set.strongerCommitment = metric.followUp === "pilot";
      break;
    case "funnel_completed":
      set.funnelCompletedAt = now;
      break;
  }

  return {
    $setOnInsert: {
      documentType: "funnel",
      metricVersion,
      visitorId: metric.visitorId,
      funnelSessionId: metric.funnelSessionId,
      trafficSource: metric.attribution.trafficSource,
      attribution: metric.attribution,
      referrerHost: metric.referrerHost ?? null,
      createdAt: now,
    },
    $set: set,
  };
}

export async function recordWebsiteMetric(metric: WebsiteMetric) {
  const database = await getRefDatabase();
  const collection = database.collection<WebsiteMetricDocument>("WebsiteMetrics");
  const now = new Date();

  await upsertMetricDocument(
    collection,
    `visitor:${metric.visitorId}`,
    {
      $setOnInsert: {
        documentType: "visitor",
        metricVersion,
        visitorId: metric.visitorId,
        firstSeenAt: now,
        landingPath: metric.path,
        referrerHost: metric.referrerHost ?? null,
        trafficSource: metric.attribution.trafficSource,
        attribution: metric.attribution,
      },
      $set: { lastSeenAt: now, lastPath: metric.path },
      $inc: { eventsRecorded: 1, ...(metric.event === "site_visit" ? { visits: 1 } : {}) },
    },
  );

  if (metric.event === "site_visit") return;

  await upsertMetricDocument(collection, `funnel:${metric.funnelSessionId}`, funnelUpdate(metric, now));
}
