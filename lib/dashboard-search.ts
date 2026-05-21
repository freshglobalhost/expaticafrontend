import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Landmark,
  TrendingUp,
  PiggyBank,
  CreditCard,
  ArrowLeftRight,
  Wallet,
  Send,
  Settings,
  HelpCircle,
  BarChart3,
  Shield,
  Calculator,
  History,
  Snowflake,
} from "lucide-react";

export type DashboardSearchItem = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  category: string;
  keywords: string[];
  icon: LucideIcon;
};

export const DASHBOARD_SEARCH_INDEX: DashboardSearchItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    subtitle: "Account overview and balances",
    href: "/dashboard",
    category: "Navigation",
    keywords: ["home", "overview", "balance", "wallet", "dashboard"],
    icon: LayoutDashboard,
  },
  {
    id: "loans",
    title: "Loans",
    subtitle: "Apply for and manage loans",
    href: "/loans",
    category: "Loans",
    keywords: ["loan", "loans", "borrow", "credit", "lending"],
    icon: Landmark,
  },
  {
    id: "loan-personal",
    title: "Personal loan",
    subtitle: "Flexible personal financing",
    href: "/loans/apply?product=personal",
    category: "Loans",
    keywords: ["loan", "personal", "borrow"],
    icon: Landmark,
  },
  {
    id: "loan-business",
    title: "Business loan",
    subtitle: "Capital for your business",
    href: "/loans/apply?product=business",
    category: "Loans",
    keywords: ["loan", "business"],
    icon: Landmark,
  },
  {
    id: "loan-home",
    title: "Home loan",
    subtitle: "Property and mortgage financing",
    href: "/loans/apply?product=home",
    category: "Loans",
    keywords: ["loan", "home", "mortgage", "house"],
    icon: Landmark,
  },
  {
    id: "loan-auto",
    title: "Auto loan",
    subtitle: "Vehicle financing",
    href: "/loans/apply?product=auto",
    category: "Loans",
    keywords: ["loan", "auto", "car", "vehicle"],
    icon: Landmark,
  },
  {
    id: "loans-apply",
    title: "Apply for a loan",
    subtitle: "Start a new loan application",
    href: "/loans/apply",
    category: "Loans",
    keywords: ["loan", "apply", "application"],
    icon: Landmark,
  },
  {
    id: "loans-history",
    title: "Loan history",
    subtitle: "View active loans and repayments",
    href: "/loans/history",
    category: "Loans",
    keywords: ["loan", "history", "repayment", "active"],
    icon: History,
  },
  {
    id: "loan-calculator",
    title: "Loan calculator",
    subtitle: "Estimate monthly payments",
    href: "/loans/calculator",
    category: "Loans",
    keywords: ["loan", "calculator", "estimate", "payment"],
    icon: Calculator,
  },
  {
    id: "cards",
    title: "Virtual cards",
    subtitle: "Create, fund, and manage cards",
    href: "/cards",
    category: "Cards",
    keywords: ["card", "cards", "virtual", "visa", "mastercard"],
    icon: CreditCard,
  },
  {
    id: "card-fund",
    title: "Fund virtual card",
    subtitle: "Add money from your wallet to a card",
    href: "/cards",
    category: "Cards",
    keywords: ["card", "fund", "top up", "load"],
    icon: CreditCard,
  },
  {
    id: "card-withdraw",
    title: "Withdraw from card",
    subtitle: "Move card balance back to wallet",
    href: "/cards",
    category: "Cards",
    keywords: ["card", "withdraw", "cash out"],
    icon: Wallet,
  },
  {
    id: "card-freeze",
    title: "Freeze card",
    subtitle: "Temporarily block card spending",
    href: "/cards",
    category: "Cards",
    keywords: ["card", "freeze", "block", "lock"],
    icon: Snowflake,
  },
  {
    id: "savings",
    title: "Savings",
    subtitle: "Goals, locked savings, and auto-save",
    href: "/savings",
    category: "Savings",
    keywords: ["savings", "save", "goal", "auto-save", "autosave", "deposit"],
    icon: PiggyBank,
  },
  {
    id: "investments",
    title: "Investments",
    subtitle: "Browse plans and invest",
    href: "/investments",
    category: "Investments",
    keywords: ["invest", "investment", "investments", "plan", "roi"],
    icon: TrendingUp,
  },
  {
    id: "investments-my",
    title: "My investments",
    subtitle: "Active positions and returns",
    href: "/investments/my",
    category: "Investments",
    keywords: ["invest", "portfolio", "positions", "my"],
    icon: BarChart3,
  },
  {
    id: "send",
    title: "Send money",
    subtitle: "All transfer methods",
    href: "/send",
    category: "Transfers",
    keywords: ["send", "transfer", "wire", "paypal", "wise", "money", "pay"],
    icon: Send,
  },
  {
    id: "send-wire",
    title: "Wire transfer",
    subtitle: "International bank transfer",
    href: "/send",
    category: "Transfers",
    keywords: ["wire", "transfer", "bank", "international"],
    icon: Send,
  },
  {
    id: "receive",
    title: "Receive money",
    subtitle: "Incoming transfers",
    href: "/receive",
    category: "Transfers",
    keywords: ["receive", "incoming", "transfer"],
    icon: Wallet,
  },
  {
    id: "crypto-deposit",
    title: "Crypto deposit",
    subtitle: "Deposit BTC, ETH, USDT, or SOL",
    href: "/crypto/deposit",
    category: "Crypto",
    keywords: ["crypto", "bitcoin", "btc", "eth", "usdt", "sol", "deposit"],
    icon: Wallet,
  },
  {
    id: "transactions",
    title: "Transactions",
    subtitle: "Full transaction history",
    href: "/transactions",
    category: "Account",
    keywords: ["transaction", "transactions", "history", "payment", "activity"],
    icon: ArrowLeftRight,
  },
  {
    id: "settings",
    title: "Settings",
    subtitle: "Profile, security, and PIN",
    href: "/settings/profile",
    category: "Account",
    keywords: ["settings", "profile", "password", "security", "account"],
    icon: Settings,
  },
  {
    id: "transaction-pin",
    title: "Transaction PIN",
    subtitle: "Set or change your 4-digit PIN",
    href: "/settings/transaction-pin",
    category: "Account",
    keywords: ["pin", "transaction", "security", "code"],
    icon: Shield,
  },
  {
    id: "help",
    title: "Help center",
    subtitle: "FAQs and support articles",
    href: "/help",
    category: "Support",
    keywords: ["help", "faq", "support", "contact", "article"],
    icon: HelpCircle,
  },
];

