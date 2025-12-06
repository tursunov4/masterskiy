// app/stone-catalog/page.tsx
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
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
  { title: "Мрамор", image: "/images/stone/marble.jpg", href: "/stone/marble" },
  {
    title: "Гранит",
    image: "/images/stone/granite.jpg",
    href: "/stone/granite",
  },
  {
    title: "Травертин",
    image: "/images/stone/travertine.jpg",
    href: "/stone/travertine",
  },
  { title: "Оникс", image: "/images/stone/onyx.jpg", href: "/stone/onyx" },
  {
    title: "Кварцит",
    image: "/images/stone/quartzite.jpg",
    href: "/stone/quartzite",
  },
  {
    title: "Эксклюзивные камни",
    image: "/images/stone/exclusive.jpg",
    href: "/stone/exclusive",
  },
  {
    title: "Лабрадорит",
    image: "/images/stone/labradorite.jpg",
    href: "/stone/labradorite",
  },
];

export default function StoneCatalogPage() {
  return (
    <>
      <Header />
      <main className="bg-white pb-16 pt-6">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="border-x border-t border-black/40">
            <p className="py-2 text-center text-xs tracking-[0.12em]">
              <Link href="/" className="hover:underline">
                Главная
              </Link>{" "}
              / <span>Каталог камня</span>
            </p>
          </div>

          <div className="border-x border-b border-black/40">
            {/* Title */}
            <div className="flex flex-col items-center gap-2 py-4">
              <div className="h-[2px] w-24 bg-[#c79b60]" />
              <h1 className="text-xl sm:text-2xl md:text-3xl tracking-[0.18em] uppercase">
                КАТАЛОГ КАМНЯ
              </h1>
            </div>

            {/* Subtitle bar */}
            <div className="bg-[#c79b60] py-2 text-center text-xs sm:text-sm tracking-[0.16em] uppercase text-[#2c2420]">
              НАШИ ВИДЫ НАТУРАЛЬНОГО КАМНЯ
            </div>

            {/* Grid of stone types */}
            <div className="px-4 pb-10 pt-8">
              <div className="grid gap-y-10 gap-x-10 md:grid-cols-3">
                {stoneTypes.map((stone) => (
                  <div
                    key={stone.title}
                    className="flex flex-col items-center text-center"
                  >
                    <h2 className="mb-3 text-lg tracking-[0.12em] uppercase">
                      {stone.title}
                    </h2>

                    <Link
                      href={stone.href}
                      className="group relative block h-[210px] w-[210px] max-w-full border border-black/15"
                    >
                      <Image
                        src={stone.image}
                        alt={stone.title}
                        fill
                        className="object-cover"
                      />

                      {/* yengil spotlight hover, xohlamasang olib tashla */}
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="h-full w-full bg-[radial-gradient(circle,rgba(255,255,255,0.55)_0,rgba(255,255,255,0)_60%)]" />
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
      <Footer />
    </>
  );
}
