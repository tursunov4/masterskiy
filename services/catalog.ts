import { apiFetch } from "@/lib/api";

export type Category = {
  id: number;
  name: string;
  slug: string;
  image: string;
  created_at: string;
};

export type Subcategory = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  category: Category;
  created_at: string;
};

export function getSubcategories(categorySlug: string) {
  return apiFetch<Subcategory[]>(
    `/api/catalog/subcategories/?category=${categorySlug}`,
    {
      next: { revalidate: 60, tags: [`subcategories:${categorySlug}`] },
    }
  );
}
