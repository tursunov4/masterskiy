import Image from "next/image";

const aboutImages = [
  "/images/png/3.png",
  "/images/png/4.png",
  "/images/png/5.png",
  "/images/png/6.png",
  "/images/png/7.png",
  "/images/png/8.png",
];

const AboutSection = () => {
  return (
    <section className="py-14">
      <div className="container ">
        {/* SECTION TITLE */}
        <h2 className="mb-6 text-center text-2xl sm:text-3xl">О нас</h2>

        <div className="mb-8 flex flex-wrap justify-center gap-3 sm:gap-4">
          {aboutImages.map((src, idx) => (
            <div key={src} className="relative">
              <Image
                src={src}
                alt={`about ${idx + 1}`}
                width={160}
                height={110}
                className="object-contain  h-[90px] w-auto sm:h-[110px] sm:w-auto"
              />
            </div>
          ))}
        </div>

        {/* MAIN TITLE */}
        <h3 className="text-center text-xl sm:text-2xl md:text-[28px] tracking-[0.08em] uppercase">
          Мастерская мраморных интерьеров
        </h3>

        {/* QUOTES BLOCK */}
        <div className="mt-4 bg-[#c79b60] px-4 py-3 sm:px-6 sm:py-4 text-[13px] sm:text-[14px] leading-relaxed">
          <p>“Я беру камень и отсекаю всё лишнее.” — Микеланджело</p>
          <p>“И у камня есть сердце.” — японская пословица</p>
          <p>
            “Архитектура — это застывшая музыка” — Фридрих Вильгельм Йозеф
            Шеллинг
          </p>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-6 text-[14px] sm:text-[15px] leading-relaxed text-center sm:text-left">
          Мы не просто работаем с камнем — мы помогаем ему рассказать вашу
          историю. Историю, которая переживет века.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
