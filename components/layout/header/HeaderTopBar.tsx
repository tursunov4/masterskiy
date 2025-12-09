"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Menu,
  Mail,
  MessageCircle,
  Send,
  Globe2,
  Phone,
} from "lucide-react";
import { NAV_LINKS, isActivePath } from "./navConfig";

type HeaderTopBarProps = {
  pathname: string;
  onOpenMobileMenu: () => void;
};

const HeaderTopBar: React.FC<HeaderTopBarProps> = ({
  pathname,
  onOpenMobileMenu,
}) => {
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

  return (
    <div className="bg-[#111111] text-[#f6f2ea]">
      <div className="container">
        <div className="py-2.5 flex items-stretch gap-4 md:gap-6">
          <Link
            href="/"
            className="flex-shrink-0 flex items-center justify-center"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/images/svg/logo.svg"
                alt="site logo"
                width={250}
                height={60}
                className="w-[110px] h-[40px] md:w-[250px] md:h-[60px] object-contain"
              />
            </div>
          </Link>

          {/* DESKTOP PART */}
          <div className="hidden md:flex flex-1 items-stretch gap-4 md:gap-6">
            {/* NAV + SEARCH */}
            <div className="flex flex-col flex-1 gap-1.5 justify-between">
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

            {/* RIGHT – CONTACTS */}
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

          {/* MOBILE RIGHT SIDE */}
          <div className="ml-auto flex md:hidden items-center gap-2">
            <a
              href="tel:+79040395226"
              className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-[#3a3a3a]"
            >
              <Phone className="w-4 h-4 text-[#c79b60]" />
              <span>Позвонить</span>
            </a>
            <button
              type="button"
              onClick={onOpenMobileMenu}
              aria-label="Open menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded border border-[#3a3a3a]"
            >
              <Menu className="w-5 h-5 text-[#f6f2ea]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTopBar;
