// lib/catalog/product-detail.client.ts
export type ProductDetail = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  images: any[];
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
    category: any;
    created_at: string;
  };
  color: { id: number; name: string } | null;
  country: { id: number; name: string } | null;
  price: string | null;
  description: string | null;
  style: string | null;
  mozayka_type: { id: number; name: string } | null;
  is_top: boolean;
  created_at: string;
  updated_at: string;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://admin.marble-moscow.ru";

export async function getProductByInnerSlugClient(innerSlug: string) {
  const url = `${API_BASE}/api/catalog/products/${encodeURIComponent(
    innerSlug
  )}/`;

  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }

  return (await res.json()) as ProductDetail;
}
