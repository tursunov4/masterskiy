import { API_BASE } from "@/lib/api";
import type { MosaicType, StyleType } from "./filters";

export type ApiWork = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  color: { id: number; name: string } | null;
  price: string | null;
  style: string | null;
  is_top: boolean;
  created_at: string;
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
};

export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type OurWorksQuery = {
  page: number;
  category?: string; // изделие value
  color?: string; // color api_value (hex emas)
  style?: StyleType[]; // multi
  mosaic?: MosaicType | null;
};

export async function fetchOurWorks(
  q: OurWorksQuery
): Promise<Paginated<ApiWork>> {
  const params = new URLSearchParams();
  params.set("page", String(q.page));

  // ⚠️ Agar backend paramlari boshqacha bo'lsa: shu yerda o'zgartiring
  if (q.category) params.set("category", q.category);
  if (q.color) params.set("color", q.color);

  // style multi: style=modern&style=classic ...
  if (q.style && q.style.length) {
    q.style.forEach((s) => params.append("style", s));
  }

  // mosaic
  if (q.mosaic) params.set("mosaic", q.mosaic);

  const url = `${API_BASE}/api/catalog/our-works/?${params.toString()}`;
  const res = await fetch(url, { method: "GET" });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${text || res.statusText}`);
  }

  return res.json();
}
