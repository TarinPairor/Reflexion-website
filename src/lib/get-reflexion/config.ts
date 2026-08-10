export type ProductId = "mirror" | "loved-one-app" | "bear" | "home-hub" | "tabletop-companion";
export type MirrorPlan = "a" | "b";

export type ProductOption = {
  id: ProductId;
  name: string;
  maturity: string;
  description: string;
  included: readonly string[];
  price: string;
};

export const productOptions: readonly ProductOption[] = [
  {
    id: "mirror",
    name: "Reflexion Mirror",
    maturity: "Current flagship",
    description: "A 21.5-inch home experience for check-ins, companionship, routine support and family connection.",
    included: ["21.5-inch Reflexion Mirror", "Reflexion experience", "Reflexion Caregiver App"],
    price: "Choose Mirror A or Mirror B",
  },
  {
    id: "loved-one-app",
    name: "Loved-one App",
    maturity: "Functional alternative · QA-gated",
    description: "A phone-based alternative whose public availability remains subject to product testing and QA.",
    included: ["Loved-one App experience", "Connection with the Reflexion Caregiver App"],
    price: "S$29.90/month",
  },
  {
    id: "bear",
    name: "Reflexion Bear",
    maturity: "Prototype",
    description: "A softer prototype form being explored for homes where a screen may feel less natural.",
    included: ["Bear prototype direction", "Proposed Reflexion experience", "Proposed Caregiver App connection"],
    price: "Expected concept price: S$199 once + S$29.90/month",
  },
  {
    id: "home-hub",
    name: "Reflexion Home Hub",
    maturity: "Concept",
    description: "A compact concept being explored for shared spaces in the home.",
    included: ["Home Hub concept direction", "Proposed Reflexion experience", "Proposed Caregiver App connection"],
    price: "Expected concept price: S$29.90/month",
  },
  {
    id: "tabletop-companion",
    name: "Tabletop Companion",
    maturity: "Future concept",
    description: "A more expressive tabletop form being explored as a future direction.",
    included: ["Tabletop Companion concept direction", "Proposed Reflexion experience", "Proposed Caregiver App connection"],
    price: "Expected concept price: S$999 once + S$39.90/month",
  },
] as const;

export const mirrorPrices: Record<MirrorPlan, string> = {
  a: "S$799 once + S$39.90/month",
  b: "S$74.90/month for 24 months, then S$39.90/month",
};

export function getProduct(productId: ProductId) {
  const product = productOptions.find((item) => item.id === productId);
  if (!product) throw new Error(`Unknown Reflexion form: ${productId}`);
  return product;
}

export function getExactPrice(productId: ProductId, mirrorPlan: MirrorPlan) {
  return productId === "mirror" ? mirrorPrices[mirrorPlan] : getProduct(productId).price;
}

export function isProductId(value: string | undefined): value is ProductId {
  return productOptions.some((product) => product.id === value);
}
