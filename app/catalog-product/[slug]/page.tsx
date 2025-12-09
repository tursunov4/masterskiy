"use client";

import PersonalConsultSection from "@/components/sections/PersonalConsultSection";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type MainColor = "light" | "warm" | "gray" | "dark" | "black" | "other";
type StyleType = "modern" | "classic" | "luxury";
type MosaicType = "none" | "accent";

type Product = {
  id: number;
  name: string;
  stone: string;
  price: string;
  image: string;
  mainColor: MainColor;
  styles: StyleType[];
  mosaic: MosaicType;
};

const products: Product[] = [
  {
    id: 1,
    name: "Мрамор Sivec",
    stone: "Мрамор: Sivec",
    price: "Цена: от 35 941 руб./м²",
    image: "/images/png/floor2.png",
    mainColor: "light",
    styles: ["classic", "luxury"],
    mosaic: "accent",
  },
  {
    id: 2,
    name: "Мрамор Volakas",
    stone: "Мрамор: Volakas",
    price: "Цена: от 18 089 руб./м²",
    image: "/images/png/floor2.png",
    mainColor: "light",
    styles: ["modern"],
    mosaic: "none",
  },
  {
    id: 3,
    name: "Мрамор Calacatta Nova",
    stone: "Мрамор: Calacatta Nova",
    price: "Цена: от 27 579 руб./м²",
    image: "/images/png/floor2.png",
    mainColor: "warm",
    styles: ["modern", "luxury"],
    mosaic: "accent",
  },
  {
    id: 4,
    name: "Мрамор Sky White",
    stone: "Мрамор: Sky White",
    price: "Цена: от 33 475 руб./м²",
    image: "/images/png/floor2.png",
    mainColor: "gray",
    styles: ["modern"],
    mosaic: "none",
  },
  {
    id: 5,
    name: "Мрамор Elegant Cream",
    stone: "Мрамор: Elegant Cream",
    price: "Цена: от 29 900 руб./м²",
    image: "/images/png/floor2.png",
    mainColor: "warm",
    styles: ["classic"],
    mosaic: "none",
  },
  {
    id: 6,
    name: "Мрамор Classic Beige",
    stone: "Мрамор: Classic Beige",
    price: "Цена: от 24 300 руб./м²",
    image: "/images/png/floor2.png",
    mainColor: "dark",
    styles: ["classic"],
    mosaic: "accent",
  },
];

