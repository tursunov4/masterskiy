"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Menu,
  X,
  Phone,
  Mail,
  Send,
  MessageCircle,
  Globe2,
  Grid2X2,
  SquareDashedBottomCode,
} from "lucide-react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "О НАС" },
  { href: "/", label: "КАТАЛОГ КАМНЯ" },
  { href: "/", label: "НАШИ ПРОЕКТЫ" },
  { href: "/", label: "КОНТАКТЫ" },
];

const CATEGORIES = [
  "СТОЛЕШНИЦЫ",
  "КАМИНЫ",
  "ЛЕСТНИЦЫ",
  "ПОЛЫ",
  "СТЕНЫ",
  "ПОДОКОННИКИ",
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isChurchActive = isHome;
  const isCatalogActive = isHome;

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="w-full relative z-40">
      {/* TOP BAR */}
      <div className="bg-[#111111] text-[#f6f2ea]">
        <div className="container">
          <div className="py-2.5 flex items-stretch gap-4 md:gap-6">
            {/* LOGO + TEXT */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center justify-center"
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/images/svg/logo.svg"
                  alt="site logo"
                  width={70}
                  height={200}
                  className="w-[44px] h-[150px] md:w-[240px] md:h-[70px] object-contain"
                />
              </div>
            </Link>

            {/* CENTER + RIGHT – md+ */}
            <div className="hidden md:flex flex-1 items-stretch gap-4 md:gap-6">
              {/* CENTER: NAV + SEARCH */}
              <div className="flex flex-col flex-1 gap-1.5 justify-between">
                {/* NAV LINKS */}
                <nav className="flex items-center gap-5 text-[11px] md:text-[12px] leading-[1.2] tracking-[0.12em] uppercase">
                  {NAV_LINKS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="relative pb-[2px] hover:text-[#d0aa6a] transition-colors after:absolute after:left-0 after:-bottom-[1px] after:h-[1px] after:w-0 after:bg-[#d0aa6a] hover:after:w-full after:transition-all"
                    >
                      {item.label}
                    </Link>
                  ))}

                  {/* ЦЕРКОВНОЕ ИСКУССТВО – active / default */}
                  <Link
                    href="/"
                    className={`ml-4 px-4 py-[5px] text-[11px] md:text-[12px] tracking-[0.12em] uppercase transition-colors border border-[#c79b60] ${
                      isChurchActive
                        ? "bg-[#c79b60] text-[#231f20]"
                        : "bg-transparent text-[#f6f2ea] hover:bg-[#c79b60] hover:text-[#231f20]"
                    }`}
                  >
                    ЦЕРКОВНОЕ ИСКУССТВО
                  </Link>
                </nav>

                {/* SEARCH */}
                <form
                  className="mt-0.5 flex items-stretch border border-[#c79b60] h-[34px] max-w-full"
                  role="search"
                >
                  <input
                    type="text"
                    placeholder="Поиск"
                    className="flex-1 bg-[#111111] px-3 text-[12px] md:text-[13px] text-[#f6f2ea] placeholder:text-[#b9b4a9] outline-none border-none"
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center bg-[#c79b60] px-3 md:px-4 hover:bg-[#d3a96e] transition-colors"
                  >
                    <Search className="w-4 h-4 text-[#231f20]" />
                  </button>
                </form>
              </div>

              {/* RIGHT: CONTACTS */}
              <div className="flex flex-col items-end justify-between min-w-[210px]">
                <div className="flex flex-col items-end gap-[1px]">
                  <a
                    href="tel:+79040395226"
                    className="text-[14px] md:text-[15px] font-medium whitespace-nowrap"
                  >
                    +7 904 039 52 26
                  </a>
                  <a
                    href="mailto:info@marble-moscow.ru"
                    className="text-[12px] md:text-[13px] whitespace-nowrap"
                  >
                    info@marble-moscow.ru
                  </a>
                </div>

                <div className="flex items-center gap-2.5 mt-1.5">
                  {[Mail, MessageCircle, Send, Globe2].map((Icon, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-[#c79b60] hover:bg-[#c79b60] hover:text-[#111111] transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* MOBILE BURGER */}
            <div className="ml-auto flex md:hidden items-center">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded border border-[#3a3a3a]"
              >
                <Menu className="w-5 h-5 text-[#f6f2ea]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORIES STRIP */}
      <div className="bg-[#f3f0ea]">
        <div className="container">
          <div className="py-2.5 flex flex-col lg:flex-row items-stretch gap-2.5">
            {/* КАТАЛОГ ИЗДЕЛИЙ – active / default */}
            <button
              className={`inline-flex items-center gap-2.5 px-4 md:px-5 py-[6px] text-[11px] md:text-[12px] uppercase tracking-[0.08em] w-full lg:w-auto transition-colors border border-[#c79b60] ${
                isCatalogActive
                  ? "bg-[#c79b60] text-[#231f20]"
                  : "bg-transparent text-[#231f20] hover:bg-[#c79b60]"
              }`}
            >
              <span
                className={`p-1.5 flex items-center justify-center ${
                  isCatalogActive ? "bg-[#f3f0ea]" : "bg-transparent"
                }`}
              >
                <Grid2X2 className="w-4 h-4" />
              </span>
              <span>КАТАЛОГ ИЗДЕЛИЙ</span>
            </button>

            {/* CATEGORIES LIST */}
            <ul className="flex-1 flex items-center gap-2 overflow-x-auto">
              {CATEGORIES.map((cat) => (
                <li
                  key={cat}
                  className="flex items-center gap-2 bg-[#f3f0ea] px-3 md:px-4 py-[6px] text-[11px] md:text-[12px] uppercase tracking-[0.07em] whitespace-nowrap flex-shrink-0 hover:text-[#111111] transition-colors"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c79b60]">
                    <SquareDashedBottomCode className="w-4 h-4 text-[#111111]" />
                  </span>
                  <span>{cat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-[#111111] text-[#f6f2ea]">
          <div className="container py-4 flex flex-col gap-4 h-full">
            {/* TOP ROW: logo + close */}
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/logo.jpg"
                    alt="site logo"
                    width={60}
                    height={60}
                    className="w-[50px] h-[50px] object-contain"
                  />
                  <div className="leading-tight text-left">
                    <div className="text-[16px] tracking-[0.3em] uppercase text-[#e3e2dd]">
                      МАСТЕРСКАЯ
                    </div>
                    <div className="mt-[2px] text-[8px] tracking-[0.3em] uppercase text-[#cbc7bf]">
                      ■ МРАМОРНЫХ ИНТЕРЬЕРОВ ■
                    </div>
                  </div>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded border border-[#3a3a3a]"
              >
                <X className="w-5 h-5 text-[#f6f2ea]" />
              </button>
            </div>

            {/* NAV LINKS */}
            <nav className="mt-3 flex flex-col gap-1.5 text-[12px] tracking-[0.12em] uppercase">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 border-b border-[#2a2a2a] last:border-b-0 hover:text-[#d0aa6a] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex justify-center bg-[#c79b60] text-[#231f20] px-3 py-2 tracking-[0.12em] text-[12px] uppercase hover:bg-[#d3a96e] transition-colors"
              >
                ЦЕРКОВНОЕ ИСКУССТВО
              </Link>
            </nav>

            {/* SEARCH */}
            <form
              className="mt-4 flex items-stretch border border-[#c79b60] h-10 w-full"
              role="search"
            >
              <input
                type="text"
                placeholder="Поиск"
                className="flex-1 bg-[#111111] px-3 text-sm text-[#f6f2ea] placeholder:text-[#b9b4a9] outline-none border-none"
              />
              <button
                type="submit"
                className="flex items-center justify-center bg-[#c79b60] px-4 hover:bg-[#d3a96e] transition-colors"
              >
                <Search className="w-4 h-4 text-[#231f20]" />
              </button>
            </form>

            {/* CONTACTS + SOCIAL */}
            <div className="mt-4 flex flex-col gap-2 text-[13px]">
              <a
                href="tel:+79040395226"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Phone className="w-4 h-4 text-[#c79b60]" />
                +7 904 039 52 26
              </a>
              <a
                href="mailto:info@marble-moscow.ru"
                className="flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-[#c79b60]" />
                info@marble-moscow.ru
              </a>

              <div className="flex items-center gap-3 mt-2">
                {[Mail, MessageCircle, Send, Globe2].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c79b60] hover:bg-[#c79b60] hover:text-[#111111] transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex-1" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
