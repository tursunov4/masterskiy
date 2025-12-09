// app/info/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Информация и статьи",
};

type Article = {
  id: number;
  date: string;
  readTime: string;
  title: string;
  subtitle: string;
  image: string;
};

const articles: Article[] = [
  {
    id: 1,
    date: "11.10.2025",
    readTime: "2 минуты чтения",
    title: "О НАС",
    subtitle: "Краткая информация о наших мастерских",
    image: "/images/articles/about.jpg",
  },
  {
    id: 2,
    date: "27.11.2025",
    readTime: "8 минут чтения",
    title: "СТОЛЫ ИЗ ЛАБРАДОРИТА",
    subtitle: "Камень с магией северного сияния",
    image: "/images/articles/labradorite-table.jpg",
  },
  {
    id: 3,
    date: "21.12.2025",
    readTime: "5 минут чтения",
    title: "ФАСАД КОТОРЫЙ ВДОХНОВЛЯЕТ",
    subtitle: "Возможности крепления фасадов из камня",
    image: "/images/articles/facade.jpg",
  },
];

const faq = [
  {
    q: "Насколько фотографии в каталоге передают реальный вид камня?",
    a: "Фотографии служат ориентиром, но натуральный камень вживую выглядит иначе: он “играет” в зависимости от освещения, соседних цветов и фактуры.",
  },
  {
    q: "Безопасен ли натуральный камень с точки зрения радиации?",
    a: "Да, абсолютно безопасен. Весь камень проходит радиационный контроль и имеет сертификаты соответствия.",
  },
  {
    q: "Какой камень выбрать для кухонной столешницы?",
    a: "Для кухни подойдут гранит и кварцит — они устойчивы к влаге, температуре и механическим воздействиям.",
  },
  {
    q: "Можно ли использовать мрамор в ванной комнате?",
    a: "Да, но мы рекомендуем дополнительную защиту — пропитки, которые предотвращают впитывание влаги.",
  },
  {
    q: "Как ухаживать за каменными поверхностями?",
    a: "Используйте мягкие средства для натурального камня, избегайте абразивов и кислотных составов.",
  },
  {
    q: "Правда ли, что мрамор впитывает запахи?",
    a: "Нет. При правильной обработке и регулярном уходе мраморные поверхности гигиеничны и не сохраняют запахи.",
  },
  {
    q: "Сколько прослужит каменный пол?",
    a: "При корректной укладке и уходе срок службы измеряется десятилетиями.",
  },
  {
    q: "Можно ли совместить “тёплый пол” с каменным покрытием?",
    a: "Да, камень отлично проводит тепло и аккумулирует его, повышая энергоэффективность.",
  },
  {
    q: "Как быстро вы производите замеры и расчёт?",
    a: "Обычно выезд замерщика возможен в течение 2–4 дней.",
  },
  {
    q: "Вы даёте гарантию на работы?",
    a: "Да, мы предоставляем гарантию по договору на монтаж и материалы.",
  },
];

export default function InfoPage() {
  return (
    <main className="">
      <div className="bg-[#f8f4ee]">
        <p className="py-2 text-center text-xs tracking-[0.12em]">
          <Link href="/" className="hover:underline">
            Главная
          </Link>{" "}
          / <span>Информация и статьи</span>
        </p>
      </div>

      <div className="container">
        <HeroSection />
        <ArticlesSection />
        <ShowMoreWithPagination />
        <FaqSection />
      </div>
    </main>
  );
}

function HeroSection() {
  return (
    <>
      <div className="flex flex-col items-center gap-2 py-4">
        <div className="h-[2px] w-24 bg-[#c79b60]" />
        <h1 className="text-lg sm:text-xl md:text-2xl tracking-[0.18em] uppercase">
          Информация и статьи
        </h1>
      </div>
      <div className="bg-[#c79b60] py-2 text-center text-xs sm:text-sm tracking-[0.15em] uppercase text-[#2c2420]">
        УЗНАЙТЕ БОЛЬШЕ О НАС И НАШИХ РАБОТАХ
      </div>

      <section className="relative h-[260px] sm:h-[320px] md:h-[360px]">
        <Image
          src="/images/png/choose.png" // fon rasmi
          alt="Информация и статьи"
          fill
          className="object-cover"
        />

        <div className="absolute left-0 top-1/3 bg-[#c79b60]/95 px-6 py-3 text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-[#2c2420]">
          Статьи
        </div>
      </section>
    </>
  );
}

function ArticlesSection() {
  return (
    <section className="px-4 pb-10 pt-8">
      <div className="grid gap-6 md:grid-cols-3">
        {articles.map((article) => (
          <article
            key={article.id}
            className="border border-black/20 bg-white flex flex-col"
          >
            <div className="relative h-[170px] sm:h-[190px]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex justify-between bg-white text-[11px]">
              <span className="px-2 py-1">{article.date}</span>
              <span className="px-2 py-1">{article.readTime}</span>
            </div>
            <div className="px-2 pb-3 pt-1 text-[12px] leading-snug">
              <Link href="#" className="block font-semibold hover:underline">
                {article.title}
              </Link>
              <p className="mt-1 text-[11px]">{article.subtitle}</p>
            </div>
          </article>
        ))}

        {/* maketdagi bo'sh kartochkalar */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="hidden h-[220px] border border-dashed border-black/20 md:block"
          />
        ))}
      </div>
    </section>
  );
}

/* ---------- SHOW MORE + PAGINATION ---------- */

function ShowMoreWithPagination() {
  return (
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
}

function FaqSection() {
  return (
    <section className="px-4 pb-12 pt-6">
      <h2 className="mb-6 text-center text-lg tracking-[0.18em] uppercase">
        ВОПРОС И ОТВЕТ (FAQ)
      </h2>

      <ol className="space-y-4 text-sm leading-relaxed">
        {faq.map((item, index) => (
          <li key={index} className="border-b border-black/10 pb-3">
            <p className="font-semibold">
              {index + 1}. {item.q}
            </p>
            <p className="mt-1 text-[#444]">{item.a}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
