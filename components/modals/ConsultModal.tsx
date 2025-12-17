"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  closeConsult,
  resetForm,
  setField,
  submitConsult,
} from "@/store/slices/consult.slice";

export default function ConsultModal() {
  const dispatch = useAppDispatch();
  const { open, form, status, error } = useAppSelector((s) => s.consult);

  // ESC close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch(closeConsult());
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, dispatch]);

  useEffect(() => {
    if (status === "success") {
      dispatch(resetForm());
      dispatch(closeConsult());
    }
  }, [status, dispatch]);

  if (!open) return null;

  const disabled = status === "loading";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // minimal validation
    if (!form.name.trim() || !form.phone.trim()) return;

    await dispatch(
      submitConsult({
        name: form.name.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
      })
    );
  };

  return (
    <div className="fixed inset-0 z-[999]">
      {/* backdrop */}
      <button
        aria-label="Close"
        onClick={() => dispatch(closeConsult())}
        className="absolute inset-0 bg-black/55"
      />

      {/* modal */}
      <div className="relative mx-auto mt-24 w-[92%] max-w-[520px] border border-black/20 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
          <h3 className="text-[14px] uppercase tracking-[0.12em] text-[#2c2420]">
            Консультация
          </h3>

          <button
            onClick={() => dispatch(closeConsult())}
            className="p-1 hover:bg-black/5"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="px-4 py-4">
          {error && (
            <div className="mb-3 border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <label className="block text-[12px] text-[#2c2420]">
            Имя *
            <input
              value={form.name}
              onChange={(e) =>
                dispatch(setField({ key: "name", value: e.target.value }))
              }
              className="mt-1 w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-[#c79b60]"
              placeholder="Ваше имя"
              disabled={disabled}
            />
          </label>

          <label className="mt-3 block text-[12px] text-[#2c2420]">
            Телефон *
            <input
              value={form.phone}
              onChange={(e) =>
                dispatch(setField({ key: "phone", value: e.target.value }))
              }
              className="mt-1 w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-[#c79b60]"
              placeholder="+7 (___) ___-__-__"
              disabled={disabled}
            />
          </label>

          <label className="mt-3 block text-[12px] text-[#2c2420]">
            Сообщение
            <textarea
              value={form.message}
              onChange={(e) =>
                dispatch(setField({ key: "message", value: e.target.value }))
              }
              className="mt-1 min-h-[110px] w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-[#c79b60]"
              placeholder="Коротко опишите запрос"
              disabled={disabled}
            />
          </label>

          <button
            type="submit"
            disabled={disabled || !form.name.trim() || !form.phone.trim()}
            className="mt-4 w-full bg-[#c79b60] py-2 text-[13px] uppercase tracking-[0.14em] text-[#2c2420] transition hover:bg-[#d8b97c] disabled:opacity-60"
          >
            {disabled ? "Отправка..." : "Отправить"}
          </button>
        </form>
      </div>
    </div>
  );
}
