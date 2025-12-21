"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Menu, Phone, X } from "lucide-react";
import { NAV_LINKS, isActivePath } from "./navConfig";
import { useAppSelector } from "@/store/hooks";
import { apiFetch } from "@/lib/api";

type HeaderTopBarProps = {
  pathname: string;
  onOpenMobileMenu: () => void;
};

type ApiList<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

type ApiProduct = {
  id: number;
  name: string;
  slug: string;
  image?: string | null;
  price?: string | null;
  category?: { id: number; name: string; slug: string; image?: string | null };
  subcategory?: {
    id: number;
    name: string;
    slug: string;
    image?: string | null;
  };
};

function productHref(p: ApiProduct) {
  const cat = p.category?.slug ?? "";
  const sub = p.subcategory?.slug ?? "item";
  const slug = p.slug ?? "item";

  if (cat === "katalog-izdelij") return `/catalog-product/${sub}/${slug}`;
  if (cat === "katalog-kamnya") return `/catalog-stone/${sub}/${slug}`;
  if (cat === "cerkovnoe-iskusstvo") return `/church-art/${sub}/${slug}`;

  return `/product/${slug}`;
}

const HeaderTopBar: React.FC<HeaderTopBarProps> = ({
  pathname,
  onOpenMobileMenu,
}) => {
  const router = useRouter();
  const contact = useAppSelector((s) => s.contact.data);

  const phoneClean = contact?.phone
    ? contact.phone.replace(/\s|\(|\)|-/g, "")
    : "";

  const navLinkClass = (href: string) => {
    const active = isActivePath(pathname, href);
    return [
      "relative pb-[2px]",
      "text-[11px] md:text-[12px] leading-[1.2] tracking-[0.12em] uppercase",
      "after:absolute after:left-0 after:-bottom-[1px] after:h-[1px] after:bg-[#d0aa6a] after:transition-all",
      active
        ? "text-[#d0aa6a] after:w-full"
        : "text-[#f6f2ea] after:w-0 hover:text-[#d0aa6a] hover:after:w-full",
    ].join(" ");
  };

  // --- SEARCH STATE ---
  const [q, setQ] = useState("");
  const [items, setItems] = useState<ApiProduct[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const boxRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const canSearch = useMemo(() => q.trim().length >= 2, [q]);

  // close on outside click
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // debounce search
  useEffect(() => {
    setErr(null);

    if (!canSearch) {
      setItems([]);
      setOpen(false);
      if (abortRef.current) abortRef.current.abort();
      return;
    }

    if (timerRef.current) window.clearTimeout(timerRef.current);

    timerRef.current = window.setTimeout(async () => {
      try {
        setLoading(true);
        setOpen(true);

        // abort previous
        if (abortRef.current) abortRef.current.abort();
        abortRef.current = new AbortController();

        const data = await apiFetch<ApiList<ApiProduct>>(
          `/api/catalog/products/?search=${encodeURIComponent(q.trim())}`,
          { signal: abortRef.current.signal }
        );

        setItems(data?.results ?? []);
      } catch (e: any) {
        if (e?.name === "AbortError") return;
        setErr("Ошибка поиска");
        setItems([]);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [q, canSearch]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const s = q.trim();
    if (!s) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(s)}`);
  };

  const onPick = (p: ApiProduct) => {
    setOpen(false);
    router.push(productHref(p));
  };

  const clear = () => {
    setQ("");
    setItems([]);
    setOpen(false);
    setErr(null);
  };

  return (
    <div className="bg-[#111111] text-[#f6f2ea]">
      <div className="container">
        <div className="py-2.5 flex items-stretch gap-4 md:gap-6">
          {/* LOGO */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src="/images/svg/logo.svg"
              alt="site logo"
              width={250}
              height={60}
              className="w-[110px] h-[40px] md:w-[250px] md:h-[60px] object-contain"
            />
          </Link>

          {/* DESKTOP */}
          <div className="hidden md:flex flex-1 gap-6">
            {/* NAV + SEARCH */}
            <div className="flex flex-col flex-1 justify-between">
              <nav className="flex items-center gap-5">
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={navLinkClass(item.href)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* SEARCH */}
              <div ref={boxRef} className="relative">
                <form
                  className="flex border border-[#d6aa6d] h-[34px]"
                  onSubmit={onSubmit}
                >
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    onFocus={() => {
                      if (q.trim().length >= 2) setOpen(true);
                    }}
                    placeholder="Поиск"
                    className="flex-1 bg-[#111] px-3 text-[12px] text-[#f6f2ea] outline-none"
                  />

                  {q.trim().length > 0 && (
                    <button
                      type="button"
                      onClick={clear}
                      className="bg-[#111] px-2 border-l border-[#2a2a2a]"
                      aria-label="clear"
                      title="clear"
                    >
                      <X className="w-4 h-4 text-[#f6f2ea]" />
                    </button>
                  )}

                  <button
                    type="submit"
                    className="bg-[#c79b60] px-4"
                    aria-label="search"
                  >
                    <Search className="w-4 h-4 text-[#231f20]" />
                  </button>
                </form>

                {/* DROPDOWN */}
                {open && (
                  <div className="absolute left-0 right-0 mt-1 border border-[#2a2a2a] bg-[#111] shadow-lg z-50">
                    <div className="max-h-[340px] overflow-auto">
                      {loading && (
                        <div className="px-3 py-2 text-[12px] text-[#cfc8bb]">
                          Загрузка...
                        </div>
                      )}

                      {!loading && err && (
                        <div className="px-3 py-2 text-[12px] text-[#cfc8bb]">
                          {err}
                        </div>
                      )}

                      {!loading && !err && items.length === 0 && (
                        <div className="px-3 py-2 text-[12px] text-[#cfc8bb]">
                          Ничего не найдено
                        </div>
                      )}

                      {!loading &&
                        !err &&
                        items.map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => onPick(p)}
                            className="w-full text-left px-3 py-2 hover:bg-[#151515] flex items-center gap-3"
                          >
                            <div className="w-9 h-9 flex-shrink-0 bg-[#0f0f0f] border border-[#2a2a2a] overflow-hidden">
                              {p.image ? (
                                <Image
                                  src={p.image}
                                  alt={p.name}
                                  width={36}
                                  height={36}
                                  className="w-9 h-9 object-cover"
                                />
                              ) : null}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="text-[12px] text-[#f6f2ea] truncate">
                                {p.name}
                              </div>
                              <div className="text-[11px] text-[#cfc8bb] truncate">
                                {p.category?.name ?? ""}
                                {p.subcategory?.name
                                  ? ` / ${p.subcategory.name}`
                                  : ""}
                              </div>
                            </div>

                            {p.price ? (
                              <div className="text-[12px] text-[#d0aa6a] whitespace-nowrap">
                                {p.price}
                              </div>
                            ) : null}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end justify-between min-w-[210px]">
              <div className="text-right">
                {contact?.phone && (
                  <a
                    href={`tel:${phoneClean}`}
                    className="block text-[15px] font-medium"
                  >
                    {contact.phone}
                  </a>
                )}

                {contact?.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="block text-[13px]"
                  >
                    {contact.email}
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2.5 mt-1.5">
                {contact?.email && (
                  <a href={`mailto:${contact.email}`} className="icon-btn">
                    <Image
                      alt="email"
                      width={16}
                      height={16}
                      src="/images/svg/email.svg"
                      className="w-5 h-5"
                    />
                  </a>
                )}

                {contact?.whatsapp && (
                  <a
                    href={contact.whatsapp}
                    target="_blank"
                    className="icon-btn"
                  >
                    <Image
                      alt="wh"
                      width={16}
                      height={16}
                      src="/images/svg/wh.svg"
                      className="w-5 h-5"
                    />
                  </a>
                )}
                {/* "test" */}
                {contact?.telegram && (
                  <a
                    href={contact.telegram}
                    target="_blank"
                    className="icon-btn"
                  >
                    <Image
                      alt="telegram"
                      width={16}
                      height={16}
                      src="/images/svg/tg.svg"
                      className="w-5 h-5"
                    />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* MOBILE */}
          <div className="ml-auto flex md:hidden items-center gap-2">
            {contact?.phone && (
              <a
                href={`tel:${phoneClean}`}
                className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-[#3a3a3a]"
              >
                <Phone className="w-4 h-4 text-[#c79b60]" />
                Позвонить
              </a>
            )}

            <button
              onClick={onOpenMobileMenu}
              className="inline-flex h-9 w-9 items-center justify-center rounded border border-[#3a3a3a]"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTopBar;
