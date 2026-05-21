export type CryptoSymbol = "BTC" | "ETH" | "USDT" | "SOL";

export interface CryptoAsset {
  symbol: CryptoSymbol;
  name: string;
  color: string;
  gradient: string;
  icon: string;
  network: string;
  minDeposit: number;
  confirmations: number;
}

export const CRYPTO_ASSETS: CryptoAsset[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    color: "#f7931a",
    gradient: "from-orange-500 to-amber-600",
    icon: "₿",
    network: "Bitcoin Network",
    minDeposit: 0.0001,
    confirmations: 3,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    color: "#627eea",
    gradient: "from-indigo-500 to-purple-600",
    icon: "Ξ",
    network: "Ethereum (ERC-20)",
    minDeposit: 0.01,
    confirmations: 12,
  },
  {
    symbol: "USDT",
    name: "Tether",
    color: "#26a17b",
    gradient: "from-emerald-500 to-teal-600",
    icon: "₮",
    network: "Tron (TRC-20)",
    minDeposit: 10,
    confirmations: 12,
  },
  {
    symbol: "SOL",
    name: "Solana",
    color: "#9945ff",
    gradient: "from-purple-500 to-cyan-500",
    icon: "◎",
    network: "Solana Network",
    minDeposit: 0.1,
    confirmations: 32,
  },
];

/** Live deposit wallet addresses */
export const CRYPTO_DEPOSIT_WALLETS: Record<CryptoSymbol, string> = {
  BTC: "3GFTjjZTPGKRMpE16N53fJKgwjWnNrNKBS",
  ETH: "0xF355071A0e54211763218E0C99E463094B772a87",
  USDT: "TT3jJibKkRKRDJa5TkYHeUwKEagofRdkzY",
  SOL: "45GC1UypduTvTgyue5CUAhVKbc5YCiKEHB1p9uEQBAr2",
};

/**
 * Barcode / QR images in public/assets/crypto/
 * Place your files as: btc.jpeg, eth.jpeg, usdt.jpeg, sol.jpeg
 */
export const CRYPTO_DEPOSIT_QR_IMAGES: Record<CryptoSymbol, string> = {
  BTC: "/assets/crypto/btc.jpeg",
  ETH: "/assets/crypto/eth.jpeg",
  USDT: "/assets/crypto/usdt.jpeg",
  SOL: "/assets/crypto/sol.jpeg",
};

/** @deprecated Use CRYPTO_DEPOSIT_WALLETS */
export const FAKE_WALLETS = CRYPTO_DEPOSIT_WALLETS;

export const DEPOSIT_HISTORY = [
  {
    id: "DEP-8841",
    symbol: "BTC" as CryptoSymbol,
    amount: 0.15,
    usdValue: 9630,
    status: "completed" as const,
    txHash: "0x8f3a...2b91",
    date: "2026-05-20 14:22",
    confirmations: "3/3",
  },
  {
    id: "DEP-8840",
    symbol: "ETH" as CryptoSymbol,
    amount: 2.5,
    usdValue: 8550,
    status: "confirming" as const,
    txHash: "0x4c2e...9f01",
    date: "2026-05-20 16:05",
    confirmations: "8/12",
  },
  {
    id: "DEP-8839",
    symbol: "USDT" as CryptoSymbol,
    amount: 5000,
    usdValue: 5000,
    status: "completed" as const,
    txHash: "0x1a9d...7c44",
    date: "2026-05-19 09:30",
    confirmations: "12/12",
  },
  {
    id: "DEP-8838",
    symbol: "SOL" as CryptoSymbol,
    amount: 45,
    usdValue: 6660,
    status: "pending" as const,
    txHash: "5kFm...3xPq",
    date: "2026-05-20 17:10",
    confirmations: "0/32",
  },
];
