// services/products.ts
import { apiFetch } from "@/lib/api";

export type ApiColor = { id: number; name: string };
export type ApiCountry = { id: number; name: string };

export type ApiProduct = {
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
  color: ApiColor | null;
  country: ApiCountry | null;
  price: string; // "3000.00"
  style: string; // "classic"
  is_top: boolean;
  created_at: string;
};

export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

type GetProductsArgs = {
  categoryId: number; // ✅ siz aytgandek hozircha o‘zgarmaydi (3)
  page?: number;
  color?: string; // masalan: "blue"
};

export function getProducts({ categoryId, page = 1, color }: GetProductsArgs) {
  const params = new URLSearchParams();
  params.set("category", String(categoryId));
  params.set("page", String(page));

  // Agar backend color filter qabul qilsa, shu yerda uzatib yuboramiz:
  // (qabul qilmasa ham zarar qilmaydi — keyin page ichida client-side filter bor)
  if (color && color !== "all") params.set("color", color);

  return apiFetch<Paginated<ApiProduct>>(
    `/api/catalog/products/?${params.toString()}`,
    {
      next: {
        revalidate: 60,
        tags: [`products:${categoryId}:${page}:${color ?? "all"}`],
      },
    }
  );
}
