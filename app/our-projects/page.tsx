"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/sections/FaqSection";
import PersonalConsultSection from "@/components/sections/PersonalConsultSection";
import SectionHeader from "@/components/ui/SectionHeader";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import FilterSidebar from "@/components/our-projects/FilterSidebar";

import { fetchOurWorks } from "@/lib/our-projects/api";
import { mapApiWorkToProduct, type Product } from "@/lib/our-projects/mappers";
import type {
  MainColorKey,
  MosaicType,
  StyleType,
} from "@/lib/our-projects/filters";

export default function OurProjectsPage() {
  // ✅ Изделие
  const [productType, setProductType] = useState<string>("");

  // ✅ Rang: UI key + API value (APIga nom ketadi)
  const [mainColorKey, setMainColorKey] = useState<MainColorKey | null>(null);
  const [mainColorApiValue, setMainColorApiValue] = useState<string | null>(
    null
  );

  // ✅ Style / Mosaic
  const [styles, setStyles] = useState<StyleType[]>([]);
  const [mosaic, setMosaic] = useState<MosaicType | null>(null);

  // API state
  const [items, setItems] = useState<Product[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const toggleStyle = (style: StyleType) => {
    setStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const resetFilters = () => {
    setProductType("");
    setMainColorKey(null);
    setMainColorApiValue(null);
    setStyles([]);
    setMosaic(null);
  };

  // ✅ Fetch helper (filter paramlar bilan)
  const loadPage = async (p: number, mode: "replace" | "append") => {
    setLoading(true);
    setErr(null);

    try {
      const data = await fetchOurWorks({
        page: p,
        category: productType || undefined,
        color: mainColorApiValue || undefined, // APIga NOM ketadi
        style: styles.length ? styles : undefined,
        mosaic: mosaic ?? undefined,
      });

      const mapped = data.results.map(mapApiWorkToProduct);

      if (mode === "append") setItems((prev) => [...prev, ...mapped]);
      else setItems(mapped);

      setCount(data.count);
      setHasNext(Boolean(data.next));
      setHasPrev(Boolean(data.previous));
      setPage(p);
    } catch (e: any) {
      setErr(e?.message || "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initial load
  useEffect(() => {
    loadPage(1, "replace");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Filter o‘zgarsa — 1-sahifadan qayta yuklaymiz (APIga ham ketadi)
  useEffect(() => {
    loadPage(1, "replace");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productType, mainColorApiValue, styles, mosaic]);

  // ✅ Client-side fallback filter (agar backend filtr qilmasa ham UI ishlaydi)
  const filteredProducts = useMemo(() => {
    return items.filter((p) => {
      const matchProductType = productType
        ? p.categorySlug === productType || p.subcategorySlug === productType
        : true;

      const matchColor = mainColorKey ? p.mainColor === mainColorKey : true;

      const matchStyle =
        styles.length > 0 ? styles.some((s) => p.styles.includes(s)) : true;

      const matchMosaic = mosaic ? p.mosaic === mosaic : true;

      return matchProductType && matchColor && matchStyle && matchMosaic;
    });
  }, [items, productType, mainColorKey, styles, mosaic]);

  // Controls
  const isSinglePage = !hasNext && !hasPrev;
  const showControls = !isSinglePage;

  const loadMore = async () => {
    if (!hasNext || loading) return;
    await loadPage(page + 1, "append");
  };

  const goPrev = async () => {
    if (!hasPrev || loading) return;
    await loadPage(Math.max(1, page - 1), "replace");
  };

  const goNext = async () => {
    if (!hasNext || loading) return;
    await loadPage(page + 1, "replace");
  };

  return (
    <main className="bg-white">
      <Breadcrumbs
        items={[{ label: "Главная", href: "/" }, { label: "Наши проекты" }]}
      />

      <div className="container mx-auto px-3 sm:px-4">
        <SectionHeader
          title="Наши проекты"
          subtitle="НАШИ ИДЕИ ИЗ НАТУРАЛЬНОГО КАМНЯ ДЛЯ ВАШЕГО ДОМА"
        />

        <div className="py-8">
          <div className="flex flex-col items-start gap-8 lg:flex-row">
            {/* ✅ FILTER (rasmdagidek) */}
            <FilterSidebar
              productType={productType}
              setProductType={setProductType}
              mainColorKey={mainColorKey}
              setMainColorKey={setMainColorKey}
              mainColorApiValue={mainColorApiValue}
              setMainColorApiValue={setMainColorApiValue}
              styles={styles}
              toggleStyle={toggleStyle}
              mosaic={mosaic}
              setMosaic={setMosaic}
              foundCount={filteredProducts.length}
              onReset={resetFilters}
            />

            {/* ✅ CONTENT */}
            <section className="flex-1">
              {err && (
                <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                  {err}
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={"#"}
                    className="group overflow-hidden border border-black/25 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#c79b60] hover:shadow-[0_14px_30px_rgba(0,0,0,0.25)] active:translate-y-0 active:shadow-[0_8px_18px_rgba(0,0,0,0.25)]"
                  >
                    <div className="relative h-[220px]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-[13px]">
                      <span>{product.stone}</span>
                      <span className="bg-[#c79b60] px-2 py-1 text-[11px] text-[#2c2420] transition-colors group-hover:bg-[#d8b976]">
                        {product.price}
                      </span>
                    </div>
                  </Link>
                ))}

                {!loading && filteredProducts.length === 0 && (
                  <p className="col-span-full py-6 text-center text-sm text-neutral-600">
                    По выбранным параметрам ничего не найдено.
                  </p>
                )}
              </div>

              {/* SHOW MORE */}
              {showControls && hasNext && (
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className={`mt-8 flex w-full items-center justify-center py-2 text-[13px] uppercase tracking-[0.14em] transition ${
                    loading
                      ? "bg-black/10 text-black/40 cursor-not-allowed"
                      : "bg-[#c79b60] text-[#2c2420] hover:bg-[#d7b97e]"
                  }`}
                >
                  {loading ? "Загрузка..." : "Показать еще"}
                </button>
              )}

              {/* PAGINATION */}
              {showControls && (
                <div className="mt-4 flex items-center justify-center gap-2 pb-2">
                  <button
                    onClick={goPrev}
                    disabled={!hasPrev || loading}
                    className={`flex h-8 w-8 items-center justify-center rounded-[6px] border text-sm ${
                      !hasPrev || loading
                        ? "border-black/10 bg-black/5 text-black/30 cursor-not-allowed"
                        : "border-black/40 bg-[#c79b60] hover:bg-[#d7b97e]"
                    }`}
                  >
                    ←
                  </button>

                  <div className="flex h-8 items-center justify-center rounded-[6px] border border-black/40 bg-white px-3 text-sm">
                    {page}
                  </div>

                  <button
                    onClick={goNext}
                    disabled={!hasNext || loading}
                    className={`flex h-8 w-8 items-center justify-center rounded-[6px] border text-sm ${
                      !hasNext || loading
                        ? "border-black/10 bg-black/5 text-black/30 cursor-not-allowed"
                        : "border-black/40 bg-[#c79b60] hover:bg-[#d7b97e]"
                    }`}
                  >
                    →
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      <FaqSection />
      <PersonalConsultSection />
    </main>
  );
}
