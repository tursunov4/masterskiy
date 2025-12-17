// app/info/page.tsx
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Metadata } from "next";
import Image from "next/image";
import InfoBlogSection from "@/components/sections/InfoBlogSection";

export const metadata: Metadata = {
  title: "Информация и статьи",
};

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
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Информация и статьи" },
        ]}
      />

      <div className="container">
        <HeroSection />

        {/* BLOG FROM API */}
        <InfoBlogSection pageSize={9} />

        <FaqSection />
      </div>
    </main>
  );
}

function HeroSection() {
  return (
    <>
      <SectionHeader
        title="Информация и статьи"
        subtitle=" УЗНАЙТЕ БОЛЬШЕ О НАС И НАШИХ РАБОТАХ"
      />

      <section className="relative h-[260px] sm:h-[320px] md:h-[360px]">
        <Image
          src="/images/png/choose.png"
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
