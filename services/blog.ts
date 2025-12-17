import { apiFetch } from "@/lib/api";

// lib/blog/api.ts
export const API_BASE = "https://admin.marble-moscow.ru/api";

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export function getBlogPostsUrl(page = 1, pageSize = 9) {
  const u = new URL(`${API_BASE}/blog/blog/`);
  u.searchParams.set("page", String(page));
  u.searchParams.set("page_size", String(pageSize));
  return u.toString();
}

export async function getBlogPosts(page = 1, pageSize = 9) {
  return apiFetch<Paginated<BlogPost>>(getBlogPostsUrl(page, pageSize));
}

// lib/blog/blog.client.ts
export type BlogPostDetail = {
  id: number;
  title: string;
  slug: string;
  content: string | null;
  image: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export async function getBlogPostDetailClient(slug: string) {
  const url = `${API_BASE}/blog/blog/${encodeURIComponent(slug)}/`;

  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }

  return (await res.json()) as BlogPostDetail;
}
