export type MainColorKey =
  | "light"
  | "warm"
  | "gray"
  | "dark"
  | "black"
  | "other";
export type StyleType = "modern" | "classic" | "luxury";
export type MosaicType = "none" | "accent";

/**
 * Изделия ro'yxati (rasmdagiga o'xshash).
 * value -> APIga ketadigan qiymat (odatda slug).
 * Agar sizning backend boshqa slug ishlatsa, shu value'larni moslab qo'ying.
 */
export const PRODUCT_TYPES: Array<{ value: string; label: string }> = [
  { value: "", label: "Все изделия" },
  { value: "poly", label: "Полы" },
  { value: "steny", label: "Стены" },
  { value: "podokonniki", label: "Подоконники" },
  { value: "stoleshницы", label: "Столешницы" },
  { value: "lestницы", label: "Лестницы" },
  { value: "kaminy", label: "Камины" },
  { value: "vanny-i-spa", label: "Ванны и СПА" },
  { value: "basseyny", label: "Бассейны" },
  { value: "hamamy", label: "Хамамы" },
  { value: "mozaiki", label: "Мозаики" },
  { value: "fasady", label: "Фасады" },
  { value: "vhodnye-gruppy", label: "Входные группы" },
  { value: "cokol", label: "Цоколь" },
  { value: "bruschatka", label: "Брусчатка" },
  { value: "plitka", label: "Плитка" },
  { value: "ulichnye-stupeni", label: "Уличные ступени" },
  { value: "fontany", label: "Фонтаны" },
  { value: "skulptury", label: "Скульптуры" },
  { value: "skameyki", label: "Скамейки" },
  { value: "besedki", label: "Беседки" },
  { value: "dlya-hramov", label: "Для храмов" },
];

/**
 * Ranglar: label + hex + api_value
 * api_value -> APIga ketadi (HEX emas!)
 */
export const COLOR_SWATCHES: Array<{
  key: Exclude<MainColorKey, "other">;
  label: string;
  hex: string;
  api_value: string; // APIga shu ketadi
}> = [
  { key: "light", label: "Светлый", hex: "#d9cdc0", api_value: "light" },
  { key: "warm", label: "Тёплый", hex: "#c4a78c", api_value: "warm" },
  { key: "gray", label: "Серый", hex: "#b8b1aa", api_value: "gray" },

  { key: "dark", label: "Тёмный", hex: "#a46555", api_value: "dark" },
  { key: "black", label: "Чёрный", hex: "#000000", api_value: "black" },
];

export const OTHER_COLOR_BUTTON = {
  label: "Иные цвета",
  api_value: "other",
};

export const STYLE_OPTIONS: Array<{ value: StyleType; label: string }> = [
  { value: "modern", label: "Современный" },
  { value: "classic", label: "Классический" },
  { value: "luxury", label: "Роскошный" },
];

export const MOSAIC_OPTIONS: Array<{ value: MosaicType; label: string }> = [
  { value: "none", label: "Без мозаики" },
  { value: "accent", label: "Акцентная мозаика" },
];
