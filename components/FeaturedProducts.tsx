"use client";

import { ApiTopProduct, getTopProducts } from "@/services/top-products";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type UiCard = {
  id: number;
  href: string;
  image: string;
  title: string;
  stone: string;
  country: string;
  price: string;
};

const fallbackItems: UiCard[] = [
  {
    id: 1,
    image: "/images/card.jpg",
    title: "ЛЕСТНИЦА",
    stone: "Мрамор Crema Nuova",
    country: "Турция",
    price: "от 8055 руб./м²",
    href: "/catalog-stone",
  },
  {
    id: 2,
    image: "/images/card.jpg",
    title: "ВАННАЯ КОМНАТА",
    stone: "Мрамор Black Marquina",
    country: "Иран",
    price: "от 15 051 руб./м²",
    href: "/catalog-stone",
  },
  {
    id: 3,
    image: "/images/card.jpg",
    title: "ВАННАЯ КОМНАТА",
    stone: "Мрамор Crema Nuova",
    country: "Турция",
    price: "от 8055 руб./м²",
    href: "/catalog-stone",
  },
  {
    id: 4,
    image: "/images/card.jpg",
    title: "ПОЛЫ",
    stone: "Мрамор SIVEC",
    country: "Греция",
    price: "от 35 941 руб./м²",
    href: "/catalog-stone",
  },
];

function formatRubFromApi(price?: string | null) {
  if (!price) return "Цена: по запросу";
  const n = Number(price);
  if (Number.isNaN(n)) return `от ${price} руб.`;
  return `от ${new Intl.NumberFormat("ru-RU").format(n)} руб.`;
}

// category slugga qarab “Все изделия” qayerga olib borishini belgilash (xohlasangiz o‘zgartiramiz)
function resolveAllLink(items: ApiTopProduct[]) {
  // default
  return "/catalog-stone";
}

export default function FeaturedProducts() {
  const [apiItems, setApiItems] = useState<ApiTopProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const data = await getTopProducts(1);
        if (cancelled) return;
        setApiItems(Array.isArray(data.results) ? data.results : []);
      } catch {
        if (!cancelled) setApiItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const items: UiCard[] = useMemo(() => {
    // API bo‘sh bo‘lsa fallback
    if (!apiItems.length) return fallbackItems;

    return apiItems.map((p) => {
      // ✅ href: sizdagi routingga moslab o‘zgartiring
      const href = `/catalog-stone/${p.subcategory?.slug ?? "item"}/${p.slug}`;

      return {
        id: p.id,
        href,
        image: p.image ?? "/images/card.jpg",
        // title katta harfda chiroyli ko‘rinsin
        title: (p.subcategory?.name ?? p.name ?? "ИЗДЕЛИЕ").toUpperCase(),
        stone: p.name ?? "—",
        country: p.country?.name ?? "—",
        price: formatRubFromApi(p.price),
      };
    });
  }, [apiItems]);

  const allLink = useMemo(() => resolveAllLink(apiItems), [apiItems]);

  return (
    <section className="py-12">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {items.map((item) => (
            <Link
              href={item.href}
              key={item.id}
              className="group flex flex-col items-center text-[#111111] cursor-pointer
                         transition-transform duration-300 ease-out hover:-translate-y-3"
            >
              {/* IMAGE */}
              <div
                className="w-full h-[240px] md:h-[260px] relative overflow-hidden bg-[#111]
                           rounded-sm ring-0 ring-[#d7b06a]/60
                           transition-[transform,box-shadow,ring] duration-300
                           group-hover:shadow-xl group-hover:shadow-black/25 group-hover:ring-[1.5px]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
              </div>

              {/* TITLE */}
              <h3
                className="mt-4 text-center text-[16px] md:text-[18px] uppercase tracking-[0.12em]
                           transition-colors duration-300 group-hover:text-[#d7b06a]"
              >
                {item.title}
              </h3>

              {/* STONE + COUNTRY */}
              {/* <p className="mt-1 text-center leading-tight text-[14px] md:text-[15px] text-[#343434]">
                {item.stone}
                <br />
                <span className="text-[#6b655d]">добыча: {item.country}</span>
              </p> */}

              {/* PRICE */}
              <span
                className="mt-3 inline-block bg-[#d7b06a] px-3.5 py-1.5 text-[13px] md:text-[14px]
                           text-[#3c2f1e] tracking-[0.06em] uppercase
                           transition-colors duration-300 group-hover:bg-[#111111] group-hover:text-[#d7b06a]"
              >
                {item.price}
              </span>
            </Link>
          ))}
        </div>

        {/* BUTTON */}
        <div className="mt-10 flex justify-end">
          <Link
            href={allLink}
            className="group inline-flex items-center gap-2 border border-[#111111] px-5 py-2.5 text-[13px] md:text-[14px]
                       tracking-[0.08em] uppercase
                       hover:bg-[#111111] hover:text-white transition-colors duration-300
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#111111]"
          >
            Все изделия
            <span className="text-lg transform transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* xohlasangiz loading ko‘rsatish */}
        {loading && (
          <div className="mt-3 text-right text-xs text-black/50">Загрузка…</div>
        )}
      </div>
    </section>
  );
}
