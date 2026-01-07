export type NavLink = {
  href: string;
  label: string;
  exact?: boolean;
};

export type CategoryLink = {
  name: string;
  href: string;
  icon: string;
};

export const NAV_LINKS: NavLink[] = [
  { href: "/info", label: "О НАС" },
  { href: "/catalog-stone", label: "КАТАЛОГ КАМНЯ" },
  { href: "/our-projects", label: "НАШИ ПРОЕКТЫ" },
  { href: "/contact", label: "КОНТАКТЫ" },
  { href: "/church-art", label: "ЦЕРКОВНОЕ ИСКУССТВО" },
];

export const CATEGORIES: CategoryLink[] = [
  {
    name: "СТОЛЕШНИЦЫ",
    href: "/catalog-product/stoleshnicy",
    icon: "/images/svg/1.svg",
  },
  {
    name: "КАМНИ",
    href: "/catalog-stone/kaminy",
    icon: "/images/svg/2.svg",
  },
  {
    name: "ЛЕСТНИЦЫ",
    href: "/catalog-product/lestnicy",
    icon: "/images/svg/3.svg",
  },
  {
    name: "ПОЛЫ",
    href: "/catalog-product/poly",
    icon: "/images/svg/4.svg",
  },
  {
    name: "СТЕНЫ",
    href: "/catalog-product/steny",
    icon: "/images/svg/5.svg",
  },
  {
    name: "ПОДОКОННИКИ",
    href: "/catalog-product/podokonniki",
    icon: "/images/svg/6.svg",
  },
];

/**
 * Aktiv linkni aniqlash:
 *  - exact = true bo‘lsa faqat to‘liq mos bo‘lganda
 *  - aks holda pathname shu href bilan boshlansa ham active
 */
export const isActivePath = (
  pathname: string,
  href: string,
  exact?: boolean
) => {
  if (exact) return pathname === href;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
};
