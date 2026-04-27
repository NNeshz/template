import type { Metadata } from "next";
import { Geist, Host_Grotesk } from "next/font/google";
import "./global.css";
import { AppProviders } from "./app-providers";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-host-grotesk",
});

const siteTitle = "Reentwise — Recordatorios constantes, pagos asegurados";
const siteDescription = "No cobres más, deja esa tarea delegada.";

/** URL pública del sitio (Vercel/producción). Las previews sociales resuelven rutas relativas contra esto. */
const siteUrl =
  process.env.NEXT_PUBLIC_FRONTEND_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    locale: "es_ES",
    siteName: "Reentwise",
    images: [
      {
        url: "/web.webp",
        width: 1200,
        height: 630,
        alt: "Reentwise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/web.webp"],
  },
  verification: {
    other: {
      "facebook-domain-verification": "hci0wgulr1ybujqc9qkpxake93wa78",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${hostGrotesk.variable} ${hostGrotesk.className} ${geist.variable} ${geist.className} antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}