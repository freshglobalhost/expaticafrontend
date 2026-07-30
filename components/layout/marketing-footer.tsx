import Link from "next/link";
import { Shield, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "+12102793062";
const WHATSAPP_URL = "https://wa.me/12102793062";

export function MarketingFooter() {
  return (
    <footer className="border-t border-white/5 bg-surface-elevated py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold text-white">
                Expati<span className="text-brand-400">ca</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Premium digital banking for a global financial life.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp: {WHATSAPP_NUMBER}
            </a>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Product</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li><Link href="/loans" className="hover:text-brand-400">Loans</Link></li>
              <li><Link href="/investments" className="hover:text-brand-400">Investments</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-brand-400">About</Link></li>
              <li><Link href="/careers" className="hover:text-brand-400">Careers</Link></li>
              <li><Link href="/help" className="hover:text-brand-400">Help Center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li><Link href="/privacy" className="hover:text-brand-400">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-brand-400">Terms</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-12 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Expatica. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
