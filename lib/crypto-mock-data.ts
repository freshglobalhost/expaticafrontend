export type CryptoSymbol = "BTC" | "ETH" | "USDT" | "SOL" | "BNB" | "LTC";

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
  {
    symbol: "BNB",
    name: "BNB",
    color: "#f3ba2f",
    gradient: "from-yellow-500 to-amber-600",
    icon: "◆",
    network: "BNB Smart Chain (BEP-20)",
    minDeposit: 0.01,
    confirmations: 15,
  },
  {
    symbol: "LTC",
    name: "Litecoin",
    color: "#345d9d",
    gradient: "from-slate-500 to-blue-600",
    icon: "Ł",
    network: "Litecoin Network",
    minDeposit: 0.01,
    confirmations: 6,
  },
];

/** Live deposit wallet addresses */
export const CRYPTO_DEPOSIT_WALLETS: Record<CryptoSymbol, string> = {
  BTC: "17mfUC33P5HXAXb9Lt3cs1hcpTQ1CRV8Q6",
  ETH: "0x32e110a1ba1543d31f96e4819819cae8b1c9718f",
  USDT: "TEBxRBr29oL3DfMaeEq5Fh86XMxWdsYAkv",
  SOL: "85UnBeGjFYpob63QBgrqc4C9y929vyABhMih2jmYuALE",
  BNB: "0x32e110a1ba1543d31f96e4819819cae8b1c9718f",
  LTC: "LegGtXmTNN6XNXKjNmMAHtXRdQyUgpJn2k",
};

/**
 * Barcode / QR images in public/assets/crypto/
 * Place your files as: btc.jpeg, eth.jpeg, usdt.jpeg, sol.jpeg, bnb.jpeg, ltc.jpeg
 */
export const CRYPTO_DEPOSIT_QR_IMAGES: Record<CryptoSymbol, string> = {
  BTC: "/assets/crypto/btc.jpeg",
  ETH: "/assets/crypto/eth.jpeg",
  USDT: "/assets/crypto/usdt.jpeg",
  SOL: "/assets/crypto/sol.jpeg",
  BNB: "/assets/crypto/bnb.jpeg",
  LTC: "/assets/crypto/ltc.jpeg",
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
