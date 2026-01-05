import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/header/Header";
import Providers from "./providers";
import ConsultModal from "@/components/modals/ConsultModal";
import ConsultToast from "@/components/ui/ConsultToast";
import { getSeo } from "@/lib/seo";
import ScrollToTopOnRouteChange from "@/components/layout/ScrollToTopOnRouteChange";
import FloatingContactWidgetClient from "@/components/layout/FloatingContactWidgetClient";
import { Suspense } from "react";
const palatino = localFont({
  src: [
    {
      path: "/fonts/palatinolinotype_roman.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/palatinolinotype_italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "/fonts/palatinolinotype_bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "/fonts/palatinolinotype_bolditalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-palatino",
});

const SITE_URL = "https://marble-moscow.ru";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo();

  const title = seo?.home_title ?? "Marble Moscow";
  const description =
    seo?.home_description ?? "Premium natural marble and stone products.";
  const keywords = seo?.home_keywords ?? "";

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords,
    alternates: { canonical: SITE_URL },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: SITE_URL,
      title,
      description,
      siteName: "Marble Moscow",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${palatino.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Providers>
            <ScrollToTopOnRouteChange />
            <FloatingContactWidgetClient />
            <Header />
            <main className="mt-15 md:mt-0">{children}</main>
            <ConsultModal />
            <ConsultToast />
            <Footer />
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
