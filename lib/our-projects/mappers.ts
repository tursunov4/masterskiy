import { formatPriceRub } from "@/lib/utils";
import type { ApiWork } from "./api";
import type { MainColorKey, MosaicType, StyleType } from "./filters";

export type Product = {
  id: number;
  name: string;
  stone: string;
  price: string;
  image: string;
  mainColor: MainColorKey;
  styles: StyleType[];
  mosaic: MosaicType;
  slug: string;
  categorySlug?: string;
  subcategorySlug?: string;
};

export function mapApiColorToMainColor(apiColor?: string | null): MainColorKey {
  const c = (apiColor ?? "").toLowerCase();

  if (!c) return "other";
  if (["white", "ivory", "cream", "beige", "light"].some((x) => c.includes(x)))
    return "light";
  if (["warm", "gold", "yellow", "sand", "brown"].some((x) => c.includes(x)))
    return "warm";
  if (["gray", "grey", "silver"].some((x) => c.includes(x))) return "gray";
  if (["dark", "graphite"].some((x) => c.includes(x))) return "dark";
  if (["black", "nero"].some((x) => c.includes(x))) return "black";
  return "other";
}

export function mapApiStyleToStyles(apiStyle?: string | null): StyleType[] {
  const s = (apiStyle ?? "").toLowerCase();

  if (s === "modern") return ["modern"];
  if (s === "classic") return ["classic"];
  if (s === "luxury") return ["luxury"];
  if (s === "vintage") return ["luxury"];
  return [];
}

export function mapApiWorkToProduct(w: ApiWork): Product {
  return {
    id: w.id,
    slug: w.slug,
    name: w.name,
    stone: `${w.category?.name ?? "Проект"}: ${w.subcategory?.name ?? w.name}`,
    price: formatPriceRub(w.price),
    image: w.image ?? "/images/png/floor2.png",
    mainColor: mapApiColorToMainColor(w.color?.name),
    styles: mapApiStyleToStyles(w.style),
    mosaic: w.is_top ? "accent" : "none",
    categorySlug: w.category?.slug,
    subcategorySlug: w.subcategory?.slug,
  };
}
