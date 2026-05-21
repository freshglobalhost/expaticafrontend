import type { CryptoAsset as ApiCryptoAsset } from "@/lib/api/types";

const UI: Record<
  string,
  { gradient: string; icon: string; color: string }
> = {
  BTC: { gradient: "from-orange-500 to-amber-600", icon: "₿", color: "#f7931a" },
  ETH: { gradient: "from-indigo-500 to-purple-600", icon: "Ξ", color: "#627eea" },
  USDT: { gradient: "from-emerald-500 to-teal-600", icon: "₮", color: "#26a17b" },
  SOL: { gradient: "from-purple-500 to-cyan-500", icon: "◎", color: "#9945ff" },
};

export const CRYPTO_SYMBOLS = ["BTC", "ETH", "USDT", "SOL"] as const;

const DEFAULT_UI = { gradient: "from-brand-500 to-brand-700", icon: "◆", color: "#6366f1" };

export type DisplayCryptoAsset = ApiCryptoAsset & {
  gradient: string;
  icon: string;
  color: string;
  network: string;
  minDeposit: number;
  confirmations: number;
};

export function mapCryptoAsset(asset: ApiCryptoAsset): DisplayCryptoAsset {
  const ui = UI[asset.symbol] ?? DEFAULT_UI;
  return {
    ...asset,
    ...ui,
    network: asset.network_name,
    minDeposit: parseFloat(asset.minimum_deposit_amount) || 0,
    confirmations: asset.required_confirmations,
  };
}
