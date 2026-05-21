"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}

export function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2,
  decimals = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const startTime = performance.now();
    const ms = duration * 1000;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / ms, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = eased * end;
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, end, duration]);

  const display =
    decimals > 0
      ? count.toFixed(decimals)
      : Math.floor(count).toLocaleString();

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="tabular-nums"
    >
      {prefix}
      {display}
      {suffix}
    </motion.span>
  );
}
