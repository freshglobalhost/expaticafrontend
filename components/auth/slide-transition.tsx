"use client";

import { AnimatePresence, motion } from "framer-motion";

interface SlideTransitionProps {
  stepKey: string | number;
  children: React.ReactNode;
  direction?: "forward" | "back";
}

export function SlideTransition({
  stepKey,
  children,
  direction = "forward",
}: SlideTransitionProps) {
  const x = direction === "forward" ? 24 : -24;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0, x }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -x }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
