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
  metadataBase: new URL("https://kindergarten-website-red.vercel.app"),
  
  title: "米堤爾幼兒園｜Miter Kindergarten",
  description:
    "米堤爾幼兒園提供溫暖、安全且充滿創意的學習環境，陪伴孩子探索世界、快樂成長。歡迎預約參觀。",

  keywords: [
    "米堤爾幼兒園",
    "幼兒園",
    "托兒所",
    "幼稚園",
    "彰化幼兒園", // 如果不是彰化可改成你的縣市
    "Miter Kindergarten",
  ],

  authors: [{ name: "米堤爾幼兒園" }],

  openGraph: {
    title: "米堤爾幼兒園",
    description:
      "陪伴孩子探索世界，快樂學習、自信成長。",
    url: "https://kindergarten-website-red.vercel.app",
    siteName: "米堤爾幼兒園",
    locale: "zh_TW",
    type: "website",
    images: [
      {
        url: "/miter-logo.png",
        width: 1200,
        height: 630,
      },
    ],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
