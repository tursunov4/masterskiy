"use client";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
};

export default function SectionHeader({
  title,
  subtitle,
  centered = true,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={className}>
      <div
        className={`flex flex-col gap-2 py-4 ${
          centered ? "items-center text-center" : "items-start"
        }`}
      >
        <div className="h-[2px] w-24 bg-[#c79b60]" />
        <h1 className="text-xl sm:text-2xl md:text-3xl tracking-[0.18em] uppercase">
          {title}
        </h1>
      </div>

      {subtitle && (
        <div className="bg-[#c79b60] py-2 text-center text-[11px] sm:text-sm tracking-[0.16em] uppercase text-[#2c2420]">
          {subtitle}
        </div>
      )}
    </div>
  );
}
