"use client";

import IdeaConsultSection from "@/components/sections/IdeaConsultSection";
import PersonalConsultSection from "@/components/sections/PersonalConsultSection";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type MainColor = "white" | "gold" | "brown" | "black" | "other";
type StyleType = "classic" | "academic";

type IconostasisItem = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  mainColor: MainColor;
  styles: StyleType[];
};

const items: IconostasisItem[] = [
  {
    id: 1,
    title: "Мрамор: Bianco Carrara",
    subtitle: "Классический иконостас",
    image: "/images/png/church.png",
    mainColor: "white",
    styles: ["classic"],
  },
  {
    id: 2,
    title: "Мрамор: Cristal White",
    subtitle: "Арочный киот",
    image: "/images/png/church.png",
    mainColor: "gold",
    styles: ["classic", "academic"],
  },
  {
    id: 3,
    title: "Мрамор: Kyknos",
    subtitle: "Иконостас с колоннами",
    image: "/images/png/church.png",
    mainColor: "brown",
    styles: ["classic"],
  },
  {
    id: 4,
    title: "Мрамор: Thasos",
    subtitle: "Высокий иконостас",
    image: "/images/png/church.png",
    mainColor: "white",
    styles: ["academic"],
  },
];

export default function IconostasisPage() {
  const [mainColor, setMainColor] = useState<MainColor | null>(null);
  const [styles, setStyles] = useState<StyleType[]>([]);

  const toggleStyle = (style: StyleType) => {
    setStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const resetFilters = () => {
    setMainColor(null);
    setStyles([]);
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchColor = mainColor ? item.mainColor === mainColor : true;
      const matchStyle =
        styles.length > 0 ? styles.some((s) => item.styles.includes(s)) : true;

      return matchColor && matchStyle;
    });
  }, [mainColor, styles]);

  return (
    <main className="bg-white">
      {/* BREADCRUMB */}
      <div className="bg-[#f8f4ee]">
        <p className="py-2 text-center text-xs tracking-[0.12em]">
          <Link href="/" className="hover:underline">
            Главная
          </Link>{" "}
          /{" "}
          <Link href={"/church-art"} className="hover:underline">
            Церковное искусство
          </Link>{" "}
          / <span>Иконостасы и киоты</span>
        </p>
      </div>

      <div className="container mx-auto px-3 sm:px-4">
        {/* TITLE */}
        <div className="flex flex-col items-center gap-2 py-4">
          <div className="h-[2px] w-24 bg-[#c79b60]" />
          <h1 className="text-xl sm:text-2xl md:text-3xl tracking-[0.18em] uppercase text-center">
            ИКОНОСТАСЫ И КИОТЫ
          </h1>
        </div>

        {/* SUBTITLE BAR */}
        <div className="bg-[#c79b60] py-2 text-center text-xs sm:text-sm tracking-[0.16em] uppercase text-[#2c2420]">
          НАШИ ИДЕИ ИЗ НАТУРАЛЬНОГО КАМНЯ В ХРАМОВОМ БЛАГОУКРАШЕНИИ
        </div>

        {/* MAIN CONTENT: FILTER + GRID */}
        <section className="px-4 py-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* LEFT FILTER PANEL */}
            <FilterPanel
              mainColor={mainColor}
              setMainColor={setMainColor}
              styles={styles}
              toggleStyle={toggleStyle}
              resetFilters={resetFilters}
            />

            {/* RIGHT GRID */}
            <div className="flex-1">
              <div className="grid gap-6 md:grid-cols-2">
                {filteredItems.map((item) => (
                  <Link
                    href={`/church-art/${item.id}/${item.title}`}
                    key={item.id}
                    className="group flex flex-col overflow-hidden border border-black/25 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#c79b60] hover:shadow-[0_14px_30px_rgba(0,0,0,0.25)] active:translate-y-0 active:shadow-[0_8px_18px_rgba(0,0,0,0.25)]"
                  >
                    <div className="relative h-[210px] sm:h-[230px]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Radial vignette – chetlari qorayadi */}
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="h-full w-full bg-[radial-gradient(circle,rgba(0,0,0,0)_35%,rgba(0,0,0,0.45)_75%,rgba(0,0,0,0.65)_100%)]" />
                      </div>
                    </div>
                    <div className="px-3 pb-3 pt-2 text-[12px] leading-snug">
                      <p className="font-semibold text-[#2c2420]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[11px] text-[#555]">
                        {item.subtitle}
                      </p>
                    </div>
                  </Link>
                ))}

                {filteredItems.length === 0 && (
                  <p className="col-span-full py-6 text-center text-sm text-neutral-600">
                    По выбранным параметрам ничего не найдено.
                  </p>
                )}
              </div>

              {/* SHOW MORE */}
              <button className="mt-8 flex w-full items-center justify-center bg-[#c79b60] py-2 text-[13px] uppercase tracking-[0.14em] text-[#2c2420] transition hover:bg-[#d8b97c]">
                Показать еще
              </button>

              {/* PAGINATION (statik maket) */}
              <div className="mt-4 flex items-center justify-center gap-2 pb-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-black/40 bg-[#c79b60] text-sm hover:bg-[#d8b97c]">
                  ←
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-black/60 bg-[#666666] text-sm text-white">
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
                <button className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-black/40 bg-[#c79b60] text-sm hover:bg-[#d8b97c]">
                  →
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <PersonalConsultSection />
    </main>
  );
}

/* ---------------- FILTER PANEL ---------------- */

type FilterPanelProps = {
  mainColor: MainColor | null;
  setMainColor: (c: MainColor | null) => void;
  styles: StyleType[];
  toggleStyle: (s: StyleType) => void;
  resetFilters: () => void;
};

function FilterPanel({
  mainColor,
  setMainColor,
  styles,
  toggleStyle,
  resetFilters,
}: FilterPanelProps) {
  return (
    <aside className="w-full border border-black/10 bg-[#f3f0eb] px-4 py-5 text-[13px] leading-snug lg:sticky lg:top-24 lg:max-w-[260px]">
      {/* Основной цвет */}
      <div>
        <h3 className="mb-2 font-medium text-[#2c2420]">Основной цвет</h3>

        <div className="grid grid-cols-4 gap-[2px] border border-black/40 bg-white">
          {(
            [
              { hex: "#ffffff", key: "white" as MainColor },
              { hex: "#b6905d", key: "gold" as MainColor },
              { hex: "#7b6b5d", key: "brown" as MainColor },
              { hex: "#000000", key: "black" as MainColor },
            ] as const
          ).map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() =>
                setMainColor((prev) => (prev === c.key ? null : c.key))
              }
              className={`h-9 w-full border ${
                mainColor === c.key
                  ? "border-[#c79b60]"
                  : "border-black/40 hover:outline hover:outline-1 hover:outline-[#c79b60]"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() =>
            setMainColor((prev) => (prev === "other" ? null : "other"))
          }
          className={`mt-3 block w-full border-t border-black/20 pt-2 text-center text-[12px] uppercase tracking-[0.1em] ${
            mainColor === "other"
              ? "text-[#2c2420]"
              : "text-[#4f473f] hover:text-[#2c2420]"
          }`}
        >
          Иные цвета
        </button>
      </div>

      {/* Стиль выполнения */}
      <div className="mt-5">
        <h3 className="mb-2 font-medium text-[#2c2420]">Стиль выполнения</h3>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-3 w-3 border border-black/40 accent-[#c79b60]"
            checked={styles.includes("classic")}
            onChange={() => toggleStyle("classic")}
          />
          <span className="text-[12px]">Классический / канон</span>
        </label>
        <label className="mt-1 flex items-center gap-2">
          <input
            type="checkbox"
            className="h-3 w-3 border border-black/40 accent-[#c79b60]"
            checked={styles.includes("academic")}
            onChange={() => toggleStyle("academic")}
          />
          <span className="text-[12px]">Академический</span>
        </label>
      </div>

      {/* Clear filters */}
      <button
        type="button"
        onClick={resetFilters}
        className="mt-5 flex w-full items-center justify-center bg-[#c79b60] px-3 py-2 text-[12px] uppercase tracking-[0.12em] text-[#2c2420] transition hover:bg-[#d8b97c]"
      >
        Очистить фильтр
        <span className="ml-1 text-base leading-none">»</span>
      </button>
    </aside>
  );
}
