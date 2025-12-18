// src/lib/catalog/api.ts
import { API_BASE } from "../api";

export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    ...init,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${text || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

/* ---------- TYPES ---------- */

export type ApiColor = { id: number; name: string };

export type ApiMozaykaType = { id: number; name: string };

export type ApiProductListItem = {
  id: number;
  name: string;
  slug: string;
  image: string | null;

  price?: string | null;
  style?: string | null;

  color?: { id: number; name: string } | null;
  mozayka_type?: { id: number; name: string } | null;

  category?: { id: number; name: string; slug: string } | null;
  subcategory?: { id: number; name: string; slug: string } | null;
};

/* ---------- ENDPOINTS ---------- */

export function getColors() {
  return apiGet<Paginated<ApiColor>>("/api/catalog/colors/");
}

export function getMozaykaTypes() {
  return apiGet<Paginated<ApiMozaykaType>>("/api/catalog/mozayka-types/");
}

export function getProductsBySubcategory(params: {
  subcategorySlug: string; // params.slug
  page?: number; // 1..
  colorId?: number | null; // ?color=1
  mozaykaTypeId?: number | null; // ?mozayka_type=2
}) {
  const page = params.page ?? 1;

  const qs = new URLSearchParams();
  qs.set("subcategory", params.subcategorySlug);
  qs.set("page", String(page));

  if (params.colorId) qs.set("color", String(params.colorId));
  if (params.mozaykaTypeId)
    qs.set("mozayka_type", String(params.mozaykaTypeId));

  return apiGet<Paginated<ApiProductListItem>>(
    `/api/catalog/products/?${qs.toString()}`
  );
}
