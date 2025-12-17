"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, Menu, Phone } from "lucide-react";
import { NAV_LINKS, isActivePath } from "./navConfig";
import { useAppSelector } from "@/store/hooks";

type HeaderTopBarProps = {
  pathname: string;
  onOpenMobileMenu: () => void;
};

const HeaderTopBar: React.FC<HeaderTopBarProps> = ({
  pathname,
  onOpenMobileMenu,
}) => {
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

              <form className="flex border border-[#d6aa6d] h-[34px]">
                <input
                  placeholder="Поиск"
                  className="flex-1 bg-[#111] px-3 text-[12px] text-[#f6f2ea] outline-none"
                />
                <button className="bg-[#c79b60] px-4">
                  <Search className="w-4 h-4 text-[#231f20]" />
                </button>
              </form>
            </div>

            {/* CONTACTS */}
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
