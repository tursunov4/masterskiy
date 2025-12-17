"use client";

type Props = {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
  loading?: boolean;

  onPrev: () => void;
  onNext: () => void;

  // ixtiyoriy: "Показать еще"
  showMore?: boolean;
  onLoadMore?: () => void;

  // agar false bo‘lsa butunlay yashiradi
  visible?: boolean;

  // button matnlari (xohlasang)
  moreLabel?: string;
  loadingLabel?: string;
};

export default function PaginationControls({
  page,
  hasPrev,
  hasNext,
  loading = false,
  onPrev,
  onNext,
  showMore = false,
  onLoadMore,
  visible = true,
  moreLabel = "Показать еще",
  loadingLabel = "Загрузка...",
}: Props) {
  // product kam bo‘lsa -> ko‘rinmasin
  const showControls = visible && (hasPrev || hasNext);

  if (!showControls) return null;

  const prevDisabled = !hasPrev || loading;
  const nextDisabled = !hasNext || loading;

  return (
    <>
      {/* SHOW MORE -> faqat hasNext bo‘lsa */}
      {showMore && hasNext && (
        <button
          onClick={onLoadMore}
          disabled={loading || !onLoadMore}
          className={`mt-8 flex w-full items-center justify-center py-2 text-[13px] uppercase tracking-[0.14em] transition
            ${
              loading
                ? "bg-black/10 text-black/40 cursor-not-allowed"
                : "bg-[#c79b60] text-[#2c2420] hover:bg-[#d8b976]"
            }`}
        >
          {loading ? loadingLabel : moreLabel}
        </button>
      )}

      {/* PAGINATION */}
      <div className="mt-5 flex items-center justify-center gap-2 pb-2">
        <button
          onClick={onPrev}
          disabled={prevDisabled}
          className={`flex h-9 w-9 items-center justify-center rounded-[6px] border text-sm
            ${
              prevDisabled
                ? "border-black/20 bg-black/5 text-black/30 cursor-not-allowed"
                : "border-black/40 bg-[#c79b60] text-[#2c2420] hover:bg-[#d8b976]"
            }`}
        >
          ←
        </button>

        <span className="px-2 text-sm text-black/70">{page}</span>

        <button
          onClick={onNext}
          disabled={nextDisabled}
          className={`flex h-9 w-9 items-center justify-center rounded-[6px] border text-sm
            ${
              nextDisabled
                ? "border-black/20 bg-black/5 text-black/30 cursor-not-allowed"
                : "border-black/40 bg-[#c79b60] text-[#2c2420] hover:bg-[#d8b976]"
            }`}
        >
          →
        </button>
      </div>
    </>
  );
}
