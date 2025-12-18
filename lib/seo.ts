export type SeoResponse = {
  id: number;

  home_title: string;
  home_description: string;
  home_keywords: string;

  contact_title: string;
  contact_description: string;
  contact_keywords: string;

  about_title: string;
  about_description: string;
  about_keywords: string;

  our_projects_title: string;
  our_projects_description: string;
  our_projects_keywords: string;

  created_at: string;
  updated_at: string;
};

import { API_BASE } from "./api";

export async function getSeo(): Promise<SeoResponse | null> {
  try {
    const res = await fetch(`${API_BASE}/api/master/seo/`, {
      next: { revalidate: 60 }, // SEO tez-tez o‘zgarmaydi
    });

    if (!res.ok) return null;
    return (await res.json()) as SeoResponse;
  } catch {
    return null;
  }
}
