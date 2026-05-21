"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => {
          const stepNum = i + 1;
          const isComplete = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div key={step.label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{
                    scale: isCurrent ? 1.05 : 1,
                    backgroundColor: isComplete
                      ? "rgb(20 184 166)"
                      : isCurrent
                        ? "rgba(20, 184, 166, 0.2)"
                        : "rgba(255,255,255,0.05)",
                  }}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
                    isComplete
                      ? "border-brand-500 bg-brand-500 text-white"
                      : isCurrent
                        ? "border-brand-500 text-brand-400"
                        : "border-white/10 text-gray-500"
                  )}
                >
                  {isComplete ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    stepNum
                  )}
                </motion.div>
                <span
                  className={cn(
                    "mt-2 hidden text-xs sm:block",
                    isCurrent ? "text-brand-400" : "text-gray-500"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="mx-2 h-0.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isComplete ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-brand-500"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
