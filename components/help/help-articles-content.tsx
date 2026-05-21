"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Loader2 } from "lucide-react";
import { getHelpArticles, getHelpCategories } from "@/lib/api/support";

export function HelpArticlesContent() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category");

  const categoriesQuery = useQuery({
    queryKey: ["help-categories"],
    queryFn: getHelpCategories,
  });
  const articlesQuery = useQuery({
    queryKey: ["help-articles"],
    queryFn: () => getHelpArticles(),
  });

  const categories = categoriesQuery.data?.results ?? [];
  const articles = useMemo(() => {
    const all = articlesQuery.data?.results ?? [];
    if (!categorySlug) return all;
    const cat = categories.find((c) => c.slug === categorySlug);
    if (!cat) return all;
    return all.filter((a) => a.category === cat.id);
  }, [articlesQuery.data, categorySlug, categories]);

  const loading = categoriesQuery.isLoading || articlesQuery.isLoading;

  return (
    <main className="min-h-screen bg-surface px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <Link href="/help" className="text-sm text-brand-400 hover:underline">
          ← Help Center
        </Link>
        <h1 className="mt-4 font-display text-3xl font-bold text-white">Help articles</h1>
        <p className="mt-2 text-sm text-gray-400">
          Step-by-step guides for using PennyCredit.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/help/articles"
            className={`rounded-full px-3 py-1 text-sm ${
              !categorySlug
                ? "bg-brand-500/20 text-brand-300"
                : "border border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/help/articles?category=${cat.slug}`}
              className={`rounded-full px-3 py-1 text-sm ${
                categorySlug === cat.slug
                  ? "bg-brand-500/20 text-brand-300"
                  : "border border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {loading ? (
          <div className="mt-12 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
          </div>
        ) : articles.length === 0 ? (
          <p className="mt-8 text-sm text-gray-500">
            No articles found. Run{" "}
            <code className="text-brand-400">python manage.py seed_support</code>.
          </p>
        ) : (
          <ul className="mt-8 space-y-4">
            {articles.map((article) => (
              <li key={article.id}>
                <Link
                  href={`/help/articles/${article.slug}`}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-surface-card p-5 transition-colors hover:border-brand-500/30"
                >
                  <BookOpen className="h-6 w-6 shrink-0 text-brand-400" />
                  <div>
                    <p className="text-xs text-brand-400">{article.category_name}</p>
                    <p className="font-semibold text-white">{article.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                      {article.body.replace(/^#+\s*/gm, "").slice(0, 160)}…
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
