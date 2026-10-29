import type { Metadata, Viewport } from "next";
import { Manrope, Bodoni_Moda, Cinzel, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PackagingBackground } from "@/components/layout/PackagingBackground";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { MouseGlowFollower } from "@/components/ui/MouseGlowFollower";
import { SplashScreen } from "@/components/ui/SplashScreen";
import { companyData } from "@/data/company";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f8fafc",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Arifa Pack — Packaging & Food Containers LLC (UAE)",
    default: "Arifa Pack — Premium Sustainable Packaging & Aluminium Containers (UAE)",
  },
  description:
    "Official website of Arifa Packing & Packaging LLC (Ajman, UAE). Manufacturers of premium aluminium food containers, catering platters, heavy-duty foil rolls, and microwave packaging.",
  keywords: [
    "Arifa Pack",
    "Arifa Packing & Packaging LLC",
    "Aluminium food containers UAE",
    "Aluminium foil rolls Ajman",
    "Catering platters",
    "Aluminium pots",
    "Microwave containers PP",
    "Disposable cutlery UAE",
    "Food packaging manufacturer Middle East",
  ],
  authors: [{ name: "Arifa Packing & Packaging LLC", url: "https://www.arifapack.com" }],
  creator: "Arifa Pack",
  publisher: "Arifa Group",
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://www.arifapack.com",
    siteName: "Arifa Pack",
    title: "Arifa Pack — Sustainable Packaging Solutions",
    description:
      "Precision-engineered food-grade aluminium containers, platters, and commercial foils from our Ajman manufacturing facility.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${bodoni.variable} ${cinzel.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-bodoni bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white relative overflow-x-hidden">
        <SplashScreen />
        <PackagingBackground />
        <Header />
        <main className="flex-1 w-full relative z-10">{children}</main>
        <Footer />
        <ScrollToTop />
        <FloatingWhatsApp />
        <MouseGlowFollower />
      </body>
    </html>
  );
}
