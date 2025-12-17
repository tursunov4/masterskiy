"use client";

import { useEffect, useMemo } from "react";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock3,
  MessageCircle,
  Send,
  BadgeCheck,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchContactInfo } from "@/store/slices/contactSlice";

function normalizePhoneForTel(phone?: string) {
  if (!phone) return "";
  return phone.replace(/[^\d+]/g, "");
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-[2px] inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-[#f5f3ee]">
        {icon}
      </span>
      <div className="flex-1">
        <p className="text-[11px] uppercase tracking-[0.14em] text-[#6b655d]">
          {label}
        </p>
        <p className="mt-1 text-[14px] leading-relaxed text-[#2c2420]">
          {value ?? "—"}
        </p>
      </div>
    </div>
  );
}

export default function ContactsClient() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((s) => s.contact);

  useEffect(() => {
    if (status === "idle") dispatch(fetchContactInfo());
  }, [status, dispatch]);

  const tel = useMemo(() => normalizePhoneForTel(data?.phone), [data?.phone]);

  if (status === "loading" && !data) {
    return (
      <section className="pb-12 pt-6">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="h-[320px] animate-pulse border border-black/10 bg-black/5" />
          <div className="h-[320px] animate-pulse border border-black/10 bg-black/5" />
        </div>
      </section>
    );
  }

  if (status === "failed") {
    return (
      <section className="pb-12 pt-6">
        <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error ?? "Ошибка загрузки"}
        </div>
        <button
          onClick={() => dispatch(fetchContactInfo())}
          className="mt-4 bg-[#c79b60] px-4 py-2 text-[12px] uppercase tracking-[0.12em] text-[#2c2420] hover:bg-[#d8b97c]"
        >
          Повторить
        </button>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section className="pb-12 pt-6">
      <div className="container">
        {/* Top cards */}
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* LEFT BIG CARD */}
          <div className="border border-black/15 bg-white shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
            <div className="border-b border-black/10 bg-[#f5f3ee] px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#6b655d]">
                    Реквизиты
                  </p>
                  <p className="mt-1 text-[16px] md:text-[18px] font-semibold tracking-[0.02em] text-[#2c2420]">
                    {data.author_name}
                  </p>
                  <p className="mt-1 text-[13px] text-[#4f473f]">
                    ИНН:{" "}
                    <span className="font-medium text-[#2c2420]">
                      {data.inn}
                    </span>
                  </p>
                </div>
                <BadgeCheck className="h-6 w-6 text-[#c79b60]" />
              </div>
            </div>

            <div className="px-5 py-5 space-y-4">
              <InfoRow
                icon={<MapPin className="h-5 w-5 text-[#c79b60]" />}
                label="Адрес"
                value={data.address}
              />
              <InfoRow
                icon={<Clock3 className="h-5 w-5 text-[#c79b60]" />}
                label="Время работы"
                value={data.time_working}
              />
            </div>

            <div className="border-t border-black/10 px-5 py-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={tel ? `tel:${tel}` : "#"}
                  className="group flex items-center gap-3 border border-black/10 bg-white px-4 py-3 transition hover:border-[#c79b60] hover:shadow-[0_10px_22px_rgba(0,0,0,0.08)]"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f3ee] border border-black/10">
                    <Phone className="h-5 w-5 text-[#c79b60]" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-[#6b655d]">
                      Телефон
                    </p>
                    <p className="truncate text-[13px] font-medium text-[#2c2420] group-hover:text-[#7b5b2e]">
                      {data.phone}
                    </p>
                  </div>
                </a>

                <a
                  href={data.email ? `mailto:${data.email}` : "#"}
                  className="group flex items-center gap-3 border border-black/10 bg-white px-4 py-3 transition hover:border-[#c79b60] hover:shadow-[0_10px_22px_rgba(0,0,0,0.08)]"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f3ee] border border-black/10">
                    <Mail className="h-5 w-5 text-[#c79b60]" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-[#6b655d]">
                      Email
                    </p>
                    <p className="truncate text-[13px] font-medium text-[#2c2420] group-hover:text-[#7b5b2e]">
                      {data.email}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT ACTIONS CARD */}
          <div className="border border-black/15 bg-white shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
            <div className="border-b border-black/10 bg-[#111111] px-5 py-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#d7b06a]">
                Быстрая связь
              </p>
              <p className="mt-1 text-[15px] font-medium text-white">
                Напишите нам в мессенджеры
              </p>
            </div>

            <div className="px-5 py-5 space-y-3">
              {data.whatsapp && (
                <a
                  href={data.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-3 border border-black/10 bg-[#f5f3ee] px-4 py-3 transition hover:border-[#c79b60]"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-[#c79b60]" />
                    <span className="text-[12px] uppercase tracking-[0.14em] text-[#2c2420]">
                      WhatsApp
                    </span>
                  </div>
                  <span className="text-[#6b655d] transition group-hover:text-[#2c2420]">
                    →
                  </span>
                </a>
              )}

              {data.telegram && (
                <a
                  href={data.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-3 border border-black/10 bg-[#f5f3ee] px-4 py-3 transition hover:border-[#c79b60]"
                >
                  <div className="flex items-center gap-3">
                    <Send className="h-5 w-5 text-[#c79b60]" />
                    <span className="text-[12px] uppercase tracking-[0.14em] text-[#2c2420]">
                      Telegram
                    </span>
                  </div>
                  <span className="text-[#6b655d] transition group-hover:text-[#2c2420]">
                    →
                  </span>
                </a>
              )}

              <div className="mt-4 border-t border-black/10 pt-4">
                <p className="text-[12px] leading-relaxed text-[#4f473f]">
                  Мы ответим в рабочее время. Если вы оставили заявку — мы
                  свяжемся с вами как можно скорее.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom small hint */}
        <div className="mt-8 border border-black/10 bg-[#f5f3ee] px-5 py-4 text-sm text-[#4f473f]">
          Совет: для быстрого ответа укажите ваш номер телефона и удобное время
          связи.
        </div>
      </div>
    </section>
  );
}
