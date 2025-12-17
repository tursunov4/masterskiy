// lib/catalog/products.ts

import { apiFetch } from "@/lib/api";

export type ApiTopProduct = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
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
  color: { id: number; name: string } | null;
  country: { id: number; name: string } | null;
  price: string | null;
  style: string | null;
  is_top: boolean;
  created_at: string;
};

export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export function getTopProducts(page = 1) {
  return apiFetch<Paginated<ApiTopProduct>>(
    `/api/catalog/products/top/?page=${page}`
  );
}
