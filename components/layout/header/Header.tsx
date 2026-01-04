"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import HeaderTopBar from "./HeaderTopBar";
import CategoriesStrip from "./CategoriesStrip";
import MobileMenu from "./MobileMenu";
import DesktopStickyCompactHeader from "./DesktopStickyCompactHeader";
import { useAppSelector } from "@/store/hooks";

export default function Header() {
  const pathname = usePathname() || "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const contact = useAppSelector((s) => s.contact.data);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* 🖥 desktop uchun compact fixed header */}
      <DesktopStickyCompactHeader
        phone={contact?.phone}
        email={contact?.email}
      />

      {/* 📱 mobile uchun header sticky */}
      <header className="w-full fixed md:static  top-0 z-40">
        <HeaderTopBar
          pathname={pathname}
          onOpenMobileMenu={() => setMobileOpen(true)}
        />
        <CategoriesStrip pathname={pathname} />
        <MobileMenu
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          pathname={pathname}
        />
      </header>
    </>
  );
}
