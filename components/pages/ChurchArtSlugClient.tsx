"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import PersonalConsultSection from "@/components/sections/PersonalConsultSection";
import SectionHeader from "@/components/ui/SectionHeader";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import PaginationControls from "../ui/PaginationControls";

type MainColor = "white" | "gold" | "brown" | "black" | "other";
type StyleType = "classic" | "academic";

type ApiProduct = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  price: string | null;
  style: string | null;
  color: { id: number; name: string } | null;
  created_at: string;
};

type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

import { API_BASE } from "@/lib/api";

const CATEGORY_ID = 5;

function mapApiColorToMainColor(apiColorName?: string | null): MainColor {
  const c = (apiColorName ?? "").toLowerCase();

  if (!c) return "other";
  if (["white", "ivory", "cream", "bianco", "snow"].some((x) => c.includes(x)))
    return "white";
  if (["gold", "yellow", "amber"].some((x) => c.includes(x))) return "gold";
  if (["brown", "beige", "tan", "sand"].some((x) => c.includes(x)))
    return "brown";
  if (["black", "nero"].some((x) => c.includes(x))) return "black";

  return "other";
}

function normalizeStyle(style?: string | null): StyleType | null {
  const s = (style ?? "").toLowerCase();
  if (s === "classic") return "classic";
  if (s === "academic") return "academic";
  return null;
}

