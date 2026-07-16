"use client";

import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";
import { LoadProof } from "./LoadProof";
import { Nav } from "./nav";
import { ScrambleText } from "./scramble-text";
import { Typewriter } from "./typewriter";

const DotWave = dynamic(() => import("./DotWave"), { ssr: false });

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const words = t.raw("words") as string[];
  const charset = locale === "ru" ? "cyrillic" : "latin";

  return (
    <>
      <Nav />

      <header className="relative flex h-screen h-[100svh] w-full items-center justify-center overflow-hidden bg-[#0A0A0A]">
        <div className="pointer-events-none absolute inset-0 z-0">
          <DotWave />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 32% 26% at 50% 50%, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.45) 55%, transparent 85%)",
          }}
          aria-hidden
        />

        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 select-none px-4 text-center">
          <h1
            className="font-[family-name:var(--font-anton)] font-bold uppercase leading-none tracking-[0.06em] md:whitespace-nowrap"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.7)",
              fontSize:
                locale === "ru"
                  ? "clamp(16px, 4.2vw, 70px)"
                  : "clamp(20px, 4.5vw, 70px)",
            }}
          >
            {t("line")}
          </h1>
          <h2
            className="mt-[0.1em] font-[family-name:var(--font-anton)] font-bold uppercase text-white leading-none tracking-[-0.02em]"
            style={{ fontSize: "clamp(48px, 12vw, 180px)" }}
          >
            <ScrambleText words={words} charset={charset} />
          </h2>
        </div>

        <div className="absolute bottom-8 left-6 z-10 max-w-[380px] font-[family-name:var(--font-space-grotesk)] text-sm leading-relaxed text-[rgba(255,255,255,0.45)] md:bottom-12 md:left-12 md:max-w-[420px] md:text-base">
          <Typewriter key={locale} text={t("bio")} />
        </div>

        <div className="absolute bottom-8 right-6 z-10 flex flex-col items-end gap-2 md:bottom-12 md:right-12">
          <LoadProof />
        </div>
      </header>
    </>
  );
}
