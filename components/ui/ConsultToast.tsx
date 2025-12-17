"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearToast } from "@/store/slices/consult.slice";

export default function ConsultToast() {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((s) => s.consult.toast);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => dispatch(clearToast()), 3500);
    return () => clearTimeout(t);
  }, [toast, dispatch]);

  if (!toast) return null;

  const boxClass =
    toast.type === "success"
      ? "border-green-300 bg-green-50 text-green-800"
      : "border-red-300 bg-red-50 text-red-700";

  return (
    <div className="fixed right-4 top-4 z-[1000] w-[92%] max-w-[420px]">
      <div
        className={`flex items-start gap-3 border p-3 shadow-lg ${boxClass}`}
      >
        <p className="text-sm leading-snug">{toast.text}</p>

        <button
          onClick={() => dispatch(clearToast())}
          className="ml-auto p-1 hover:bg-black/5"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
