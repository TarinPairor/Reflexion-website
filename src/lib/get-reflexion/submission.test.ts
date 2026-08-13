import { describe, expect, it } from "vitest";
import { contactFormSubmissionSchema, pilotFormSubmissionSchema, websiteFormSubmissionSchema } from "./submission";

const validMirrorSubmission = {
  productId: "mirror",
  mirrorPlan: "a",
  details: {
    firstName: "Mei",
    lastName: "Tan",
    mobile: "+65 8123 4567",
    email: "mei@example.com",
    streetAddress: "10 Example Street",
    city: "Singapore",
    postalCode: "123456",
    recipient: "Parent",
    recipientOther: "",
    readiness: true,
  },
  priceDecision: "yes",
  followUp: "pilot",
  noReason: null,
  noReasonOther: null,
  decisionReason: "A calm way to stay connected.",
};

describe("websiteFormSubmissionSchema", () => {
  it("accepts a complete Mirror submission", () => {
    expect(websiteFormSubmissionSchema.safeParse(validMirrorSubmission).success).toBe(true);
  });

  it("requires an exact six-digit postcode", () => {
    const submission = {
      ...validMirrorSubmission,
      details: { ...validMirrorSubmission.details, postalCode: "12345" },
    };

    expect(websiteFormSubmissionSchema.safeParse(submission).success).toBe(false);
  });

  it("rejects a follow-up that does not match the product", () => {
    expect(websiteFormSubmissionSchema.safeParse({ ...validMirrorSubmission, followUp: "progress" }).success).toBe(false);
  });

  it("requires a reason when the exact-price response is no", () => {
    const submission = {
      ...validMirrorSubmission,
      priceDecision: "no",
      followUp: null,
      noReason: null,
    };

    expect(websiteFormSubmissionSchema.safeParse(submission).success).toBe(false);
  });

  it("requires details when Other is selected", () => {
    const submission = {
      ...validMirrorSubmission,
      details: { ...validMirrorSubmission.details, recipient: "Other", recipientOther: "" },
    };

    expect(websiteFormSubmissionSchema.safeParse(submission).success).toBe(false);
    expect(websiteFormSubmissionSchema.safeParse({
      ...submission,
      details: { ...submission.details, recipientOther: "Sibling" },
    }).success).toBe(true);
  });

  it("requires a specified reason when Other is selected", () => {
    const submission = {
      ...validMirrorSubmission,
      priceDecision: "no",
      followUp: null,
      noReason: "Other",
      noReasonOther: "",
    };

    expect(websiteFormSubmissionSchema.safeParse(submission).success).toBe(false);
    expect(websiteFormSubmissionSchema.safeParse({ ...submission, noReasonOther: "The form felt unfamiliar." }).success).toBe(true);
  });
});

describe("pilotFormSubmissionSchema", () => {
  it("accepts the minimum pilot interest details", () => {
    expect(pilotFormSubmissionSchema.safeParse({
      form: "join-pilot",
      productId: "mirror",
      details: {
        fullName: "Amy Wong",
        mobile: "+65 8123 4567",
        email: "amy@example.com",
        recipient: "My parent",
      },
      referralSource: null,
    }).success).toBe(true);
  });

  it("does not accept medical or extra details", () => {
    expect(pilotFormSubmissionSchema.safeParse({
      form: "join-pilot",
      productId: "mirror",
      details: {
        fullName: "Amy Wong",
        mobile: "+65 8123 4567",
        email: "amy@example.com",
        recipient: "My parent",
        diagnosis: "not collected",
      },
      referralSource: null,
    }).success).toBe(false);
  });
});

describe("contactFormSubmissionSchema", () => {
  it("accepts the minimum contact details", () => {
    expect(contactFormSubmissionSchema.safeParse({
      form: "contact",
      locale: "en",
      details: {
        fullName: "Amy Wong",
        mobile: "+65 8123 4567",
        email: "amy@example.com",
        message: "I would like to learn more.",
      },
    }).success).toBe(true);
  });

  it("rejects empty messages", () => {
    expect(contactFormSubmissionSchema.safeParse({
      form: "contact",
      locale: "en",
      details: { fullName: "Amy Wong", mobile: "+65 8123 4567", email: "amy@example.com", message: " " },
    }).success).toBe(false);
  });
});
