"use client";

import { useTranslations } from "next-intl";

export function About() {
  const t = useTranslations("about");
  const points = t.raw("points") as string[];

  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-[rgba(255,255,255,0.08)] bg-[#0A0A0A] px-6 py-24 md:px-12 md:py-32"
    >
      <div className="w-full max-w-[1100px]">
        <h2 className="font-[family-name:var(--font-anton)] font-bold uppercase">
          <span
            className="block leading-[1.05]"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.7)",
              fontSize: "clamp(24px, 4vw, 56px)",
            }}
          >
            {t("stroke")}
          </span>
          <span
            className="mt-2 block text-white leading-[1.05]"
            style={{ fontSize: "clamp(32px, 6vw, 88px)" }}
          >
            {t("solid")}
          </span>
        </h2>

        <ul className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {points.map((text, index) => (
            <li key={text}>
              <span className="block font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-[0.25em] text-[rgba(255,255,255,0.3)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 font-[family-name:var(--font-space-grotesk)] text-[15px] leading-relaxed text-[rgba(255,255,255,0.75)] md:text-base">
                {text}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-20 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.15em] text-[rgba(255,255,255,0.3)]">
          {t("stack")}
        </p>
      </div>
    </section>
  );
}
