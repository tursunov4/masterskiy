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
  type ApiMozaykaType,
  type ApiProductListItem,
  getColors,
  getMozaykaTypes,
  getProductsBySubcategory,
} from "@/lib/catalog/api";

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

function formatPriceRub(price?: string | null) {
  if (!price) return "";
  const n = Number(price);
  if (Number.isNaN(n)) return price;
  return new Intl.NumberFormat("ru-RU").format(n);
}

export default function CatalogProductSlugClient({ slug }: { slug: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const activeColorId = useMemo(() => {
    const raw = sp.get("color");
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  }, [sp]);

  const activeMozaykaTypeId = useMemo(() => {
    const raw = sp.get("mozayka_type");
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  }, [sp]);

  // colors
  const [colors, setColors] = useState<ApiColor[]>([]);
  const [colorsLoading, setColorsLoading] = useState(false);

  // mozayka types
  const [mozaykaTypes, setMozaykaTypes] = useState<ApiMozaykaType[]>([]);
  const [mozaykaLoading, setMozaykaLoading] = useState(false);

  // products
  const [items, setItems] = useState<ApiProductListItem[]>([]);
  const [count, setCount] = useState(0);

  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // load colors + mozayka types (1 marta)
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setColorsLoading(true);
        const data = await getColors();
        if (!cancelled) setColors(data.results ?? []);
      } catch {
      } finally {
        if (!cancelled) setColorsLoading(false);
      }
    })();

    (async () => {
      try {
        setMozaykaLoading(true);
        const data = await getMozaykaTypes();
        if (!cancelled) setMozaykaTypes(data.results ?? []);
      } catch {
      } finally {
        if (!cancelled) setMozaykaLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // load products (slug/color/mozayka o‘zgarsa -> 1 page)
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
          mozaykaTypeId: activeMozaykaTypeId,
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
  }, [slug, activeColorId, activeMozaykaTypeId]);

  // product kam bo‘lsa controls yashirin
  const showControls = !(!hasNext && !hasPrev);

  const pushParams = (patch: {
    colorId?: number | null;
    mozaykaTypeId?: number | null;
  }) => {
    const next = new URLSearchParams(sp.toString());

    if ("colorId" in patch) {
      if (!patch.colorId) next.delete("color");
      else next.set("color", String(patch.colorId));
    }

    if ("mozaykaTypeId" in patch) {
      if (!patch.mozaykaTypeId) next.delete("mozayka_type");
      else next.set("mozayka_type", String(patch.mozaykaTypeId));
    }

    router.push(`${pathname}?${next.toString()}`.replace(/\?$/, ""));
  };

  const clearFilters = () => pushParams({ colorId: null, mozaykaTypeId: null });

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
        mozaykaTypeId: activeMozaykaTypeId,
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
        mozaykaTypeId: activeMozaykaTypeId,
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
        mozaykaTypeId: activeMozaykaTypeId,
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
          { label: "Каталог изделий", href: "/catalog-product" },
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
            <aside className="w-full bg-[#f5f3ee] px-4 py-5 text-sm lg:w-[240px]">
              <p className="mb-4 text-center text-[13px]">Основной цвет</p>

              <div className="mb-4 grid grid-cols-5 gap-[1px] border border-black/30 bg-black">
                <button
                  type="button"
                  onClick={() => pushParams({ colorId: null })}
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
                      onClick={() =>
                        pushParams({ colorId: isActive ? null : c.id })
                      }
                      className={`h-8 border-[2px] transition-all ${
                        isActive ? "border-[#c79b60]" : "border-transparent"
                      }`}
                      title={c.name}
                      style={{ backgroundColor: colorNameToHex(c.name) }}
                    />
                  );
                })}
              </div>

              <div className="mt-6 border-t border-black/20 pt-4">
                <p className="mb-3 text-center text-[13px]">Тип мозаики</p>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => pushParams({ mozaykaTypeId: null })}
                    className={`w-full border px-3 py-2 text-[12px] uppercase tracking-[0.12em] transition ${
                      !activeMozaykaTypeId
                        ? "bg-[#c79b60] text-[#2c2420] border-black/30"
                        : "bg-white hover:bg-[#f3eee5] border-black/20"
                    }`}
                  >
                    Все
                  </button>

                  {mozaykaTypes.map((m) => {
                    const active = activeMozaykaTypeId === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() =>
                          pushParams({ mozaykaTypeId: active ? null : m.id })
                        }
                        className={`w-full border px-3 py-2 text-[12px] uppercase tracking-[0.12em] transition ${
                          active
                            ? "bg-[#c79b60] text-[#2c2420] border-black/30"
                            : "bg-white hover:bg-[#f3eee5] border-black/20"
                        }`}
                      >
                        {m.name}
                      </button>
                    );
                  })}

                  {(mozaykaLoading || colorsLoading) && (
                    <p className="text-center text-[12px] text-black/50">
                      Загрузка фильтров...
                    </p>
                  )}
                </div>
              </div>

              {/* CLEAR */}
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 flex w-full items-center justify-center gap-2 bg-[#c79b60] px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-[#2c2420] transition hover:bg-[#d8b976]"
              >
                Очистить фильтр{" "}
                <span className="text-base leading-none">»</span>
              </button>

              <div className="mt-3 text-center text-[12px] text-black/60">
                Найдено: {count}
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
                    href={`/catalog-product/${slug}/${item.slug ?? item.id}`}
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
                        {item.price
                          ? `Цена: ${formatPriceRub(item.price)} руб.`
                          : "Цена: —"}
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

              {/* SHOW MORE (faqat hasNext bo‘lsa) */}
              {showControls && hasNext && (
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className={`mt-8 flex w-full items-center justify-center py-2 text-[13px] uppercase tracking-[0.14em] transition
                    ${
                      loading
                        ? "bg-black/10 text-black/40 cursor-not-allowed"
                        : "bg-[#c79b60] text-[#2c2420] hover:bg-[#d8b976]"
                    }`}
                >
                  {loading ? "Загрузка..." : "Показать еще"}
                </button>
              )}

              {/* PAGINATION (faqat ko‘p sahifa bo‘lsa) */}
              {showControls && (
                <div className="mt-5 flex items-center justify-center gap-2 pb-2">
                  <button
                    onClick={goPrev}
                    disabled={!hasPrev || loading}
                    className={`flex h-9 w-9 items-center justify-center rounded-[6px] border text-sm
                      ${
                        !hasPrev || loading
                          ? "border-black/20 bg-black/5 text-black/30 cursor-not-allowed"
                          : "border-black/40 bg-[#c79b60] text-[#2c2420] hover:bg-[#d8b976]"
                      }`}
                  >
                    ←
                  </button>

                  <span className="px-2 text-sm text-black/70">{page}</span>

                  <button
                    onClick={goNext}
                    disabled={!hasNext || loading}
                    className={`flex h-9 w-9 items-center justify-center rounded-[6px] border text-sm
                      ${
                        !hasNext || loading
                          ? "border-black/20 bg-black/5 text-black/30 cursor-not-allowed"
                          : "border-black/40 bg-[#c79b60] text-[#2c2420] hover:bg-[#d8b976]"
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

      <MarbleIdeaSection />
    </main>
  );
}
