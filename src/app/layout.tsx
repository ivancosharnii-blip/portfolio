import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/** Root shell — html/body live in [locale]/layout for lang={locale}. */
export default function RootLayout({ children }: Props) {
  return children;
}
