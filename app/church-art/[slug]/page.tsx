import ChurchArtSlugClient from "@/components/pages/ChurchArtSlugClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params; // ✅ Next 16 params Promise fix
  return <ChurchArtSlugClient slug={slug} />;
}
