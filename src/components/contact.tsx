"use client";

import { useTranslations } from "next-intl";

const LINKS = [
  {
    label: "ivancosharnii@gmail.com",
    href: "mailto:ivancosharnii@gmail.com",
  },
  {
    label: "@vancukosha",
    href: "https://t.me/vancukosha",
    external: true,
  },
] as const;

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section
      id="contact"
      className="flex scroll-mt-24 flex-col items-center border-t border-[rgba(255,255,255,0.08)] bg-[#0A0A0A] px-6 py-24 text-center md:py-32"
    >
      <h2
        className="font-[family-name:var(--font-anton)] font-bold uppercase leading-[1.05] text-white"
        style={{ fontSize: "clamp(32px, 6vw, 88px)" }}
      >
        {t("heading")}
      </h2>

      <p className="mt-6 max-w-md font-[family-name:var(--font-space-grotesk)] text-[15px] text-[rgba(255,255,255,0.45)]">
        {t("sub")}
      </p>

      <div className="mt-12 flex flex-col items-center gap-4">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            {...("external" in link && link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="font-[family-name:var(--font-anton)] font-bold uppercase text-white border-b border-solid border-transparent transition-[border-color] duration-300 hover:border-white motion-reduce:transition-none"
            style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
