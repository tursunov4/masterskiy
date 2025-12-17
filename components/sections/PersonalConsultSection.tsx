"use client";

import React, { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import {
  openConsult,
  setField,
  submitConsult,
} from "@/store/slices/consult.slice";

const PersonalConsultSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) return;

    dispatch(
      submitConsult({ name: name.trim(), phone: phone.trim(), message: "" })
    );
  };

  return (
    <section className=" bg-[#dfdfdb] py-6">
      <div className="container mx-auto px-4">
        <form
          className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-between"
          onSubmit={onSubmit}
        >
          <div className="md:w-1/3">
            <p className="text-lg font-medium leading-tight tracking-[0.08em] uppercase text-[#2c2c2c]">
              ПОЛУЧИТЬ
              <br />
              ПЕРСОНАЛЬНУЮ
              <br />
              КОНСУЛЬТАЦИЮ
            </p>
          </div>

          <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
            <input
              type="text"
              required
              placeholder="* Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 w-full rounded-md border border-black/40 bg-white px-3 text-sm outline-none md:w-1/3"
            />
            <input
              type="tel"
              required
              placeholder="* Ваш телефон"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
