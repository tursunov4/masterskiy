"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/sections/FaqSection";
import PersonalConsultSection from "@/components/sections/PersonalConsultSection";
import SectionHeader from "@/components/ui/SectionHeader";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type MainColor = "light" | "warm" | "gray" | "dark" | "black" | "other";
type StyleType = "modern" | "classic" | "luxury";
type MosaicType = "none" | "accent";

type ApiWork = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  color: { id: number; name: string } | null;
  price: string | null;
  style: string | null;
  is_top: boolean;
  created_at: string;
  category: {
    id: number;
    name: string;
    slug: string;
    image: string;
    created_at: string;
  };
  subcategory: {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    category: number;
    created_at: string;
  };
};

type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

type Product = {
  id: number;
  name: string;
  stone: string;
  price: string;
  image: string;
  mainColor: MainColor;
  styles: StyleType[];
  mosaic: MosaicType;
  slug: string;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://admin.marble-moscow.ru";

/** API color.name -> UI mainColor */
function mapApiColorToMainColor(apiColor?: string | null): MainColor {
  const c = (apiColor ?? "").toLowerCase();

  if (!c) return "other";
  if (["white", "ivory", "cream", "beige", "light"].some((x) => c.includes(x)))
    return "light";
  if (["warm", "gold", "yellow", "sand", "brown"].some((x) => c.includes(x)))
    return "warm";
  if (["gray", "grey", "silver"].some((x) => c.includes(x))) return "gray";
  if (["dark", "graphite"].some((x) => c.includes(x))) return "dark";
  if (["black", "nero"].some((x) => c.includes(x))) return "black";
  return "other";
}

/** API style -> UI StyleType[] (bizning filter setga moslab) */
function mapApiStyleToStyles(apiStyle?: string | null): StyleType[] {
  const s = (apiStyle ?? "").toLowerCase();

  if (s === "modern") return ["modern"];
  if (s === "classic") return ["classic"];
  if (s === "luxury") return ["luxury"];

  // backendda "vintage" kelgani uchun: luxuryga bog‘lab qo‘ydim (xohlasangiz boshqa mapping qilamiz)
  if (s === "vintage") return ["luxury"];

  // noma’lum style: filterlarga kirmaydi, lekin umumiy listda chiqaveradi
  return [];
}

function formatPriceRub(price?: string | null) {
  if (!price) return "Цена: по запросу";
  const n = Number(price);
  if (Number.isNaN(n)) return `Цена: ${price} руб.`;
  return `Цена: от ${new Intl.NumberFormat("ru-RU").format(n)} руб.`;
}

async function fetchOurWorksPage(page: number): Promise<Paginated<ApiWork>> {
  const url = `${API_BASE}/api/catalog/our-works/?page=${page}`;
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export default function OurProjectsPage() {
  const [mainColor, setMainColor] = useState<MainColor | null>(null);
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
    setMainColor(null);
    setStyles([]);
    setMosaic(null);
  };

  // initial load
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setErr(null);
        setPage(1);

        const data = await fetchOurWorksPage(1);
        if (cancelled) return;

        const mapped: Product[] = data.results.map((w) => ({
          id: w.id,
          slug: w.slug,
          name: w.name,
          stone: `${w.category?.name ?? "Проект"}: ${
            w.subcategory?.name ?? w.name
          }`,
          price: formatPriceRub(w.price),
          image: w.image ?? "/images/png/floor2.png",
          mainColor: mapApiColorToMainColor(w.color?.name),
          styles: mapApiStyleToStyles(w.style),
          mosaic: w.is_top ? "accent" : "none",
        }));

        setItems(mapped);
        setCount(data.count);
        setHasNext(Boolean(data.next));
        setHasPrev(Boolean(data.previous));
      } catch (e: any) {
        if (!cancelled) setErr(e?.message || "Ошибка загрузки");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return items.filter((p) => {
      const matchColor = mainColor ? p.mainColor === mainColor : true;
      const matchStyle =
        styles.length > 0 ? styles.some((s) => p.styles.includes(s)) : true;
      const matchMosaic = mosaic ? p.mosaic === mosaic : true;
      return matchColor && matchStyle && matchMosaic;
    });
  }, [items, mainColor, styles, mosaic]);

  // ✅ product kam bo‘lsa controls ko‘rinmasin
  const isSinglePage = !hasNext && !hasPrev;
  const showControls = !isSinglePage;

  const loadMore = async () => {
    if (!hasNext || loading) return;

    try {
      setLoading(true);
      setErr(null);

      const nextPage = page + 1;
      const data = await fetchOurWorksPage(nextPage);

      const mapped: Product[] = data.results.map((w) => ({
        id: w.id,
        slug: w.slug,
        name: w.name,
        stone: `${w.category?.name ?? "Проект"}: ${
          w.subcategory?.name ?? w.name
        }`,
        price: formatPriceRub(w.price),
        image: w.image ?? "/images/png/floor2.png",
        mainColor: mapApiColorToMainColor(w.color?.name),
        styles: mapApiStyleToStyles(w.style),
        mosaic: w.is_top ? "accent" : "none",
      }));

      setItems((prev) => [...prev, ...mapped]);
      setCount(data.count);
      setHasNext(Boolean(data.next));
      setHasPrev(true);
      setPage(nextPage);
    } catch (e: any) {
      setErr(e?.message || "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  const goPrev = async () => {
    if (!hasPrev || loading) return;

    try {
      setLoading(true);
      setErr(null);

      const prevPage = Math.max(1, page - 1);
      const data = await fetchOurWorksPage(prevPage);

      const mapped: Product[] = data.results.map((w) => ({
        id: w.id,
        slug: w.slug,
        name: w.name,
        stone: `${w.category?.name ?? "Проект"}: ${
          w.subcategory?.name ?? w.name
        }`,
        price: formatPriceRub(w.price),
        image: w.image ?? "/images/png/floor2.png",
        mainColor: mapApiColorToMainColor(w.color?.name),
        styles: mapApiStyleToStyles(w.style),
        mosaic: w.is_top ? "accent" : "none",
      }));

      setItems(mapped);
      setCount(data.count);
      setHasNext(Boolean(data.next));
      setHasPrev(Boolean(data.previous));
      setPage(prevPage);
    } catch (e: any) {
      setErr(e?.message || "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  const goNext = async () => {
    if (!hasNext || loading) return;

    try {
      setLoading(true);
      setErr(null);

      const nextPage = page + 1;
      const data = await fetchOurWorksPage(nextPage);

      const mapped: Product[] = data.results.map((w) => ({
        id: w.id,
        slug: w.slug,
        name: w.name,
        stone: `${w.category?.name ?? "Проект"}: ${
          w.subcategory?.name ?? w.name
        }`,
        price: formatPriceRub(w.price),
        image: w.image ?? "/images/png/floor2.png",
        mainColor: mapApiColorToMainColor(w.color?.name),
        styles: mapApiStyleToStyles(w.style),
        mosaic: w.is_top ? "accent" : "none",
      }));

      setItems(mapped);
      setCount(data.count);
      setHasNext(Boolean(data.next));
      setHasPrev(Boolean(data.previous));
      setPage(nextPage);
    } catch (e: any) {
      setErr(e?.message || "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
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
            <aside className="w-full shrink-0 border border-black/40 bg-[#f5f3ee] px-4 py-5 text-sm lg:w-[260px]">
              {/* Основной цвет */}
              <div className="mb-5 border-b border-black/20 pb-4">
                <p className="mb-3 text-center text-[13px]">Основной цвет</p>
                <div className="flex flex-wrap justify-center gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      setMainColor((prev) =>
                        prev === "light" ? null : "light"
                      )
                    }
                    className={`h-7 w-9 border ${
                      mainColor === "light"
                        ? "border-[#c79b60]"
                        : "border-black/20"
                    }`}
                    style={{ backgroundColor: "#d9cdc0" }}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setMainColor((prev) => (prev === "warm" ? null : "warm"))
                    }
                    className={`h-7 w-9 border ${
                      mainColor === "warm"
                        ? "border-[#c79b60]"
                        : "border-black/20"
                    }`}
                    style={{ backgroundColor: "#c4a78c" }}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setMainColor((prev) => (prev === "gray" ? null : "gray"))
                    }
                    className={`h-7 w-9 border ${
                      mainColor === "gray"
                        ? "border-[#c79b60]"
                        : "border-black/20"
                    }`}
                    style={{ backgroundColor: "#b8b1aa" }}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setMainColor((prev) => (prev === "dark" ? null : "dark"))
                    }
                    className={`h-7 w-9 border ${
                      mainColor === "dark"
                        ? "border-[#c79b60]"
                        : "border-black/20"
                    }`}
                    style={{ backgroundColor: "#8a8b8d" }}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setMainColor((prev) =>
                        prev === "black" ? null : "black"
                      )
                    }
                    className={`h-7 w-9 border ${
                      mainColor === "black"
                        ? "border-[#c79b60]"
                        : "border-black/20"
                    }`}
                    style={{ backgroundColor: "#000000" }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setMainColor((prev) => (prev === "other" ? null : "other"))
                  }
                  className={`mt-3 block w-full py-1 text-center text-[12px] uppercase tracking-[0.12em] transition ${
                    mainColor === "other"
                      ? "bg-[#c79b60] text-[#2c2420]"
                      : "bg-[#e1dbcf] hover:bg-[#d4c9b8]"
                  }`}
                >
                  Иные цвета
                </button>
              </div>

              {/* Стиль исполнения */}
              <div className="mb-5 border-b border-black/20 pb-4">
                <p className="mb-2 text-[13px]">Стиль исполнения</p>

                <label className="mb-1 flex items-center gap-2 text-[13px]">
                  <input
                    type="checkbox"
                    checked={styles.includes("modern")}
                    onChange={() => toggleStyle("modern")}
                    className="accent-[#c79b60]"
                  />
                  Современный
                </label>

                <label className="mb-1 flex items-center gap-2 text-[13px]">
                  <input
                    type="checkbox"
                    checked={styles.includes("classic")}
                    onChange={() => toggleStyle("classic")}
                    className="accent-[#c79b60]"
                  />
                  Классический
                </label>

                <label className="flex items-center gap-2 text-[13px]">
                  <input
                    type="checkbox"
                    checked={styles.includes("luxury")}
                    onChange={() => toggleStyle("luxury")}
                    className="accent-[#c79b60]"
                  />
                  Роскошный
                </label>
              </div>

              {/* Мозаичные элементы -> is_top bilan ishlaydi */}
              <div className="mb-5">
                <p className="mb-2 text-[13px]">Мозаичные элементы</p>
                <label className="mb-1 flex items-center gap-2 text-[13px]">
                  <input
                    type="radio"
                    name="mosaic"
                    className="accent-[#c79b60]"
                    checked={mosaic === "none"}
                    onChange={() =>
                      setMosaic((prev) => (prev === "none" ? null : "none"))
                    }
                  />
                  Без мозаики
                </label>
                <label className="flex items-center gap-2 text-[13px]">
                  <input
                    type="radio"
                    name="mosaic"
                    className="accent-[#c79b60]"
                    checked={mosaic === "accent"}
                    onChange={() =>
                      setMosaic((prev) => (prev === "accent" ? null : "accent"))
                    }
                  />
                  Акцентная мозаика
                </label>
              </div>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-3 flex w-full items-center justify-center gap-2 bg-[#c79b60] px-3 py-2 text-[12px] uppercase tracking-[0.12em] text-[#2c2420] transition hover:bg-[#d7b97e]"
              >
                Очистить фильтр
                <span className="text-base">»</span>
              </button>

              <div className="mt-3 text-center text-[12px] text-black/60">
                Найдено: {count}
              </div>
            </aside>

            <section className="flex-1">
              {err && (
                <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                  {err}
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                {filteredProducts.map((product) => (
                  <Link
                    // href={`/our-projects/${product.slug}`}
                    href={"#"}
                    key={product.id}
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

              {/* SHOW MORE -> faqat next bo‘lsa */}
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

              {/* PAGINATION -> faqat ko‘p sahifa bo‘lsa */}
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
