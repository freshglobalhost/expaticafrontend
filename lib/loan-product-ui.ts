import type { LucideIcon } from "lucide-react";
import { User, Briefcase, Home, Car, Landmark } from "lucide-react";

export type LoanProductSlug = string;

export type LoanProductUi = {
  icon: LucideIcon;
  color: string;
  subtitle: string;
};

const UI_BY_SLUG: Record<string, LoanProductUi> = {
  personal: {
    icon: User,
    color: "bg-brand-500/15 text-brand-400",
    subtitle: "Flexible personal financing",
  },
  business: {
    icon: Briefcase,
    color: "bg-amber-500/15 text-amber-400",
    subtitle: "Grow your business",
  },
  home: {
    icon: Home,
    color: "bg-emerald-500/15 text-emerald-400",
    subtitle: "Mortgage & property",
  },
  auto: {
    icon: Car,
    color: "bg-blue-500/15 text-blue-400",
    subtitle: "Vehicle financing",
  },
};

const DEFAULT_UI: LoanProductUi = {
  icon: Landmark,
  color: "bg-brand-500/15 text-brand-400",
  subtitle: "Apply online",
};

export function getLoanProductUi(slug: string): LoanProductUi {
  return UI_BY_SLUG[slug] ?? DEFAULT_UI;
}

export function loanApplyHref(slug: string) {
  return `/loans/apply?product=${slug}`;
}
