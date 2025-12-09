// app/catalog/floors/page.tsx
import PersonalConsultSection from "@/components/sections/PersonalConsultSection";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Полы из натурального камня",
};

type Product = {
  id: number;
  name: string;
  stone: string;
  price: string;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Мрамор Sivec",
    stone: "Мрамор: Sivec",
    price: "Цена: от 35 941 руб./м²",
    image: "/images/floors/sivec.jpg",
  },
  {
    id: 2,
    name: "Мрамор Volakas",
    stone: "Мрамор: Volakas",
    price: "Цена: от 18 089 руб./м²",
    image: "/images/floors/volakas.jpg",
  },
  {
    id: 3,
    name: "Мрамор Calacatta Nova",
    stone: "Мрамор: Calacatta Nova",
    price: "Цена: от 27 579 руб./м²",
    image: "/images/floors/calacatta-nova.jpg",
  },
  {
    id: 4,
    name: "Мрамор Sky White",
    stone: "Мрамор: Sky White",
    price: "Цена: от 33 475 руб./м²",
    image: "/images/floors/sky-white.jpg",
  },
  {
    id: 5,
    name: "Мрамор Elegant Cream",
    stone: "Мрамор: Elegant Cream",
    price: "Цена: от 29 900 руб./м²",
    image: "/images/floors/elegant-cream.jpg",
  },
  {
    id: 6,
    name: "Мрамор Classic Beige",
    stone: "Мрамор: Classic Beige",
    price: "Цена: от 24 300 руб./м²",
    image: "/images/floors/classic-beige.jpg",
  },
];

export default function FloorsPage() {
  return (
    <>
      <main className="bg-white pb-16 pt-6">
        <div className="container mx-auto px-4">
          {/* BREADCRUMB */}
          <div className="border-x border-t border-black/40">
            <p className="py-2 text-center text-xs tracking-[0.12em]">
              Главная / Каталог изделий / Полы
            </p>
          </div>

          <div className="border-x border-b border-black/40">
            {/* TITLE */}
            <div className="flex flex-col items-center gap-2 py-4">
              <div className="h-[2px] w-24 bg-[#c79b60]" />
              <h1 className="text-xl sm:text-2xl md:text-3xl tracking-[0.18em] uppercase">
                ПОЛЫ
              </h1>
            </div>

            {/* SUBTITLE */}
            <div className="bg-[#c79b60] py-2 text-center text-xs sm:text-sm tracking-[0.16em] uppercase text-[#2c2420]">
              НАШИ ИДЕИ ИЗ НАТУРАЛЬНОГО КАМНЯ ДЛЯ ВАШЕГО ПРОЕКТА
            </div>

            {/* CONTENT: FILTER + GRID */}
            <div className="px-4 py-8">
              <div className="flex flex-col gap-8 lg:flex-row">
                {/* LEFT FILTER PANEL */}
                <aside className="w-full shrink-0 border border-black/40 bg-[#f5f3ee] px-4 py-5 text-sm lg:w-[260px]">
                  {/* Основной цвет */}
                  <div className="mb-5 border-b border-black/20 pb-4">
                    <p className="mb-2 text-center text-[13px]">
                      Основной цвет
                    </p>
                    <div className="flex justify-center gap-1">
                      <button className="h-6 w-8 bg-[#d9cdc0] border border-black/20" />
                      <button className="h-6 w-8 bg-[#c4a78c] border border-black/20" />
                      <button className="h-6 w-8 bg-[#b8b1aa] border border-black/20" />
                      <button className="h-6 w-8 bg-[#8a8b8d] border border-black/20" />
                      <button className="h-6 w-8 bg-black border border-black/20" />
                    </div>

                    <button className="mt-3 block w-full bg-[#e1dbcf] py-1 text-center text-[12px] uppercase tracking-[0.12em]">
                      Иные цвета
                    </button>
                  </div>

                  {/* Стиль исполнения */}
                  <div className="mb-5 border-b border-black/20 pb-4">
                    <p className="mb-2 text-[13px]">Стиль исполнения</p>
                    <label className="mb-1 flex items-center gap-2 text-[13px]">
                      <input type="checkbox" className="accent-[#c79b60]" />
                      Современный
                    </label>
                    <label className="mb-1 flex items-center gap-2 text-[13px]">
                      <input type="checkbox" className="accent-[#c79b60]" />
                      Классический
                    </label>
                    <label className="flex items-center gap-2 text-[13px]">
                      <input type="checkbox" className="accent-[#c79b60]" />
                      Роскошный
                    </label>
                  </div>

                  {/* Мозаичные элементы */}
                  <div className="mb-5">
                    <p className="mb-2 text-[13px]">Мозаичные элементы</p>
                    <label className="mb-1 flex items-center gap-2 text-[13px]">
                      <input type="checkbox" className="accent-[#c79b60]" />
                      Без мозаики
                    </label>
                    <label className="flex items-center gap-2 text-[13px]">
                      <input type="checkbox" className="accent-[#c79b60]" />
                      Акцентная мозаика
                    </label>
                  </div>

                  {/* Clear filter button */}
                  <button className="mt-3 flex w-full items-center justify-center gap-2 bg-[#c79b60] px-3 py-2 text-[12px] uppercase tracking-[0.12em] text-[#2c2420] hover:bg-[#d7b97e] transition">
                    Очистить фильтр
                    <span className="text-base">»</span>
                  </button>
                </aside>

                {/* RIGHT PRODUCTS GRID */}
                <section className="flex-1">
                  <div className="grid gap-6 md:grid-cols-2">
                    {products.map((product) => (
                      <article
                        key={product.id}
                        className="border border-black/20 bg-white"
                      >
                        <div className="relative h-[220px]">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 text-[13px]">
                          <span>{product.stone}</span>
                          <span className="bg-[#c79b60] px-2 py-1 text-[11px] text-[#2c2420]">
                            {product.price}
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
        <PersonalConsultSection />
      </main>
    </>
  );
}
