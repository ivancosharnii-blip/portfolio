"use client";

import { useTranslations } from "next-intl";

const CASES = [
  {
    index: "01",
    href: "https://habrynets.art/",
    key: "danil" as const,
  },
  {
    index: "02",
    href: "https://parfum-ivory.vercel.app",
    key: "erba" as const,
  },
] as const;

export function Work() {
  const t = useTranslations("work");

  return (
    <section
      id="work"
      className="scroll-mt-24 bg-[#0A0A0A] px-6 py-24 md:px-12 md:py-32"
    >
      <p className="mb-20 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-[0.3em] text-[rgba(255,255,255,0.3)]">
        {t("label")}
      </p>

      <div className="max-w-[1200px]">
        {CASES.map((entry) => {
          const meta = t.raw(`${entry.key}.meta`) as string[];

          return (
            <a
              key={entry.index}
              href={entry.href}
              target="_blank"
              rel="noopener noreferrer"
              className="work-case group grid grid-cols-1 gap-8 border-t border-[rgba(255,255,255,0.1)] py-16 md:grid-cols-12 md:gap-6 md:py-24"
            >
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.2em] text-[rgba(255,255,255,0.3)] md:col-span-1">
                {entry.index}
              </span>

              <div className="md:col-span-7">
                <h3
                  className="work-case-title font-[family-name:var(--font-anton)] font-bold uppercase leading-none tracking-[-0.02em] text-white"
                  style={{ fontSize: "clamp(36px, 6vw, 96px)" }}
                >
                  {t(`${entry.key}.title`)}
                </h3>
                <p className="mt-6 max-w-[520px] font-[family-name:var(--font-space-grotesk)] text-[15px] leading-relaxed text-[rgba(255,255,255,0.7)] md:text-base">
                  {t(`${entry.key}.description`)}
                </p>
              </div>

              <div className="md:col-span-4">
                <ul className="space-y-2 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.15em] text-[rgba(255,255,255,0.4)]">
                  {meta.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <span className="work-case-view mt-6 block font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-[0.25em] text-white">
                  {t("viewLive")}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
