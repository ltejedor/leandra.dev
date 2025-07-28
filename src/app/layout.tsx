import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Footer } from "~/app/_components/Footer";
import { Header } from "~/app/_components/Header";

export const metadata: Metadata = {
  title: "Leandra Tejedor",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.svg", type: "image/svg+xml" }],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className={`${inter.variable} min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] font-sans`}>
        <Header />
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Footer />
      </body>
    </html>
  );
}
