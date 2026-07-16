"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function LoadProof() {
  const t = useTranslations("hero");
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    let settled = false;

    const apply = (value: number) => {
      if (settled || !Number.isFinite(value) || value < 0) return;
      settled = true;
      setMs(Math.round(value));
    };

    const fallbackFromNavigation = () => {
      const nav = performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming | undefined;
      if (nav?.responseEnd) {
        apply(nav.responseEnd);
      }
    };

    let observer: PerformanceObserver | null = null;

    try {
      observer = new PerformanceObserver((list) => {
        const fcp = list
          .getEntries()
          .find((entry) => entry.name === "first-contentful-paint");
        if (fcp) {
          apply(fcp.startTime);
          observer?.disconnect();
        }
      });
      observer.observe({ type: "paint", buffered: true });
    } catch {
      fallbackFromNavigation();
    }

    const existing = performance
      .getEntriesByType("paint")
      .find((entry) => entry.name === "first-contentful-paint");
    if (existing) {
      apply(existing.startTime);
      observer?.disconnect();
    } else {
      const timeout = window.setTimeout(() => {
        if (!settled) {
          fallbackFromNavigation();
          observer?.disconnect();
        }
      }, 3000);

      return () => {
        window.clearTimeout(timeout);
        observer?.disconnect();
      };
    }

    return () => {
      observer?.disconnect();
    };
  }, []);

  if (ms === null) return null;

  return (
    <div className="flex flex-col items-end gap-1 text-right">
      <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[0.15em] text-[rgba(255,255,255,0.75)]">
        {t("paintedIn", { ms })}
      </p>
      <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-[0.2em] text-[rgba(255,255,255,0.3)]">
        {t("signature")}
      </p>
      <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] tracking-[0.2em] text-[rgba(255,255,255,0.3)]">
        {t("measured")}
      </p>
    </div>
  );
}
