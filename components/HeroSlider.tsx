"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { BannerImage, getBanners } from "@/services/banners";

// ✅ sizdagi eski fallback slides (dizayn logikasi shunga tayangan) :contentReference[oaicite:1]{index=1}
const fallbackSlides = [
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

type SlideUi = {
  id: number;
  image: string;
  title: string;
  bullets: string[];
  buttonText: string;
  alt?: string;
};

const DEFAULT_BULLETS = [
  "Индивидуальные дизайн-проекты",
  "Эксклюзивные коллекции камня",
  "Полный цикл реализации",
];

const HeroSlider = () => {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [banners, setBanners] = useState<BannerImage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const data = await getBanners(1);

        if (cancelled) return;

        // order bo‘yicha sort (agar backend yuborsa)
        const sorted = [...data.results].sort(
          (a, b) => (a.order ?? 9999) - (b.order ?? 9999)
        );
        setBanners(sorted);
      } catch {
        // error bo‘lsa ham fallback ishlayveradi
        if (!cancelled) setBanners([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const slides: SlideUi[] = useMemo(() => {
    if (!banners.length) return fallbackSlides;

    return banners.map((b) => ({
      id: b.id,
      image: b.image, // full url keladi
      title: b.title || "МАСТЕРСКАЯ МРАМОРНЫХ ИНТЕРЬЕРОВ",
      bullets: DEFAULT_BULLETS, // API’da bullets yo‘q -> vaqtincha default
      buttonText: "ПОДРОБНЕЕ",
      alt: b.alt_text ?? b.title ?? "Banner",
    }));
  }, [banners]);

  const handlePrev = () => swiperInstance?.slidePrev();
  const handleNext = () => swiperInstance?.slideNext();
  const handleBulletClick = (index: number) =>
    swiperInstance?.slideToLoop(index);

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
                    alt={slide.alt ?? slide.title}
                    fill
                    priority
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/75" />

                  <div className="absolute inset-0 flex items-center">
                    <div className="flex  w-full justify-center sm:justify-end px-4 sm:px-8 lg:px-10">
                      <div className="max-w-xl text-left text-[#f6f0e8]">
                        <h2 className="mb-4 font-serif text-xl sm:text-2xl lg:text-[32px] leading-tight tracking-[0.16em] uppercase">
                          {slide.title}
                        </h2>
                        <div
                          className="mb-6 text-xs sm:text-sm md:text-base font-serif"
                          dangerouslySetInnerHTML={{ __html: slide.alt || "" }}
                        ></div>

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

          {/* Next button */}
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

          {/* Bullets */}
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

          {/* xohlasangiz loadingni ko‘rsatish */}
          {loading && (
            <div className="mt-2 text-center text-xs text-black/50">
              Загрузка баннеров…
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
