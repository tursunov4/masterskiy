import Image from "next/image";

type EcosystemItem = {
  id: number;
  icon: string;
  title: string;
  text: string[];
  image: string;
};

const items: EcosystemItem[] = [
  {
    id: 1,
    icon: "/images/svg/11.svg",
    title: "ПРЯМЫЕ КОНТРАКТЫ С КАРЬЕРАМИ СО ВСЕГО МИРА",
    text: [
      "Италия: Каррара, Каррар Уайт, Статуарио",
      "Узбекистан: уникальные кремнии и граниты",
      "Турция: травертины и мраморы",
      "Индия: граниты и сланцы",
      "Греция: белые мраморы",
      "Африка: эксклюзивные граниты",
      "Это гарантирует доступ к редчайшим блокам камня по оптимальным ценам.",
    ],
    image: "/images/png/eco1.png",
  },
  {
    id: 2,
    icon: "/images/svg/12.svg",
    title: "СВОЯ КОМАНДА ХУДОЖНИКОВ-МОНУМЕНТАЛИСТОВ",
    text: [
      "Наш творческий костяк — выпускники ведущих художественных вузов России:",
      "• МГХПА им. Строганова — монументальная живопись и скульптура",
      "• МГХАИ им. Сурикова — академическое искусство",
      "• ВГИК им. Герасимова — графика и визуальный образ",
      "Средний стаж работы наших мастеров — 15 лет, многие имеют ученые степени.",
    ],
    image: "/images/png/eco2.png",
  },
  {
    id: 3,
    icon: "/images/svg/13.svg",
    title: "СОВРЕМЕННЫЕ ТЕХНОЛОГИИ ОБРАБОТКИ",
    text: [
      "Сочетаем вековые традиции с инновациями:",
      "• 5-осевые станки ЧПУ для сложных 3D-форм",
      "• Роботизированные комплексы для высокоточных операций",
      "• Контрольно-измерительные системы с точностью до 0,01 мм",
      "• Печи и установки для деликатной обработки крупных материалов",
      "Такое оборудование — наш щит, камень — наш материал, а ваше доверие — наша главная ценность.",
    ],
    image: "/images/png/eco3.png",
  },
  {
    id: 4,
    icon: "/images/svg/14.svg",
    title: "ГЕОГРАФИЯ ПРОЕКТОВ",
    text: [
      "От всей России — от Калининграда до Владивостока",
      "До стран СНГ — Казахстан, Беларусь, Азербайджан",
      "Европа — резиденции в Швейцарии, Франции, Великобритании",
      "Ближний Восток — частные дворцы в ОАЭ, Катаре",
      "Международная логистика, таможенное сопровождение и собственные монтажные бригады в ключевых регионах — ваша уверенность в реализации проекта любого масштаба.",
    ],
    image: "/images/png/eco4.png",
  },
  {
    id: 5,
    icon: "/images/svg/15.svg",
    title: "ПОЛНАЯ КОНФИДЕНЦИАЛЬНОСТЬ",
    text: [
      "Мы понимаем ценность вашей приватности:",
      "• NDA со всеми сотрудниками и подрядчиками",
      "• Закрытые производственные помещения и отдельные шоу-румы",
      "• Персональный менеджер и команда под каждого клиента",
      "Для нас важно, чтобы ваш дом оставался таким же интимным пространством, как и задумывалось.",
    ],
    image: "/images/png/eco5.png",
  },
];

const EcosystemSection = () => {
  return (
    <section className="pt-12">
      <div className="">
        <div className="container">
          <h2 className="mb-8 text-center text-lg sm:text-xl tracking-[0.16em] uppercase">
            НАША ЭКОСИСТЕМА:
          </h2>
        </div>

        <div className="space-y-8">
          {items.map((item, index) => (
            <div className={index % 2 === 0 ? "bg-[#f5f5f5] py-4" : "py-4"}>
              <div className="container">
                <div
                  key={item.id}
                  className="grid gap-4 border-b border-[#e0d6c6] pb-6 last:border-b-0 lg:grid-cols-[40px_minmax(0,1.7fr)_minmax(0,0.9fr)] lg:gap-6"
                >
                  <div className="hidden lg:flex items-start justify-center pt-1">
                    <Image
                      src={item.icon}
                      alt=""
                      width={26}
                      height={26}
                      className="object-contain"
                    />
                  </div>

                  {/* Text */}
                  <div className="lg:col-span-1">
                    {/* mobile icon */}
                    <div className="mb-2 flex items-center gap-2 lg:hidden">
                      <Image
                        src={item.icon}
                        alt=""
                        width={22}
                        height={22}
                        className="object-contain"
                      />
                      <span className="text-[11px] uppercase tracking-[0.14em] text-[#555]">
                        {item.title}
                      </span>
                    </div>

                    {/* desktop title */}
                    <h3 className="hidden lg:block text-[13px] sm:text-[14px] uppercase tracking-[0.14em] text-[#333] mb-2">
                      {item.title}
                    </h3>

                    {/* text paragraphs */}
                    <div className="text-[13px] leading-relaxed text-[#444] space-y-1">
                      {item.text.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>

                  <div className="relative mt-2 h-[150px] sm:h-[170px] lg:h-[185px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain object-right"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
