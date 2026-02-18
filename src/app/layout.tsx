import type { Metadata } from "next";
import { Geist, Geist_Mono, Six_Caps, Playwrite_NZ } from "next/font/google";
import "./globals.css";
import "./styles/lenis.css";
import ClientOnly from "./components/ClientOnly";
import CustomCursor from "./components/CustomCursor";
import Navigation from "./components/Navigation";
import LenisProvider from "./components/LenisProvider";
import ThemeTransition from "./components/ThemeTransition";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sixCaps = Six_Caps({
  variable: "--font-six-caps",
  subsets: ["latin"],
  weight: "400",
});

const playwriteNZ = Playwrite_NZ({
  variable: "--font-playwrite-nz",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "CODEIDEA - Creative Digital Solutions",
  description: "نصمم ونطور حلول رقمية إبداعية تجذب العملاء وتحقق أهدافك التجارية. خدمات التصميم والتطوير والتسويق الرقمي.",
  icons: {
    icon: '/icon'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Six+Caps&display=swap" rel="stylesheet" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${sixCaps.variable} ${playwriteNZ.variable}`}>
        <ClientOnly>
          <ThemeTransition />
        </ClientOnly>
        <LenisProvider>
          <ClientOnly>
            <CustomCursor />
            <Navigation />
          </ClientOnly>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
