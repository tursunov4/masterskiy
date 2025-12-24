"use client";

import { useRouter } from "next/navigation";

const WhyChooseUsSection = () => {
  const router = useRouter();

  return (
    <section className="bg-[url('/images/png/choose.png')] bg-cover bg-center bg-no-repeat text-[#c0a57c]">
      <div className="container">
        <div className="relative py-5 overflow-hidden">
          <div className="relative z-10 flex h-full items-center">
            <div className="px-6 sm:px-10 py-8 lg:px-14 max-w-xl text-[#c0a57c]">
              <h2
                className="text-lg sm:text-xl lg:text-2xl tracking-[0.14em] uppercase mb-4 relative inline-block
            "
              >
                ПОЧЕМУ ВЫБИРАЮТ НАС:
              </h2>

              <div className="text-xs sm:text-sm leading-relaxed space-y-1 mb-4">
                {[
                  "✓ Эксклюзивные материалы — прямые контракты с карьерами",
                  "✓ Авторский подход — каждый проект уникален",
                  "✓ Технологическое превосходство — лучшее оборудование рынка",
                  "✓ Академическая школа — фундаментальное художественное образование",
                  "✓ Международный опыт — реализовано более 250 проектов",
                  "✓ Абсолютная дискретность — ваша приватность под защитой",
                ].map((item, index) => (
                  <p
                    key={index}
                    className="transition duration-200 hover:text-[#fff7ec]"
                  >
                    {item}
                  </p>
                ))}
              </div>

              <p className="text-xs sm:text-sm mb-3 uppercase tracking-[0.12em] transition hover:text-[#fff7ec]">
                ГОТОВЫ СОЗДАТЬ ПРОЕКТ ВАШЕЙ МЕЧТЫ?
              </p>

              <button
                onClick={() => router.push("/our-projects")}
                className="inline-flex items-center gap-2 bg-[#c79b60] px-5 py-2 text-xs sm:text-sm uppercase 
                tracking-[0.12em] text-[#231f20] transition-all duration-300 
                hover:bg-[#c0a57c] hover:shadow-lg active:scale-[0.97] focus:ring-2 focus:ring-[#]"
              >
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
