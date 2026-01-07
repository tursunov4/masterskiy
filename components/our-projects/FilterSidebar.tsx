"use client";

import React from "react";
import {
  COLOR_SWATCHES,
  MOSAIC_OPTIONS,
  OTHER_COLOR_BUTTON,
  PRODUCT_TYPES,
  STYLE_OPTIONS,
  type MainColorKey,
  type MosaicType,
  type StyleType,
} from "@/lib/our-projects/filters";

function Divider() {
  return <div className="my-3 h-px w-full bg-black/20" />;
}

function Swatch({
  active,
  hex,
  title,
  onClick,
}: {
  active: boolean;
  hex: string;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={[
        "h-[26px] w-[34px] border transition",
        active
          ? "border-black ring-1 ring-black/30"
          : "border-black/40 hover:border-black",
      ].join(" ")}
      style={{ backgroundColor: hex }}
    />
  );
}

export default function FilterSidebar(props: {
  // изделие
  productType: string;
  setProductType: React.Dispatch<React.SetStateAction<string>>;

  // color: UI key + API value
  mainColorKey: MainColorKey | null;
  setMainColorKey: React.Dispatch<React.SetStateAction<MainColorKey | null>>;
  mainColorApiValue: string | null; // APIga ketadigan qiymat
  setMainColorApiValue: React.Dispatch<React.SetStateAction<string | null>>;

  // style
  styles: StyleType[];
  toggleStyle: (s: StyleType) => void;

  // mosaic
  mosaic: MosaicType | null;
  setMosaic: React.Dispatch<React.SetStateAction<MosaicType | null>>;

  // counts
  foundCount: number;

  // reset
  onReset: () => void;
}) {
  const {
    productType,
    setProductType,
    mainColorKey,
    setMainColorKey,
    setMainColorApiValue,
    styles,
    toggleStyle,
    mosaic,
    setMosaic,
    foundCount,
    onReset,
  } = props;

  return (
    <aside className="w-full shrink-0 border border-black/60 bg-[#f4f4f4] px-3 py-3 text-sm lg:w-[260px]">
      {/* Изделие */}
      <div className="">
        <p className="mb-2 text-center font-serif text-[16px] text-black/80">
          Изделие
        </p>

        <select
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          className="w-full border border-black/50 bg-white px-2 py-1 text-[13px] outline-none focus:border-black"
        >
          {PRODUCT_TYPES.map((x) => (
            <option key={x.value} value={x.value}>
              {x.label}
            </option>
          ))}
        </select>

        <Divider />

        {/* Основной цвет */}
        <p className="mb-2 text-center font-serif text-[16px] text-black/80">
          Основной цвет
        </p>

        <div className="flex flex-wrap justify-center gap-1">
          {COLOR_SWATCHES.map((c) => (
            <Swatch
              key={c.key}
              hex={c.hex}
              title={`${c.label} (${c.hex})`}
              active={mainColorKey === c.key}
              onClick={() => {
                setMainColorKey((prev) => (prev === c.key ? null : c.key));
                setMainColorApiValue((prev) =>
                  prev === c.api_value ? null : c.api_value
                );
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            setMainColorKey((prev) => (prev === "other" ? null : "other"));
            setMainColorApiValue((prev) =>
              prev === OTHER_COLOR_BUTTON.api_value
                ? null
                : OTHER_COLOR_BUTTON.api_value
            );
          }}
          className={[
            "mt-2 w-full py-1 text-center",
            "font-serif text-[15px] text-black/80 hover:bg-[#e7e7e7] transition",
            mainColorKey === "other" ? "" : "",
          ].join(" ")}
        >
          {OTHER_COLOR_BUTTON.label}
        </button>

        <Divider />

        {/* Стиль выполнения */}
        <p className="mb-2 text-center font-serif text-[16px] text-black/80">
          Стиль выполнения
        </p>

        <div className="space-y-1 px-1">
          {STYLE_OPTIONS.map((s) => (
            <label
              key={s.value}
              className="flex items-center gap-2 text-[13px]"
            >
              <input
                type="checkbox"
                checked={styles.includes(s.value)}
                onChange={() => toggleStyle(s.value)}
                className="accent-black"
              />
              {s.label}
            </label>
          ))}
        </div>

        <Divider />

        {/* Мозаичные элементы */}
        <p className="mb-2 text-center font-serif text-[16px] text-black/80">
          Мозаичные элементы
        </p>

        <div className="space-y-1 px-1">
          {MOSAIC_OPTIONS.map((m) => (
            <label
              key={m.value}
              className="flex items-center gap-2 text-[13px]"
            >
              <input
                type="radio"
                name="mosaic"
                checked={mosaic === m.value}
                onChange={() =>
                  setMosaic((prev) => (prev === m.value ? null : m.value))
                }
                className="accent-black"
              />
              {m.label}
            </label>
          ))}
        </div>

        <div className="mt-3 flex justify-center">
          <button
            type="button"
            onClick={onReset}
            className="border border-black/50 bg-[#d9c7a4] px-4 py-1 text-[12px] text-black/80 hover:bg-[#cdb991] transition"
          >
            Очистить фильтр <span className="ml-1">»</span>
          </button>
        </div>
      </div>

      <div className="mt-2 text-center text-[12px] text-black/60">
        Найдено: {foundCount}
      </div>
    </aside>
  );
}
