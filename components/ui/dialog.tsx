"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({
  open,
  onClose,
  title,
  children,
  className,
}: DialogProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 pb-[calc(4.25rem+env(safe-area-inset-bottom,0px)+0.75rem)] sm:p-6 lg:pb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "flex max-h-[min(85dvh,calc(100dvh-5.5rem-env(safe-area-inset-bottom,0px)))] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface-card shadow-2xl",
                className
              )}
            >
              <div className="flex shrink-0 items-center justify-between border-b border-white/5 px-4 py-3 sm:px-6 sm:py-4">
                <h3 className="font-display text-base font-semibold text-white sm:text-lg">
                  {title}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-gray-400 hover:bg-white/5 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
