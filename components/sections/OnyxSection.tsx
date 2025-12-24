"use client";

import { useAppDispatch } from "@/store/hooks";
import { openConsult } from "@/store/slices/consult.slice";

const OnyxSection = () => {
  const dispatch = useAppDispatch();

  return (
    <section
      className="
        relative
        bg-black
        py-12 md:py-16
        bg-[url('/images/bg2.jpg')]
        bg-right
        bg-no-repeat
        bg-contain
        lg:bg-cover
      "
    >
      <div className="absolute inset-0 bg-black/40 lg:bg-black/30 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 lg:px-0 flex flex-col lg:flex-row items-center lg:items-stretch gap-10 lg:gap-16">
        <div className="w-full lg:max-w-[520px] flex justify-center lg:justify-start">
          <div className="w-full space-y-[8px] bg-[#111111]">
            {/* HEADER */}
            <div className="bg-[#d9d9d5] px-6 md:px-3 py-4 text-center border border-[#111111] border-b-0">
              <h2 className="text-[13px] md:text-[17px]  font-medium tracking-[0.18em] uppercase leading-snug">
                ОНИКС И ДРУГИЕ СВЕТОНОСНЫЕ КАМНИ
              </h2>
              <p className="mt-1 text-[12px] md:text-[16px]  leading-snug">
                Камень, который оживает
              </p>
            </div>

            {/* TEXT */}
            <div className="bg-[#d9d9d5] px-6 md:px-7 py-5 text-[12.5px] md:text-[13.5px] leading-[1.65] border border-[#111111] border-t-0 border-b-0">
              <p>
                Оникс, селенит, полупрозрачный мрамор, кварцит — природные
                материалы, которые преображаются при подсветке.
              </p>

              <p className="mt-4">
                Создаем уникальные столешницы, панно, барные стойки и
                декоративные элементы, которые излучают собственный свет,
                наполняя пространство теплом и магией.
              </p>
            </div>

            {/* BUTTON */}
            <div className="bg-[#d9d9d5] px-6 md:px-7 py-3 flex justify-center border border-[#111111] border-t-0">
              <button
                onClick={() => dispatch(openConsult())}
                className="
                  bg-[#c0a57c]
                  px-7 md:px-8
                  py-2
                  text-[12px] md:text-[12.5px]
                  tracking-[0.16em] uppercase
                  text-[#231f20]
                  hover:bg-[#d8b976]
                  transition
                "
              >
                Вдохновиться примерами »
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnyxSection;
