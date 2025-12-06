// app/church-art/iconostasis/page.tsx
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Иконостасы и киоты",
};

type IconostasisItem = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
};

const items: IconostasisItem[] = [
  {
    id: 1,
    title: "Мрамор: Bianco Carrara",
    subtitle: "Классический иконостас",
    image: "/images/church/iconostasis-1.jpg",
  },
  {
    id: 2,
    title: "Мрамор: Cristal White",
    subtitle: "Арочный киот",
    image: "/images/church/iconostasis-2.jpg",
  },
  {
    id: 3,
    title: "Мрамор: Kyknos",
    subtitle: "Иконостас с колоннами",
    image: "/images/church/iconostasis-3.jpg",
  },
  {
    id: 4,
    title: "Мрамор: Thasos",
    subtitle: "Высокий иконостас",
    image: "/images/church/iconostasis-4.jpg",
  },
];

export default function IconostasisPage() {
  return (
    <main className="bg-white pb-16 pt-6">
      <div className="container mx-auto px-4">
        {/* BREADCRUMB */}
        <div className="border-x border-t border-black/40">
          <p className="py-2 text-center text-xs tracking-[0.12em]">
            Главная / Церковное искусство / Иконостасы и киоты
          </p>
        </div>

        <div className="border-x border-b border-black/40">
          {/* TITLE */}
          <div className="flex flex-col items-center gap-2 py-4">
            <div className="h-[2px] w-24 bg-[#c79b60]" />
            <h1 className="text-xl sm:text-2xl md:text-3xl tracking-[0.18em] uppercase">
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
              <FilterPanel />

              {/* RIGHT GRID */}
              <div className="flex-1">
                <div className="grid gap-6 md:grid-cols-2">
                  {items.map((item) => (
                    <article
                      key={item.id}
                      className="border border-black/20 bg-white flex flex-col"
                    >
                      <div className="relative h-[210px] sm:h-[230px]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="px-2 pb-3 pt-2 text-[12px] leading-snug">
                        <p className="font-semibold">{item.title}</p>
                        <p className="mt-1 text-[11px] text-[#555]">
                          {item.subtitle}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

/* ---------------- FILTER PANEL ---------------- */

function FilterPanel() {
  return (
    <aside className="w-full max-w-[260px] border border-black/10 bg-[#f3f0eb] px-4 py-5 text-[13px] leading-snug lg:sticky lg:top-24">
      {/* Основной цвет */}
      <div>
        <h3 className="mb-2 font-medium">Основной цвет</h3>

        <div className="grid grid-cols-4 gap-[2px] border border-black/40 bg-white">
          {["#ffffff", "#b6905d", "#7b6b5d", "#000000"].map((color, idx) => (
            <button
              key={idx}
              type="button"
              className="h-9 w-full border border-black/40 hover:outline hover:outline-1 hover:outline-[#c79b60]"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <div className="mt-3 border-t border-black/20 pt-2 text-center text-[12px] uppercase tracking-[0.1em]">
          Иные цвета
        </div>
      </div>

      {/* Стиль выполнения */}
      <div className="mt-5">
        <h3 className="mb-2 font-medium">Стиль выполнения</h3>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="h-3 w-3 border border-black/40" />
          <span className="text-[12px]">Классический / канон</span>
        </label>
        <label className="mt-1 flex items-center gap-2">
          <input type="checkbox" className="h-3 w-3 border border-black/40" />
          <span className="text-[12px]">Академический</span>
        </label>
      </div>

      {/* BUTTON */}
      <button
        type="button"
        className="mt-5 flex w-full items-center justify-center bg-[#c79b60] px-3 py-2 text-[12px] uppercase tracking-[0.12em] text-[#2c2420] hover:bg-[#d8b97c] transition"
      >
        Очистить фильтр
      </button>
    </aside>
  );
}
