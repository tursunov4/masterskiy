// app/catalog/marble/sivec/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Мрамор Sivec",
};

// ---- MOCK DATA ----
const marbleSpecs = {
  article: "KA181115AA01",
  type: "Мрамор",
  name: "Sivec",
  color: "белый",
  origin: "Греция",
  price: "от 35 941 руб./м²",
  mirrorPattern: "нет",
  translucent: "нет",
  damageResistance: "—",
  uvResistance: "—",
  description:
    "Благородный белый мрамор Sivec идеально подходит для современных интерьеров и премиальных общественных пространств.",
};

type WorkExample = {
  id: number;
  category: string;
  article: string;
  image: string;
};
const workExamples: WorkExample[] = [
  {
    id: 1,
    category: "Полы",
    article: "ПОI17115AA01",
    image: "/images/png/mramr2.png",
  },
  {
    id: 2,
    category: "Полы",
    article: "ПОО21215AS01",
    image: "/images/png/mramr2.png",
  },
  {
    id: 3,
    category: "Столешницы",
    article: "ПОО09316AA08",
    image: "/images/png/mramr2.png",
  },
];

type RelatedMarble = {
  id: number;
  name: string;
  price: string;
  image: string;
};
const related: RelatedMarble[] = [
  {
    id: 1,
    name: "Мрамор Bianco Carrara",
    price: "Цена: от 10 000 руб./м²",
    image: "/images/png/mramr2.png",
  },
  {
    id: 2,
    name: "Мрамор Bianco Carrara",
    price: "Цена: от 10 000 руб./м²",
    image: "/images/png/mramr2.png",
  },
  {
    id: 3,
    name: "Мрамор Bianco Carrara",
    price: "Цена: от 10 000 руб./м²",
    image: "/images/png/mramr2.png",
  },
];

// ---------------- PAGE ----------------

export default function MarbleSivecPage() {
  return (
    <main className="">
      <div className="">
        <Breadcrumb />

        <div className="container">
          <TitleSection />

          <SpecsSection />

          <ExamplesSection />

          <ShowMoreWithPagination />

          <RelatedSection />
        </div>
      </div>
    </main>
  );
}

const Breadcrumb = () => (
  <>
    <div className=" bg-[#f8f4ee]">
      <p className="py-2 text-center text-xs tracking-[0.12em]">
        <Link href="/" className="hover:underline">
          Главная
        </Link>{" "}
        /{" "}
        <Link href="/catalog-stone" className="hover:underline">
          Каталог камня
        </Link>{" "}
        / <Link href="/catalog-stone/mramr">Мрамор</Link> /{" "}
        <span>Артикул KA181115AA01 - Sivec</span>
      </p>
    </div>
  </>
);

const TitleSection = () => (
  <>
    <div className="flex flex-col items-center gap-2 py-4">
      <div className="h-[2px] w-24 bg-[#c79b60]" />
      <h1 className="text-xl sm:text-2xl md:text-3xl tracking-[0.18em] uppercase">
        Мрамор Sivec
      </h1>
    </div>
  </>
);

