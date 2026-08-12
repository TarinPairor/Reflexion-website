import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { followThroughUpdateSchema, recordLeadFollowThrough } from "@/lib/website-metrics/follow-through";
import { websiteMetricSchema } from "@/lib/website-metrics/schema";
import { recordWebsiteMetric } from "@/lib/website-metrics/server";
import { getWebsiteMetricsSummary } from "@/lib/website-metrics/summary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 4_000;

function hasDashboardAccess(request: Request) {
  const expected = process.env.WEBSITE_METRICS_TOKEN;
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!expected || !supplied) return false;
  const expectedBuffer = Buffer.from(expected);
  const suppliedBuffer = Buffer.from(supplied);
  return expectedBuffer.length === suppliedBuffer.length && timingSafeEqual(expectedBuffer, suppliedBuffer);
}

function hasSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

async function readJsonBody(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) return { error: "Metric payload is too large.", status: 413 } as const;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) return { error: "Metric payload is too large.", status: 413 } as const;
    return { body: JSON.parse(rawBody) as unknown } as const;
  } catch {
    return { error: "Metric payload must be valid JSON.", status: 400 } as const;
  }
}

export async function GET(request: Request) {
  if (!process.env.WEBSITE_METRICS_TOKEN) {
    return NextResponse.json({ error: "WEBSITE_METRICS_TOKEN is not configured." }, { status: 503 });
  }
  if (!hasDashboardAccess(request)) {
    return NextResponse.json({ error: "A valid metrics access token is required." }, { status: 401 });
  }

  try {
    return NextResponse.json(await getWebsiteMetricsSummary());
  } catch (error) {
    console.error("Website metrics summary failed", error instanceof Error ? error.message : "Unknown database error");
    return NextResponse.json({ error: "Metrics could not be loaded." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin metric writes are not allowed." }, { status: 403 });
  }

  const payload = await readJsonBody(request);
  if ("error" in payload) return NextResponse.json({ error: payload.error }, { status: payload.status });

  const parsed = websiteMetricSchema.safeParse(payload.body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid website metric." }, { status: 400 });
  }

  try {
    await recordWebsiteMetric(parsed.data);
    return NextResponse.json({ ok: true }, { status: 202 });
  } catch (error) {
    console.error("Website metric write failed", error instanceof Error ? error.message : "Unknown database error");
    return NextResponse.json({ error: "Metric could not be recorded." }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin metric writes are not allowed." }, { status: 403 });
  }
  if (!process.env.WEBSITE_METRICS_TOKEN) {
    return NextResponse.json({ error: "WEBSITE_METRICS_TOKEN is not configured." }, { status: 503 });
  }
  if (!hasDashboardAccess(request)) {
    return NextResponse.json({ error: "A valid metrics access token is required." }, { status: 401 });
  }

  const payload = await readJsonBody(request);
  if ("error" in payload) return NextResponse.json({ error: payload.error }, { status: payload.status });
  const parsed = followThroughUpdateSchema.safeParse(payload.body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid follow-through update." }, { status: 400 });
  }

  try {
    const matched = await recordLeadFollowThrough(parsed.data);
    if (!matched) return NextResponse.json({ error: "Lead submission was not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead follow-through update failed", error instanceof Error ? error.message : "Unknown database error");
    return NextResponse.json({ error: "Follow-through could not be recorded." }, { status: 503 });
  }
}
