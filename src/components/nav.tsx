"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const SECTION_LINKS = [
  { href: "#work" as const, key: "work" as const },
  { href: "#about" as const, key: "about" as const },
  { href: "#contact" as const, key: "contact" as const },
];

function LocaleSwitcher({ onSelect }: { onSelect?: () => void }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (next: Locale) => {
    if (next === locale) return;
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.replace(pathname + hash, { locale: next });
    onSelect?.();
  };

  return (
    <div className="flex items-center gap-3">
      {routing.locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchLocale(code)}
          className={`font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.2em] transition-colors hover:text-white ${
            locale === code ? "text-white" : "text-[rgba(255,255,255,0.35)]"
          }`}
          aria-current={locale === code ? "true" : undefined}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

export function Nav() {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-5 md:px-12 bg-[rgba(10,10,10,0.7)] backdrop-blur">
        <Link
          href="/"
          className="font-[family-name:var(--font-anton)] font-bold uppercase tracking-[0.15em] text-white"
        >
          IVAN
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {SECTION_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.25em] text-[rgba(255,255,255,0.45)] transition-colors hover:text-white"
                >
                  {t(link.key)}
                </a>
              </li>
            ))}
          </ul>
          <LocaleSwitcher />
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="relative z-30 flex h-6 w-6 flex-col justify-center gap-[5px] md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span
            className={`block h-px w-6 bg-white transition-transform duration-300 origin-center ${
              isOpen ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-white transition-opacity duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-px w-6 bg-white transition-transform duration-300 origin-center ${
              isOpen ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-20 flex flex-col items-center justify-center gap-12 bg-[#0A0A0A] transition-opacity duration-300 md:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <ul className="flex flex-col items-center gap-8">
          {SECTION_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-[family-name:var(--font-anton)] font-bold text-3xl text-white uppercase tracking-[0.1em]"
                onClick={() => setIsOpen(false)}
              >
                {t(link.key)}
              </a>
            </li>
          ))}
        </ul>
        <LocaleSwitcher onSelect={() => setIsOpen(false)} />
      </div>
    </>
  );
}
