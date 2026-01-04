"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import MarbleIdeaSection from "@/components/sections/MarbleIdeaSection";
import SectionHeader from "@/components/ui/SectionHeader";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  type ApiColor,
  type ApiProductListItem,
  getColors,
  getProductsBySubcategory,
} from "@/lib/catalog/api";
import PaginationControls from "../ui/PaginationControls";

/** API color.name -> hex (dizayn uchun) */
function colorNameToHex(name?: string) {
  const n = (name ?? "").toLowerCase();
  const map: Record<string, string> = {
    white: "#ffffff",
    beige: "#f2ead8",
    "warm-gray": "#c0a88b",
    brown: "#8c5235",
    black: "#000000",
    green: "#3a8b4c",
    magenta: "#bb4aa5",
    turquoise: "#3b8b9f",
    blue: "#35538b",
    red: "#b6423f",
    gray: "#8a8b8d",
    grey: "#8a8b8d",
  };
  return map[n] ?? "#e7e1d8";
}

import { formatPriceForCard } from "@/lib/utils";

export default function CatalogStoneSlugClient({ slug }: { slug: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const activeColorId = useMemo(() => {
    const raw = sp.get("color");
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  }, [sp]);

  // colors
  const [colors, setColors] = useState<ApiColor[]>([]);
  const [colorsLoading, setColorsLoading] = useState(false);

  // products
  const [items, setItems] = useState<ApiProductListItem[]>([]);
  const [count, setCount] = useState(0);

  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // colors load 1 marta
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setColorsLoading(true);
        const data = await getColors();
        if (cancelled) return;
        setColors(data.results ?? []);
      } catch {
        // ranglar chiqmasa ham page ishlayveradi
      } finally {
        if (!cancelled) setColorsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // products load: slug yoki color o‘zgarsa -> 1 page
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setErr(null);
        setPage(1);

        const data = await getProductsBySubcategory({
          subcategorySlug: slug,
          page: 1,
          colorId: activeColorId,
        });

        if (cancelled) return;

        setItems(data.results ?? []);
        setCount(data.count ?? 0);
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
  }, [slug, activeColorId]);

  // product kam bo‘lsa controls yashirin
  const showControls = !(!hasNext && !hasPrev);

  const setColorInUrl = (colorId: number | null) => {
    const next = new URLSearchParams(sp.toString());
    if (!colorId) next.delete("color");
    else next.set("color", String(colorId));
    router.push(`${pathname}?${next.toString()}`.replace(/\?$/, ""));
  };

  const loadMore = async () => {
    if (!hasNext || loading) return;
    try {
      setLoading(true);
      setErr(null);

      const nextPage = page + 1;
      const data = await getProductsBySubcategory({
        subcategorySlug: slug,
        page: nextPage,
        colorId: activeColorId,
      });

      setItems((prev) => [...prev, ...(data.results ?? [])]);
      setCount(data.count ?? 0);
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
      const data = await getProductsBySubcategory({
        subcategorySlug: slug,
        page: prevPage,
        colorId: activeColorId,
      });

      setItems(data.results ?? []);
      setCount(data.count ?? 0);
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
      const data = await getProductsBySubcategory({
        subcategorySlug: slug,
        page: nextPage,
        colorId: activeColorId,
      });

      setItems(data.results ?? []);
      setCount(data.count ?? 0);
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
    <main>
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Каталог камня", href: "/catalog-stone" },
          { label: slug },
        ]}
      />

      <div className="container">
        <SectionHeader
          title={slug.toUpperCase()}
          subtitle="НАШИ РАСЦВЕТКИ НАТУРАЛЬНОГО КАМНЯ ДЛЯ ВАШЕГО ПРОЕКТА"
        />

        <div className="py-8">
          <div className="flex flex-col gap-8 items-start lg:flex-row">
            {/* FILTER PANEL */}
            <aside className="w-full bg-[#f5f3ee] px-4 py-5 text-sm lg:w-[240px]">
              <p className="mb-4 text-center text-[13px]">Основной цвет</p>

              <div className="mb-4 grid grid-cols-5 gap-[1px] border border-black/30 bg-black">
                {/* ALL */}
                <button
                  type="button"
                  onClick={() => setColorInUrl(null)}
                  className={`h-8 border-[2px] transition-all ${
                    !activeColorId ? "border-[#c79b60]" : "border-transparent"
                  }`}
                  title="Все"
                  style={{
                    background:
                      "linear-gradient(135deg,#fff 0%,#ddd 30%,#999 60%,#000 100%)",
                  }}
                />

                {colors.map((c) => {
                  const isActive = activeColorId === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setColorInUrl(isActive ? null : c.id)}
                      className={`h-8 border-[2px] transition-all ${
                        isActive ? "border-[#c79b60]" : "border-transparent"
                      }`}
                      title={c.name}
                      style={{ backgroundColor: colorNameToHex(c.name) }}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setColorInUrl(null)}
                className="mt-2 flex w-full items-center justify-center gap-2 bg-[#c79b60] px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-[#2c2420] transition hover:bg-[#d8b976]"
              >
                Очистить фильтр{" "}
                <span className="text-base leading-none">»</span>
              </button>

              <div className="mt-3 text-center text-[12px] text-black/60">
                {colorsLoading ? "Загрузка цветов..." : `Найдено: ${count}`}
              </div>
            </aside>

            {/* GRID */}
            <section className="flex-1">
              {err && (
                <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                  {err}
                </div>
              )}

              <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
                {items.map((item) => (
                  <Link
                    href={`/catalog-stone/${slug}/${item.slug ?? item.id}`}
                    key={item.id}
                    className="group overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#c79b60] hover:shadow-[0_14px_30px_rgba(0,0,0,0.25)]"
                  >
                    <div className="relative h-[210px] sm:h-[230px] lg:h-[250px]">
                      <Image
                        src={item.image ?? "/images/png/mramr2.png"}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-[13px]">
                      <span className="font-serif">{item.name}</span>
                      <span className="bg-[#c79b60] px-2 py-1 text-[11px] text-[#2c2420] transition-colors group-hover:bg-[#d8b976]">
                        {formatPriceForCard(item.price)}
                      </span>
                    </div>
                  </Link>
                ))}

                {!loading && items.length === 0 && (
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
            </section>
          </div>
        </div>
      </div>

      <MarbleIdeaSection />
    </main>
  );
}
