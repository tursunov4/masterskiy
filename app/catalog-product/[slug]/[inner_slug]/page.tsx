// app/catalog/floors/sivec/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Полы Sivec",
};

export default function FloorSivecPage() {
  return (
    <>
      <main className="">
        <div className="bg-[#f8f4ee]">
          <p className="py-2 text-center text-xs tracking-[0.12em]">
            <Link href="/" className="hover:underline">
              Главная
            </Link>{" "}
            / <Link href="/catalog-product">Каталог изделий</Link>/{" "}
            <Link href="/catalog-product/floors">Полы</Link>/{" "}
            <span>Полы Sivec</span>
          </p>
        </div>

        <div className="container">
          {/* TITLE */}
          <div className="flex flex-col items-center gap-2 py-4">
            <div className="h-[2px] w-24 bg-[#c79b60]" />
            <h1 className="text-xl sm:text-2xl md:text-3xl tracking-[0.18em] uppercase">
              Полы Sivec
            </h1>
          </div>

          {/* SUBTITLE BAR */}
          <div className="bg-[#c79b60] py-2 text-center text-xs sm:text-sm tracking-[0.16em] uppercase text-[#2c2420]">
            НАШИ ИДЕИ ИЗ НАТУРАЛЬНОГО КАМНЯ ДЛЯ ВАШЕГО ПОЛА
          </div>

          {/* MAIN BLOCK: IMAGE + SPECS */}
          <section className="px-4 py-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
              {/* IMAGE */}
              <div className="relative h-[240px] sm:h-[280px] md:h-[320px] border border-black/20">
                <Image
                  src="/images/png/floor2.png" // o'zingdagi rasm bilan almashtir
                  alt="Полы Sivec"
                  fill
                  className="object-cover"
                />
              </div>

              {/* SPECS */}
              <div className="text-sm leading-relaxed">
                <div className="space-y-1">
                  <p>
                    <span className="font-semibold">Артикул:</span> ПОI17115АA01
                  </p>
                  <p>
                    <span className="font-semibold">Основной материал:</span>{" "}
                    <span className="bg-[#c79b60] px-1">Sivec</span>
                  </p>
                  <p>
                    <span className="font-semibold">Цвет:</span> белый
                  </p>
                  <p>
                    <span className="font-semibold">Месторождение:</span> Греция
                  </p>
                  <p>
                    <span className="font-semibold">Цена:</span> от 35 941
                    руб./м²
                  </p>
                  <p>
                    <span className="font-semibold">Зеркальный рисунок:</span>{" "}
                    нет
                  </p>
                  <p>
                    <span className="font-semibold">Работает на просвет:</span>{" "}
                    нет
                  </p>
                </div>

                <div className="mt-4 space-y-1">
                  <p>
                    <span className="font-semibold">
                      Дополнительный материал:
                    </span>{" "}
                    нет
                  </p>
                  <p>
                    <span className="font-semibold">Стиль:</span> Современный
                  </p>
                  <p>
                    <span className="font-semibold">Мозаичные элементы:</span>{" "}
                    нет
                  </p>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-8 space-y-4 text-sm leading-relaxed">
              <p className="font-medium">Эксклюзивные полы премиум-класса.</p>
              <p>
                Инвестируйте в вечную красоту и статус с помощью благородного
                мрамора коллекции Sivec с белых тонах с изящными прожилками.
                Идеально вписывается в современные интерьерные решения, в
                законченной композиции с акцентом на природную текстуру.
              </p>
              <p>
                Идеально подходит для оформления полов в гостиных, холлах и
                коммерческих помещениях. Наслаждайтесь безупречным качеством и
                вечной красотой натурального камня.
              </p>
              <p>
                <span className="font-semibold">Цена:</span> от 35 954 руб./м²
              </p>
              <p>
                Готовы создать интерьер вашей мечты? Закажите бесплатную
                консультацию нашего эксперта и получите персональный подбор
                материала именно для вас.
              </p>
              <p>
                Каждый камень в нашей коллекции — уникален, как и ваше
                пространство. Давайте вместе создадим интерьер, который будет
                отражать ваш статус и вкус.
              </p>
            </div>

            {/* CTA LINKS */}
            <div className="mt-6 space-y-2 text-sm uppercase tracking-[0.08em]">
              <Link href="/consult" className="block hover:underline">
                [ОСТАВИТЬ ЗАЯВКУ НА КОНСУЛЬТАЦИЮ]
              </Link>
              <Link href="/measure" className="block hover:underline">
                [ЗАКАЗАТЬ ВЫЕЗД ЗАМЕРЩИКА]
              </Link>
              <Link href="/design" className="block hover:underline">
                [ПОЛУЧИТЬ БЕСПЛАТНЫЙ ДИЗАЙН-ПРОЕКТ]
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
