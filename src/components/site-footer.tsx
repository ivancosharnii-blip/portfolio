"use client";

import { useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("footer");
  const marquee = `${t("marquee")}${t("marquee")}`;

  return (
    <footer className="bg-[#0A0A0A]">
      <div className="pointer-events-none select-none overflow-hidden py-6">
        <div className="footer-marquee flex w-max">
          <span
            className="font-[family-name:var(--font-anton)] font-bold uppercase whitespace-nowrap leading-none"
            style={{
              fontSize: "clamp(48px, 10vw, 140px)",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.15)",
            }}
          >
            {marquee}
          </span>
          <span
            className="font-[family-name:var(--font-anton)] font-bold uppercase whitespace-nowrap leading-none"
            aria-hidden
            style={{
              fontSize: "clamp(48px, 10vw, 140px)",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.15)",
            }}
          >
            {marquee}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.08)] px-6 py-8 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.2em] text-[rgba(255,255,255,0.3)] md:px-12">
        <span>{t("left")}</span>
        <span>{t("right")}</span>
      </div>
    </footer>
  );
}
