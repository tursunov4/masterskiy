import CatalogStoneSlugClient from "@/components/pages/CatalogStoneSlugClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params; // ✅ Next 16 uchun to‘g‘ri

  return <CatalogStoneSlugClient slug={slug} />;
}
