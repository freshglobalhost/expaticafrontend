"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Small Business Owner, London",
    content:
      "Expatica approved my business loan in 4 minutes. The dashboard is gorgeous and the rates beat every bank I compared. This feels like banking from 2030.",
    rating: 5,
    avatar: "SM",
  },
  {
    name: "James Chen",
    role: "Software Engineer, Singapore",
    content:
      "I moved my salary, savings, and crypto holdings here. Virtual cards work flawlessly. Support actually responds at 2am. Unreal product.",
    rating: 5,
    avatar: "JC",
  },
  {
    name: "Emily Rodriguez",
    role: "Medical Resident, Chicago",
    content:
      "Emergency loan saved me during relocation. Transparent calculator, no hidden fees, and the app never feels cheap. Premium in every detail.",
    rating: 5,
    avatar: "ER",
  },
  {
    name: "Michael Torres",
    role: "Investor, Toronto",
    content:
      "Investment returns dashboard is cleaner than any broker I've used. Combined with instant transfers and deposit protection — I'm never going back.",
    rating: 5,
    avatar: "MT",
  },
  {
    name: "Aisha Okonkwo",
    role: "Freelance Designer, Berlin",
    content:
      "Savings goals and auto-save finally made budgeting stick for me. I hit my emergency fund target three months early without thinking about it.",
    rating: 5,
    avatar: "AO",
  },
  {
    name: "David Kim",
    role: "E-commerce Founder, Seoul",
    content:
      "Multi-currency wallets and instant payouts changed how I pay suppliers. FX rates are fair and everything shows up in one clean dashboard.",
    rating: 5,
    avatar: "DK",
  },
  {
    name: "Priya Sharma",
    role: "Management Consultant, Sydney",
    content:
      "The loan calculator matched my actual offer to the dollar. No surprises at signing — that level of transparency is rare in fintech.",
    rating: 5,
    avatar: "PS",
  },
  {
    name: "Olivia Berg",
    role: "Teacher, Stockholm",
    content:
      "Locked savings with a clear unlock date helped me plan for maternity leave. Higher yield than my old bank and the app explains everything.",
    rating: 5,
    avatar: "OB",
  },
  {
    name: "Carlos Mendez",
    role: "Restaurant Owner, Madrid",
    content:
      "Business loan funded our second location in under 24 hours. Repayment tracking in the app makes payroll weeks stress-free.",
    rating: 5,
    avatar: "CM",
  },
  {
    name: "Fatima Al-Hassan",
    role: "Product Manager, Dubai",
    content:
      "Crypto deposits credit reliably and the history table is actually useful. Feels like one product, not a bolt-on feature.",
    rating: 5,
    avatar: "FA",
  },
  {
    name: "Nathan Brooks",
    role: "Sales Director, Austin",
    content:
      "Virtual card limits stopped overspend on ad campaigns overnight. Freeze and unfreeze from my phone — game changer for team cards.",
    rating: 5,
    avatar: "NB",
  },
  {
    name: "Yuki Tanaka",
    role: "Graduate Student, Tokyo",
    content:
      "Opened an account between classes, verified in minutes, and had my first card before dinner. Onboarding is ridiculously smooth.",
    rating: 5,
    avatar: "YT",
  },
  {
    name: "Thabo Nkosi",
    role: "Entrepreneur, Johannesburg",
    content:
      "From Cape Town suppliers to Joburg payroll, transfers land fast and fees stay low. Expatica feels built for how we actually run business in South Africa.",
    rating: 5,
    avatar: "TN",
  },
  {
    name: "Zanele Dlamini",
    role: "Accountant, Durban",
    content:
      "I fund my virtual card in rands-equivalent USD and track every payment for clients. Clean statements and instant freeze give me real peace of mind.",
    rating: 5,
    avatar: "ZD",
  },
  {
    name: "Keisha Williams",
    role: "Small Business Owner, Port of Spain",
    content:
      "Wire and PayPal payouts to Trinidad partners used to take days. Now my team gets paid the same day — the send money page is simple and reliable.",
    rating: 5,
    avatar: "KW",
  },
  {
    name: "Marcus Baptiste",
    role: "Freelancer, San Fernando",
    content:
      "Clients abroad pay me through Expatica and I withdraw locally without drama. Virtual cards for subscriptions are a bonus I use every week.",
    rating: 5,
    avatar: "MB",
  },
];

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  const current = testimonials[index];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-brand-400">
            Testimonials
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Loved by customers worldwide
          </h2>
        </motion.div>

        <div
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface-card via-surface-elevated to-surface-card p-8 sm:p-10"
            >
              <Quote className="absolute right-8 top-8 h-16 w-16 text-brand-500/10" />

              <div className="mb-6 flex gap-1">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-gold-400 text-gold-400"
                  />
                ))}
              </div>

              <p className="relative text-lg leading-relaxed text-gray-200 sm:text-xl">
                &ldquo;{current.content}&rdquo;
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-bold text-white">
                  {current.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white">{current.name}</p>
                  <p className="text-sm text-gray-400">{current.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-colors hover:border-brand-500/50 hover:text-white"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex max-w-[200px] flex-wrap justify-center gap-2 sm:max-w-none">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index
                      ? "w-8 bg-brand-500"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-colors hover:border-brand-500/50 hover:text-white"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
