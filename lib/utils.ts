// lib/utils.ts - Глобальные утилиты

/**
 * Форматирует цену в рубли
 * @param price - Цена в виде строки или числа
 * @returns Отформатированная строка цены
 */
export function formatPriceRub(price?: string | null): string {
  if (!price) return "Цена: по запросу";
  const n = Number(price);
  if (Number.isNaN(n)) return `от ${price} руб.`;
  return `от ${new Intl.NumberFormat("ru-RU").format(n)} руб.`;
}

/**
 * Форматирует цену в рубли (короткий вариант)
 * @param price - Цена в виде строки или числа
 * @returns Отформатированная строка цены без "от"
 */
export function formatPriceRubShort(price?: string | null): string {
  if (!price) return "";
  const n = Number(price);
  if (Number.isNaN(n)) return price;
  return new Intl.NumberFormat("ru-RU").format(n);
}

/**
 * Форматирует цену для отображения в карточках
 * @param price - Цена в виде строки или числа
 * @returns Отформатированная строка цены
 */
export function formatPriceForCard(price?: string | null): string {
  if (!price) return "Цена: —";
  const n = Number(price);
  if (Number.isNaN(n)) return `Цена: ${price} руб.`;
  return `Цена: ${new Intl.NumberFormat("ru-RU").format(n)} руб.`;
}

/**
 * Преобразует стиль из API в читаемый формат
 * @param style - Стиль из API
 * @returns Читаемое название стиля
 */
export function formatStyle(style?: string | null): string {
  const s = (style ?? "").toLowerCase();
  if (!s) return "—";
  if (s === "classic") return "Классический";
  if (s === "modern") return "Современный";
  if (s === "luxury") return "Роскошный";
  if (s === "vintage") return "Винтаж";
  if (s === "academic") return "Академический";
  return style!;
}

/**
 * Форматирует цену для мрамора (с /м²)
 * @param price - Цена в виде строки или числа
 * @returns Отформатированная строка цены с единицей измерения
 */
export function formatPriceRubPerM2(price?: string | null): string {
  if (!price) return "Цена: по запросу";
  const n = Number(price);
  if (Number.isNaN(n)) return `от ${price} руб./м²`;
  return `от ${new Intl.NumberFormat("ru-RU").format(n)} руб./м²`;
}

