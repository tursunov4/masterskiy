import type { Metadata } from "next";
import { getSeo } from "@/lib/seo";

const SITE_URL = "https://marble-moscow.ru";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo();

  const title = seo?.about_title ?? "About";
  const description = seo?.about_description ?? "About page";
  const keywords = seo?.about_keywords ?? "";

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords,
    alternates: { canonical: `${SITE_URL}/about` },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/about`,
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

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
