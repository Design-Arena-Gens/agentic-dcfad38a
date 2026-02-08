import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Лучшие игры 2026 года — гид по ключевым релизам",
  description:
    "Обзор самых ожидаемых видеоигр 2026 года: квартальные планы релизов, жанровые тренды, платформа за платформой, подборка ключевых проектов и интерактивный фильтр.",
  openGraph: {
    title: "Лучшие игры 2026 года — гид по ключевым релизам",
    description:
      "Изучите подборку главных релизов 2026 года, отсортируйте по жанрам и кварталам и узнайте, какие тренды определят будущее индустрии.",
    url: "https://agentic-dcfad38a.vercel.app",
    siteName: "Лучшие игры 2026",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Лучшие игры 2026 года — интерактивный обзор релизов",
    description:
      "Фильтры по жанрам и кварталам, аналитика платформ и трендов — всё о грядущих играх 2026 года в одном месте.",
  },
  metadataBase: new URL("https://agentic-dcfad38a.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
