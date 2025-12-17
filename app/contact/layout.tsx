import type { Metadata } from "next";
import { getSeo } from "@/lib/seo";

const SITE_URL = "https://marble-moscow.ru";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo();

  const title = seo?.contact_title ?? "Contact";
  const description = seo?.contact_description ?? "Contact page";
  const keywords = seo?.contact_keywords ?? "";

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords,
    alternates: { canonical: `${SITE_URL}/contact` },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/contact`,
      title,
      description,
      siteName: "Marble Moscow",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