// 1) SLAB + SPECS
const SpecsSection = () => (
  <section className="px-4 pb-8 pt-6">
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
      {/* Slab image */}
      <div>
        <div className="relative h-[260px] sm:h-[320px] md:h-[360px] border border-black/20">
          <Image
            src="/images/png/mramr2.png"
            alt="Мрамор Sivec"
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-2 text-[11px] italic text-[#555]">
          Цвет материала вживую может отличаться от цвета на мониторе.
        </p>
      </div>

      {/* Specs text */}
      <div className="text-sm leading-relaxed">
        <p>
          <span className="font-semibold">Артикул:</span> KA181115AA01
        </p>
        <p>
          <span className="font-semibold">Тип:</span>{" "}
          <Link href="/catalog/marble" className="underline">
            {marbleSpecs.type}
          </Link>
        </p>
        <p>
          <span className="font-semibold">Название:</span>{" "}
          <span className="underline">{marbleSpecs.name}</span>
        </p>
        <p>
          <span className="font-semibold">Цвет:</span> {marbleSpecs.color}
        </p>
        <p>
          <span className="font-semibold">Месторождение:</span>{" "}
          {marbleSpecs.origin}
        </p>
        <p>
          <span className="font-semibold">Цена:</span>{" "}
          <span className="underline">{marbleSpecs.price}</span>
        </p>
        <p>
          <span className="font-semibold">Зеркальный рисунок:</span>{" "}
          {marbleSpecs.mirrorPattern}
        </p>
        <p>
          <span className="font-semibold">Работает на просвет:</span>{" "}
          {marbleSpecs.translucent}
        </p>
        <p>
          <span className="font-semibold">Устойчивость к повреждениям:</span>{" "}
          {marbleSpecs.damageResistance}
        </p>
        <p>
          <span className="font-semibold">Устойчивость к УФ лучам:</span>{" "}
          {marbleSpecs.uvResistance}
        </p>
        <p className="mt-3">
          <span className="font-semibold">Описание:</span>{" "}
          {marbleSpecs.description}
        </p>
      </div>
    </div>
  </section>
);

const ExamplesSection = () => (
  <section className="px-4 pb-10 pt-4">
    <h2 className="mb-4 text-center text-lg tracking-[0.18em] uppercase">
      ПРИМЕРЫ РАБОТ ИЗ ЭТОГО МРАМОРА
    </h2>

    <div className="grid gap-6 md:grid-cols-3">
      {workExamples.map((item) => (
        <article
          key={item.id}
          className="border border-black/20 bg-white flex flex-col"
        >
          <div className="relative h-[180px] sm:h-[200px]">
            <Image
              src={item.image}
              alt={item.category}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex justify-between bg-white text-[11px]">
            <span className="px-2 py-1">Категория: {item.category}</span>
            <span className="bg-[#c79b60] px-2 py-1">Арт.: {item.article}</span>
          </div>
        </article>
      ))}
    </div>
  </section>
);

// PAGINATION BLOCK
const ShowMoreWithPagination = () => (
  <section className="px-4 pb-8">
    <div className="bg-[#c79b60] py-2 text-center text-[13px] uppercase tracking-[0.14em] text-[#2c2420]">
      Показать еще
    </div>

    <div className="mt-4 flex items-center justify-center gap-2">
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
);

const RelatedSection = () => (
  <section className="px-4 pb-10 pt-4">
    <div className="flex flex-col items-center">
      <div className="mb-1 h-[2px] w-16 bg-[#c79b60]" />
      <h2 className="text-lg tracking-[0.18em] uppercase">ПОХОЖИЕ</h2>
    </div>

    <div className="relative mt-6">
      {/* Left arrow */}
      <button className="hidden md:flex absolute left-0 top-1/2 z-10 -translate-y-1/2 items-center justify-center h-10 w-10 border border-black/40 bg-white">
        ‹
      </button>

      {/* Slider strip (simple scrollable flex) */}
      <div className="flex gap-6 overflow-x-auto px-2 py-2 md:px-10">
        {related.map((item) => (
          <article
            key={item.id}
            className="min-w-[260px] max-w-[280px] flex-shrink-0 border border-black/20 bg-white"
          >
            <div className="relative h-[170px]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="px-2 pb-2 pt-1 text-[12px]">
              <p>{item.name}</p>
              <p className="mt-1 inline-block bg-[#c79b60] px-2 py-[2px] text-[11px] text-[#2c2420]">
                {item.price}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Right arrow */}
      <button className="hidden md:flex absolute right-0 top-1/2 z-10 -translate-y-1/2 items-center justify-center h-10 w-10 border border-black/40 bg-white">
        ›
      </button>
    </div>
  </section>
);
