"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  getProductByInnerSlugClient,
  ProductDetail,
} from "@/services/product-detail";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function formatRub(price?: string | null) {
  if (!price) return "Цена: по запросу";
  const n = Number(price);
  if (Number.isNaN(n)) return `от ${price} руб.`;
  return `от ${new Intl.NumberFormat("ru-RU").format(n)} руб.`;
}

function uiStyle(style?: string | null) {
  const s = (style ?? "").toLowerCase();
  if (!s) return "—";
  if (s === "classic") return "Классический";
  if (s === "modern") return "Современный";
  if (s === "luxury") return "Роскошный";
  if (s === "vintage") return "Винтаж";
  return style!;
}

export default function ProductInnerClientPage() {
  const params = useParams<{ slug: string; inner_slug: string }>();

  const slug = params?.slug ?? "";
  const innerSlug = params?.inner_slug ?? "";

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!innerSlug) return;
      try {
        setLoading(true);
        setErr(null);

        const data = await getProductByInnerSlugClient(innerSlug);
        if (cancelled) return;

        setProduct(data);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message || "Ошибка загрузки товара");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [innerSlug]);

  const view = useMemo(() => {
    const title = product?.name ?? "Изделие";
    const image = product?.image ?? "/images/png/floor2.png";

    const categoryName = product?.category?.name ?? "Каталог изделий";
    const subName = product?.subcategory?.name ?? slug;

    const color = product?.color?.name ?? "—";
    const country = product?.country?.name ?? "—";
    const price = formatRub(product?.price);

    const mozayka = product?.mozayka_type?.name ?? "нет";

    return {
      title,
      image,
      categoryName,
      subName,
      color,
      country,
      price,
      mozayka,
    };
  }, [product, slug]);

  return (
    <main className="">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Каталог изделий", href: "/catalog-product" },
          { label: view.subName, href: `/catalog-product/${slug}` },
          { label: view.title },
        ]}
      />

      <div className="container">
        <SectionHeader
          title={view.title}
          subtitle="НАШИ ИДЕИ ИЗ НАТУРАЛЬНОГО КАМНЯ ДЛЯ ВАШЕГО ПРОЕКТА"
        />

        <section className="px-4 py-8">
          {/* Error */}
          {err && (
            <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
              {err}
            </div>
          )}

          {/* Loading skeleton (dizayn buzilmaydi) */}
          {loading && !product ? (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
              <div className="h-[240px] sm:h-[280px] md:h-[320px] border border-black/20 bg-black/5 animate-pulse" />
              <div className="h-[240px] border border-black/10 bg-black/5 animate-pulse" />
            </div>
          ) : (
            <>
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                {/* IMAGE */}
                <div className="relative h-[240px] sm:h-[280px] md:h-[320px] border border-black/20">
                  <Image
                    src={view.image}
                    alt={view.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* SPECS */}
                <div className="text-sm leading-relaxed">
                  <div className="space-y-1">
                    <p>
                      <span className="font-semibold">Артикул:</span>{" "}
                      {product?.id ?? "—"}
                    </p>

                    <p>
                      <span className="font-semibold">Основной материал:</span>{" "}
                      <span className="bg-[#c79b60] px-1">
                        {product?.subcategory?.name ?? "—"}
                      </span>
                    </p>

                    <p>
                      <span className="font-semibold">Цвет:</span> {view.color}
                    </p>

                    <p>
                      <span className="font-semibold">Месторождение:</span>{" "}
                      {view.country}
                    </p>

                    <p>
                      <span className="font-semibold">Цена:</span> {view.price}
                    </p>

                    <p>
                      <span className="font-semibold">Зеркальный рисунок:</span>{" "}
                      —
                    </p>

                    <p>
                      <span className="font-semibold">
                        Работает на просвет:
                      </span>{" "}
                      —
                    </p>
                  </div>

                  <div className="mt-4 space-y-1">
                    <p>
                      <span className="font-semibold">
                        Дополнительный материал:
                      </span>{" "}
                      —
                    </p>

                    <p>
                      <span className="font-semibold">Стиль:</span>{" "}
                      {uiStyle(product?.style)}
                    </p>

                    <p>
                      <span className="font-semibold">Мозаичные элементы:</span>{" "}
                      {view.mozayka}
                    </p>
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              {product?.description ? (
                <div className="mt-8 space-y-4 text-sm leading-relaxed">
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              ) : null}

              {/* CTA LINKS */}
              <div className="mt-6 space-y-2 text-sm uppercase tracking-[0.08em]">
                <Link href="/consult" className="block hover:underline">
                  [ОСТАВИТЬ ЗАЯВКУ НА КОНСУЛЬТАЦИЮ]
                </Link>
                <Link href="/measure" className="block hover:underline">
                  [ЗАКАЗАТЬ ВЫЕЗД ЗАМЕРЩИКА]
                </Link>
                <Link href="/design" className="block hover:underline">
                  [ПОЛУЧИТЬ БЕСПЛАТНЫЙ ДИЗАЙН-ПРОЕКТ]
                </Link>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
