import type { LucideIcon } from "lucide-react";
import { User, Briefcase, Home, Car } from "lucide-react";

export type LoanProductId = "personal" | "business" | "home" | "auto";

export interface LoanProduct {
  id: LoanProductId;
  label: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  href: string;
}

export const LOAN_PRODUCTS: LoanProduct[] = [
  {
    id: "personal",
    label: "Personal Loan",
    subtitle: "Flexible personal financing",
    icon: User,
    color: "bg-brand-500/15 text-brand-400",
    href: "/loans/apply?type=personal",
  },
  {
    id: "business",
    label: "Business Loan",
    subtitle: "Grow your business",
    icon: Briefcase,
    color: "bg-amber-500/15 text-amber-400",
    href: "/loans/apply?type=business",
  },
  {
    id: "home",
    label: "Home Loan",
    subtitle: "Mortgage & property",
    icon: Home,
    color: "bg-emerald-500/15 text-emerald-400",
    href: "/loans/apply?type=home",
  },
  {
    id: "auto",
    label: "Auto Loan",
    subtitle: "Vehicle financing",
    icon: Car,
    color: "bg-blue-500/15 text-blue-400",
    href: "/loans/apply?type=auto",
  },
];
