import Image from "next/image";
import Link from "next/link";

type Category = {
  title: string;
  image: string;
  href: string;
};

const externalCategories: Category[] = [
  {
    title: "Фасады",
    image: "/images/png/floor2.png",
    href: "/catalog-product/steps",
  },
  {
    title: "Входные группы",
    image: "/images/png/floor2.png",
    href: "/catalog-product/steps",
  },
  {
    title: "Цоколь",
    image: "/images/png/floor2.png",
    href: "/catalog-product/steps",
  },
  {
    title: "Брусчатка",
    image: "/images/png/floor2.png",
    href: "/catalog-product/steps",
  },
  {
    title: "Плитка",
    image: "/images/png/floor2.png",
    href: "/catalog-product/steps",
  },
  {
    title: "Уличные ступени",
    image: "/images/png/floor2.png",
    href: "/catalog-product/steps",
  },
];

export default function ExternalCatalogSection() {
  return (
    <section>
      <div className="container mx-auto px-3 sm:px-4 pb-12">
        {/* GOLD TITLE BAR */}
        <div className="bg-[#c79b60] py-2 text-center text-sm tracking-[0.16em] uppercase text-[#2c2420]">
          НАТУРАЛЬНЫЙ КАМЕНЬ ДЛЯ ВНЕШНЕЙ ОТДЕЛКИ
        </div>

        {/* GRID */}
        <div className="px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-10 justify-items-center">
            {externalCategories.map((cat) => (
              <div key={cat.title} className="flex flex-col items-center">
                {/* TITLE */}
                <h3 className="mb-3 text-lg tracking-[0.12em] uppercase text-[#2c2420]">
                  {cat.title}
                </h3>

                {/* IMAGE + HOVER EFFECT */}
                <Link
                  href={cat.href}
                  className="
                    group relative block
                    w-[220px] sm:w-[240px] lg:w-[260px]
                    aspect-square max-w-full
                    overflow-hidden border border-black/20 bg-white
                    transition-all duration-300 ease-out
                    hover:-translate-y-1 hover:border-[#c79b60]
                    hover:shadow-[0_14px_30px_rgba(0,0,0,0.25)]
                    active:translate-y-0 active:shadow-[0_8px_18px_rgba(0,0,0,0.25)]
                  "
                >
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />

                  {/* Radial vignette – chetlari qorayadi, markaz oqarmaydi */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="h-full w-full bg-[radial-gradient(circle,rgba(0,0,0,0)_35%,rgba(0,0,0,0.45)_75%,rgba(0,0,0,0.65)_100%)]" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
