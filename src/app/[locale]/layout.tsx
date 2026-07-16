import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { IBM_Plex_Mono, Oswald, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

const oswald = Oswald({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-anton",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const SITE_TITLES: Record<Locale, string> = {
  en: "Ivan — Websites",
  ru: "Иван — Сайты",
  ro: "Ivan — Site-uri",
};

const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  ru: "ru_RU",
  ro: "ro_RO",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = hasLocale(routing.locales, raw)
    ? (raw as Locale)
    : routing.defaultLocale;

  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const title = SITE_TITLES[locale];
  const description = messages.hero.bio as string;

  // Set NEXT_PUBLIC_SITE_URL in production (e.g. https://yourdomain.com)
  const metadataBase = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  );

  return {
    metadataBase,
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ru: "/ru",
        ro: "/ro",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: OG_LOCALES[locale],
      url: `/${locale}`,
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${oswald.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-[#0A0A0A] text-white">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
