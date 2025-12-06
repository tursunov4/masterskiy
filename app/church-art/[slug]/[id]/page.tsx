// app/church-art/iconostasis/thasos/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Иконостас Thasos",
};

const iconostasis = {
  name: "Иконостас Thasos",
  article: "IE181115AA01",
  material: "Thasos",
  color: "белый",
  origin: "Греция",
  style: "Классический / Канон, византийский стиль резьбы",
  shortDescription:
    "Иконостас из белоснежного мрамора, выполненный по эскизу А.Н. Солдатова, профессора иконописной школы МПДА.",
  image: "/images/church/iconostasis-thasos.jpg", // 🔁 o'zingdagi rasmga almashtir
};

const paragraphs: string[] = [
  "Классический поздне-византийский двухрядный иконостас. Иконы выполнены в технике римской мозаики белорусскими мастерами-монументалистами.",
  "Данный иконостас выполнен для Георгиевского храма в г. Ростов-на-Дону.",
  "Каждый наш иконостас проектируется индивидуально с учётом архитектурного соответствия, гармонии с размерами и стилем храма, литургических особенностей прихода и расположения алтарных врат. Конструктивная надёжность обеспечивает долговечность и удобство эксплуатации.",
  "Создание иконостаса — это не просто изготовление церковной утвари, а глубокий духовный процесс, где каждая деталь наполняется особым смыслом. Мы понимаем ответственность такой работы и подходим к ней с молитвой и профессиональным трепетом.",
  "Если вы задумываетесь о создании иконостаса для своего храма или хотите обновить существующий иконостас, расскажите нам о своём проекте. Мы поможем воплотить замысел в камне, сохранив традиции и учитывая современные требования.",
];

export default function IconostasisThasosPage() {
  return (
    <main className="bg-white pb-16 pt-6">
      <div className="container mx-auto px-4">
        {/* BREADCRUMB */}
        <div className="border-x border-t border-black/40">
          <p className="py-2 text-center text-xs tracking-[0.12em]">
            Главная / Церковное искусство / Иконостасы и киоты / Артикул{" "}
            {iconostasis.article} - {iconostasis.name}
          </p>
        </div>

        <div className="border-x border-b border-black/40">
          {/* TITLE */}
          <div className="flex flex-col items-center gap-2 py-4">
            <div className="h-[2px] w-24 bg-[#c79b60]" />
            <h1 className="text-xl sm:text-2xl md:text-3xl tracking-[0.18em] uppercase text-center">
              {iconostasis.name}
            </h1>
          </div>

          {/* SUBTITLE */}
          <div className="bg-[#c79b60] py-2 text-center text-xs sm:text-sm tracking-[0.16em] uppercase text-[#2c2420]">
            НАШИ ИДЕИ ИЗ НАТУРАЛЬНОГО КАМНЯ В ХРАМОВОМ БЛАГОУКРАШЕНИИ
          </div>

          {/* MAIN CONTENT: IMAGE + INFO */}
          <section className="px-4 py-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
              {/* LEFT – IMAGE */}
              <div className="border border-black/25 bg-white">
                <div className="relative h-[260px] sm:h-[320px] md:h-[360px]">
                  <Image
                    src={iconostasis.image}
                    alt={iconostasis.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* RIGHT – DETAILS */}
              <div className="space-y-2 text-[13px] leading-relaxed">
                <DetailRow label="Артикул" value={iconostasis.article} />
                <DetailRow
                  label="Основной материал"
                  value={iconostasis.material}
                />
                <DetailRow label="Цвет" value={iconostasis.color} />
                <DetailRow label="Месторождение" value={iconostasis.origin} />
                <DetailRow label="Стиль" value={iconostasis.style} />
                <div className="pt-2">
                  <p className="font-semibold">Описание</p>
                  <p className="mt-1 text-[#444]">
                    {iconostasis.shortDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* LONG TEXT */}
            <div className="mt-6 space-y-3 text-[13px] leading-relaxed text-[#333]">
              {paragraphs.map((text, idx) => (
                <p key={idx}>{text}</p>
              ))}
            </div>

            {/* CTA LINKS */}
            <div className="mt-6 flex flex-col gap-2 text-[12px] uppercase tracking-[0.12em]">
              <CtaLink href="/contacts#consultation">
                Оставить заявку на консультацию
              </CtaLink>
              <CtaLink href="/services/measurement">
                Заказать выезд замерщика
              </CtaLink>
              <CtaLink href="/services/design">
                Получить бесплатный дизайн-проект
              </CtaLink>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="font-semibold">{label}:</span>{" "}
      <span className="align-middle">{value}</span>
    </p>
  );
}

function CtaLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex w-full items-center justify-start border-b border-dotted border-[#c79b60] pb-[2px] text-[#2c2420] hover:text-[#c79b60]"
    >
      [{children}]
    </Link>
  );
}
