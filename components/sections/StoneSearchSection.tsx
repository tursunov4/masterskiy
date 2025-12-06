import Image from "next/image";
import Link from "next/link";

const StoneSearchSection = () => {
  return (
    <section className="border-y border-[#d4b95d] bg-[#f1f1f1] py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-stretch">
          {/* Chapdagi kartocha */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-md border border-[#777] bg-[#f5f3ee] px-6 py-5 text-sm text-[#333] leading-relaxed">
              <h3 className="mb-3 text-base sm:text-lg">
                Не нашли «свой» камень? Мы его найдем.
              </h3>
              <p>
                Наш каталог — лишь часть возможностей. Благодаря прямым
                договорам с карьерами со всего мира мы можем предложить вам
                практически любой натуральный камень.
              </p>
              <p className="mt-3">
                Даже если его нет в наличии — мы его добудем специально для вас!
              </p>

              <div className="mt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#c79b60] px-4 py-2 text-xs sm:text-sm uppercase tracking-[0.12em] text-[#2c2420] hover:bg-[#d9b976] transition"
                >
                  Расскажите, что ищете
                  <span className="text-base">»</span>
                </Link>
              </div>
            </div>
          </div>

          {/* O'ng tomondagi rasm */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative h-[220px] w-[190px] sm:h-[250px] sm:w-[210px]">
              <Image
                src="/images/stone-arches.png" // 🔁 o'zingdagi rasm bilan almashtir
                alt="Образцы натурального камня"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoneSearchSection;
