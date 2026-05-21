import type { Metadata } from "next";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardBottomNav } from "@/components/dashboard/bottom-nav";
import { GoogleTranslate } from "@/components/layout/google-translate";
import { DashboardProvider } from "@/components/providers/dashboard-provider";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Dashboard",
  description: "Your PennyCredit account dashboard.",
  index: false,
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
    <div className="min-h-screen bg-surface">
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:block">
        <DashboardSidebar />
      </div>

      <div className="lg:pl-72">
        <DashboardHeader />
        <main className="pt-[7.25rem] pb-[calc(5rem+env(safe-area-inset-bottom,0px))] lg:pt-14 lg:pb-0">
          {children}
        </main>
      </div>

      <DashboardBottomNav />
      <GoogleTranslate />
    </div>
    </DashboardProvider>
  );
}
