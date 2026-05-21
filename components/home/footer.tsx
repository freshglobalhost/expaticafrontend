import Link from "next/link";
import {
  Shield,
  Lock,
  Award,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react";

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "AML Policy", href: "#" },
];

const productLinks = [
  { label: "Personal Loans", href: "#products" },
  { label: "Business Loans", href: "#products" },
  { label: "Investments", href: "#products" },
  { label: "Virtual Cards", href: "#products" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-white/5 bg-surface-card px-6 py-8">
          {[
            { icon: Shield, label: "Globally Regulated", sub: "Licensed in 40+ jurisdictions" },
            { icon: Lock, label: "256-bit SSL", sub: "Bank-grade encryption" },
            { icon: Award, label: "Insured Deposits", sub: "Protection up to statutory limits" },
          ].map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.label} className="flex items-center gap-3 px-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15">
                  <Icon className="h-5 w-5 text-brand-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{badge.label}</p>
                  <p className="text-xs text-gray-500">{badge.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-white">
                Penny<span className="text-brand-400">Credit</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
              Premium digital banking, lending, and investment platform for
              customers worldwide. Licensed, secure, and built for the future of
              finance.
            </p>
            <p className="mt-4 text-xs text-gray-500">
              PennyCredit Financial Services Ltd. · New York, USA · London, UK ·
              Singapore
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              Products
            </h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-brand-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              Legal
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-brand-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} PennyCredit. All rights reserved.
            Regulated financial services provider.
          </p>
          <div className="flex gap-4">
            {[Twitter, Linkedin, Instagram, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-colors hover:border-brand-500/50 hover:text-brand-400"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
