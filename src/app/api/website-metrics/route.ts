import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
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
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== new URL(request.url).host) {
        return NextResponse.json({ error: "Cross-origin metric writes are not allowed." }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid request origin." }, { status: 400 });
    }
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Metric payload is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Metric payload is too large." }, { status: 413 });
    }
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Metric payload must be valid JSON." }, { status: 400 });
  }

  const parsed = websiteMetricSchema.safeParse(body);
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
