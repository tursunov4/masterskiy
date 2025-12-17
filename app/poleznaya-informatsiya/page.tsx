import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeader from "@/components/ui/SectionHeader";
import UsefulInfoPageClient from "@/components/pages/UsefulInfoPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Полезная информация",
};

export default function UsefulInfoPage() {
  return (
    <main className="bg-white">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Полезная информация" },
        ]}
      />

      <div className="container mx-auto px-3 sm:px-4">
        <SectionHeader
          title="ПОЛЕЗНАЯ ИНФОРМАЦИЯ"
          subtitle="Статьи и ответы на популярные вопросы о натуральном камне"
        />

        <UsefulInfoPageClient />
      </div>
    </main>
  );
}
