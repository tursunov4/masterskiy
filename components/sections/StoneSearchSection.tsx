"use client";
import { useAppDispatch } from "@/store/hooks";
import { openConsult } from "@/store/slices/consult.slice";
import Link from "next/link";

const StoneSearchSection = () => {
  const dispatch = useAppDispatch();
  return (
    <section
      className="     
        py-[20px]
        bg-[url('/images/png/catalogstone.png')]
        bg-no-repeat
        bg-right
        bg-cover
      "
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-stretch">
          {/* Chapdagi kartocha */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-md  bg-[#f5f3ee] px-6 py-5 text-sm text-[#333] leading-relaxed">
              <h3 className="mb-2 text-base sm:text-lg">
                Не нашли «свой» камень? Мы его найдем.
              </h3>
              <p>
                Наш каталог — лишь часть возможностей. Благодаря прямым
                договорам с карьерами со всего мира мы можем предложить вам
                практически любой натуральный камень.
              </p>
              <p className="mt-2">
                Даже если его нет в наличии — мы его добудем специально для вас!
              </p>

              <div className="mt-4">
                <button
                  onClick={() => dispatch(openConsult())}
                  className="inline-flex items-center gap-2 bg-[#c79b60] px-3 py-1 text-[16px] sm:text-sm uppercase tracking-[0.12em] text-[#2c2420] hover:bg-[#d9b976] transition"
                >
                  Расскажите, что ищете
                  <span className="text-base">»</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoneSearchSection;
