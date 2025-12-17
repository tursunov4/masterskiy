"use client";
import { useAppDispatch } from "@/store/hooks";
import { openConsult } from "@/store/slices/consult.slice";
import Link from "next/link";

const IdeaConsultSection = () => {
  const dispatch = useAppDispatch();
  return (
    <section
      className="     
        py-[40px]
        bg-[url('/images/png/catalogproductbanner.png')]
        bg-no-repeat
        bg-cover
        bg-right
      "
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-stretch">
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-md  bg-[#f5f3ee] px-6 py-5 text-sm text-[#333] leading-relaxed">
              <h3 className="mb-2 text-base text-center sm:text-lg">
                Появились идеи?
              </h3>
              <p>
                Превратим их в готовый проект. Получите бесплатную консультацию
                по телефону и ответы на все вопросы по ассортименту.
              </p>

              <div className="mt-5 flex justify-center">
                <button
                  onClick={() => dispatch(openConsult())}
                  className="inline-flex items-center gap-2 bg-[#c79b60] px-3 py-1 text-[16px] sm:text-sm uppercase tracking-[0.12em] text-[#2c2420] hover:bg-[#d9b976] transition"
                >
                  Да, хочу консультацию
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

export default IdeaConsultSection;
