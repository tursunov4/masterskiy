// app/catalog/page.tsx
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
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
    href: "/catalog/floors",
    image: "/images/catalog/floors.jpg",
  },
  {
    id: 2,
    title: "Стены",
    href: "/catalog/walls",
    image: "/images/catalog/walls.jpg",
  },
  {
    id: 3,
    title: "Подоконники",
    href: "/catalog/windowsills",
    image: "/images/catalog/windowsills.jpg",
  },
  {
    id: 4,
    title: "Столешницы",
    href: "/catalog/worktops",
    image: "/images/catalog/worktops.jpg",
  },
  {
    id: 5,
    title: "Лестницы",
    href: "/catalog/stairs",
    image: "/images/catalog/stairs.jpg",
  },
  {
    id: 6,
    title: "Камины",
    href: "/catalog/fireplaces",
    image: "/images/catalog/fireplaces.jpg",
  },
];

export default function CatalogPage() {
  return (
    <>
      <Header />
      <main className="bg-white pb-16 pt-6">
        <div className="container mx-auto px-4">
          {/* BREADCRUMB */}
          <div className="border-x border-t border-black/40">
            <p className="py-2 text-center text-xs tracking-[0.12em]">
              <Link href="/" className="hover:underline">
                Главная
              </Link>{" "}
              / <span>Каталог изделий</span>
            </p>
          </div>

          {/* PAGE TITLE */}
          <div className="border-x border-b border-black/40">
            <div className="flex flex-col items-center gap-2 py-4">
              <div className="h-[2px] w-24 bg-[#c79b60]" />
              <h1 className="text-xl sm:text-2xl md:text-3xl tracking-[0.18em] uppercase">
                КАТАЛОГ ИЗДЕЛИЙ
              </h1>
            </div>

            {/* SUBTITLE BAR */}
            <div className="bg-[#c79b60] py-2 text-center text-xs sm:text-sm tracking-[0.16em] uppercase text-[#2c2420]">
              НАТУРАЛЬНЫЙ КАМЕНЬ ДЛЯ ВНУТРЕННЕЙ ОТДЕЛКИ
            </div>

            {/* GRID */}
            <div className="px-6 pb-10 pt-8">
              <div className="grid gap-y-10 gap-x-10 md:grid-cols-3">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex flex-col items-center text-center"
                  >
                    {/* TITLE */}
                    <h2 className="mb-3 text-lg tracking-[0.12em] uppercase">
                      {category.title}
                    </h2>

                    {/* IMAGE + HOVER EFFECT */}
                    <Link
                      href={category.href}
                      className="group relative block h-[230px] w-[230px] max-w-full border border-black/20"
                    >
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover"
                      />

                      {/* Radial “spotlight” on hover */}
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="h-full w-full bg-[radial-gradient(circle,rgba(255,255,255,0.65)_0,rgba(255,255,255,0)_60%)]" />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ExternalCatalogSection />
        <IdeaConsultSection />
      </main>
      <Footer />
    </>
  );
}
