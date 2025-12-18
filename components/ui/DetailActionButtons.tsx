"use client";

import { useAppDispatch } from "@/store/hooks";
import { openConsult } from "@/store/slices/consult.slice";

export default function DetailActionButtons() {
  const dispatch = useAppDispatch();

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <button
        onClick={() => dispatch(openConsult())}
        className="inline-flex items-center justify-center gap-2 bg-[#c79b60] px-5 py-2.5 text-[12px] sm:text-[13px] uppercase tracking-[0.12em] text-[#2c2420] transition-all duration-300 hover:bg-[#d8b97c] hover:shadow-md active:scale-[0.98] border border-black/10"
      >
        ОСТАВИТЬ ЗАЯВКУ НА КОНСУЛЬТАЦИЮ
      </button>

      <button
        onClick={() => dispatch(openConsult())}
        className="inline-flex items-center justify-center gap-2 bg-[#c79b60] px-5 py-2.5 text-[12px] sm:text-[13px] uppercase tracking-[0.12em] text-[#2c2420] transition-all duration-300 hover:bg-[#d8b97c] hover:shadow-md active:scale-[0.98] border border-black/10"
      >
        ЗАКАЗАТЬ ВЫЕЗД ЗАМЕРЩИКА
      </button>

      <button
        onClick={() => dispatch(openConsult())}
        className="inline-flex items-center justify-center gap-2 bg-[#c79b60] px-5 py-2.5 text-[12px] sm:text-[13px] uppercase tracking-[0.12em] text-[#2c2420] transition-all duration-300 hover:bg-[#d8b97c] hover:shadow-md active:scale-[0.98] border border-black/10"
      >
        ПОЛУЧИТЬ БЕСПЛАТНЫЙ ДИЗАЙН-ПРОЕКТ
      </button>
    </div>
  );
}

