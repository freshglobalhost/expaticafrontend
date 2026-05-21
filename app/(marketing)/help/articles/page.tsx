import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { HelpArticlesContent } from "@/components/help/help-articles-content";

function ArticlesFallback() {
  return (
    <main className="min-h-screen bg-surface px-4 py-16">
      <div className="flex justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
      </div>
    </main>
  );
}

export default function HelpArticlesPage() {
  return (
    <>
      <Suspense fallback={<ArticlesFallback />}>
        <HelpArticlesContent />
      </Suspense>
      <MarketingFooter />
    </>
  );
}
