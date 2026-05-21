"use client";

import { WATCHLIST } from "@/lib/investments-mock-data";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export function WatchlistTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/5 text-xs uppercase text-gray-500">
            <th className="px-5 py-4 text-left">Asset</th>
            <th className="px-5 py-4 text-left">Type</th>
            <th className="px-5 py-4 text-right">Price</th>
            <th className="px-5 py-4 text-right">24h</th>
            <th className="px-5 py-4"></th>
          </tr>
        </thead>
        <tbody>
          {WATCHLIST.map((item) => (
            <tr key={item.symbol} className="border-b border-white/5 hover:bg-white/5">
              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
                  <div>
                    <p className="font-semibold text-white">{item.symbol}</p>
                    <p className="text-xs text-gray-500">{item.name}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4 capitalize">
                <Badge variant="default">{item.type}</Badge>
              </td>
              <td className="px-5 py-4 text-right font-semibold text-white">
                ${item.price.toLocaleString()}
              </td>
              <td className={`px-5 py-4 text-right ${item.change >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {item.change >= 0 ? "+" : ""}{item.change}%
              </td>
              <td className="px-5 py-4 text-right">
                <button type="button" className="text-brand-400 hover:underline">Trade</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
