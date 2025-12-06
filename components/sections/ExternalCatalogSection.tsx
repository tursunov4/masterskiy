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
    image: "/images/catalog-external/facade.jpg",
    href: "/catalog/facade",
  },
  {
    title: "Входные группы",
    image: "/images/catalog-external/entrance.jpg",
    href: "/catalog/entrance",
  },
  {
    title: "Цоколь",
    image: "/images/catalog-external/socle.jpg",
    href: "/catalog/socle",
  },
  {
    title: "Брусчатка",
    image: "/images/catalog-external/paver.jpg",
    href: "/catalog/paver",
  },
  {
    title: "Плитка",
    image: "/images/catalog-external/tile.jpg",
    href: "/catalog/tile",
  },
  {
    title: "Уличные ступени",
    image: "/images/catalog-external/steps.jpg",
    href: "/catalog/steps",
  },
];

export default function ExternalCatalogSection() {
  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-4">
        {/* GOLD TITLE BAR */}
        <div className="border-x border-black/40 border-t">
          <div className="bg-[#c79b60] py-2 text-center text-sm tracking-[0.16em] uppercase text-[#2c2420]">
            НАТУРАЛЬНЫЙ КАМЕНЬ ДЛЯ ВНЕШНЕЙ ОТДЕЛКИ
          </div>

          {/* GRID */}
          <div className="px-4 py-10">
            <div className="grid gap-y-12 gap-x-10 md:grid-cols-3">
              {externalCategories.map((cat) => (
                <div key={cat.title} className="flex flex-col items-center">
                  {/* TITLE */}
                  <h3 className="mb-3 text-lg tracking-[0.12em] uppercase text-[#2c2420]">
                    {cat.title}
                  </h3>

                  {/* IMAGE + HOVER EFFECT */}
                  <Link
                    href={cat.href}
                    className="group relative block h-[230px] w-[230px] max-w-full border border-black/20"
                  >
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover"
                    />

                    {/* Radial Lighting on Hover */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="h-full w-full bg-[radial-gradient(circle,rgba(255,255,255,0.65)_0,rgba(255,255,255,0)_60%)]" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
