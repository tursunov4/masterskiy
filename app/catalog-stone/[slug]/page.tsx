import MarbleIdeaSection from "@/components/sections/MarbleIdeaSection";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Мрамор – расцветки",
};

type MarbleItem = {
  id: number;
  name: string;
  price: string;
  image: string;
  mainColor: string; // filter uchun
};

const marbles: MarbleItem[] = [
  {
    id: 1,
    name: "Мрамор Sivec",
    price: "Цена: от 37 541 руб./м²",
    image: "/images/png/mramr2.png",
    mainColor: "white",
  },
  {
    id: 2,
    name: "Мрамор Venetto Delicato",
    price: "Цена: от 19 605 руб./м²",
    image: "/images/png/mramr2.png",
    mainColor: "beige",
  },
  {
    id: 3,
    name: "Мрамор Rojo Levanto",
    price: "Цена: от 26 925 руб./м²",
    image: "/images/png/mramr2.png",
    mainColor: "red",
  },
  {
    id: 4,
    name: "Мрамор Bianco Carrara",
    price: "Цена: от 18 000 руб./м²",
    image: "/images/png/mramr2.png",
    mainColor: "gray",
  },
  {
    id: 5,
    name: "Мрамор Bianco Carrara",
    price: "Цена: от 21 000 руб./м²",
    image: "/images/png/mramr2.png",
    mainColor: "gray",
  },
  {
    id: 6,
    name: "Мрамор Bianco Carrara",
    price: "Цена: от 19 800 руб./м²",
    image: "/images/png/mramr2.png",
    mainColor: "white",
  },
  {
    id: 7,
    name: "Мрамор Bianca Carrara",
    price: "Цена: от 17 900 руб./м²",
    image: "/images/png/mramr2.png",
    mainColor: "gray",
  },
  {
    id: 8,
    name: "Мрамор Bianco Carrara",
    price: "Цена: от 20 100 руб./м²",
    image: "/images/png/mramr2.png",
    mainColor: "white",
  },
];

type ColorFilter = {
  key: string;
  hex: string;
};

const colorFilters: ColorFilter[] = [
  { key: "white", hex: "#ffffff" },
  { key: "beige", hex: "#f2ead8" },
  { key: "warm-gray", hex: "#c0a88b" },
  { key: "brown", hex: "#8c5235" },
  { key: "black", hex: "#000000" },
  { key: "green", hex: "#3a8b4c" },
  { key: "magenta", hex: "#bb4aa5" },
  { key: "turquoise", hex: "#3b8b9f" },
  { key: "blue", hex: "#35538b" },
  { key: "red", hex: "#b6423f" },
];

export default function MarbleCatalogPage({
  searchParams,
}: {
  searchParams: { color?: string };
}) {
  const activeColor = searchParams.color;

  const filteredMarbles =
    activeColor && activeColor !== "all"
      ? marbles.filter((m) => m.mainColor === activeColor)
      : marbles;

  return (
    <>
      <main>
        <div className="">
          {/* BREADCRUMB */}
          <div className=" bg-[#f8f4ee]">
            <p className="py-2 text-center text-xs tracking-[0.12em]">
              <Link href="/" className="hover:underline">
                Главная
              </Link>{" "}
              /{" "}
              <Link href="/catalog-stone" className="hover:underline">
                Каталог камня
              </Link>{" "}
              / <span>Мрамор</span>
            </p>
          </div>

          <div className=" container  ">
            <div className="flex flex-col items-center gap-2 ">
              <div className="h-[2px] mt-4   w-24 bg-[#c79b60]" />
              <h1 className="text-xl sm:text-2xl md:text-3xl tracking-[0.18em] uppercase">
                МРАМОР
              </h1>
            </div>

            <div className="bg-[#c79b60] py-2 text-center text-xs sm:text-sm tracking-[0.16em] uppercase text-[#2c2420]">
              НАШИ РАСЦВЕТКИ НАТУРАЛЬНОГО КАМНЯ ДЛЯ ВАШЕГО ПРОЕКТА
            </div>

            <div className=" py-8">
              <div className="flex flex-col gap-8 items-start lg:flex-row">
                {/* FILTER PANEL */}
                <aside className="w-full   bg-[#f5f3ee] px-4 py-5 text-sm lg:w-[240px]">
                  <p className="mb-4 text-center text-[13px]">Основной цвет</p>

                  <div className="mb-4 grid grid-cols-5 gap-[1px] border border-black/30 bg-black">
                    {colorFilters.map((c) => {
                      const isActive = activeColor === c.key;
                      return (
                        <Link
                          key={c.key}
                          href={
                            isActive
                              ? "/catalog-stone/marble"
                              : `/catalog-stone/marble?color=${c.key}`
                          }
                          className={`h-8 border-[2px] transition-all ${
                            isActive ? "border-[#c79b60]" : "border-transparent"
                          }`}
                          style={{ backgroundColor: c.hex }}
                        />
                      );
                    })}
                  </div>

                  <Link
                    href="/catalog-stone/marble"
                    className="mt-2 flex w-full items-center justify-center gap-2 bg-[#c79b60] px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-[#2c2420] transition hover:bg-[#d8b976]"
                  >
                    Очистить фильтр
                    <span className="text-base leading-none">»</span>
                  </Link>
                </aside>

                {/* GRID */}
                <section className="flex-1">
                  <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
                    {filteredMarbles.map((item) => (
                      <Link
                        href={`/catalog-stone/mrams/${item.id}`}
                        key={item.id}
                        className="group overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#c79b60] hover:shadow-[0_14px_30px_rgba(0,0,0,0.25)]"
                      >
                        <div className="relative h-[210px] sm:h-[230px] lg:h-[250px]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-[13px]">
                          <span className="font-serif">{item.name}</span>
                          <span className="bg-[#c79b60] px-2 py-1 text-[11px] text-[#2c2420] transition-colors group-hover:bg-[#d8b976]">
                            {item.price}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* SHOW MORE */}
                  <button className="mt-8 flex w-full items-center justify-center bg-[#c79b60] py-2 text-[13px] uppercase tracking-[0.14em] text-[#2c2420] transition hover:bg-[#d8b976]">
                    Показать еще
                  </button>

                  {/* PAGINATION */}
                  <div className="mt-5 flex items-center justify-center gap-2 pb-2">
                    <button className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-black/40 bg-[#c79b60] text-sm text-[#2c2420] hover:bg-[#d8b976]">
                      ←
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-black/70 bg-[#7e7a74] text-sm text-white">
                      1
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-black/50 bg-white text-sm hover:bg-[#f3eee5]">
                      2
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-black/50 bg-white text-sm hover:bg-[#f3eee5]">
                      3
                    </button>
                    <span className="px-2 text-sm">…</span>
                    <button className="flex h-9 w-11 items-center justify-center rounded-[6px] border border-black/50 bg-white text-sm hover:bg-[#f3eee5]">
                      10
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-black/40 bg-[#c79b60] text-sm text-[#2c2420] hover:bg-[#d8b976]">
                      →
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        <MarbleIdeaSection />
      </main>
    </>
  );
}
