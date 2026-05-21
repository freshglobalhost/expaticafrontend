import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  action?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-2 flex flex-wrap items-center gap-1 text-xs text-gray-500">
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3 w-3" />}
                {b.href ? (
                  <Link href={b.href} className="hover:text-brand-400">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-gray-400">{b.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-display text-xl font-bold text-white sm:text-2xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-gray-400">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
