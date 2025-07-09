import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Footer } from "~/app/_components/Footer";
import { Header } from "~/app/_components/Header";

export const metadata: Metadata = {
  title: "Leandra | Creative Tech Talent",
  description: "Creative-tech professional who ships real-world impact. Explore my work, case studies, and insights.",
  icons: [{ rel: "icon", url: "/robot-favicon.svg", type: "image/svg+xml" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)]">
        <Header />
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Footer />
      </body>
    </html>
  );
}
