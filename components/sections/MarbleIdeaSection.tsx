"use client";
import { useAppDispatch } from "@/store/hooks";
import { openConsult } from "@/store/slices/consult.slice";
import Image from "next/image";

const MarbleIdeaSection = () => {
  const dispatch = useAppDispatch();
  return (
    <section className="relative h-[240px] sm:h-[280px] lg:h-[320px] w-full overflow-hidden ">
      <Image
        src="/images/png/stoneitembanner.png"
        alt="Интерьер из мрамора"
        width={1000}
        height={400}
        className="object-cover w-full h-full"
      />

      <div className="absolute inset-0 bg-black/10" />

      <div className="container  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="  flex items-center justify-center px-4">
          <div className="bg-[#e5e2d6] px-6 py-5 sm:px-8 sm:py-6 max-w-[420px] shadow-md">
            <h3 className="mb-3 text-center text-lg sm:text-xl font-medium">
              Появились идеи?
            </h3>

            <p className="text-sm leading-relaxed text-[#2c2c2c] mb-4">
              Превратим их в готовый проект. Получите бесплатную консультацию по
              телефону и ответы на все вопросы по ассортименту.
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => dispatch(openConsult())}
                className="inline-flex items-center gap-2 bg-[#c79b60] hover:bg-[#d8b97c] px-4 py-2 text-xs sm:text-sm uppercase tracking-[0.12em] text-[#2c2420] transition"
              >
                Да, хочу консультацию
                <span className="text-base">»</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarbleIdeaSection;
