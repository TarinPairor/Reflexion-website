import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://reflexion.sg"),
  title: "Reflexion — Care that feels closer",
  description: "Reflexion helps families caring for ageing parents stay connected through daily conversation, gentle routine support and meaningful caregiver context.",
  openGraph: {
    title: "Reflexion — Care that feels closer",
    description: "A quiet presence for ageing loved ones and the families who care for them.",
    type: "website",
    locale: "en_SG",
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f4efe6" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
