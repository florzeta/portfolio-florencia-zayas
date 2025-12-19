import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Florencia Zayas Furnari | Portfolio",
  description:
    "Portafolio de Florencia Zayas Furnari: UX/UI, UX Writing y Frontend orientado a eCommerce y marketing digital.",
  metadataBase: new URL("https://portfolio-florencia-zayas.example.com"),
  keywords: [
    "Florencia Zayas Furnari",
    "UX Writing",
    "UX/UI",
    "Frontend React",
    "eCommerce",
    "Marketing digital",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Florencia Zayas Furnari | Portfolio",
    description:
      "Diseño de experiencias, contenido y frontend para productos digitales.",
    url: "/",
    siteName: "Florencia Zayas Furnari",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Florencia Zayas Furnari | Portfolio",
    description:
      "Portafolio UX/UI, UX Writing y Frontend orientado a eCommerce.",
  },
};

export const viewport = {
  themeColor: "#141e2a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.variable} bg-background text-foreground antialiased`}
      >
        <a
          href="#contenido-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-50 focus:rounded-md focus:bg-[--color-surface] focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido-principal" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
