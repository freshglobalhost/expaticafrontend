import type { Metadata } from "next";
import Link from "next/link";
import { MarketingPageShell } from "@/components/layout/marketing-page-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Careers",
  description:
    "Careers at PennyCredit — join our team building premium digital banking, lending, and investment products. Remote and hybrid roles in engineering, design, risk, and support.",
  path: "/careers",
  keywords: ["PennyCredit jobs", "fintech careers", "remote engineering jobs"],
});

const ROLES = [
  { title: "Senior Frontend Engineer", team: "Engineering", location: "Remote (US/EU)", type: "Full-time" },
  { title: "Product Designer", team: "Design", location: "Remote", type: "Full-time" },
  { title: "Risk & Compliance Analyst", team: "Operations", location: "New York, NY", type: "Full-time" },
  { title: "Customer Success Lead", team: "Support", location: "Remote", type: "Full-time" },
];

export default function CareersPage() {
  return (
    <MarketingPageShell
      title="Careers"
      subtitle="Join us in building the future of premium digital finance"
    >
      <p>
        We are a growing team of builders, designers, and operators passionate about
        democratizing access to premium financial products. If you thrive in fast-moving
        environments and care about craft, we would love to hear from you.
      </p>
      <h2 className="font-display text-xl font-semibold text-white">Open roles</h2>
      <ul className="space-y-4">
        {ROLES.map((role) => (
          <li
            key={role.title}
            className="rounded-2xl border border-white/10 bg-surface-card p-5"
          >
            <p className="font-semibold text-white">{role.title}</p>
            <p className="mt-1 text-sm text-gray-500">
              {role.team} · {role.location} · {role.type}
            </p>
          </li>
        ))}
      </ul>
      <p>
        Don&apos;t see a fit? Email{" "}
        <Link href="mailto:careers@pennycredit.com" className="text-brand-400 hover:underline">
          careers@pennycredit.com
        </Link>{" "}
        with your background and what you would like to build.
      </p>
    </MarketingPageShell>
  );
}
