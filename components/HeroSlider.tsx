"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
      "Эксклюзивные коллекции камня",
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
    swiperInstance.slideToLoop(index);
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
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative mx-auto h-[230px] sm:h-[280px] lg:h-[330px] xl:h-[360px] md:max-w-[calc(100%-70px)] overflow-hidden bg-black">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/75" />

                  <div className="absolute inset-0 flex items-center">
                    <div className="flex w-full justify-center sm:justify-end px-4 sm:px-8 lg:px-10">
                      <div className="max-w-xl text-left text-[#f6f0e8]">
                        <h2 className="mb-4 font-serif text-xl sm:text-2xl lg:text-[32px] leading-tight tracking-[0.16em] uppercase">
                          {slide.title}
                        </h2>

                        <ul className="mb-6 space-y-1.5 text-xs sm:text-sm md:text-base font-serif">
                          {slide.bullets.map((item) => (
                            <li
                              key={item}
                              className="flex items-baseline gap-2 text-[#f6f0e8]"
                            >
                              <span className="text-base leading-none">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <Link href="/catalog-stone">
                          <button className="inline-flex px-8 py-3 bg-[#c8a36a] text-xs sm:text-sm md:text-base font-semibold tracking-[0.14em] uppercase text-[#2b2523] hover:bg-[#d7b77d] transition-colors">
                            {slide.buttonText}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Prev button */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center"
          >
            <svg
              width="40"
              height="80"
              viewBox="0 0 40 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 5 L10 40 L30 75"
                stroke="#2B2523"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center"
          >
            <svg
              width="40"
              height="80"
              viewBox="0 0 40 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 5 L30 40 L10 75"
                stroke="#2B2523"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="mt-4 flex justify-center">
            <div className="inline-flex items-center gap-2">
              {slides.map((_, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleBulletClick(index)}
                    className={`h-2.5 w-2.5 rounded-full transition-all ${
                      isActive
                        ? "bg-[#c8a36a] scale-110"
                        : "bg-[#dcd5c9] hover:bg-[#c8a36a]/70"
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
