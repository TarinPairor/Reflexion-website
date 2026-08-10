"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/content";
import { productOptions, type ProductId } from "@/lib/get-reflexion/config";
import { localisedHref } from "@/lib/siteRoutes";
import { ButtonLink } from "@/components/ui/ButtonLink";

const storageKey = "reflexion:selected-form:v1";

export function ProductSelection({ locale, title, body, cta }: { locale: Locale; title: string; body: string; cta: string }) {
  const [selected, setSelected] = useState<ProductId>("mirror");

  const choose = (productId: ProductId) => {
    setSelected(productId);
    window.localStorage.setItem(storageKey, productId);
  };

  return <section className="product-selection" aria-labelledby="product-selection-title" data-motion-item>
    <div><h2 id="product-selection-title">{title}</h2><p>{body}</p></div>
    <div className="product-selection__options" role="radiogroup" aria-label={title}>
      {productOptions.map((product) => <button type="button" role="radio" aria-checked={selected === product.id} data-selected={selected === product.id} onClick={() => choose(product.id)} key={product.id}>
        <span>{product.name}</span><small>{product.maturity}</small>
      </button>)}
    </div>
    <ButtonLink href={localisedHref(`/get-reflexion?form=${selected}`, locale)}>{cta}</ButtonLink>
  </section>;
}
