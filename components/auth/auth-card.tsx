"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "rounded-3xl border border-white/10 bg-gradient-to-br from-surface-card to-surface-elevated p-8 shadow-2xl shadow-black/30",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
