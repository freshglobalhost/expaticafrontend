"use client";

import type { InvestmentPlanId } from "@/lib/investments-mock-data";

export interface UserInvestment {
  id: string;
  planId: InvestmentPlanId;
  planName: string;
  amount: number;
  expectedRoi: number;
  capitalReturned: boolean;
  startedAt: string;
  expiresAt: string;
  status: "active" | "completed";
}

const STORAGE_KEY = "pennycredit-user-investments";

function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/** Approximate expiry from plan duration label */
export function estimateExpiry(start: Date, duration: string): Date {
  const lower = duration.toLowerCase();
  if (lower.includes("week")) {
    const n = parseInt(lower, 10) || 1;
    return addDays(start, n * 7);
  }
  if (lower.includes("day")) {
    const n = parseInt(lower, 10) || 7;
    return addDays(start, n);
  }
  if (lower.includes("month")) {
    const n = parseInt(lower, 10) || 1;
    return addMonths(start, n);
  }
  return addMonths(start, 3);
}

export function loadUserInvestments(): UserInvestment[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as UserInvestment[];
  } catch {
    return [];
  }
}

export function saveUserInvestment(entry: Omit<UserInvestment, "id" | "status">) {
  const list = loadUserInvestments();
  const item: UserInvestment = {
    ...entry,
    id: `INV-${Date.now()}`,
    status: "active",
  };
  list.unshift(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return item;
}

export function getInvestmentSummary(investments: UserInvestment[]) {
  const active = investments.filter((i) => i.status === "active");
  const totalInvested = active.reduce((s, i) => s + i.amount, 0);
  const totalReturns = 0;
  const pending = 0;
  return {
    activeCount: active.length,
    totalInvested,
    totalReturns,
    pending,
  };
}
