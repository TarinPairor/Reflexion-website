import { ObjectId } from "mongodb";
import { z } from "zod";
import { getRefDatabase } from "@/lib/mongodb";

export const followThroughStageSchema = z.enum([
  "contacted",
  "replied",
  "call_taken",
  "pilot_qualified",
  "proceeded",
  "closed_no_progression",
]);

export const followThroughUpdateSchema = z.object({
  submissionId: z.string().regex(/^[a-f\d]{24}$/i),
  stage: followThroughStageSchema,
}).strict();

export type FollowThroughStage = z.infer<typeof followThroughStageSchema>;

const milestoneFields: Record<FollowThroughStage, string> = {
  contacted: "contactedAt",
  replied: "repliedAt",
  call_taken: "callTakenAt",
  pilot_qualified: "pilotQualifiedAt",
  proceeded: "proceededAt",
  closed_no_progression: "closedNoProgressionAt",
};

export async function recordLeadFollowThrough(input: z.infer<typeof followThroughUpdateSchema>) {
  const database = await getRefDatabase();
  const now = new Date();
  const milestoneField = milestoneFields[input.stage];
  const result = await database.collection("WebsiteForms").updateOne(
    { _id: new ObjectId(input.submissionId), form: "get-reflexion" },
    {
      $set: {
        "followThrough.currentStage": input.stage,
        "followThrough.updatedAt": now,
        [`followThrough.milestones.${milestoneField}`]: now,
      },
    },
  );

  return result.matchedCount === 1;
}
