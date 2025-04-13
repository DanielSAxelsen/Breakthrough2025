import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { QueryClientProvider } from "@/app/[locale]/query-client-provider";
import Countdown from "@/components/countdown";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Breakthrough 2025",
  description: "Breakthrough 2025",
  icons: {
    icon: "/stories_melike_story.png",
    apple: "/stories_melike_story.png",
    shortcut: "/stories_melike_story.png",
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/stories_melike_story.png" sizes="16x16" />
        <link rel="shortcut icon" href="/stories_melike_story.png" sizes="16x16" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}>
        <QueryClientProvider>
          <NextIntlClientProvider messages={messages}>
            <Countdown targetDate="2025-05-25T10:00:00" />
            <NavBar />
            {children}
            <Footer />
            <Toaster />
          </NextIntlClientProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}











