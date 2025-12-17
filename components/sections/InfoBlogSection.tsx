"use client";

import { Paginated } from "@/services/banners";
import { BlogPost, getBlogPostsUrl } from "@/services/blog";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Props = {
  pageSize?: number; // default 9 (3x3)
};

function formatDate(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = d.getFullYear();
  return `${dd}.${mm}.${yy}`;
}

export default function InfoBlogSection({ pageSize = 9 }: Props) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Paginated<BlogPost> | null>(null);
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPages = useMemo(() => {
    const count = data?.count ?? 0;
    return count > 0 ? Math.ceil(count / pageSize) : 0;
  }, [data?.count, pageSize]);

  const showPagination = totalPages > 1;
  const showShowMore = Boolean(data?.next) && (data?.count ?? 0) > pageSize;

  async function load(p: number, mode: "replace" | "append") {
    try {
      setLoading(true);
      setError(null);

      const url = getBlogPostsUrl(p, pageSize);
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`Blog API error: ${res.status}`);
      const json = (await res.json()) as Paginated<BlogPost>;

      setData(json);
      setPage(p);

      if (mode === "replace") setItems(json.results);
      else setItems((prev) => [...prev, ...json.results]);
    } catch (e: any) {
      setError(e?.message ?? "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  }

  async function loadNext() {
    if (!data?.next) return;
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(data.next, { cache: "no-store" });
      if (!res.ok) throw new Error(`Blog API error: ${res.status}`);
      const json = (await res.json()) as Paginated<BlogPost>;

      setData(json);
      setItems((prev) => [...prev, ...json.results]);

      // next url dan page ni taxminan chiqarib olamiz
      // agar topilmasa, shunchaki page+1
      try {
        const u = new URL(json.previous ?? "");
        const prevPage = Number(u.searchParams.get("page") ?? "1");
        setPage(prevPage + 1);
      } catch {
        setPage((p) => p + 1);
      }
    } catch (e: any) {
      setError(e?.message ?? "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(1, "replace");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize]);

  // Pagination ko‘rinishi (1 2 3 … last)
  const pagesToShow = useMemo(() => {
    if (!showPagination) return [];
    const last = totalPages;

    const s = new Set<number>();
    s.add(1);
    s.add(last);

    for (let p = page - 1; p <= page + 1; p++) {
      if (p >= 1 && p <= last) s.add(p);
    }

    return Array.from(s).sort((a, b) => a - b);
  }, [page, totalPages, showPagination]);

  return (
    <>
      {/* ARTICLES GRID */}
      <section className="px-4 pb-10 pt-8">
        {error && (
          <p className="mb-4 text-center text-sm text-red-600">{error}</p>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((post) => {
            const img = post.image ?? "/images/articles/about.jpg";
            const date = formatDate(post.published_at || post.created_at);
            const readTime = ""; // APIda yo‘q — xohlasangiz keyin qo‘shamiz

            return (
              <article
                key={post.id}
                className="border border-black/20 bg-white flex flex-col"
              >
                <div className="relative h-[170px] sm:h-[190px]">
                  <Image
                    src={img}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex justify-between bg-white text-[11px]">
                  <span className="px-2 py-1">{date}</span>
                  <span className="px-2 py-1">{readTime}</span>
                </div>

                <div className="px-2 pb-3 pt-1 text-[12px] leading-snug">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block font-semibold hover:underline"
                  >
                    {post.title}
                  </Link>
                </div>
              </article>
            );
          })}

          {/* Maketdagi bo‘sh kartochkalar (xohlasangiz qoldiramiz) */}
          {items.length > 0 &&
            items.length < 3 &&
            Array.from({ length: 3 - items.length }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="hidden h-[220px] border border-dashed border-black/20 md:block"
              />
            ))}
        </div>

        {items.length === 0 && !loading && !error && (
          <p className="py-6 text-center text-sm text-neutral-600">
            Статей пока нет.
          </p>
        )}
      </section>

      {/* SHOW MORE + PAGINATION */}
      {(showShowMore || showPagination) && (
        <section className="px-4 pb-8">
          {/* SHOW MORE (faqat next bo‘lsa) */}
          {showShowMore && (
            <button
              type="button"
              disabled={loading}
              onClick={loadNext}
              className="w-full bg-[#c79b60] py-2 text-center text-[13px] uppercase tracking-[0.14em] text-[#2c2420] disabled:opacity-60"
            >
              {loading ? "Загрузка..." : "Показать еще"}
            </button>
          )}

          {/* PAGINATION (faqat totalPages>1 bo‘lsa) */}
          {showPagination && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={loading || page <= 1}
                onClick={() => load(page - 1, "replace")}
                className="h-8 w-8 border border-black/40 bg-[#c79b60] text-sm disabled:opacity-50"
              >
                ←
              </button>

              {pagesToShow.map((p, idx) => {
                const prev = pagesToShow[idx - 1];
                const needDots = prev && p - prev > 1;

                return (
                  <span key={p} className="flex items-center gap-2">
                    {needDots && <span className="px-1 text-sm">…</span>}

                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => load(p, "replace")}
                      className={
                        p === page
                          ? "h-8 w-8 border border-black/60 bg-[#666666] text-sm text-white"
                          : "h-8 w-8 border border-black/40 bg-white text-sm hover:bg-[#f3eee5]"
                      }
                    >
                      {p}
                    </button>
                  </span>
                );
              })}

              <button
                type="button"
                disabled={loading || page >= totalPages}
                onClick={() => load(page + 1, "replace")}
                className="h-8 w-8 border border-black/40 bg-[#c79b60] text-sm disabled:opacity-50"
              >
                →
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
}
