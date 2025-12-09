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
    <main className="bg-white">
      {/* BREADCRUMB */}
      <div className="bg-[#f8f4ee]">
        <p className="py-2 text-center text-xs tracking-[0.12em]">
          <Link href="/" className="hover:underline">
            Главная
          </Link>{" "}
          / <span>Церковное искусство</span>
        </p>
      </div>

      <div className="container mx-auto px-3 sm:px-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-10 justify-items-center">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group flex flex-col items-center text-center"
              >
                <div
                  className="
                    relative mb-3
                    w-[220px] sm:w-[240px] lg:w-[260px]
                    aspect-square max-w-full
                    overflow-hidden border border-black/25 bg-white
                    transition-all duration-300 ease-out
                    hover:-translate-y-1 hover:border-[#c79b60]
                    hover:shadow-[0_14px_30px_rgba(0,0,0,0.25)]
                    active:translate-y-0 active:shadow-[0_8px_18px_rgba(0,0,0,0.25)]
                  "
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Radial vignette – chetlari qorayadi, markaz juda oqarmaydi */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="h-full w-full bg-[radial-gradient(circle,rgba(0,0,0,0)_35%,rgba(0,0,0,0.45)_75%,rgba(0,0,0,0.65)_100%)]" />
                  </div>
                </div>

                <h2 className="text-sm sm:text-base font-medium tracking-wide text-[#2c2420] transition-colors group-hover:text-[#7b5b2e]">
                  {item.title}
                </h2>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <ChurchBlessingSection />
    </main>
  );
}
