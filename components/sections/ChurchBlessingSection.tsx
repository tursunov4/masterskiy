"use client";
import { useAppDispatch } from "@/store/hooks";
import { openConsult } from "@/store/slices/consult.slice";
import Link from "next/link";

const ChurchBlessingSection = () => {
  const dispatch = useAppDispatch();
  return (
    <section
      className="relative w-full h-[220px] sm:h-[260px] lg:h-[300px] bg-cover bg-center"
      style={{ backgroundImage: "url('/images/png/churchbanner.png')" }} // 🔥 Background image
    >
      {/* Qora overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Container */}
      <div className="relative h-full flex items-center justify-center">
        <div className="container">
          <div className=" bg-[#e4ded2]/95 px-6 py-5 sm:px-8 sm:py-6 max-w-[430px] shadow-md">
            <h3 className="mb-3 text-center text-lg sm:text-xl font-medium">
              Планируете благоукрашение храма?
            </h3>

            <p className="mb-4 text-sm leading-relaxed text-[#2c2c2c]">
              Мы будем рады помочь вам создать храмовое пространство, которое
              станет духовным домом для многих поколений верующих.
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => dispatch(openConsult())}
                className="inline-flex items-center gap-2 bg-[#c79b60] px-4 py-2 text-xs sm:text-sm uppercase tracking-[0.12em] text-[#2c2420] hover:bg-[#d8b97c] transition"
              >
                Узнать подробнее
                <span className="text-base">»</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChurchBlessingSection;
