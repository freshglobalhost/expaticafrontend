export const MOCK_USER = {
  name: "Sarah Mitchell",
  id: "PC-2847193",
  email: "sarah.mitchell@email.com",
  avatar: "SM",
  balance: 42850.75,
  depositBalance: 28500.0,
  loanBalance: 14350.75,
};

export const WALLET_CARDS = [
  {
    id: "main",
    label: "Total Balance",
    amount: 42850.75,
    currency: "USD",
    change: "+12.4%",
    positive: true,
  },
  {
    id: "available",
    label: "Available",
    amount: 31200.5,
    currency: "USD",
    change: "+5.2%",
    positive: true,
  },
];

export const MULTI_CURRENCY = [
  { code: "USD", name: "US Dollar", amount: 31200.5, flag: "🇺🇸" },
  { code: "EUR", name: "Euro", amount: 8450.0, flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", amount: 3200.25, flag: "🇬🇧" },
];

export const CRYPTO_BALANCES = [
  { symbol: "BTC", name: "Bitcoin", amount: 0.284, value: 18240.0, change: "+3.8%" },
  { symbol: "ETH", name: "Ethereum", amount: 4.12, value: 12480.0, change: "+1.2%" },
  { symbol: "USDT", name: "Tether", amount: 5000, value: 5000.0, change: "0.0%" },
];

export const QUICK_ACTIONS = [
  { id: "send", label: "Send Money", icon: "send" },
  { id: "receive", label: "Receive", icon: "receive" },
  { id: "transfer", label: "Transfer", icon: "transfer" },
  { id: "deposit", label: "Deposit", icon: "deposit" },
  { id: "loan", label: "Request Loan", icon: "loan" },
  { id: "invest", label: "Invest", icon: "invest" },
  { id: "card", label: "Virtual Card", icon: "card" },
];

export const ACTIVE_LOANS = [
  {
    id: "LN-001",
    title: "Personal Loan",
    amount: 15000,
    paid: 6200,
    monthly: 485,
    dueDate: "Jun 15, 2026",
    status: "active" as const,
    rate: "12.5% APR",
  },
  {
    id: "LN-002",
    title: "Business Expansion",
    amount: 50000,
    paid: 18500,
    monthly: 1240,
    dueDate: "Aug 2, 2026",
    status: "active" as const,
    rate: "10.8% APR",
  },
  {
    id: "LN-003",
    title: "Emergency Loan",
    amount: 5000,
    paid: 4200,
    monthly: 210,
    dueDate: "Apr 28, 2026",
    status: "closing" as const,
    rate: "14.0% APR",
  },
];

export type TransactionCategory =
  | "transfer"
  | "deposit"
  | "withdrawal"
  | "loan"
  | "investment"
  | "payment";

export const TRANSACTIONS = [
  {
    id: "TX-92841",
    date: "2026-05-20",
    time: "14:32",
    description: "Wire to James Chen",
    category: "transfer" as TransactionCategory,
    amount: -2400.0,
    status: "completed",
    reference: "REF-8829104",
    counterparty: "James Chen · Singapore",
  },
  {
    id: "TX-92840",
    date: "2026-05-20",
    time: "09:15",
    description: "Salary deposit",
    category: "deposit" as TransactionCategory,
    amount: 8500.0,
    status: "completed",
    reference: "REF-8829103",
    counterparty: "Acme Corp Payroll",
  },
  {
    id: "TX-92839",
    date: "2026-05-19",
    time: "18:44",
    description: "BTC purchase",
    category: "investment" as TransactionCategory,
    amount: -1200.0,
    status: "completed",
    reference: "REF-8829102",
    counterparty: "Crypto Exchange",
  },
  {
    id: "TX-92838",
    date: "2026-05-19",
    time: "11:20",
    description: "Loan repayment",
    category: "loan" as TransactionCategory,
    amount: -485.0,
    status: "completed",
    reference: "REF-8829101",
    counterparty: "Personal Loan LN-001",
  },
  {
    id: "TX-92837",
    date: "2026-05-18",
    time: "16:05",
    description: "Card payment — Amazon",
    category: "payment" as TransactionCategory,
    amount: -189.99,
    status: "completed",
    reference: "REF-8829100",
    counterparty: "Amazon.com",
  },
  {
    id: "TX-92836",
    date: "2026-05-18",
    time: "08:30",
    description: "International transfer received",
    category: "deposit" as TransactionCategory,
    amount: 3200.0,
    status: "completed",
    reference: "REF-8829099",
    counterparty: "Michael Torres",
  },
  {
    id: "TX-92835",
    date: "2026-05-17",
    time: "22:10",
    description: "ATM withdrawal",
    category: "withdrawal" as TransactionCategory,
    amount: -300.0,
    status: "pending",
    reference: "REF-8829098",
    counterparty: "ATM · New York",
  },
];

export const NOTIFICATIONS = [
  {
    id: "1",
    title: "Loan payment due soon",
    message: "Personal Loan LN-001 payment of $485 due in 3 days",
    time: "2h ago",
    unread: true,
    type: "warning" as const,
  },
  {
    id: "2",
    title: "Deposit received",
    message: "Salary deposit of $8,500.00 credited to your account",
    time: "5h ago",
    unread: true,
    type: "success" as const,
  },
  {
    id: "3",
    title: "New login detected",
    message: "Sign-in from MacBook Pro · New York, US",
    time: "1d ago",
    unread: false,
    type: "info" as const,
  },
  {
    id: "4",
    title: "Investment milestone",
    message: "Your portfolio gained 4.2% this week",
    time: "2d ago",
    unread: false,
    type: "success" as const,
  },
];

export const SPENDING_CHART = [
  { month: "Jan", amount: 4200 },
  { month: "Feb", amount: 3800 },
  { month: "Mar", amount: 5100 },
  { month: "Apr", amount: 4600 },
  { month: "May", amount: 3900 },
];

export const SAVINGS_CHART = [
  { month: "Jan", amount: 1200 },
  { month: "Feb", amount: 1800 },
  { month: "Mar", amount: 2200 },
  { month: "Apr", amount: 2800 },
  { month: "May", amount: 3400 },
];

export const INVESTMENT_CHART = [
  { month: "Jan", amount: 8200 },
  { month: "Feb", amount: 9100 },
  { month: "Mar", amount: 10200 },
  { month: "Apr", amount: 11800 },
  { month: "May", amount: 13240 },
];

export const SIDEBAR_MENU = [
  { href: "/dashboard", label: "Dashboard", icon: "layout" },
  { href: "/loans", label: "Loans", icon: "loan" },
  { href: "/investments", label: "Investments", icon: "invest" },
  { href: "/savings", label: "Savings", icon: "savings" },
  { href: "/crypto/deposit", label: "Deposit", icon: "wallet" },
  { href: "/withdraw", label: "Withdraw", icon: "withdraw" },
  { href: "/cards", label: "Virtual Cards", icon: "card" },
  { href: "/transactions", label: "Transactions", icon: "transactions" },
  { href: "/settings/profile", label: "Settings", icon: "settings" },
  { href: "/login", label: "Sign Out", icon: "logout" },
];
