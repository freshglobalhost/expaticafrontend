"use client";

import { motion } from "framer-motion";

interface Asset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  extra?: string;
}

export function AssetMarketplace({
  title,
  description,
  assets,
  type,
}: {
  title: string;
  description: string;
  assets: Asset[];
  type: "crypto" | "stock" | "realestate" | "fixed";
}) {
  const fmt = (n: number) =>
    type === "crypto" && n > 1000
      ? `$${n.toLocaleString()}`
      : `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {assets.map((asset, i) => (
        <motion.div
          key={asset.symbol}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
          className="rounded-2xl border border-white/10 bg-surface-card p-5 transition-colors hover:border-brand-500/30"
        >
          <div className="flex justify-between">
            <div>
              <p className="font-bold text-white">{asset.symbol}</p>
              <p className="text-sm text-gray-500">{asset.name}</p>
            </div>
            <span className={asset.change >= 0 ? "text-emerald-400" : "text-red-400"}>
              {asset.change >= 0 ? "+" : ""}{asset.change}%
            </span>
          </div>
          <p className="mt-4 text-2xl font-bold text-white">{fmt(asset.price)}</p>
          {asset.extra && <p className="text-xs text-gray-500">{asset.extra}</p>}
          <button
            type="button"
            className="mt-4 w-full rounded-xl bg-brand-500/15 py-2 text-sm font-medium text-brand-400 hover:bg-brand-500/25"
          >
            {type === "realestate" || type === "fixed" ? "Invest" : "Buy"}
          </button>
        </motion.div>
      ))}
    </div>
  );
}
