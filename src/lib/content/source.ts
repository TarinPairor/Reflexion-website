import { z } from "zod";
import rawSource from "@/content/canonical-content.runtime.json";

const copySchema = z.object({
  id: z.string(),
  status: z.string(),
  text: z.string(),
});

const homeSectionSchema = z.object({
  id: z.string(),
  status: z.string(),
}).loose();

const productSchema = z.object({
  id: z.string(),
  public_name: z.string(),
  status: z.string(),
  maturity_label: z.string(),
  maturity_status: z.string(),
}).loose();

const canonicalSchema = z.object({
  meta: z.object({
    version: z.string(),
    status: z.literal("CANONICAL_CONTENT_SOURCE"),
  }).loose(),
  global: z.object({
    brand_name: copySchema,
    primary_cta: copySchema,
    secondary_ctas: z.array(copySchema),
    navigation: z.array(copySchema.extend({ route_hint: z.string() })),
    value_pillars: z.array(z.object({ id: z.string(), status: z.string(), label: z.string() })),
    closed_care_loop: z.object({
      id: z.string(),
      status: z.string(),
      steps: z.array(z.string()),
      core_message: z.string(),
    }),
    cognitive_positioning: z.object({
      preferred_term: copySchema,
      limitation: copySchema,
    }).loose(),
  }).loose(),
  pages: z.object({
    home: z.object({
      id: z.literal("page.home"),
      status: z.string(),
      sections: z.array(homeSectionSchema),
    }).loose(),
  }).loose(),
  products: z.object({
    mirror: productSchema,
    caregiver_app: productSchema,
    bear: productSchema,
    home_hub: productSchema,
    tabletop_companion: productSchema,
    loved_one_app: productSchema,
  }),
}).loose();

export const canonicalContent = canonicalSchema.parse(rawSource);

export function getHomeSection<T extends string>(id: T) {
  const section = canonicalContent.pages.home.sections.find((item) => item.id === id);
  if (!section) throw new Error(`Canonical Home section missing: ${id}`);
  return section;
}

export function getSecondaryCta(id: string) {
  const cta = canonicalContent.global.secondary_ctas.find((item) => item.id === id);
  if (!cta) throw new Error(`Canonical CTA missing: ${id}`);
  return cta;
}
