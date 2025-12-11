import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "SpaMed - Medical Spa & Laser Center | Rejuvenecimiento Facial & Corporal",
  description:
    "Centro de estética y medicina estética especializado en tratamientos faciales, corporales y láser. Rejuvenecimiento, modelado corporal, depilación láser y más. Profesionales certificados.",
  keywords:
    "medical spa, centro estético, tratamientos faciales, tratamientos corporales, depilación láser, rejuvenecimiento, medicina estética",
  authors: [{ name: "SpaMed" }],
  openGraph: {
    title: "SpaMed - Medical Spa & Laser Center",
    description:
      "Tu destino para el rejuvenecimiento y bienestar. Tratamientos estéticos de vanguardia.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpaMed - Medical Spa & Laser Center",
    description: "Tu destino para el rejuvenecimiento y bienestar.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}
