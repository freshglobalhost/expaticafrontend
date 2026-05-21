"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/#products", label: "Products" },
  { href: "/#calculator", label: "Calculator" },
  { href: "/#features", label: "Features" },
  { href: "/help", label: "Help" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-surface-elevated">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-500/30">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-white">
            Penny<span className="text-brand-400">Credit</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Open Account</Link>
          </Button>
        </div>

        <button
          className="rounded-lg p-2 text-gray-400 hover:bg-white/5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/5 bg-surface md:hidden"
          >
            <div className="flex flex-col gap-4 px-4 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-300"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button className="w-full" asChild>
                <Link href="/signup" onClick={() => setOpen(false)}>
                  Open Free Account
                </Link>
              </Button>
              <Button variant="secondary" className="w-full" asChild>
                <Link href="/login" onClick={() => setOpen(false)}>
                  Sign In
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
