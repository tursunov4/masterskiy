// app/stone-catalog/page.tsx
import StoneSearchSection from "@/components/sections/StoneSearchSection";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Каталог камня",
};

type StoneType = {
  title: string;
  image: string;
  href: string;
};

const stoneTypes: StoneType[] = [
  {
    title: "Мрамор",
    image: "/images/png/mramr.png",
    href: "/catalog-stone/marble",
  },
  {
    title: "Гранит",
    image: "/images/png/mramr.png",
    href: "/catalog-stone/marble",
  },
  {
    title: "Травертин",
    image: "/images/png/mramr.png",
    href: "/stone/travertine",
  },
  {
    title: "Оникс",
    image: "/images/png/mramr.png",
    href: "/catalog-stone/marble",
  },
  {
    title: "Кварцит",
    image: "/images/png/mramr.png",
    href: "/catalog-stone/marble",
  },
  {
    title: "Эксклюзивные камни",
    image: "/images/png/mramr.png",
    href: "/catalog-stone/marble",
  },
  {
    title: "Лабрадорит",
    image: "/images/png/mramr.png",
    href: "/catalog-stone/marble",
  },
];

export default function StoneCatalogPage() {
  return (
    <main className="">
      <div className="">
        {/* Breadcrumb */}
        <div className=" bg-[#f8f4ee]">
          <p className="py-2 text-center text-xs tracking-[0.12em]">
            <Link href="/" className="hover:underline">
              Главная
            </Link>{" "}
            /{" "}
            <Link href="/stone-catalog" className="hover:underline">
              Каталог камня
            </Link>{" "}
            / <span>Мрамор</span>
          </p>
        </div>

        {/* Frame with title + grid */}
        <div className="container">
          {/* Title */}
          <div className="flex flex-col items-center gap-2 py-4">
            <div className="h-[2px] w-24 bg-[#c79b60]" />
            <h1 className="text-xl sm:text-2xl md:text-3xl tracking-[0.18em] uppercase">
              КАТАЛОГ КАМНЯ
            </h1>
          </div>

          {/* Subtitle bar */}
          <div className="bg-[#c79b60] py-2 text-center text-[11px] sm:text-sm tracking-[0.16em] uppercase text-[#2c2420]">
            НАШИ ВИДЫ НАТУРАЛЬНОГО КАМНЯ
          </div>

          {/* Grid of stone types */}
          <div className="px-3 sm:px-6 pb-10 pt-8">
            {/* md dan boshlab 3 ta ustun, elementlar markazda */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-10 justify-items-center">
              {stoneTypes.map((stone) => (
                <div
                  key={stone.title}
                  className="flex flex-col items-center text-center"
                >
                  <h2 className="mb-3 text-base sm:text-lg font-serif">
                    {stone.title}
                  </h2>

                  <Link
                    href={stone.href}
                    className="group relative block w-[210px] sm:w-[230px] lg:w-[260px] aspect-square 
                               max-w-full border border-black/20 bg-white overflow-hidden
                               transition-all duration-300 ease-out
                               hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.25)]
                               hover:border-[#c79b60]
                               active:translate-y-0 active:shadow-[0_8px_18px_rgba(0,0,0,0.25)]"
                  >
                    <Image
                      src={stone.image}
                      alt={stone.title}
                      fill
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    />

                    {/* Hover light spot – faqat yorug' gradient, matn yo'q */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="h-full w-full bg-[radial-gradient(circle,rgba(255,255,255,0.85)_0,rgba(255,255,255,0)_60%)] mix-blend-screen" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <StoneSearchSection />
    </main>
  );
}
