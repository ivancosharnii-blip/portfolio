import { setRequestLocale } from "next-intl/server";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { Work } from "@/components/work";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="overflow-x-hidden bg-[#0A0A0A]">
      <Hero />
      <Work />
      <About />
      <Contact />
      <SiteFooter />
    </main>
  );
}
