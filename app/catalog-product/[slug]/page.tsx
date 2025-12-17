import CatalogProductSlugClient from "@/components/pages/CatalogProductSlugClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params; // ✅ Next 16
  return <CatalogProductSlugClient slug={slug} />;
}
