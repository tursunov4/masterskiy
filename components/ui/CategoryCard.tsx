"use client";

import Image from "next/image";
import Link from "next/link";

export type CategoryCardItem = {
  id: string | number;
  title: string;
  href: string;
  image: string;
};

type Props = {
  item: CategoryCardItem;
  imageSizes?: string; // next/image sizes
  cardClassName?: string;
  titleClassName?: string;
};

export default function CategoryCard({
  item,
  imageSizes = "(min-width: 1024px) 260px, (min-width: 640px) 240px, 220px",
  cardClassName = "",
  titleClassName = "",
}: Props) {
  return (
    <div className="flex flex-col items-center text-center">
      <h2
        className={`mb-3 text-lg tracking-[0.12em] uppercase ${titleClassName}`}
      >
        {item.title}
      </h2>

      <Link
        href={item.href}
        className={[
          "group relative block",
          "w-[220px] sm:w-[240px] lg:w-[260px]",
          "aspect-square max-w-full",
          "overflow-hidden border border-black/20 bg-white",
          "transition-all duration-300 ease-out",
          "hover:-translate-y-1 hover:border-[#c79b60]",
          "hover:shadow-[0_14px_30px_rgba(0,0,0,0.25)]",
          "active:translate-y-0 active:shadow-[0_8px_18px_rgba(0,0,0,0.25)]",
          cardClassName,
        ].join(" ")}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes={imageSizes}
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />

        {/* vignette hover overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="h-full w-full bg-[radial-gradient(circle,rgba(0,0,0,0)_35%,rgba(0,0,0,0.45)_75%,rgba(0,0,0,0.65)_100%)]" />
        </div>
      </Link>
    </div>
  );
}
