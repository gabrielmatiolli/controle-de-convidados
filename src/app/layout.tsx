import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const roca = localFont({ src: "/fonts/Roca.ttf", variable: "--font-roca" })

const montserrat = localFont({ src: "/fonts/Montserrat.ttf", variable: "--font-montserrat" })

const openSans = localFont({ src: "/fonts/OpenSans.ttf", variable: "--font-open-sans" })

const brittany = localFont({ src: "/fonts/BrittanySignature.ttf", variable: "--font-brittany" })

export const metadata: Metadata = {
  title: "Confirmação do Aniversário da Duda",
  description: "Confirmação do aniversário da Duda para contabilização de convidados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`antialiased ${roca.variable} ${montserrat.variable} ${openSans.variable} ${brittany.variable}`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
