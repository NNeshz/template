import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./global.css";
import { AppProviders } from "./app-providers";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "Template — La manera más sencilla de iniciar un proyecto",
  description: "Haz que tu proyecto sea muy fácil de iniciar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geist.variable} ${geist.className} antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}