// services/similar-products.ts

import { API_BASE } from "@/lib/api";

export type SimilarProduct = {
  id: number;
  name: string;
  slug: string;
  image: string;
  category: {
    id: number;
    name: string;
    slug: string;
    image: string;
    created_at: string;
  };
  subcategory: {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    category: number;
    created_at: string;
  };
  color: {
    id: number;
    name: string;
  } | null;
  country: {
    id: number;
    name: string;
  } | null;
  price: string | null;
  style: string | null;
  is_top: boolean;
  created_at: string;
};

export async function getSimilarProductsClient(productSlug: string) {
  const url = `${API_BASE}/api/catalog/products/${encodeURIComponent(
    productSlug
  )}/similar/`;

  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }

  return (await res.json()) as SimilarProduct[];
}

