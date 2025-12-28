"use client";

import Link from "next/link";
import { SquareDashedBottomCode } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CATEGORIES as STATIC_CATEGORIES, isActivePath } from "./navConfig";
import { getSubcategories, type Subcategory } from "@/services/catalog";

type CategoriesStripProps = {
  pathname: string;
};

const PRODUCT_CATEGORY_SLUG = `katalog-izdelij`;

type CategoryLink = {
  name: string;
  href: string;
};

const CategoriesStrip: React.FC<CategoriesStripProps> = ({ pathname }) => {
  const [productSubs, setProductSubs] = useState<Subcategory[]>([]);

  useEffect(() => {
    let cancelled = false;

    getSubcategories(PRODUCT_CATEGORY_SLUG)
      .then((data) => {
        if (!cancelled) setProductSubs(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setProductSubs([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const categories: CategoryLink[] = useMemo(() => {
    const catalogProduct = STATIC_CATEGORIES.find(
      (c) => c.href === "/catalog-product"
    );

    const subLinks: CategoryLink[] = productSubs.map((s) => ({
      name: s.name,
      href: `/catalog-product/${s.slug}`,
    }));

    const result: CategoryLink[] = [];
    if (catalogProduct) result.push(catalogProduct);
    result.push(...subLinks);

    return result;
  }, [productSubs]);

  const catClass = (href: string) => {
    const active = isActivePath(pathname, href);
    return [
      "flex items-center gap-2 px-3 md:px-4  py-[12px]",
      "text-[11px] md:text-[12px] hover:bg-[#c0a57c]  uppercase tracking-[0.07em] whitespace-nowrap flex-shrink-0",
      "transition-colors",
      active
        ? "text-[#111111] font-medium"
        : "text-[#474541] hover:text-[#111111]",
    ].join(" ");
  };

  const circleClass = (href: string) => {
    const active = isActivePath(pathname, href);
    return [
      "flex h-7 w-7 items-center justify-center rounded-full",
      active
        ? "bg-[#111111]"
        : "bg-[#d6aa6d] group-hover:bg-[#111111] transition-colors",
    ].join(" ");
  };

  const iconColor = (href: string) =>
    isActivePath(pathname, href) ? "#f6f2ea" : "#111111";

  return (
    <div className="bg-[#f5f5f5] hidden lg:block">
      <div className="container">
        <div className=" flex  items-stretch gap-2.5">
          <ul className="flex-1 flex items-center gap-2 overflow-x-auto">
            <li>
              <Link
                href="/catalog-product"
                className={
                  "text-[11px] my-[5px] hover:bg-[#9E8968] flex bg-[#c0a57c] px-3 md:px-4 py-1 min-w-[220px] items-center gap-2 md:text-[12px] uppercase tracking-[0.07em] whitespace-nowrap flex-shrink-0"
                }
              >
                <span className={circleClass("/catalog-product")}>
                  <SquareDashedBottomCode
                    className="w-4 h-4"
                    color={iconColor("/catalog-product")}
                  />
                </span>
                <span>КАТАЛОГ ИЗДЕЛИЙ</span>
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.name} className="group">
                <Link href={cat.href} className={catClass(cat.href)}>
                  <span className={circleClass(cat.href)}>
                    <SquareDashedBottomCode
                      className="w-4 h-4"
                      color={iconColor(cat.href)}
                    />
                  </span>
                  <span>{cat.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoriesStrip;
