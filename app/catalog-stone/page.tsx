// app/stone-catalog/page.tsx
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeader from "@/components/ui/SectionHeader";
import CategoryCard from "@/components/ui/CategoryCard";
import StoneSearchSection from "@/components/sections/StoneSearchSection";
import type { Metadata } from "next";
import { getSubcategories } from "@/services/catalog";

export const metadata: Metadata = { title: "Каталог камня" };

type CardItem = {
  id: number;
  title: string;
  image: string;
  href: string;
};

export default async function StoneCatalogPage() {
  const data = await getSubcategories(`katalog-kamnya`);

  const items: CardItem[] = data.map((s) => ({
    id: s.id,
    title: s.name,
    image: s.image ?? "/images/png/mramr.png",
    href: `/catalog-stone/${s.slug}`, // o'zingizning routingga mos qiling
  }));

  return (
    <main>
      <Breadcrumbs
        items={[{ label: "Главная", href: "/" }, { label: "Каталог камня" }]}
      />

      <div className="container">
        <SectionHeader title="Каталог камня" subtitle="Выберите тип камня" />

        <div className="px-3 sm:px-6 pb-10 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-10 justify-items-center">
            {items.map((item) => (
              <CategoryCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      <StoneSearchSection />
    </main>
  );
}
