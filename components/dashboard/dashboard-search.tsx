"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  getSuggestedSearchItems,
  searchDashboard,
  type DashboardSearchItem,
} from "@/lib/dashboard-search";
import { cn } from "@/lib/utils";

export function DashboardSearch({ className }: { className?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim() ? searchDashboard(query) : [];
  const suggestions = getSuggestedSearchItems();
  const displayItems: DashboardSearchItem[] = query.trim() ? results : suggestions;
  const showPanel = open && displayItems.length > 0;

  const close = useCallback(() => {
    setOpen(false);
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [close]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const goTo = (href: string) => {
    setQuery("");
    close();
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      close();
      inputRef.current?.blur();
      return;
    }
    if (!displayItems.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((i) => (i + 1) % displayItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((i) => (i - 1 + displayItems.length) % displayItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = displayItems[activeIndex];
      if (item) goTo(item.href);
    }
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder="Search loans, cards, savings…"
        className="relative h-10 w-full rounded-xl border border-white/5 bg-surface-card pl-10 pr-4 text-sm text-white placeholder:text-gray-500 focus:border-brand-500/50 focus:outline-none focus:ring-1 focus:ring-brand-500/30"
        autoComplete="off"
        role="combobox"
        aria-expanded={showPanel}
        aria-controls="dashboard-search-listbox"
        aria-autocomplete="list"
      />

      {showPanel && (
        <div
          id="dashboard-search-listbox"
          role="listbox"
          className="absolute left-0 right-0 top-full z-[100] mt-2 overflow-hidden rounded-xl border border-white/10 bg-surface-card shadow-2xl"
        >
          {!query.trim() && (
            <p className="border-b border-white/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              Quick links
            </p>
          )}
          {query.trim() && results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-gray-500">
              No results for &ldquo;{query}&rdquo;
            </p>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-1">
              {displayItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <li key={item.id} role="option" aria-selected={i === activeIndex}>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => goTo(item.href)}
                      className={cn(
                        "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors",
                        i === activeIndex
                          ? "bg-brand-500/15 text-white"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      )}
                      onMouseEnter={() => setActiveIndex(i)}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/15 text-brand-400">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white">{item.title}</p>
                        <p className="truncate text-xs text-gray-500">{item.subtitle}</p>
                      </div>
                      <span className="shrink-0 text-[10px] uppercase tracking-wider text-gray-600">
                        {item.category}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
