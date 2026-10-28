import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arifa Pack — Enterprise B2B CRM & Wholesale Dispatch Hub",
  description: "Direct factory wholesale order management and B2B client relationship hub for Arifa Packing & Packaging LLC (Ajman, UAE).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full font-['Manrope'] bg-[#dce7df] text-slate-800 antialiased selection:bg-[#2d5a3f] selection:text-white flex items-center justify-center p-2 sm:p-6 lg:p-8">
        {children}
      </body>
    </html>
  );
}
