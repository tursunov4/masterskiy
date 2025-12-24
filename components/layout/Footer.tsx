"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { getSubcategories, type Subcategory } from "@/services/catalog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchContactInfo } from "@/store/slices/contactSlice";

const STONE_CATEGORY_SLUG = "katalog-kamnya";
const PRODUCT_CATEGORY_SLUG = `katalog-izdelij`;

const Footer = () => {
  const dispatch = useAppDispatch();
  const contact = useAppSelector((s) => s.contact.data);

  useEffect(() => {
    dispatch(fetchContactInfo());
  }, [dispatch]);

  const footerLinkClass =
    "relative inline-flex items-center pb-[2px] " +
    "after:absolute after:left-0 after:-bottom-[1px] after:h-[1px] after:bg-[#d7b06a] after:transition-all after:w-0 " +
    "hover:text-[#d7b06a] hover:after:w-full";

  const stoneFallback = [
    { id: 1, name: "Мрамор", slug: "marble" },
    { id: 2, name: "Гранит", slug: "granite" },
    { id: 3, name: "Травертин", slug: "travertine" },
    { id: 4, name: "Оникс", slug: "onyx" },
    { id: 5, name: "Кварцит", slug: "quartzite" },
  ];

  const productFallback = [
    { id: 1, name: "Полы", slug: "floors" },
    { id: 2, name: "Стены", slug: "walls" },
    { id: 3, name: "Подоконники", slug: "windowsills" },
    { id: 4, name: "Столешницы", slug: "countertops" },
    { id: 5, name: "Лестницы", slug: "stairs" },
    { id: 6, name: "Камины", slug: "fireplaces" },
  ];

  const [stoneLinks, setStoneLinks] =
    useState<Array<{ id: number; name: string; slug: string }>>(stoneFallback);

  const [productLinks, setProductLinks] =
    useState<Array<{ id: number; name: string; slug: string }>>(
      productFallback
    );

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [stone, product] = await Promise.all([
          getSubcategories(STONE_CATEGORY_SLUG),
          getSubcategories(PRODUCT_CATEGORY_SLUG),
        ]);

        if (cancelled) return;

        setStoneLinks(
          (stone ?? []).map((s: Subcategory) => ({
            id: s.id,
            name: s.name,
            slug: s.slug,
          }))
        );

        setProductLinks(
          (product ?? []).map((s: Subcategory) => ({
            id: s.id,
            name: s.name,
            slug: s.slug,
          }))
        );
      } catch {}
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <footer className="bg-[#120f0f] text-[#f5eee5]">
      <section className="relative bg-[url('/images/png/footer.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/35" />

        <div className="container relative">
          <div className="px-4 py-16">
            <div className="flex flex-col gap-14 lg:flex-row lg:gap-20">
              {/* LINKS */}
              <div className="min-w-[180px]">
                <h3 className="mb-4 text-lg tracking-[0.18em] uppercase">
                  О НАС
                </h3>
                <ul className="space-y-2 text-sm">
                  {[
                    { name: "Вопрос-ответ", href: "/our-projects#faq" },
                    { name: "Доставка", href: "/#" },
                    {
                      name: "Полезная информация",
                      href: "/poleznaya-informatsiya",
                    },
                    { name: "Контакты", href: "/contact" },
                  ].map((item, idx) => (
                    <li key={idx}>
                      <Link href={item.href} className={footerLinkClass}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="min-w-[180px]">
                <h3 className="mb-4 text-lg tracking-[0.18em] uppercase">
                  КАТАЛОГ КАМНЯ
                </h3>
                <ul className="space-y-2 text-sm">
                  {stoneLinks.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/catalog-stone/${item.slug}`}
                        className={footerLinkClass}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="min-w-[200px]">
                <h3 className="mb-4 text-lg tracking-[0.18em] uppercase">
                  КАТАЛОГ ИЗДЕЛИЙ
                </h3>
                <ul className="space-y-2 text-sm">
                  {productLinks.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/catalog-product/${item.slug}`}
                        className={footerLinkClass}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* LOGO + INFO (LOGO TOUCHED EMAS) */}
              <div className="flex flex-1 flex-col gap-6 lg:items-end">
                {/* LOGO — TEGILMADI */}
                <Link
                  href="/"
                  className="mb-2 cursor-pointer hover:opacity-90 transition flex items-center gap-4 lg:justify-end"
                >
                  <Image
                    alt="site logo"
                    width={180}
                    height={110}
                    src="/images/svg/logof.svg"
                    className="w-[180px] h-[130px] object-contain"
                  />
                </Link>

                {/* INFO — YANGI DIZAYN */}
                <div className="max-w-[420px] text-sm space-y-2 lg:text-right">
                  <p className="tracking-wide">{contact?.author_name}</p>
                  <p>ИНН: {contact?.inn}</p>

                  <div className="flex gap-2 lg:justify-end items-start">
                    <MapPin className="w-4 h-4 mt-[2px] text-[#d7b06a]" />
                    <span>
                      {contact?.address}
                      <br />
                      {contact?.time_working}
                    </span>
                  </div>

                  <a
                    href={`tel:${contact?.phone?.replace(/\s|\(|\)|-/g, "")}`}
                    className="flex items-center gap-2 lg:justify-end hover:text-[#d7b06a] transition"
                  >
                    <Phone className="w-4 h-4 text-[#d7b06a]" />
                    {contact?.phone}
                  </a>

                  <a
                    href={`mailto:${contact?.email}`}
                    className="flex items-center gap-2 lg:justify-end hover:text-[#d7b06a] transition"
                  >
                    <Mail className="w-4 h-4 text-[#d7b06a]" />
                    {contact?.email}
                  </a>
                </div>
              </div>
            </div>

            {/* COPYRIGHT */}
            <div className="mt-14 border-t border-white/10 pt-5 text-center text-[11px] text-[#c9b9a1]">
              © 2025 МАСТЕРСКАЯ МРАМОРНЫХ ИНТЕРЬЕРОВ. Информация на сайте не
              является публичной офертой. Уточняйте стоимость у менеджера отдела
              продаж.
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
