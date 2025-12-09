// app/catalog/page.tsx
import ExternalCatalogSection from "@/components/sections/ExternalCatalogSection";
import IdeaConsultSection from "@/components/sections/IdeaConsultSection";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Каталог изделий",
};

type Category = {
  id: number;
  title: string;
  href: string;
  image: string;
};

const categories: Category[] = [
  {
    id: 1,
    title: "Полы",
    href: "/catalog-product/steps",
    image: "/images/png/floor.png",
  },
  {
    id: 2,
    title: "Стены",
    href: "/catalog-product/steps",
    image: "/images/png/floor.png",
  },
  {
    id: 3,
    title: "Подоконники",
    href: "/catalog-product/steps",
    image: "/images/png/floor.png",
  },
  {
    id: 4,
    title: "Столешницы",
    href: "/catalog-product/steps",
    image: "/images/png/floor.png",
  },
  {
    id: 5,
    title: "Лестницы",
    href: "/catalog-product/steps",
    image: "/images/png/floor.png",
  },
  {
    id: 6,
    title: "Камины",
    href: "/catalog-product/steps",
    image: "/images/png/floor.png",
  },
];

export default function CatalogPage() {
  return (
    <>
      <main className="bg-white">
        {/* Breadcrumb */}
        <div className="bg-[#f8f4ee]">
          <p className="py-2 text-center text-xs tracking-[0.12em]">
            <Link href="/" className="hover:underline">
              Главная
            </Link>{" "}
            / <span>Каталог изделий</span>
          </p>
        </div>

        {/* Title + grid */}
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex flex-col items-center gap-2 py-4">
            <div className="h-[2px] w-24 bg-[#c79b60]" />
            <h1 className="text-xl sm:text-2xl md:text-3xl tracking-[0.18em] uppercase">
              КАТАЛОГ ИЗДЕЛИЙ
            </h1>
          </div>

          <div className="bg-[#c79b60] py-2 text-center text-xs sm:text-sm tracking-[0.16em] uppercase text-[#2c2420]">
            НАТУРАЛЬНЫЙ КАМЕНЬ ДЛЯ ВНУТРЕННЕЙ ОТДЕЛКИ
          </div>

          <div className="px-4 pb-10 pt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-10 justify-items-center">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex flex-col items-center text-center"
                >
                  <h2 className="mb-3 text-lg tracking-[0.12em] uppercase">
                    {category.title}
                  </h2>

                  <Link
                    href={category.href}
                    className="
    group relative block 
    w-[220px] sm:w-[240px] lg:w-[260px] 
    aspect-square max-w-full 
    overflow-hidden border border-black/20 bg-white
    transition-all duration-300 ease-out
    hover:-translate-y-1 hover:border-[#c79b60]
    hover:shadow-[0_14px_30px_rgba(0,0,0,0.25)]
    active:translate-y-0 active:shadow-[0_8px_18px_rgba(0,0,0,0.25)]
  "
                  >
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    />

                    {/* NEW HOVER EFFECT – chetlari qorayadigan radial vignette */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div
                        className="h-full w-full 
      bg-[radial-gradient(circle,rgba(0,0,0,0)_35%,rgba(0,0,0,0.45)_75%,rgba(0,0,0,0.65)_100%)]
    "
                      />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ExternalCatalogSection />
        <IdeaConsultSection />
      </main>
    </>
  );
}
