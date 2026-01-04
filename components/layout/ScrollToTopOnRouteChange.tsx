"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function scrollToHash(hash: string) {
  const id = hash.replace("#", "");
  if (!id) return false;

  const el = document.getElementById(id);
  if (!el) return false;

  // anchor scroll
  el.scrollIntoView({ block: "start", behavior: "auto" });
  return true;
}

export default function ScrollToTopOnRouteChange() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const hash = window.location.hash;

    // ✅ Hash bo‘lsa: element render bo‘lgandan keyin scroll qilamiz
    if (hash) {
      let tries = 0;
      const maxTries = 20;

      const tick = () => {
        tries += 1;
        if (scrollToHash(hash)) return;
        if (tries < maxTries) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      return;
    }

    // ✅ Hash bo‘lmasa: oddiy page -> tepaga
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, searchParams]);

  return null;
}
