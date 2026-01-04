import CatalogStoneSlugClient from "@/components/pages/CatalogStoneSlugClient";
import { Suspense } from "react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CatalogStoneSlugClient slug={slug} />
    </Suspense>
  );
}
