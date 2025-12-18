"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import Breadcrumbs from "../Breadcrumbs";
import SectionHeader from "../ui/SectionHeader";

import { API_BASE } from "@/lib/api";

type FaqItem = {
  id: number;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
};

type FaqResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: FaqItem[];
};

export default function FaqSection() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        setErr(null);

        const res = await fetch(`${API_BASE}/api/faq/faq/`, {
          method: "GET",
          cache: "no-store",
        });

        if (!res.ok) throw new Error("FAQ yuklanmadi");

        const data = (await res.json()) as FaqResponse;
        if (cancelled) return;

        setItems(data.results ?? []);
        // birinchi item ochiq tursin (xohlasangiz o‘chirib qo‘ying)
        setOpenId((data.results?.[0]?.id ?? null) as number | null);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message ?? "Xatolik");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const hasItems = items.length > 0;

  const subtitle = useMemo(
    () =>
      "Часто задаваемые вопросы о натуральном камне, уходе, гарантии и сроках работ.",
    []
  );

  if (loading && !hasItems) {
    return (
      <section id="faq" className="bg-[#f5f3ee] py-12">
        <div className="container px-4">
          <div className="mx-auto max-w-[980px]">
            <div className="h-6 w-48 bg-black/10 animate-pulse" />
            <div className="mt-3 h-4 w-[520px] max-w-full bg-black/10 animate-pulse" />
            <div className="mt-8 space-y-3">
              <div className="h-14 w-full bg-black/10 animate-pulse" />
              <div className="h-14 w-full bg-black/10 animate-pulse" />
              <div className="h-14 w-full bg-black/10 animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!loading && !hasItems && !err) return null;

  return (
    <section id="faq" className="bg-[#f5f3ee] py-12">
      <div className="container px-4">
        <div className="mx-auto max-w-[980px]">
          <SectionHeader title="ВОПРОС И ОТВЕТ (FAQ)" />

          {err && (
            <div className="mt-8 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              {err}
            </div>
          )}
          {hasItems && (
            <div className="mt-8 space-y-3">
              {items.map((it) => {
                const isOpen = openId === it.id;

                return (
                  <div
                    key={it.id}
                    className={[
                      "border border-black/15 bg-white",
                      "transition-shadow",
                      isOpen ? "shadow-[0_10px_24px_rgba(0,0,0,0.10)]" : "",
                    ].join(" ")}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenId((prev) => (prev === it.id ? null : it.id))
                      }
                      className="w-full px-4 md:px-5 py-4 flex items-center justify-between gap-4 text-left"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={[
                            "mt-[2px] inline-flex h-6 w-6 items-center justify-center",
                            "rounded-full border border-black/20 text-[12px] font-semibold",
                            "text-[#2c2420] bg-[#f5f3ee]",
                            isOpen ? "border-[#c79b60]" : "",
                          ].join(" ")}
                        >
                          ?
                        </span>

                        <span className="text-[13px] md:text-[14px] font-medium text-[#2c2420] leading-snug">
                          {it.question}
                        </span>
                      </div>

                      <ChevronDown
                        className={[
                          "h-5 w-5 flex-shrink-0 transition-transform duration-300",
                          isOpen
                            ? "rotate-180 text-[#c79b60]"
                            : "text-[#6b655d]",
                        ].join(" ")}
                      />
                    </button>

                    {/* Answer */}
                    <div
                      className={[
                        "grid transition-[grid-template-rows] duration-300 ease-out",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      ].join(" ")}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 md:px-5 pb-4">
                          <div className="h-[1px] w-full bg-black/10 mb-3" />
                          <div className="whitespace-pre-line text-[13px] md:text-[14px] leading-relaxed text-[#4f473f]">
                            {it.answer}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {/* Optional: footer hint */}
          {hasItems && (
            <p className="mt-8 text-center text-[12px] text-[#6b655d]">
              Не нашли ответ? Оставьте заявку на консультацию — мы поможем.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
