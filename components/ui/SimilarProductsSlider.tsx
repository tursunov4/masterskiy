"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import {
  getSimilarProductsClient,
  SimilarProduct,
} from "@/services/similar-products";
import { formatPriceRub } from "@/lib/utils";

type SimilarProductsSliderProps = {
  productSlug: string;
  categorySlug?: string;
};

function getProductHref(
  product: SimilarProduct,
  categorySlug?: string
): string {
  const catSlug = product.category.slug;

  if (catSlug === "katalog-izdelij") {
    return `/catalog-product/${product.subcategory.slug}/${product.slug}`;
  }
  if (catSlug === "katalog-kamnya") {
    return `/catalog-stone/${product.subcategory.slug}/${product.slug}`;
  }
  if (catSlug === "cerkovnoe-iskusstvo") {
    return `/church-art/${product.subcategory.slug}/${product.slug}`;
  }

  // Fallback
  if (categorySlug) {
    return `/${categorySlug}/${product.subcategory.slug}/${product.slug}`;
  }

  return `#`;
}

export default function SimilarProductsSlider({
  productSlug,
  categorySlug,
}: SimilarProductsSliderProps) {
  const [products, setProducts] = useState<SimilarProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!productSlug) return;

      try {
        setLoading(true);
        setError(null);

        const data = await getSimilarProductsClient(productSlug);
        if (cancelled) return;

        setProducts(data);
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message || "Ошибка загрузки похожих продуктов");
          setProducts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [productSlug]);

  if (loading) {
    return (
      <section className="px-4 pb-10 pt-8">
        <div className="container">
          <div className="flex flex-col items-center mb-6">
            <div className="mb-1 h-[2px] w-16 bg-[#c79b60]" />
            <h2 className="text-lg tracking-[0.18em] uppercase">
              ПОХОЖИЕ ПРОДУКТЫ
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[280px] border border-black/20 bg-black/5 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !products.length) {
    return null;
  }

  return (
    <section className="px-4 pb-10 pt-8">
      <div className="container">
        <div className="flex flex-col items-center mb-6">
          <div className="mb-1 h-[2px] w-16 bg-[#c79b60]" />
          <h2 className="text-lg tracking-[0.18em] uppercase">
            ПОХОЖИЕ ПРОДУКТЫ
          </h2>
        </div>

        <div className="relative">
          <Swiper
            spaceBetween={24}
            slidesPerView={1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            allowTouchMove={true}
            preventClicks={false}
            preventClicksPropagation={false}
            watchSlidesProgress={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="similar-products-swiper"
          >
            {products.map((product) => {
              const href = getProductHref(product, categorySlug);
              return (
                <SwiperSlide key={product.id}>
                  <Link
                    href={href}
                    onClick={(e) => {
                      // Останавливаем всплытие события, чтобы ссылка работала
                      e.stopPropagation();
                    }}
                    onMouseDown={(e) => {
                      // Предотвращаем начало свайпа при клике на ссылку
                      e.stopPropagation();
                    }}
                    className="group block overflow-hidden border border-black/20 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#c79b60] hover:shadow-[0_14px_30px_rgba(0,0,0,0.25)] cursor-pointer"
                  >
                    <div className="relative h-[210px] sm:h-[230px] lg:h-[250px]">
                      <Image
                        src={product.image || "/images/png/mramr2.png"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-[13px]">
                      <span className="font-serif">{product.name}</span>

                      <span className="bg-[#c79b60] px-2 py-1 text-[11px] text-[#2c2420] transition-colors group-hover:bg-[#d8b976]">
                        {formatPriceRub(product.price)}
                      </span>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation buttons */}
          {products.length > 3 && (
            <>
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-black/40 bg-white transition hover:bg-[#f5f3ee] hover:border-[#c79b60] disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Предыдущий"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="#2F2F2F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-black/40 bg-white transition hover:bg-[#f5f3ee] hover:border-[#c79b60] disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Следующий"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="#2F2F2F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

