import { z } from "zod";

const productIdSchema = z.enum(["mirror", "loved-one-app", "bear", "home-hub", "tabletop-companion"]);
const mirrorPlanSchema = z.enum(["a", "b"]);

export const websiteFormSubmissionSchema = z.object({
  productId: productIdSchema,
  mirrorPlan: mirrorPlanSchema.nullable(),
  details: z.object({
    firstName: z.string().trim().min(1).max(80),
    lastName: z.string().trim().min(1).max(80),
    mobile: z.string().trim().min(6).max(30),
    email: z.email().max(254),
    streetAddress: z.string().trim().min(1).max(160),
    city: z.string().trim().max(100),
    postalCode: z.string().regex(/^\d{6}$/),
    recipient: z.enum(["Parent", "Grandparent", "Spouse", "Other"]),
    readiness: z.literal(true),
  }).strict(),
  priceDecision: z.enum(["yes", "no"]),
  followUp: z.enum(["pilot", "orders", "availability", "progress", "none"]).nullable(),
  noReason: z.string().trim().max(160).nullable(),
  decisionReason: z.string().trim().max(1_000).nullable(),
}).strict().superRefine((submission, context) => {
  if (submission.productId === "mirror" && submission.mirrorPlan === null) {
    context.addIssue({ code: "custom", path: ["mirrorPlan"], message: "Choose a Mirror price option." });
  }

  if (submission.productId !== "mirror" && submission.mirrorPlan !== null) {
    context.addIssue({ code: "custom", path: ["mirrorPlan"], message: "Mirror plan is only valid for the Mirror." });
  }

  if (submission.priceDecision === "no") {
    if (!submission.noReason) {
      context.addIssue({ code: "custom", path: ["noReason"], message: "Choose a primary reason." });
    }
    if (submission.followUp !== null) {
      context.addIssue({ code: "custom", path: ["followUp"], message: "Follow-up is only valid for a yes decision." });
    }
    return;
  }

  if (submission.noReason !== null) {
    context.addIssue({ code: "custom", path: ["noReason"], message: "A no reason is only valid for a no decision." });
  }

  const validFollowUps = submission.productId === "mirror"
    ? new Set(["pilot", "orders"])
    : submission.productId === "loved-one-app"
      ? new Set(["availability", "none"])
      : new Set(["progress", "none"]);

  if (!submission.followUp || !validFollowUps.has(submission.followUp)) {
    context.addIssue({ code: "custom", path: ["followUp"], message: "Choose a valid next step for this product." });
  }
});

export type WebsiteFormSubmission = z.infer<typeof websiteFormSubmissionSchema>;
