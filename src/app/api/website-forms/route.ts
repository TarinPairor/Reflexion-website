import { NextResponse } from "next/server";
import { getExactPrice, getProduct } from "@/lib/get-reflexion/config";
import { websiteFormSubmissionSchema } from "@/lib/get-reflexion/submission";
import { getRefDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 32_000;

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Submission is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Submission is too large." }, { status: 413 });
    }
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Submission must be valid JSON." }, { status: 400 });
  }

  const parsed = websiteFormSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  try {
    const submission = parsed.data;
    const product = getProduct(submission.productId);
    const exactPrice = getExactPrice(submission.productId, submission.mirrorPlan ?? "a");
    const database = await getRefDatabase();
    const result = await database.collection("WebsiteForms").insertOne({
      form: "get-reflexion",
      formVersion: "2026-08-12",
      source: "website",
      product: {
        id: submission.productId,
        name: product.name,
        maturity: product.maturity,
        mirrorPlan: submission.mirrorPlan,
        exactPrice,
      },
      details: submission.details,
      decision: {
        exactPriceResponse: submission.priceDecision,
        followUp: submission.followUp,
        noReason: submission.noReason,
        noReasonOther: submission.noReasonOther,
        decisionReason: submission.decisionReason,
      },
      status: "new",
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true, submissionId: result.insertedId.toHexString() }, { status: 201 });
  } catch (error) {
    console.error("Website form submission failed", error instanceof Error ? error.message : "Unknown database error");
    return NextResponse.json({ error: "We could not save your details. Please try again." }, { status: 503 });
  }
}
