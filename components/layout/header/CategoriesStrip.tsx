"use client";

import Link from "next/link";
import { SquareDashedBottomCode } from "lucide-react";
import { CATEGORIES, isActivePath } from "./navConfig";

type CategoriesStripProps = {
  pathname: string;
};

const CategoriesStrip: React.FC<CategoriesStripProps> = ({ pathname }) => {
  const catClass = (href: string) => {
    const active = isActivePath(pathname, href);
    return [
      "flex items-center gap-2 px-3 md:px-4 py-[6px]",
      "text-[11px] md:text-[12px] uppercase tracking-[0.07em] whitespace-nowrap flex-shrink-0",
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
        : "bg-[#c79b60] group-hover:bg-[#111111] transition-colors",
    ].join(" ");
  };

  const iconColor = (href: string) =>
    isActivePath(pathname, href) ? "#f6f2ea" : "#111111";

  return (
    <div className="bg-[#f3f0ea] hidden lg:block">
      <div className="container">
        <div className="py-2.5 flex items-stretch gap-2.5">
          <ul className="flex-1 flex items-center gap-2 overflow-x-auto">
            {CATEGORIES.map((cat) => (
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
