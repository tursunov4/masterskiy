// lib/master/banners.ts

import { apiFetch } from "@/lib/api";

export type BannerImage = {
  id: number;
  title: string;
  image: string;
  alt_text?: string | null;
  order?: number | null;
  created_at?: string;
  updated_at?: string;
};

export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export async function getBanners(page = 1) {
  return apiFetch<Paginated<BannerImage>>(`/api/master/banners/?page=${page}`);
}