function scoreItem(item: DashboardSearchItem, query: string): number {
  const q = query.toLowerCase().trim();
  if (!q) return 0;

  let score = 0;
  const title = item.title.toLowerCase();
  const subtitle = item.subtitle.toLowerCase();
  const category = item.category.toLowerCase();

  if (title === q) score += 20;
  else if (title.startsWith(q)) score += 14;
  else if (title.includes(q)) score += 10;

  if (category.startsWith(q) || category.includes(q)) score += 6;
  if (subtitle.includes(q)) score += 4;

  for (const kw of item.keywords) {
    if (kw === q) score += 16;
    else if (kw.startsWith(q) || q.startsWith(kw)) score += 10;
    else if (kw.includes(q) || q.includes(kw)) score += 6;
  }

  return score;
}

export function searchDashboard(query: string, limit = 10): DashboardSearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return DASHBOARD_SEARCH_INDEX.map((item) => ({ item, score: scoreItem(item, q) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);
}

export function getSuggestedSearchItems(limit = 6): DashboardSearchItem[] {
  return [
    DASHBOARD_SEARCH_INDEX.find((i) => i.id === "loans"),
    DASHBOARD_SEARCH_INDEX.find((i) => i.id === "cards"),
    DASHBOARD_SEARCH_INDEX.find((i) => i.id === "savings"),
    DASHBOARD_SEARCH_INDEX.find((i) => i.id === "send"),
    DASHBOARD_SEARCH_INDEX.find((i) => i.id === "investments"),
    DASHBOARD_SEARCH_INDEX.find((i) => i.id === "crypto-deposit"),
  ]
    .filter((i): i is DashboardSearchItem => Boolean(i))
    .slice(0, limit);
}
