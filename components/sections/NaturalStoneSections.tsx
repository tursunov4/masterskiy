import Image from "next/image";

type CategoryGroup = {
  title: string;
  items: { label: string; highlighted?: boolean }[];
};

const interiorGroups: CategoryGroup[] = [
  {
    title: "ПОВЕРХНОСТИ",
    items: [{ label: "ПОЛЫ" }, { label: "СТЕНЫ" }, { label: "ПОДОКОННИКИ" }],
  },
  {
    title: "ИНТЕРЬЕРНЫЕ РЕШЕНИЯ",
    items: [
      { label: "СТОЛЕШНИЦЫ" },
      { label: "ЛЕСТНИЦЫ" },
      { label: "КАМИНЫ" },
      { label: "ВАННЫ И SPA", highlighted: true },
    ],
  },
  {
    title: "ВОДНЫЕ ПРОСТРАНСТВА",
    items: [{ label: "БАССЕЙНЫ" }, { label: "ХАММАМЫ" }],
  },
  {
    title: "ДЕКОРАТИВНЫЕ ЭЛЕМЕНТЫ",
    items: [{ label: "МОЗАИКА" }],
  },
];

const exteriorGroups: CategoryGroup[] = [
  {
    title: "ФАСАДЫ",
    items: [
      { label: "АРХИТЕКТУРНЫЕ ЭЛЕМЕНТЫ" },
      { label: "ВХОДНЫЕ ГРУППЫ" },
      { label: "ЦОКОЛЬ" },
    ],
  },
  {
    title: "МОЩЕНИЯ И ПОКРЫТИЯ",
    items: [
      { label: "БРУСЧАТКА" },
      { label: "ПЛИТКА" },
      { label: "УЛИЧНЫЕ СТУПЕНИ" },
    ],
  },
  {
    title: "ЛАНДШАФТНЫЕ ОБЪЕКТЫ",
    items: [
      { label: "ФОНТАНЫ" },
      { label: "СКУЛЬПТУРЫ" },
      { label: "СКАМЕЙКИ" },
      { label: "БЕСЕДКИ" },
    ],
  },
];

const CategoryColumn = ({ groups }: { groups: CategoryGroup[] }) => {
  return (
    <div className="flex flex-col gap-4">
      {groups.map((group) => (
        <div key={group.title} className="flex flex-col gap-2">
          <span className="text-[11px] tracking-[0.15em] uppercase">
            {group.title}
          </span>
          <div className="flex flex-col gap-1">
            {group.items.map((item) => (
              <button
                key={item.label}
                className={`flex w-full items-center justify-center border border-black px-4 py-2 text-[12px] tracking-[0.12em] uppercase transition ${
                  item.highlighted
                    ? "bg-[#c79b60] text-[#231f20]"
                    : "bg-white hover:bg-[#f3eee4]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const NaturalStoneSections = () => {
  return (
    <section className="bg-[#f5f0e7] py-14">
      <div className="container mx-auto flex flex-col gap-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] items-start">
          {/* Left: text + image */}
          <div>
            <div className="flex items-start gap-6 mb-4">
              <span className="text-4xl sm:text-5xl text-[#c79b60] font-light">
                01
              </span>
              <div>
                <h2 className="text-[16px] sm:text-[18px] tracking-[0.15em] uppercase">
                  НАТУРАЛЬНЫЙ КАМЕНЬ ДЛЯ ВНУТРЕННЕЙ ОТДЕЛКИ
                </h2>
                <p className="mt-2 text-[13px] sm:text-[14px] leading-relaxed max-w-xl">
                  От изысканных мраморных полов до роскошных каменных столешниц
                  — мы предлагаем комплексные решения для вашего интерьера.
                  Единство материала в разных зонах создает особую атмосферу
                  уюта и премиальности.
                </p>
              </div>
            </div>

            <div className="relative mt-4 h-[230px] sm:h-[260px] lg:h-[290px]">
              <Image
                src="/images/png/1.png" // o'zingdagi rasm
                alt="Интерьер с камнем"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: categories */}
          <div className="flex justify-center lg:justify-end">
            <CategoryColumn groups={interiorGroups} />
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)] items-start">
          {/* Left: categories */}
          <div className="flex justify-center lg:justify-start">
            <CategoryColumn groups={exteriorGroups} />
          </div>

          {/* Right: text + image */}
          <div>
            <div className="flex items-start gap-6 mb-4">
              <span className="text-4xl sm:text-5xl text-[#c79b60] font-light">
                02
              </span>
              <div>
                <h2 className="text-[16px] sm:text-[18px] tracking-[0.15em] uppercase">
                  НАТУРАЛЬНЫЙ КАМЕНЬ ДЛЯ ВНЕШНЕЙ ОТДЕЛКИ
                </h2>
                <p className="mt-2 text-[13px] sm:text-[14px] leading-relaxed max-w-xl">
                  От элегантных фасадов до долговечных мощеных площадок —
                  натуральный камень подчеркивает статус вашего дома. Каждый
                  элемент экстерьера становится частью цельного архитектурного
                  ансамбля, сохраняя безупречный вид на десятилетия.
                </p>
              </div>
            </div>

            <div className="relative mt-4 h-[230px] sm:h-[260px] lg:h-[290px]">
              <Image
                src="/images/png/2.png"
                alt="Экстерьер с камнем"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NaturalStoneSections;
