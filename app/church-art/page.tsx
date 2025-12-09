// app/church-art/page.tsx
import ChurchBlessingSection from "@/components/sections/ChurchBlessingSection";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Церковное искусство",
};

type ChurchItem = {
  id: number;
  title: string;
  image: string;
  href: string;
};

const items: ChurchItem[] = [
  {
    id: 1,
    title: "Иконостасы и киоты",
    image: "/images/png/church.png",
    href: "/church-art/iconostasis",
  },
  {
    id: 2,
    title: "Престолы и жертвенники",
    image: "/images/png/church.png",
    href: "/church-art/altars",
  },
  {
    id: 3,
    title: "Стены",
    image: "/images/png/church.png",
    href: "/church-art/walls",
  },
  {
    id: 4,
    title: "Полы",
    image: "/images/png/church.png",
    href: "/church-art/floors",
  },
  {
    id: 5,
    title: "Мозаика",
    image: "/images/png/church.png",
    href: "/church-art/mosaic",
  },
];

export default function ChurchArtPage() {
  return (
    <main className="bg-white pb-16 pt-6">
      <div className="container mx-auto px-4">
        {/* BREADCRUMB */}
        <div className="border-x border-t border-black/40">
          <p className="py-2 text-center text-xs tracking-[0.12em]">
            Главная / Церковное искусство
          </p>
        </div>

        <div className="border-x border-b border-black/40">
          {/* TITLE */}
          <div className="flex flex-col items-center gap-2 py-4">
            <div className="h-[2px] w-24 bg-[#c79b60]" />
            <h1 className="text-xl sm:text-2xl md:text-3xl tracking-[0.18em] uppercase">
              ЦЕРКОВНОЕ ИСКУССТВО
            </h1>
          </div>

          {/* SUBTITLE BAR */}
          <div className="bg-[#c79b60] py-2 text-center text-xs sm:text-sm tracking-[0.16em] uppercase text-[#2c2420]">
            НАТУРАЛЬНЫЙ КАМЕНЬ В ХРАМОВОМ БЛАГОУКРАШЕНИИ
          </div>

          {/* GRID */}
          <section className="px-4 py-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="relative mb-3 h-[190px] w-full max-w-[260px] border border-black/25 bg-white">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:brightness-105 transition"
                    />
                  </div>
                  <h2 className="text-sm sm:text-base font-medium tracking-wide">
                    {item.title}
                  </h2>
                </Link>
              ))}

              {/* bo'sh katak – maketdagi kabi */}
              <div className="hidden h-[190px] w-full max-w-[260px] border border-dashed border-black/30 lg:block" />
            </div>
          </section>
        </div>
      </div>
      <ChurchBlessingSection />
    </main>
  );
}
