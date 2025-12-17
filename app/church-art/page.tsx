// app/church-art/page.tsx
import Breadcrumbs from "@/components/Breadcrumbs";
import ChurchBlessingSection from "@/components/sections/ChurchBlessingSection";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSubcategories } from "@/services/catalog";

export const metadata: Metadata = {
  title: "Церковное искусство",
};

type ChurchItem = {
  id: number;
  title: string;
  image: string;
  href: string;
};

export default async function ChurchArtPage() {
  const data = await getSubcategories(`cerkovnoe-iskusstvo`);
  const items: ChurchItem[] = data.map((s) => ({
    id: s.id,
    title: s.name,
    image: s.image ?? "/images/png/church.png",
    href: `/church-art/${s.slug}`,
  }));

  return (
    <main className="bg-white">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Церковное искусство" },
        ]}
      />

      <div className="container mx-auto px-3 sm:px-4">
        <SectionHeader
          title="ЦЕРКОВНОЕ ИСКУССТВО"
          subtitle="НАТУРАЛЬНЫЙ КАМЕНЬ В ХРАМОВОМ БЛАГОУКРАШЕНИИ"
        />

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
