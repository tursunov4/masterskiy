// app/catalog/stone/marble/page.tsx
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MarbleIdeaSection from "@/components/sections/MarbleIdeaSection";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Мрамор – расцветки",
};

type MarbleItem = {
  id: number;
  name: string;
  price: string;
  image: string;
};

const marbles: MarbleItem[] = [
  {
    id: 1,
    name: "Мрамор Sivec",
    price: "Цена: от 37 541 руб./м²",
    image: "/images/marble/sivec-slab.jpg",
  },
  {
    id: 2,
    name: "Мрамор Venetto Delicato",
    price: "Цена: от 19 605 руб./м²",
    image: "/images/marble/venetto-delicato.jpg",
  },
  {
    id: 3,
    name: "Мрамор Rojo Levanto",
    price: "Цена: от 26 925 руб./м²",
    image: "/images/marble/rojo-levanto.jpg",
  },
  {
    id: 4,
    name: "Мрамор Bianco Carrara",
    price: "Цена: от 18 000 руб./м²",
    image: "/images/marble/bianco-carrara-1.jpg",
  },
  {
    id: 5,
    name: "Мрамор Bianco Carrara",
    price: "Цена: от 21 000 руб./м²",
    image: "/images/marble/bianco-carrara-2.jpg",
  },
  {
    id: 6,
    name: "Мрамор Bianco Carrara",
    price: "Цена: от 19 800 руб./м²",
    image: "/images/marble/bianco-carrara-3.jpg",
  },
  {
    id: 7,
    name: "Мрамор Bianco Carrara",
    price: "Цена: от 17 900 руб./м²",
    image: "/images/marble/bianco-carrara-4.jpg",
  },
  {
    id: 8,
    name: "Мрамор Bianco Carrara",
    price: "Цена: от 20 100 руб./м²",
    image: "/images/marble/bianco-carrara-5.jpg",
  },
];

export default function MarbleCatalogPage() {
  return (
    <>
      <Header />
      <main className="bg-white pb-16 pt-6">
        <div className="container mx-auto px-4">
          {/* BREADCRUMB */}
          <div className="border-x border-t border-black/40">
            <p className="py-2 text-center text-xs tracking-[0.12em]">
              Главная / Каталог камня / Мрамор
            </p>
          </div>

          <div className="border-x border-b border-black/40">
            {/* TITLE */}
            <div className="flex flex-col items-center gap-2 py-4">
              <div className="h-[2px] w-24 bg-[#c79b60]" />
              <h1 className="text-xl sm:text-2xl md:text-3xl tracking-[0.18em] uppercase">
                МРАМОР
              </h1>
            </div>

            {/* SUBTITLE */}
            <div className="bg-[#c79b60] py-2 text-center text-xs sm:text-sm tracking-[0.16em] uppercase text-[#2c2420]">
              НАШИ РАСЦВЕТКИ НАТУРАЛЬНОГО КАМНЯ ДЛЯ ВАШЕГО ПРОЕКТА
            </div>

            {/* CONTENT */}
            <div className="px-4 py-8">
              <div className="flex flex-col gap-8 lg:flex-row">
                {/* FILTER PANEL – only colors */}
                <aside className="w-full shrink-0 border border-black/40 bg-[#f5f3ee] px-4 py-5 text-sm lg:w-[220px]">
                  <p className="mb-3 text-center text-[13px]">Основной цвет</p>
                  <div className="mb-3 grid grid-cols-5 gap-[1px] border border-black/30">
                    {[
                      "#ffffff",
                      "#f2ead8",
                      "#d4b39b",
                      "#b48b7a",
                      "#000000",
                      "#e0d19e",
                      "#a6b77e",
                      "#5c8f9b",
                      "#b64c5a",
                      "#365b92",
                    ].map((color) => (
                      <button
                        key={color}
                        className="h-6"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  <button className="mt-3 flex w-full items-center justify-center gap-2 bg-[#c79b60] px-3 py-2 text-[12px] uppercase tracking-[0.12em] text-[#2c2420] hover:bg-[#d7b97e] transition">
                    Очистить фильтр
                    <span className="text-base">»</span>
                  </button>
                </aside>

                {/* GRID */}
                <section className="flex-1">
                  <div className="grid gap-6 md:grid-cols-2">
                    {marbles.map((item) => (
                      <article
                        key={item.id}
                        className="border border-black/20 bg-white"
                      >
                        <div className="relative h-[190px] sm:h-[210px]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 text-[13px]">
                          <span>{item.name}</span>
                          <span className="bg-[#c79b60] px-2 py-1 text-[11px] text-[#2c2420]">
                            {item.price}
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* SHOW MORE */}
                  <div className="mt-8 bg-[#c79b60] py-2 text-center text-[13px] uppercase tracking-[0.14em] text-[#2c2420] cursor-pointer">
                    Показать еще
                  </div>

                  {/* PAGINATION */}
                  <div className="mt-4 flex items-center justify-center gap-2 pb-2">
                    <button className="h-8 w-8 border border-black/40 bg-[#c79b60] text-sm">
                      ←
                    </button>
                    <button className="h-8 w-8 border border-black/40 bg-[#666] text-white text-sm">
                      1
                    </button>
                    <button className="h-8 w-8 border border-black/40 bg-white text-sm">
                      2
                    </button>
                    <button className="h-8 w-8 border border-black/40 bg-white text-sm">
                      3
                    </button>
                    <span className="px-2 text-sm">...</span>
                    <button className="h-8 w-10 border border-black/40 bg-white text-sm">
                      10
                    </button>
                    <button className="h-8 w-8 border border-black/40 bg-[#c79b60] text-sm">
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
      <Footer />
    </>
  );
}
