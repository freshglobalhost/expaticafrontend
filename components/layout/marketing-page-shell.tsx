import { MarketingFooter } from "@/components/layout/marketing-footer";

export function MarketingPageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="min-h-screen bg-surface px-4 py-12 pb-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-white">{title}</h1>
          {subtitle && <p className="mt-3 text-lg text-gray-400">{subtitle}</p>}
          <div className="mt-10 space-y-6 text-gray-300">{children}</div>
        </div>
      </main>
      <MarketingFooter />
    </>
  );
}