export default function FloorsPage({ params }: { params: { slug: string } }) {
  const [mainColor, setMainColor] = useState<MainColor | null>(null);
  const [styles, setStyles] = useState<StyleType[]>([]);
  const [mosaic, setMosaic] = useState<MosaicType | null>(null);

  const toggleStyle = (style: StyleType) => {
    setStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchColor = mainColor ? p.mainColor === mainColor : true;
      const matchStyle =
        styles.length > 0 ? styles.some((s) => p.styles.includes(s)) : true;
      const matchMosaic = mosaic ? p.mosaic === mosaic : true;

      return matchColor && matchStyle && matchMosaic;
    });
  }, [mainColor, styles, mosaic]);

  const resetFilters = () => {
    setMainColor(null);
    setStyles([]);
    setMosaic(null);
  };

  return (
    <>
      <main className="bg-white">
        <div className="bg-[#f8f4ee]">
          <p className="py-2 text-center text-xs tracking-[0.12em]">
            <Link href="/" className="hover:underline">
              Главная
            </Link>{" "}
            /{" "}
            <Link href={"/catalog-product"} className="hover:underline">
              Каталог изделий
            </Link>{" "}
            /<span> Полы</span>
          </p>
        </div>

        <div className="container mx-auto px-3 sm:px-4">
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
          <div className=" py-8">
            <div className="flex flex-col items-start gap-8 lg:flex-row">
              {/* LEFT FILTER PANEL */}
              <aside className="w-full shrink-0 border border-black/40 bg-[#f5f3ee] px-4 py-5 text-sm lg:w-[260px]">
                {/* Основной цвет */}
                <div className="mb-5 border-b border-black/20 pb-4">
                  <p className="mb-3 text-center text-[13px]">Основной цвет</p>
                  <div className="flex flex-wrap justify-center gap-1">
                    {/* light */}
                    <button
                      type="button"
                      onClick={() =>
                        setMainColor((prev) =>
                          prev === "light" ? null : "light"
                        )
                      }
                      className={`h-7 w-9 border ${
                        mainColor === "light"
                          ? "border-[#c79b60]"
                          : "border-black/20"
                      }`}
                      style={{ backgroundColor: "#d9cdc0" }}
                    />
                    {/* warm */}
                    <button
                      type="button"
                      onClick={() =>
                        setMainColor((prev) =>
                          prev === "warm" ? null : "warm"
                        )
                      }
                      className={`h-7 w-9 border ${
                        mainColor === "warm"
                          ? "border-[#c79b60]"
                          : "border-black/20"
                      }`}
                      style={{ backgroundColor: "#c4a78c" }}
                    />
                    {/* gray */}
                    <button
                      type="button"
                      onClick={() =>
                        setMainColor((prev) =>
                          prev === "gray" ? null : "gray"
                        )
                      }
                      className={`h-7 w-9 border ${
                        mainColor === "gray"
                          ? "border-[#c79b60]"
                          : "border-black/20"
                      }`}
                      style={{ backgroundColor: "#b8b1aa" }}
                    />
                    {/* dark */}
                    <button
                      type="button"
                      onClick={() =>
                        setMainColor((prev) =>
                          prev === "dark" ? null : "dark"
                        )
                      }
                      className={`h-7 w-9 border ${
                        mainColor === "dark"
                          ? "border-[#c79b60]"
                          : "border-black/20"
                      }`}
                      style={{ backgroundColor: "#8a8b8d" }}
                    />
                    {/* black */}
                    <button
                      type="button"
                      onClick={() =>
                        setMainColor((prev) =>
                          prev === "black" ? null : "black"
                        )
                      }
                      className={`h-7 w-9 border ${
                        mainColor === "black"
                          ? "border-[#c79b60]"
                          : "border-black/20"
                      }`}
                      style={{ backgroundColor: "#000000" }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setMainColor((prev) =>
                        prev === "other" ? null : "other"
                      )
                    }
                    className={`mt-3 block w-full py-1 text-center text-[12px] uppercase tracking-[0.12em] transition ${
                      mainColor === "other"
                        ? "bg-[#c79b60] text-[#2c2420]"
                        : "bg-[#e1dbcf] hover:bg-[#d4c9b8]"
                    }`}
                  >
                    Иные цвета
                  </button>
                </div>

                {/* Стиль исполнения */}
                <div className="mb-5 border-b border-black/20 pb-4">
                  <p className="mb-2 text-[13px]">Стиль исполнения</p>
                  <label className="mb-1 flex items-center gap-2 text-[13px]">
                    <input
                      type="checkbox"
                      checked={styles.includes("modern")}
                      onChange={() => toggleStyle("modern")}
                      className="accent-[#c79b60]"
                    />
                    Современный
                  </label>
                  <label className="mb-1 flex items-center gap-2 text-[13px]">
                    <input
                      type="checkbox"
                      checked={styles.includes("classic")}
                      onChange={() => toggleStyle("classic")}
                      className="accent-[#c79b60]"
                    />
                    Классический
                  </label>
                  <label className="flex items-center gap-2 text-[13px]">
                    <input
                      type="checkbox"
                      checked={styles.includes("luxury")}
                      onChange={() => toggleStyle("luxury")}
                      className="accent-[#c79b60]"
                    />
                    Роскошный
                  </label>
                </div>

                {/* Мозаичные элементы */}
                <div className="mb-5">
                  <p className="mb-2 text-[13px]">Мозаичные элементы</p>
                  <label className="mb-1 flex items-center gap-2 text-[13px]">
                    <input
                      type="radio"
                      name="mosaic"
                      className="accent-[#c79b60]"
                      checked={mosaic === "none"}
                      onChange={() =>
                        setMosaic((prev) => (prev === "none" ? null : "none"))
                      }
                    />
                    Без мозаики
                  </label>
                  <label className="flex items-center gap-2 text-[13px]">
                    <input
                      type="radio"
                      name="mosaic"
                      className="accent-[#c79b60]"
                      checked={mosaic === "accent"}
                      onChange={() =>
                        setMosaic((prev) =>
                          prev === "accent" ? null : "accent"
                        )
                      }
                    />
                    Акцентная мозаика
                  </label>
                </div>

                {/* Clear filter button */}
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-3 flex w-full items-center justify-center gap-2 bg-[#c79b60] px-3 py-2 text-[12px] uppercase tracking-[0.12em] text-[#2c2420] transition hover:bg-[#d7b97e]"
                >
                  Очистить фильтр
                  <span className="text-base">»</span>
                </button>
              </aside>

              <section className="flex-1">
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredProducts.map((product) => (
                    <Link
                      href={`/catalog-product/fdasdsa/${product.id}`}
                      key={product.id}
                      className="group overflow-hidden border border-black/25 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#c79b60] hover:shadow-[0_14px_30px_rgba(0,0,0,0.25)] active:translate-y-0 active:shadow-[0_8px_18px_rgba(0,0,0,0.25)]"
                    >
                      <div className="relative h-[220px]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-[13px]">
                        <span>{product.stone}</span>
                        <span className="bg-[#c79b60] px-2 py-1 text-[11px] text-[#2c2420] transition-colors group-hover:bg-[#d8b976]">
                          {product.price}
                        </span>
                      </div>
                    </Link>
                  ))}
                  {filteredProducts.length === 0 && (
                    <p className="col-span-full py-6 text-center text-sm text-neutral-600">
                      По выбранным параметрам ничего не найдено.
                    </p>
                  )}
                </div>

                {/* SHOW MORE */}
                <button className="mt-8 flex w-full items-center justify-center bg-[#c79b60] py-2 text-[13px] uppercase tracking-[0.14em] text-[#2c2420] transition hover:bg-[#d7b97e]">
                  Показать еще
                </button>

                {/* PAGINATION (statik) */}
                <div className="mt-4 flex items-center justify-center gap-2 pb-2">
                  <button className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-black/40 bg-[#c79b60] text-sm hover:bg-[#d7b97e]">
                    ←
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-black/40 bg-[#666] text-sm text-white">
                    1
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-black/40 bg-white text-sm hover:bg-[#f3eee5]">
                    2
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-black/40 bg-white text-sm hover:bg-[#f3eee5]">
                    3
                  </button>
                  <span className="px-2 text-sm">…</span>
                  <button className="flex h-8 w-10 items-center justify-center rounded-[6px] border border-black/40 bg-white text-sm hover:bg-[#f3eee5]">
                    10
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-black/40 bg-[#c79b60] text-sm hover:bg-[#d7b97e]">
                    →
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>

        <PersonalConsultSection />
      </main>
    </>
  );
}
