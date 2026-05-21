export type LoanProductType =
  | "personal"
  | "business"
  | "emergency"
  | "mortgage"
  | "auto";

export type LoanStatus = "active" | "pending" | "approved" | "closed" | "rejected";

export const LOAN_PRODUCTS = [
  {
    id: "personal",
    name: "Personal Loan",
    description: "Flexible funds for life's goals — consolidate debt, travel, or major purchases.",
    minAmount: 1000,
    maxAmount: 100000,
    rateFrom: 8.9,
    termMonths: [12, 24, 36, 48, 60],
    badge: "Popular",
    features: ["No collateral", "Same-day approval", "Fixed rates"],
  },
  {
    id: "business",
    name: "Business Loan",
    description: "Capital for expansion, inventory, payroll, and operational growth.",
    minAmount: 10000,
    maxAmount: 500000,
    rateFrom: 7.5,
    termMonths: [12, 24, 36, 60, 84],
    badge: "Best rate",
    features: ["Up to $500K", "Dedicated advisor", "Flexible repayment"],
  },
  {
    id: "emergency",
    name: "Emergency Loan",
    description: "Fast access when you need it most — medical, repairs, or urgent expenses.",
    minAmount: 500,
    maxAmount: 25000,
    rateFrom: 11.9,
    termMonths: [3, 6, 12, 24],
    badge: "Fast",
    features: ["5-min approval", "Same-day funding", "Minimal docs"],
  },
  {
    id: "mortgage",
    name: "Home Loan",
    description: "Competitive rates for primary residence and investment properties.",
    minAmount: 50000,
    maxAmount: 2000000,
    rateFrom: 5.9,
    termMonths: [180, 240, 300, 360],
    badge: null,
    features: ["Fixed & variable", "Pre-approval", "Global properties"],
  },
  {
    id: "auto",
    name: "Auto Loan",
    description: "Finance new or used vehicles with transparent terms.",
    minAmount: 5000,
    maxAmount: 150000,
    rateFrom: 6.4,
    termMonths: [24, 36, 48, 60, 72],
    badge: null,
    features: ["New & used", "Quick decision", "Competitive APR"],
  },
];

export const LOAN_HISTORY = [
  {
    id: "LN-001",
    product: "Personal Loan",
    amount: 15000,
    status: "active" as LoanStatus,
    appliedAt: "2025-11-12",
    disbursedAt: "2025-11-14",
  },
  {
    id: "LN-002",
    product: "Business Expansion",
    amount: 50000,
    status: "active" as LoanStatus,
    appliedAt: "2025-09-03",
    disbursedAt: "2025-09-08",
  },
  {
    id: "LN-004",
    product: "Emergency Loan",
    amount: 8000,
    status: "closed" as LoanStatus,
    appliedAt: "2024-06-20",
    disbursedAt: "2024-06-21",
  },
  {
    id: "LN-005",
    product: "Personal Loan",
    amount: 12000,
    status: "pending" as LoanStatus,
    appliedAt: "2026-05-18",
    disbursedAt: null,
  },
];

export const LOAN_DETAIL = {
  id: "LN-001",
  product: "Personal Loan",
  type: "personal" as LoanProductType,
  principal: 15000,
  outstanding: 8795,
  paid: 6205,
  apr: 12.5,
  termMonths: 36,
  monthsPaid: 14,
  monthlyPayment: 485,
  nextDueDate: "2026-06-15",
  status: "active" as LoanStatus,
  disbursementDate: "2025-11-14",
  accountNumber: "PC-LN-2847193-001",
};

export const REPAYMENT_SCHEDULE = [
  { installment: 1, dueDate: "2025-12-15", principal: 328.5, interest: 156.5, total: 485, status: "paid" },
  { installment: 2, dueDate: "2026-01-15", principal: 332.0, interest: 153.0, total: 485, status: "paid" },
  { installment: 3, dueDate: "2026-02-15", principal: 335.5, interest: 149.5, total: 485, status: "paid" },
  { installment: 4, dueDate: "2026-03-15", principal: 339.0, interest: 146.0, total: 485, status: "paid" },
  { installment: 5, dueDate: "2026-04-15", principal: 342.5, interest: 142.5, total: 485, status: "paid" },
  { installment: 6, dueDate: "2026-05-15", principal: 346.0, interest: 139.0, total: 485, status: "paid" },
  { installment: 7, dueDate: "2026-06-15", principal: 349.5, interest: 135.5, total: 485, status: "upcoming" },
  { installment: 8, dueDate: "2026-07-15", principal: 353.0, interest: 132.0, total: 485, status: "scheduled" },
  { installment: 9, dueDate: "2026-08-15", principal: 356.5, interest: 128.5, total: 485, status: "scheduled" },
  { installment: 10, dueDate: "2026-09-15", principal: 360.0, interest: 125.0, total: 485, status: "scheduled" },
];

export const ELIGIBILITY_CRITERIA = [
  { label: "Minimum age", value: "18 years", met: true },
  { label: "Credit score", value: "650+", met: true },
  { label: "Monthly income", value: "$2,000+", met: true },
  { label: "Employment status", value: "Employed or self-employed", met: true },
  { label: "Debt-to-income ratio", value: "Below 43%", met: false },
  { label: "Account age", value: "30+ days", met: true },
];

export const LOAN_NAV = [
  { href: "/loans", label: "Marketplace" },
  { href: "/loans/calculator", label: "Calculator" },
  { href: "/loans/eligibility", label: "Eligibility" },
  { href: "/loans/apply", label: "Apply" },
  { href: "/loans/history", label: "History" },
];
