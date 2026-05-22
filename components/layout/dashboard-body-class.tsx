"use client";

import { useEffect } from "react";

/** Marks body for dashboard-only CSS (e.g. translate widget offset beside sidebar). */
export function DashboardBodyClass() {
  useEffect(() => {
    document.body.classList.add("layout-dashboard");
    return () => document.body.classList.remove("layout-dashboard");
  }, []);
  return null;
}
