import Image from "next/image";
import Link from "next/link";

export default function IdeaConsultSection() {
  return (
    <section className="relative h-[240px] sm:h-[300px] lg:h-[300px] w-full overflow-hidden ">
      {/* BACKGROUND IMAGE */}
      <Image
        src="/images/png/catalogproductbanner.png" // 🔥 rasmni o'zing almashtirasan
        alt="Интерьер"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/10" />

      {/* CENTER CARD */}
      <div className="absolute container flex items-center justify-center px-4">
        <div className="bg-[#e5e2d6] px-6 py-5 sm:px-8 sm:py-4 max-w-[360px] shadow-md">
          {/* TITLE */}
          <h3 className="text-center text-lg sm:text-xl mb-3 font-[500]">
            Появились идеи?
          </h3>

          {/* DESCRIPTION */}
          <p className="text-sm text-[#2c2c2c] leading-relaxed mb-4">
            Превратим их в готовый проект. Получите бесплатную консультацию по
            телефону и ответы на все вопросы по ассортименту.
          </p>

          {/* BUTTON */}
          <div className="flex justify-center">
            <Link
              href="/consult"
              className="inline-flex items-center gap-2 bg-[#c79b60] hover:bg-[#d8b97c] px-4 py-2 text-sm uppercase tracking-[0.12em] text-[#2c2420] transition"
            >
              Да, хочу консультацию
              <span className="text-base">»</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
