"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Phone, Mail, MessageCircle, X } from "lucide-react";

type Props = {
  phone?: string;
  email?: string;
  whatsappUrl?: string;
  onOpenRequest?: () => void;
  position?: "left" | "right";
};

type ActionKey = "phone" | "email" | "whatsapp";

export default function FloatingContactWidget({
  phone,
  email,
  whatsappUrl,
  onOpenRequest,
  position = "left",
}: Props) {
  const actions: ActionKey[] = useMemo(
    () => ["phone", "email", "whatsapp"],
    []
  );

  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  // icon crossfade trigger
  const [iconAnimKey, setIconAnimKey] = useState(0);

  // 5 sekundda ikonka almashsin
  useEffect(() => {
    const t = window.setInterval(() => {
      setActiveIdx((i) => (i + 1) % actions.length);
      setIconAnimKey((k) => k + 1);
    }, 5000);
    return () => window.clearInterval(t);
  }, [actions.length]);

  // tashqariga bosganda yopish
  const rootRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // ESC bosilganda yopish
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const active = actions[activeIdx];

  const mainIcon = () => {
    if (active === "phone") return <Phone className="w-5 h-5" />;
    if (active === "email") return <Mail className="w-5 h-5" />;
    return <MessageCircle className="w-5 h-5" />;
  };

  const side = position === "left" ? "left-[4px]" : "right-[4px]";

  const phoneClean = phone ? phone.replace(/\s|\(|\)|-/g, "") : "";
  const telHref = phoneClean ? `tel:${phoneClean}` : undefined;

  const ActionItem = ({
    children,
    href,
    onClick,
    delayMs,
    asButton,
  }: {
    children: React.ReactNode;
    href?: string;
    onClick?: (e: any) => void;
    delayMs: number;
    asButton?: boolean;
  }) => {
    const base =
      "flex items-center gap-2 bg-[#c0a57c] text-[#231f20] px-3 py-2 rounded-full shadow-md text-[12px] tracking-[0.08em] uppercase hover:bg-[#d8b976] transition-colors";

    const anim = open
      ? "opacity-100 translate-y-0 scale-100"
      : "opacity-0 translate-y-2 scale-[0.98]";

    const style: React.CSSProperties = {
      transitionProperty: "transform, opacity",
      transitionDuration: "260ms",
      transitionTimingFunction: "cubic-bezier(0.2, 0.9, 0.2, 1)",
      transitionDelay: open ? `${delayMs}ms` : "0ms",
    };

    if (asButton) {
      return (
        <button
          type="button"
          onClick={onClick}
          className={`${base} w-full text-left ${anim}`}
          style={style}
        >
          {children}
        </button>
      );
    }

    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={href || "#"}
        onClick={onClick}
        className={`${base} ${anim}`}
        style={style}
      >
        {children}
      </a>
    );
  };

  return (
    <>
      {/* local CSS (component ichida) */}
      <style jsx>{`
        @keyframes fcw-breathe {
          0% {
            transform: translateZ(0) scale(1);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
          }
          50% {
            transform: translateZ(0) scale(1.03);
            box-shadow: 0 14px 34px rgba(0, 0, 0, 0.35);
          }
          100% {
            transform: translateZ(0) scale(1);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
          }
        }

        @keyframes fcw-icon {
          0% {
            opacity: 0;
            transform: scale(0.92);
            filter: blur(0.2px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
        }

        @keyframes fcw-press {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(0.96);
          }
        }
      `}</style>

      <div
        ref={rootRef}
        className={`fixed ${side} bottom-6 z-[70] select-none`}
      >
        {/* ACTIONS PANEL */}
        <div className="mb-3 flex flex-col gap-2 items-start">
          {/* 1) Call */}
          <ActionItem
            href={telHref}
            onClick={(e) => {
              if (!telHref) e.preventDefault();
              setOpen(false);
            }}
            delayMs={0}
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/10">
              <Phone className="w-4 h-4" />
            </span>
            Заказать звонок
          </ActionItem>

          {/* 2) Request */}
          <ActionItem
            asButton
            onClick={() => {
              setOpen(false);
              onOpenRequest?.();
            }}
            delayMs={70}
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/10">
              <Mail className="w-4 h-4" />
            </span>
            Написать заявку
          </ActionItem>

          {/* 3) WhatsApp */}
          <ActionItem
            href={whatsappUrl}
            onClick={(e) => {
              if (!whatsappUrl) e.preventDefault();
              setOpen(false);
            }}
            delayMs={140}
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/10">
              <MessageCircle className="w-4 h-4" />
            </span>
            Написать в WhatsApp
          </ActionItem>
        </div>

        {/* MAIN FLOATING BUTTON */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Contact widget"
          className={[
            "relative flex items-center justify-center",
            "h-14 w-14 rounded-full",
            "bg-[#c0a57c] text-[#231f20]",
            "outline-none",
          ].join(" ")}
          style={{
            animation: open ? "none" : "fcw-breathe 2.8s ease-in-out infinite",
            transition: "transform 200ms ease, box-shadow 200ms ease",
          }}
          onMouseDown={(e) => {
            (e.currentTarget as HTMLButtonElement).style.animation =
              "fcw-press 90ms ease forwards";
          }}
          onMouseUp={(e) => {
            (e.currentTarget as HTMLButtonElement).style.animation = open
              ? "none"
              : "fcw-breathe 2.8s ease-in-out infinite";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.animation = open
              ? "none"
              : "fcw-breathe 2.8s ease-in-out infinite";
          }}
        >
          {/* inner ring */}
          <span className="absolute inset-1 rounded-full border border-black/15" />

          <span
            className="absolute -inset-2 rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(192,165,124,0.55) 0%, rgba(192,165,124,0) 70%)",
            }}
          />

          {/* Icon crossfade */}
          <span
            key={open ? -1 : iconAnimKey}
            className="relative"
            style={{
              animation: "fcw-icon 180ms ease-out both",
            }}
          >
            {open ? <X className="w-5 h-5" /> : mainIcon()}
          </span>
        </button>
      </div>
    </>
  );
}
