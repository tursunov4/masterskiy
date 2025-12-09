export type NavLink = {
  href: string;
  label: string;
  exact?: boolean;
};

export type CategoryLink = {
  name: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { href: "/info", label: "О НАС" },
  { href: "/catalog-stone", label: "КАТАЛОГ КАМНЯ" },
  { href: "/projects", label: "НАШИ ПРОЕКТЫ" },
  { href: "/contact", label: "КОНТАКТЫ" },
  { href: "/church-art", label: "ЦЕРКОВНОЕ ИСКУССТВО" },
];

export const CATEGORIES: CategoryLink[] = [
  {
    name: "КАТАЛОГ ИЗДЕЛИЙ",
    href: "/catalog-product",
  },
  {
    name: "СТОЛЕШНИЦЫ",
    href: "/catalog-product?type=countertops",
  },
  {
    name: "КАМНИ",
    href: "/catalog-stone",
  },
  {
    name: "ЛЕСТНИЦЫ",
    href: "/catalog-product?type=stairs",
  },
  {
    name: "ПОЛЫ",
    href: "/catalog-product?type=floor",
  },
  {
    name: "СТЕНЫ",
    href: "/catalog-product?type=walls",
  },
  {
    name: "ПОДОКОННИКИ",
    href: "/catalog-product?type=sills",
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
