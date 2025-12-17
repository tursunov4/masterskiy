// app/catalog/page.tsx
import Breadcrumbs from "@/components/Breadcrumbs";
import ExternalCatalogSection from "@/components/sections/ExternalCatalogSection";
import IdeaConsultSection from "@/components/sections/IdeaConsultSection";
import CategoryCard from "@/components/ui/CategoryCard";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Metadata } from "next";
import { getSubcategories } from "@/services/catalog";

export const metadata: Metadata = {
  title: "Каталог изделий",
};

type CategoryCardItem = {
  id: number;
  title: string;
  href: string;
  image: string;
};

export default async function CatalogPage() {
  const data = await getSubcategories(`katalog-izdelij`);

  const categories: CategoryCardItem[] = data.map((s) => ({
    id: s.id,
    title: s.name,
    href: `/catalog-product/${s.slug}`,
    image: s.image ?? "/images/png/floor.png",
  }));

  return (
    <main className="bg-white">
      <Breadcrumbs
        items={[{ label: "Главная", href: "/" }, { label: "Каталог изделий" }]}
      />

      <div className="container mx-auto px-3 sm:px-4">
        <SectionHeader
          title="КАТАЛОГ ИЗДЕЛИЙ"
          subtitle="НАТУРАЛЬНЫЙ КАМЕНЬ ДЛЯ ВНУТРЕННЕЙ ОТДЕЛКИ"
        />

        <div className="px-4 pb-10 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-10 justify-items-center">
            {categories.map((category) => (
              <CategoryCard key={category.id} item={category} />
            ))}
          </div>
        </div>
      </div>

      {/* <ExternalCatalogSection /> */}
      <IdeaConsultSection />
    </main>
  );
}
