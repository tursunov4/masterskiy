"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeader from "@/components/ui/SectionHeader";
import { BlogPostDetail, getBlogPostDetailClient } from "@/services/blog";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function formatDate(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = d.getFullYear();
  return `${dd}.${mm}.${yy}`;
}

export default function BlogDetailClientPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";

  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!slug) return;
      try {
        setLoading(true);
        setErr(null);

        const data = await getBlogPostDetailClient(slug);
        if (cancelled) return;

        setPost(data);
        // client page bo‘lgani uchun title’ni shu yerda qo‘yib ketamiz
        document.title = data?.title ? `${data.title}` : "Статья";
      } catch (e: any) {
        if (!cancelled) setErr(e?.message || "Ошибка загрузки статьи");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const view = useMemo(() => {
    const title = post?.title ?? "Статья";
    const date = formatDate(post?.published_at || post?.created_at);
    const image = post?.image ?? null;
    const content = post?.content ?? "";
    return { title, date, image, content };
  }, [post]);

  return (
    <main className="bg-white">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Информация и статьи", href: "/info" },
          { label: view.title },
        ]}
      />

      <div className="container mx-auto px-3 sm:px-4">
        <SectionHeader
          title={loading ? "Загрузка..." : view.title}
          subtitle={view.date ? `Опубликовано: ${view.date}` : "Статья"}
        />

        {err && (
          <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            {err}
          </div>
        )}

        {/* IMAGE */}
        {loading && !post ? (
          <div className="h-[260px] sm:h-[320px] md:h-[380px] border border-black/20 bg-black/5 animate-pulse" />
        ) : view.image ? (
          <section className="relative h-[260px] sm:h-[320px] md:h-[380px] border border-black/20">
            <Image
              src={view.image}
              alt={view.title}
              fill
              className="object-cover"
              priority
            />
          </section>
        ) : null}

        {/* CONTENT */}
        <section className="px-4 py-8">
          {loading && !post ? (
            <div className="space-y-3">
              <div className="h-4 w-10/12 bg-black/5 animate-pulse" />
              <div className="h-4 w-9/12 bg-black/5 animate-pulse" />
              <div className="h-4 w-11/12 bg-black/5 animate-pulse" />
              <div className="h-4 w-8/12 bg-black/5 animate-pulse" />
            </div>
          ) : view.content ? (
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: view.content }}
            />
          ) : (
            <p className="text-sm text-neutral-600">
              Контент пока отсутствует.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