async function fetchProductsPage(args: {
  slug: string; // subcategory slug
  page: number;
}): Promise<Paginated<ApiProduct>> {
  const qs = new URLSearchParams();
  qs.set("category", String(CATEGORY_ID));
  qs.set("subcategory", args.slug); // ✅ slug bilan filter
  qs.set("page", String(args.page));

  const url = `${API_BASE}/api/catalog/products/?${qs.toString()}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export default function ChurchArtSlugClient({ slug }: { slug: string }) {
  const [mainColor, setMainColor] = useState<MainColor | null>(null);
  const [styles, setStyles] = useState<StyleType[]>([]);

  const [items, setItems] = useState<ApiProduct[]>([]);
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
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setErr(null);
        setPage(1);

        const data = await fetchProductsPage({ slug, page: 1 });
        if (cancelled) return;

        setItems(data.results);
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
  }, [slug]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const itemColor = mapApiColorToMainColor(item.color?.name);
      const itemStyle = normalizeStyle(item.style);

      const matchColor = mainColor ? itemColor === mainColor : true;
      const matchStyle =
        styles.length > 0
          ? itemStyle
            ? styles.includes(itemStyle)
            : false
          : true;

      return matchColor && matchStyle;
    });
  }, [items, mainColor, styles]);

  const loadMore = async () => {
    if (!hasNext || loading) return;

    try {
      setLoading(true);
      setErr(null);

      const nextPage = page + 1;
      const data = await fetchProductsPage({ slug, page: nextPage });

      setItems((prev) => [...prev, ...data.results]);
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

  // prev/next pagination (replace)
  const goPrev = async () => {
    if (!hasPrev || loading) return;

    try {
      setLoading(true);
      setErr(null);

      const prevPage = Math.max(1, page - 1);
      const data = await fetchProductsPage({ slug, page: prevPage });

      setItems(data.results);
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
      const data = await fetchProductsPage({ slug, page: nextPage });

      setItems(data.results);
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
        items={[
          { label: "Главная", href: "/" },
          { label: "Церковное искусство", href: "/church-art" },
          { label: slug },
        ]}
      />

      <div className="container mx-auto px-3 sm:px-4">
        <SectionHeader
          title={slug.toUpperCase()}
          subtitle="Церковное искусство"
        />

        <section className="px-4 py-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            <FilterPanel
              mainColor={mainColor}
              setMainColor={setMainColor}
              styles={styles}
              toggleStyle={toggleStyle}
              resetFilters={resetFilters}
              count={count}
            />

            <div className="flex-1">
              {err && (
                <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                  {err}
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                {filteredItems.map((item) => (
                  <Link
                    href={`/church-art/${slug}/${item.slug}`} // ✅ nested detail bo‘lsa
                    key={item.id}
                    className="group flex flex-col overflow-hidden border border-black/25 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#c79b60] hover:shadow-[0_14px_30px_rgba(0,0,0,0.25)] active:translate-y-0 active:shadow-[0_8px_18px_rgba(0,0,0,0.25)]"
                  >
                    <div className="relative h-[210px] sm:h-[230px]">
                      <Image
                        src={item.image ?? "/images/png/church.png"}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="h-full w-full bg-[radial-gradient(circle,rgba(0,0,0,0)_35%,rgba(0,0,0,0.45)_75%,rgba(0,0,0,0.65)_100%)]" />
                      </div>
                    </div>

                    <div className="px-3 pb-3 pt-2 text-[12px] leading-snug">
                      <p className="font-semibold text-[#2c2420]">
                        {item.name}
                      </p>
                      <p className="mt-1 text-[11px] text-[#555]">
                        {normalizeStyle(item.style) === "academic"
                          ? "Академический"
                          : "Классический / канон"}
                      </p>
                    </div>
                  </Link>
                ))}

                {!loading && filteredItems.length === 0 && (
                  <p className="col-span-full py-6 text-center text-sm text-neutral-600">
                    По выбранным параметрам ничего не найдено.
                  </p>
                )}
              </div>
              <PaginationControls
                page={page}
                hasPrev={hasPrev}
                hasNext={hasNext}
                loading={loading}
                onPrev={goPrev}
                onNext={goNext}
                showMore
                onLoadMore={loadMore}
              />
            </div>
          </div>
        </section>
      </div>

      <PersonalConsultSection />
    </main>
  );
}

type FilterPanelProps = {
  mainColor: MainColor | null;
  setMainColor: React.Dispatch<React.SetStateAction<MainColor | null>>;
  styles: StyleType[];
  toggleStyle: (s: StyleType) => void;
  resetFilters: () => void;
  count: number;
};
function FilterPanel({
  mainColor,
  setMainColor,
  styles,
  toggleStyle,
  resetFilters,
  count,
}: FilterPanelProps) {
  return (
    <aside className="w-full border border-black/10 bg-[#f3f0eb] px-4 py-5 text-[13px] leading-snug lg:sticky lg:top-24 lg:max-w-[260px]">
      <div>
        <h3 className="mb-2 font-medium text-[#2c2420]">Основной цвет</h3>

        <div className="grid grid-cols-4 gap-[2px] border border-black/40 bg-white">
          {(
            [
              { hex: "#ffffff", key: "white" as MainColor },
              { hex: "#b6905d", key: "gold" as MainColor },
              { hex: "#7b6b5d", key: "brown" as MainColor },
              { hex: "#000000", key: "black" as MainColor },
            ] as const
          ).map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() =>
                setMainColor((prev) => (prev === c.key ? null : c.key))
              }
              className={`h-9 w-full border ${
                mainColor === c.key
                  ? "border-[#c79b60]"
                  : "border-black/40 hover:outline hover:outline-1 hover:outline-[#c79b60]"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() =>
            setMainColor((prev) => (prev === "other" ? null : "other"))
          }
          className={`mt-3 block w-full border-t border-black/20 pt-2 text-center text-[12px] uppercase tracking-[0.1em] ${
            mainColor === "other"
              ? "text-[#2c2420]"
              : "text-[#4f473f] hover:text-[#2c2420]"
          }`}
        >
          Иные цвета
        </button>
      </div>

      <div className="mt-5">
        <h3 className="mb-2 font-medium text-[#2c2420]">Стиль выполнения</h3>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-3 w-3 border border-black/40 accent-[#c79b60]"
            checked={styles.includes("classic")}
            onChange={() => toggleStyle("classic")}
          />
          <span className="text-[12px]">Классический / канон</span>
        </label>

        <label className="mt-1 flex items-center gap-2">
          <input
            type="checkbox"
            className="h-3 w-3 border border-black/40 accent-[#c79b60]"
            checked={styles.includes("academic")}
            onChange={() => toggleStyle("academic")}
          />
          <span className="text-[12px]">Академический</span>
        </label>
      </div>

      <button
        type="button"
        onClick={resetFilters}
        className="mt-5 flex w-full items-center justify-center bg-[#c79b60] px-3 py-2 text-[12px] uppercase tracking-[0.12em] text-[#2c2420] transition hover:bg-[#d8b97c]"
      >
        Очистить фильтр
        <span className="ml-1 text-base leading-none">»</span>
      </button>

      <div className="mt-3 text-center text-[12px] text-black/60">
        Найдено: {count}
      </div>
    </aside>
  );
}
