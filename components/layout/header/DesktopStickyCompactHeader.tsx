"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Grid2X2 } from "lucide-react";

type Props = {
  phone?: string;
  email?: string;
};

export default function DesktopStickyCompactHeader({ phone, email }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY >= 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const phoneClean = phone ? phone.replace(/\s|\(|\)|-/g, "") : "";

  return (
    <div
      className={[
        "hidden md:block",
        "fixed top-0 left-0 right-0 z-[60]",
        "transition-all duration-300",
        show
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <div className="bg-[#111111]/95 backdrop-blur border-b border-[#2a2a2a]">
        <div className="container">
          <div className="h-[56px] xl:h-[64px] flex items-center gap-3 xl:gap-4">
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/images/svg/logo.svg"
                alt="site logo"
                width={220}
                height={52}
                className="w-[170px] h-[44px] xl:w-[210px] xl:h-[52px] object-contain"
                priority={false}
              />
            </Link>

            {/* BUTTONS */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {[
                { href: "/catalog-stone", label: "КАТАЛОГ КАМНЯ" },
                { href: "/catalog-product", label: "КАТАЛОГ ИЗДЕЛИЙ" },
                { href: "/church-art", label: "ЦЕРКОВНОЕ ИСКУССТВО" },
              ].map((b) => (
                <Link
                  key={b.href}
                  href={b.href}
                  className={[
                    "flex items-center gap-2",
                    "bg-[#c0a57c] hover:bg-[#9E8968] transition-colors",

                    "min-w-[120px] xl:min-w-[220px]",

                    "py-1 px-3 xl:px-4",

                    "text-[12px] xl:text-[16px]",
                    "uppercase tracking-[0.07em] whitespace-nowrap flex-shrink-0",
                    "my-[5px]",
                  ].join(" ")}
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#111111]/10">
                    <Grid2X2 className="w-4 h-4" />
                  </span>
                  {b.label}
                </Link>
              ))}
            </div>

            {/* CONTACTS */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Image
                src="/images/svg/email.svg"
                alt="email"
                width={30}
                height={30}
                className="w-[26px] h-[26px] xl:w-[30px] xl:h-[30px]"
              />

              <div className="flex flex-col leading-tight">
                {phone && (
                  <a
                    href={`tel:${phoneClean}`}
                    className="text-[#f6f2ea] hover:text-[#d0aa6a] transition-colors"
                  >
                    <span className="text-[14px] xl:text-[18px] font-medium">
                      {phone}
                    </span>
                  </a>
                )}

                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="text-[#f6f2ea] hover:text-[#d0aa6a] transition-colors"
                  >
                    <span className="text-[11px] xl:text-[13px]">{email}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
