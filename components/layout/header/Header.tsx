"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import HeaderTopBar from "./HeaderTopBar";
import CategoriesStrip from "./CategoriesStrip";
import MobileMenu from "./MobileMenu";

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() || "/";

  useEffect(() => {
    // Mobil menyu ochilganda scrollni bloklash
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="w-full relative z-40">
      <HeaderTopBar
        pathname={pathname}
        onOpenMobileMenu={() => setMobileOpen(true)}
      />
      {/* Strip faqat desktopda (CategoriesStrip ichida hidden lg:block) */}
      <CategoriesStrip pathname={pathname} />
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />
    </header>
  );
};

export default Header;
