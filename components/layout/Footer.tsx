"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-20 bg-[#120f0f] text-[#f5eee5]">
      <section className="relative bg-[url('/images/footer-bg.jpg')] bg-cover bg-center">
        {/* qorong'i overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="container">
          <div className="relative mx-auto px-4 py-14 md:py-16">
            <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
              {/* ABOUT */}
              <div className="min-w-[180px]">
                <h3 className="mb-4 text-lg font-semibold tracking-[0.18em] uppercase">
                  О НАС
                </h3>

                <ul className="space-y-2 text-sm md:text-base">
                  {[
                    "Вопрос-ответ",
                    "Доставка",
                    "Полезная информация",
                    "Контакты",
                  ].map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href="/"
                        className="flex items-center gap-1 hover:text-[#d7b06a] cursor-pointer transition-colors duration-200 group"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* KATALOG KAMNYA */}
              <div className="min-w-[180px]">
                <h3 className="mb-4 text-lg font-semibold tracking-[0.18em] uppercase">
                  КАТАЛОГ КАМНЯ
                </h3>

                <ul className="space-y-2 text-sm md:text-base">
                  {[
                    "Мрамор",
                    "Гранит",
                    "Травертин",
                    "Оникс",
                    "Кварцит",
                    "Лабрадорит",
                    "Эксклюзивные камни",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="hover:text-[#d7b06a] cursor-pointer transition-colors"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* KATALOG IZDELIY */}
              <div className="min-w-[200px]">
                <h3 className="mb-4 text-lg font-semibold tracking-[0.18em] uppercase">
                  КАТАЛОГ ИЗДЕЛИЙ
                </h3>

                <ul className="space-y-2 text-sm md:text-base">
                  {[
                    "Полы",
                    "Стены",
                    "Подоконники",
                    "Столешницы",
                    "Лестницы",
                    "Камины",
                    "Ванны и SPA",
                    "Бассейны",
                    "Хаммамы",
                    "Мозаика",
                    "Внешняя отделка",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="hover:text-[#d7b06a] cursor-pointer transition-colors"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* RIGHT: LOGO BLOCK + INFO */}
              <div className="flex flex-1 flex-col gap-4 lg:items-end">
                {/* LOGO + MATN BLOKI */}
                <Link
                  href="/"
                  className="mb-3 cursor-pointer hover:opacity-90 transition flex items-center gap-4 lg:justify-end"
                >
                  <Image
                    alt="site logo"
                    width={70}
                    height={70}
                    src="/images/svg/logof.svg"
                    className="w-[64px] h-[64px] object-contain"
                  />
                </Link>

                {/* COMPANY INFO */}
                <div className="text-sm md:text-base space-y-2 text-left lg:text-right text-[#f5eee5]">
                  <p className="opacity-90">ИП Павлов Фёдор Валентинович</p>
                  <p className="opacity-90">ИНН: 332913252520</p>

                  <p className="flex items-start lg:items-start justify-start lg:justify-end gap-2 opacity-90">
                    <MapPin className="w-4 h-4 mt-[3px] text-[#d7b06a]" />
                    <span>
                      Владимирская обл., с. Новое, ул. Рабочая, стр. 1 <br />
                      Пн–Сб, с 9:00 до 19:00
                    </span>
                  </p>

                  <p className="mt-3">
                    <a
                      href="tel:+79040395226"
                      className="flex justify-start lg:justify-end items-center gap-2 hover:text-[#d7b06a] transition cursor-pointer"
                    >
                      <Phone className="w-4 h-4 text-[#d7b06a]" />
                      +7 (904) 039 52 26
                    </a>
                  </p>

                  <p>
                    <a
                      href="mailto:info@marble-moscow.ru"
                      className="flex justify-start lg:justify-end items-center gap-2 hover:text-[#d7b06a] transition cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-[#d7b06a]" />
                      info@marble-moscow.ru
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* COPYRIGHT LINE */}
            <div className="mt-12 border-top border-white/10 pt-5 text-center text-[11px] md:text-xs text-[#c9b9a1] border-t border-white/10">
              © 2025 МАСТЕРСКАЯ МРАМОРНЫХ ИНТЕРЬЕРОВ. Информация на сайте не
              является публичной офертой. Уточняйте стоимость у менеджера отдела
              продаж.
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
