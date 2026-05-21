"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { REAL_ESTATE_DEALS } from "@/lib/investments-mock-data";

export function RealEstateGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {REAL_ESTATE_DEALS.map((deal, i) => (
        <motion.article
          key={deal.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-surface-card"
        >
          <div className="h-32 bg-gradient-to-br from-purple-600/30 to-brand-600/20" />
          <div className="p-5">
            <h3 className="font-semibold text-white">{deal.name}</h3>
            <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="h-3 w-3" /> {deal.location}
            </p>
            <div className="mt-4 flex justify-between text-sm">
              <span className="text-emerald-400">{deal.yield} yield</span>
              <span className="text-gray-400">Min ${deal.minInvest.toLocaleString()}</span>
            </div>
            <div className="mt-3">
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-brand-500"
                  style={{ width: `${deal.funded}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">{deal.funded}% funded</p>
            </div>
            <button type="button" className="mt-4 w-full rounded-xl bg-brand-500/15 py-2.5 text-sm font-medium text-brand-400">
              View deal
            </button>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
