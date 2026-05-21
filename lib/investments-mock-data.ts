export type InvestmentPlanId =
  | "starter-savings"
  | "monthly-growth"
  | "premium-quarterly"
  | "fixed-income-30"
  | "quick-returns"
  | "bi-annual-elite"
  | "roi-only-60"
  | "high-yield-annual"
  | "weekly-flex"
  | "diamond-vip";

export interface SavingsInvestmentPlan {
  id: InvestmentPlanId;
  /** Database plan id when loaded from API */
  planId?: number;
  name: string;
  minAmount: number;
  maxAmount: number;
  roiDisplay: string;
  roiType: "percent" | "fixed";
  roiValue: number;
  duration: string;
  lockLabel: string;
  capitalReturned: boolean;
}

export const INVESTMENT_PLANS: SavingsInvestmentPlan[] = [
  {
    id: "starter-savings",
    name: "Starter Savings",
    minAmount: 100,
    maxAmount: 1000,
    roiDisplay: "5.00%",
    roiType: "percent",
    roiValue: 5,
    duration: "7 Days",
    lockLabel: "7 days",
    capitalReturned: true,
  },
  {
    id: "monthly-growth",
    name: "Monthly Growth Plan",
    minAmount: 500,
    maxAmount: 5000,
    roiDisplay: "12.00%",
    roiType: "percent",
    roiValue: 12,
    duration: "1 Months",
    lockLabel: "1 month",
    capitalReturned: true,
  },
  {
    id: "premium-quarterly",
    name: "Premium Quarterly",
    minAmount: 3000,
    maxAmount: 20000,
    roiDisplay: "25.00%",
    roiType: "percent",
    roiValue: 25,
    duration: "3 Months",
    lockLabel: "3 months",
    capitalReturned: true,
  },
  {
    id: "fixed-income-30",
    name: "Fixed Income 30",
    minAmount: 1000,
    maxAmount: 10000,
    roiDisplay: "$150.00",
    roiType: "fixed",
    roiValue: 150,
    duration: "30 Days",
    lockLabel: "30 days",
    capitalReturned: true,
  },
  {
    id: "quick-returns",
    name: "Quick Returns",
    minAmount: 250,
    maxAmount: 2500,
    roiDisplay: "8.00%",
    roiType: "percent",
    roiValue: 8,
    duration: "2 Weeks",
    lockLabel: "2 weeks",
    capitalReturned: true,
  },
  {
    id: "bi-annual-elite",
    name: "Bi-Annual Elite",
    minAmount: 7500,
    maxAmount: 50000,
    roiDisplay: "45.00%",
    roiType: "percent",
    roiValue: 45,
    duration: "6 Months",
    lockLabel: "6 months",
    capitalReturned: true,
  },
  {
    id: "roi-only-60",
    name: "ROI Only 60 Days",
    minAmount: 2000,
    maxAmount: 15000,
    roiDisplay: "18.00%",
    roiType: "percent",
    roiValue: 18,
    duration: "60 Days",
    lockLabel: "60 days",
    capitalReturned: false,
  },
  {
    id: "high-yield-annual",
    name: "High Yield Annual",
    minAmount: 15000,
    maxAmount: 100000,
    roiDisplay: "75.00%",
    roiType: "percent",
    roiValue: 75,
    duration: "12 Months",
    lockLabel: "12 months",
    capitalReturned: true,
  },
  {
    id: "weekly-flex",
    name: "Weekly Flex",
    minAmount: 100,
    maxAmount: 1500,
    roiDisplay: "$25.00",
    roiType: "fixed",
    roiValue: 25,
    duration: "1 Weeks",
    lockLabel: "1 week",
    capitalReturned: true,
  },
  {
    id: "diamond-vip",
    name: "Diamond VIP",
    minAmount: 50000,
    maxAmount: 500000,
    roiDisplay: "100.00%",
    roiType: "percent",
    roiValue: 100,
    duration: "12 Months",
    lockLabel: "12 months",
    capitalReturned: true,
  },
];

export function getInvestmentPlan(id: string): SavingsInvestmentPlan | undefined {
  return INVESTMENT_PLANS.find((p) => p.id === id);
}

export function calcExpectedRoi(amount: number, plan: SavingsInvestmentPlan): number {
  if (plan.roiType === "percent") return (amount * plan.roiValue) / 100;
  return plan.roiValue;
}

export function calcTotalReturn(amount: number, plan: SavingsInvestmentPlan): number {
  const roi = calcExpectedRoi(amount, plan);
  return plan.capitalReturned ? amount + roi : roi;
}

export const INVESTMENT_NAV = [
  { href: "/investments", label: "Plans" },
  { href: "/investments/my", label: "My Investments" },
];

export const HOW_INVESTMENTS_WORK = [
  "Choose a plan that fits your investment goals",
  "Investment amount will be deducted from your account balance",
  "Returns are automatically credited at the end of duration",
  'Track all your investments from the "My Investments" page',
];

/** Legacy exports for unused sub-routes */
export const PORTFOLIO_SUMMARY = {
  totalValue: 35720,
  totalInvested: 28500,
  totalReturn: 7220,
  returnPercent: 25.3,
  dayChange: 842,
  dayChangePercent: 2.4,
};
export const WATCHLIST: { symbol: string; name: string; price: number; change: number; type: string }[] = [];
export const INVESTMENT_HISTORY: { id: string; date: string; asset: string; type: string; amount: number; units: string; status: string }[] = [];
export const CRYPTO_ASSETS: { symbol: string; name: string; price: number; change: number; marketCap: string }[] = [];
export const STOCK_ASSETS: { symbol: string; name: string; price: number; change: number; sector: string }[] = [];
export const REAL_ESTATE_DEALS: { id: string; name: string; location: string; yield: string; minInvest: number; funded: number }[] = [];
export const FIXED_INCOME_PRODUCTS: { id: string; name: string; rate: string; term: string; minInvest: number }[] = [];

export const ROI_CARDS = [
  { label: "7D", value: "+2.1%", positive: true },
  { label: "30D", value: "+8.4%", positive: true },
  { label: "90D", value: "+18.2%", positive: true },
  { label: "YTD", value: "+25.3%", positive: true },
];

export const GROWTH_CHART = [
  { month: "Jan", value: 22000 },
  { month: "Feb", value: 24500 },
  { month: "Mar", value: 26800 },
  { month: "Apr", value: 29100 },
  { month: "May", value: 31200 },
  { month: "Jun", value: 35720 },
];

export const PNL_CARDS = [
  { label: "Realized P&L", amount: 4200, positive: true },
  { label: "Unrealized P&L", amount: 3020, positive: true },
  { label: "Fees", amount: -120, positive: false },
  { label: "Dividends", amount: 890, positive: true },
];

export const ASSET_ALLOCATION = [
  { name: "Savings plans", value: 45, color: "#14b8a6" },
  { name: "Fixed income", value: 30, color: "#f59e0b" },
  { name: "Growth", value: 15, color: "#6366f1" },
  { name: "Cash", value: 10, color: "#94a3b8" },
];
