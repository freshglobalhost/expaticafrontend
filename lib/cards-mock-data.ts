export type CardNetwork = "visa" | "mastercard";
export type CardTheme =
  | "teal-gold"
  | "midnight"
  | "sunset"
  | "ocean"
  | "royal"
  | "carbon";

export interface VirtualCard {
  id: string;
  name: string;
  cardholderName: string;
  maskedCardNumber: string;
  network: CardNetwork;
  theme: CardTheme;
  last4: string;
  expiry: string;
  frozen: boolean;
  spendingLimit: number;
  spentThisMonth: number;
  balance: number;
  type: "standard" | "premium";
}

export const NEW_CARD_REQUEST_FEE = 5;
export const MIN_CARD_FUND_AMOUNT = 10;
export const MIN_CARD_WITHDRAW_AMOUNT = 10;

export const CARD_THEMES: Record<
  CardTheme,
  { gradient: string; accent: string; label: string }
> = {
  "teal-gold": {
    gradient: "from-brand-600 via-brand-500 to-gold-500",
    accent: "text-gold-300",
    label: "Teal & Gold",
  },
  midnight: {
    gradient: "from-slate-900 via-indigo-950 to-purple-950",
    accent: "text-indigo-300",
    label: "Midnight",
  },
  sunset: {
    gradient: "from-rose-600 via-orange-500 to-amber-500",
    accent: "text-orange-200",
    label: "Sunset",
  },
  ocean: {
    gradient: "from-cyan-600 via-blue-600 to-indigo-700",
    accent: "text-cyan-200",
    label: "Ocean",
  },
  royal: {
    gradient: "from-violet-700 via-purple-600 to-fuchsia-600",
    accent: "text-violet-200",
    label: "Royal",
  },
  carbon: {
    gradient: "from-zinc-800 via-neutral-900 to-black",
    accent: "text-zinc-400",
    label: "Carbon",
  },
};

export const VIRTUAL_CARDS: VirtualCard[] = [
  {
    id: "VC-001",
    name: "Primary Shopping",
    cardholderName: "CARDHOLDER",
    maskedCardNumber: "**** **** **** 4821",
    network: "visa",
    theme: "teal-gold",
    last4: "4821",
    expiry: "09/28",
    frozen: false,
    spendingLimit: 5000,
    spentThisMonth: 1240,
    balance: 2450,
    type: "premium",
  },
  {
    id: "VC-002",
    name: "Subscriptions",
    cardholderName: "CARDHOLDER",
    maskedCardNumber: "**** **** **** 7392",
    network: "mastercard",
    theme: "midnight",
    last4: "7392",
    expiry: "03/27",
    frozen: false,
    spendingLimit: 1500,
    spentThisMonth: 89,
    balance: 680,
    type: "standard",
  },
  {
    id: "VC-003",
    name: "Travel",
    cardholderName: "CARDHOLDER",
    maskedCardNumber: "**** **** **** 1056",
    network: "visa",
    theme: "ocean",
    last4: "1056",
    expiry: "12/28",
    frozen: true,
    spendingLimit: 10000,
    spentThisMonth: 0,
    balance: 5200,
    type: "premium",
  },
];

export function createVirtualCardId(): string {
  return `VC-${Date.now().toString(36).slice(-4).toUpperCase()}`;
}

export function generateCardLast4(): string {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export function generateCardExpiry(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 3);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${mm}/${yy}`;
}

export const CARD_TRANSACTIONS = [
  {
    id: "CT-001",
    cardId: "VC-001",
    merchant: "Amazon.com",
    amount: -89.99,
    date: "2026-05-20",
    category: "Shopping",
  },
  {
    id: "CT-002",
    cardId: "VC-001",
    merchant: "Uber Eats",
    amount: -34.5,
    date: "2026-05-19",
    category: "Food",
  },
  {
    id: "CT-003",
    cardId: "VC-002",
    merchant: "Netflix",
    amount: -15.99,
    date: "2026-05-18",
    category: "Subscription",
  },
  {
    id: "CT-004",
    cardId: "VC-001",
    merchant: "Apple Store",
    amount: -299.0,
    date: "2026-05-17",
    category: "Electronics",
  },
  {
    id: "CT-005",
    cardId: "VC-002",
    merchant: "Spotify",
    amount: -9.99,
    date: "2026-05-15",
    category: "Subscription",
  },
];
