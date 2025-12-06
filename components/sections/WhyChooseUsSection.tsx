"use client";

import Image from "next/image";

const WhyChooseUsSection = () => {
  return (
    <section className="py-8">
      <div className="container ">
        <div className="relative h-[220px] sm:h-[260px] lg:h-[300px] overflow-hidden">
          {/* Background image */}
          <Image
            src="/images/why-us-bg.jpg" // o'zingdagi rasm pathini yoz
            alt="Почему выбирают нас"
            fill
            priority
            className="object-cover"
          />

          {/* Dark overlay + gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/10" />

          {/* Content */}
          <div className="relative z-10 flex h-full items-center">
            <div className="px-6 sm:px-10 py-8 lg:px-14 max-w-xl text-[#f5eee5]">
              <h2 className="text-lg sm:text-xl lg:text-2xl tracking-[0.14em] uppercase mb-4">
                ПОЧЕМУ ВЫБИРАЮТ НАС:
              </h2>

              <div className="text-xs sm:text-sm leading-relaxed space-y-1 mb-4">
                <p>✓ Эксклюзивные материалы — прямые контракты с карьерами</p>
                <p>✓ Авторский подход — каждый проект уникален</p>
                <p>
                  ✓ Технологическое превосходство — лучшее оборудование рынка
                </p>
                <p>
                  ✓ Академическая школа — фундаментальное художественное
                  образование
                </p>
                <p>✓ Международный опыт — реализовано более 250 проектов</p>
                <p>✓ Абсолютная дискретность — ваша приватность под защитой</p>
              </div>

              <p className="text-xs sm:text-sm mb-3 uppercase tracking-[0.12em]">
                ГОТОВЫ СОЗДАТЬ ПРОЕКТ ВАШЕЙ МЕЧТЫ?
              </p>

              <button className="inline-flex items-center gap-2 bg-[#c79b60] px-5 py-2 text-xs sm:text-sm uppercase tracking-[0.12em] text-[#231f20] hover:bg-[#d8b976] transition">
                Обсудить проект
                <span className="text-base">»</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
