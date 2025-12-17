import type { Metadata } from "next";
import { getSeo } from "@/lib/seo";

const SITE_URL = "https://marble-moscow.ru";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo();

  const title = seo?.our_projects_title ?? "Our Projects";
  const description =
    seo?.our_projects_description ?? "Our projects and completed works";
  const keywords = seo?.our_projects_keywords ?? "";

  return {
    metadataBase: new URL(SITE_URL),

    title,
    description,
    keywords,

    alternates: {
      canonical: `${SITE_URL}/our-projects`,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      type: "website",
      url: `${SITE_URL}/our-projects`,
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

export default function OurProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
