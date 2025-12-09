// components/PersonalConsultSection.tsx
"use client";

import React from "react";

const PersonalConsultSection: React.FC = () => {
  return (
    <section className=" bg-[#dfdfdb] py-6">
      <div className="container mx-auto px-4">
        <form
          className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-between"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Chapdagi sarlavha */}
          <div className="md:w-1/3">
            <p className="text-lg font-medium leading-tight tracking-[0.08em] uppercase text-[#2c2c2c]">
              ПОЛУЧИТЬ
              <br />
              ПЕРСОНАЛЬНУЮ
              <br />
              КОНСУЛЬТАЦИЮ
            </p>
          </div>

          {/* O'ng – inputlar + button */}
          <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
            <input
              type="text"
              required
              placeholder="* Ваше имя"
              className="h-10 w-full rounded-md border border-black/40 bg-white px-3 text-sm outline-none md:w-1/3"
            />
            <input
              type="tel"
              required
              placeholder="* Ваш телефон"
              className="h-10 w-full rounded-md border border-black/40 bg-white px-3 text-sm outline-none md:w-1/3"
            />
            <button
              type="submit"
              className="h-10 w-full rounded-md bg-[#c79b60] px-4 text-xs md:w-auto md:px-6 md:text-sm uppercase tracking-[0.12em] text-[#2c2420] hover:bg-[#d8b97a] transition"
            >
              ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PersonalConsultSection;
