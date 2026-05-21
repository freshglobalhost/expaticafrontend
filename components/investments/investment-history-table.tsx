"use client";

import { INVESTMENT_HISTORY } from "@/lib/investments-mock-data";
import { Badge } from "@/components/ui/badge";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export function InvestmentHistoryTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/5 text-xs uppercase text-gray-500">
            <th className="px-5 py-4 text-left">ID</th>
            <th className="px-5 py-4 text-left">Date</th>
            <th className="px-5 py-4 text-left">Asset</th>
            <th className="px-5 py-4 text-left">Type</th>
            <th className="px-5 py-4 text-right">Amount</th>
            <th className="px-5 py-4 text-left">Units</th>
            <th className="px-5 py-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {INVESTMENT_HISTORY.map((row) => (
            <tr key={row.id} className="border-b border-white/5 hover:bg-white/5">
              <td className="px-5 py-4 font-mono text-brand-400">{row.id}</td>
              <td className="px-5 py-4 text-gray-400">{row.date}</td>
              <td className="px-5 py-4 text-white">{row.asset}</td>
              <td className="px-5 py-4">
                <Badge variant={row.type === "Buy" ? "success" : row.type === "Sell" ? "warning" : "info"}>
                  {row.type}
                </Badge>
              </td>
              <td className="px-5 py-4 text-right font-semibold">{fmt(row.amount)}</td>
              <td className="px-5 py-4 text-gray-400">{row.units}</td>
              <td className="px-5 py-4">
                <Badge variant="success">{row.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
