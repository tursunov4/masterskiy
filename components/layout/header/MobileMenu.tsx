"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Search,
  X,
  Phone,
  Mail,
  MessageCircle,
  Send,
  Globe2,
  Grid2X2,
} from "lucide-react";
import { NAV_LINKS, CATEGORIES, isActivePath } from "./navConfig";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose, pathname }) => {
  if (!open) return null;

  const navItemClass = (href: string) => {
    const active = isActivePath(pathname, href);
    return [
      "py-2 border-b border-[#2a2a2a]",
      "tracking-[0.12em] text-[12px] uppercase",
      "transition-colors",
      active ? "text-[#d0aa6a]" : "text-[#f6f2ea] hover:text-[#d0aa6a]",
    ].join(" ");
  };

  const categoryItemClass = (href: string) => {
    const active = isActivePath(pathname, href);
    return [
      "flex items-center gap-2 py-1.5 px-2 rounded-md",
      "text-[11px] tracking-[0.08em] uppercase",
      active
        ? "bg-[#2a2926] text-[#f6f2ea] border border-[#c79b60]"
        : "text-[#f6f2ea] opacity-90 hover:bg-[#232220] hover:text-[#ffffff]",
    ].join(" ");
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#111111] text-[#f6f2ea]">
      <div className="container py-4 flex flex-col gap-4 h-full overflow-y-auto">
        {/* TOP ROW */}
        <div className="flex items-center justify-between">
          <Link href="/" onClick={onClose} className="flex items-center">
            <div className="flex items-center gap-3">
              <Image
                src="/images/svg/logo.svg"
                alt="site logo"
                width={110}
                height={40}
                className="w-[110px] h-[40px] object-contain"
              />
            </div>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded border border-[#3a3a3a]"
          >
            <X className="w-5 h-5 text-[#f6f2ea]" />
          </button>
        </div>

        <nav className="mt-2 flex flex-col gap-1.5">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className={navItemClass(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CATEGORIES BLOCK */}
        <div className="mt-3 border-t border-[#2a2a2a] pt-3">
          <div className="flex items-center gap-2 mb-2 text-[12px] tracking-[0.12em] uppercase text-[#c79b60]">
            <Grid2X2 className="w-4 h-4" />
            <span>Категории изделий</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                onClick={onClose}
                className={categoryItemClass(cat.href)}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* CONTACTS + SOCIAL */}
        <div className="mt-4 flex flex-col gap-2 text-[13px] border-t border-[#2a2a2a] pt-3">
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
  );
};

export default MobileMenu;
