"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { getHelpArticle } from "@/lib/api/support";

function renderBody(body: string) {
  return body.split("\n").map((line, i) => {
    if (line.startsWith("## ")) {
      return (
        <h2 key={i} className="mt-8 text-xl font-bold text-white">
          {line.slice(3)}
        </h2>
      );
    }
    if (line.startsWith("- ")) {
      return (
        <li key={i} className="ml-4 list-disc text-gray-400">
          {line.slice(2)}
        </li>
      );
    }
    if (line.trim() === "") return <br key={i} />;
    return (
      <p key={i} className="mt-3 text-gray-400 leading-relaxed">
        {line}
      </p>
    );
  });
}

export default function HelpArticleDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";

  const { data: article, isLoading, isError } = useQuery({
    queryKey: ["help-article", slug],
    queryFn: () => getHelpArticle(slug),
    enabled: !!slug,
  });

  return (
    <>
      <main className="min-h-screen bg-surface px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <Link href="/help/articles" className="text-sm text-brand-400 hover:underline">
            ← All articles
          </Link>

          {isLoading && (
            <div className="mt-12 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
            </div>
          )}

          {isError && (
            <p className="mt-8 text-sm text-red-400">Article not found.</p>
          )}

          {article && (
            <article className="mt-6">
              <p className="text-sm text-brand-400">{article.category_name}</p>
              <h1 className="mt-2 font-display text-3xl font-bold text-white">
                {article.title}
              </h1>
              <div className="prose prose-invert mt-8 max-w-none">{renderBody(article.body)}</div>
            </article>
          )}
        </div>
      </main>
      <MarketingFooter />
    </>
  );
}
