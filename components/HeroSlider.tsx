"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const slides = [
  {
    id: 1,
    image: "/images/heroslidebg.jpg",
    title: "ВАННЫЕ КОМНАТЫ И SPA",
    bullets: [
      "Ванны из цельного мрамора",
      "Мозаичные душевые и хаммамы",
      "Раковины по индивидуальным лекалам",
    ],
    buttonText: "ПОДРОБНЕЕ",
  },
  {
    id: 2,
    image: "/images/heroslidebg.jpg",
    title: "ВАННЫЕ КОМНАТЫ И SPA",
    bullets: [
      "Индивидуальные дизайн-проекты",
      "Эксклюзивные коллекции камня",
      "Полный цикл реализации",
    ],
    buttonText: "ПОДРОБНЕЕ",
  },
  {
    id: 3,
    image: "/images/heroslidebg.jpg",
    title: "ВАННЫЕ КОМНАТЫ И SPA",
    bullets: [
      "Комплексное оснащение SPA-зон",
      "Авторские мозаичные панно",
      "Премиальные материалы",
    ],
    buttonText: "ПОДРОБНЕЕ",
  },
  {
    id: 4,
    image: "/images/heroslidebg.jpg",
    title: "ВАННЫЕ КОМНАТЫ И SPA",
    bullets: [
      "Комплексное оснащение SPA-зон",
      "Авторские мозаичные панно",
      "Премиальные материалы",
    ],
    buttonText: "ПОДРОБНЕЕ",
  },
];

const HeroSlider = () => {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    if (!swiperInstance) return;
    swiperInstance.slidePrev();
  };

  const handleNext = () => {
    if (!swiperInstance) return;
    swiperInstance.slideNext();
  };

  const handleBulletClick = (index: number) => {
    if (!swiperInstance) return;
    // loop yoq bo‘lmaganda:
    swiperInstance.slideTo(index);
    // agar loop yoqsang: swiperInstance.slideToLoop(index);
  };

  return (
    <section className="py-6 md:py-10">
      <div className="container">
        <div className="relative">
          <Swiper
            modules={[Autoplay]}
            loop
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative mx-auto h-[230px] sm:h-[280px] lg:h-[340px] xl:h-[360px] max-w-5xl overflow-hidden bg-black">
                  {/* Background image */}
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority
                    className="object-cover"
                  />

                  {/* Right dark panel */}
                  <div className="absolute inset-y-0 right-0 w-full sm:w-[48%] bg-gradient-to-l from-black/85 via-black/70 to-transparent px-6 sm:px-10 py-6 flex items-center justify-end">
                    <div className="max-w-md text-right text-[#f5eee5]">
                      <h2 className="mb-4 text-xl sm:text-2xl lg:text-3xl tracking-[0.18em] uppercase">
                        {slide.title}
                      </h2>

                      <ul className="mb-6 space-y-1.5 text-xs sm:text-sm">
                        {slide.bullets.map((item) => (
                          <li
                            key={item}
                            className="flex items-start justify-end gap-2"
                          >
                            <span className="text-[#d7b06a] text-base leading-none">
                              ✓
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <button className="inline-flex bg-[#c79b60] px-6 py-2 text-xs sm:text-sm uppercase tracking-[0.12em] text-[#231f20] hover:bg-[#d8b976] transition-colors">
                        {slide.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* CUSTOM PREV / NEXT BUTTONS */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-md transition-colors"
          >
            <span className="text-2xl leading-none text-[#333]">&lt;</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-md transition-colors"
          >
            <span className="text-2xl leading-none text-[#333]">&gt;</span>
          </button>

          <div className="mt-4 flex justify-center">
            <div className="inline-flex items-center gap-2  ">
              {slides.map((_, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleBulletClick(index)}
                    className={`h-2.5 w-2.5 rounded-full transition-all ${
                      isActive
                        ? "bg-[#c79b60] scale-110"
                        : "bg-[#dcd5c9] hover:bg-[#c79b60]/70"
                    }`}
                  >
                    <span className="sr-only">
                      Перейти к слайду {index + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
