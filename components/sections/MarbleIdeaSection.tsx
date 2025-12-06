import Image from "next/image";
import Link from "next/link";

const MarbleIdeaSection = () => {
  return (
    <section className="relative h-[240px] sm:h-[280px] lg:h-[320px] w-full overflow-hidden border-y border-[#cfae4f]">
      {/* BACKGROUND IMAGE */}
      <Image
        src="/images/marble-idea-bg.jpg" // 🔁 o'zingdagi fon rasm bilan almashtir
        alt="Интерьер из мрамора"
        fill
        priority
        className="object-cover"
      />

      {/* Eng yengil overlay, xohlasang olib tashlashing mumkin */}
      <div className="absolute inset-0 bg-black/10" />

      {/* CENTER CARD */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="bg-[#e5e2d6] px-6 py-5 sm:px-8 sm:py-6 max-w-[420px] shadow-md">
          <h3 className="mb-3 text-center text-lg sm:text-xl font-medium">
            Появились идеи?
          </h3>

          <p className="text-sm leading-relaxed text-[#2c2c2c] mb-4">
            Превратим их в готовый проект. Получите бесплатную консультацию по
            телефону и ответы на все вопросы по ассортименту.
          </p>

          <div className="flex justify-center">
            <Link
              href="/consult"
              className="inline-flex items-center gap-2 bg-[#c79b60] hover:bg-[#d8b97c] px-4 py-2 text-xs sm:text-sm uppercase tracking-[0.12em] text-[#2c2420] transition"
            >
              Да, хочу консультацию
              <span className="text-base">»</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarbleIdeaSection;
