# PennyCredit — Premium Fintech Frontend

A production-ready Next.js 14 homepage for a global premium digital banking, loan, and investment platform inspired by Revolut, Kuda, and Nubank.

## Brand colors (for logo & design)

PennyCredit uses a **teal primary** with **gold accents** on **dark navy surfaces**. Values below match `tailwind.config.ts`.

### Primary — Teal (`brand`)

| Token | Hex | RGB | Use |
|-------|-----|-----|-----|
| `brand-400` | `#2dd4bf` | `45, 212, 191` | Highlights, links, hover states |
| `brand-500` | `#14b8a6` | `20, 184, 166` | **Main brand color** — buttons, logo gradient start |
| `brand-600` | `#0d9488` | `13, 148, 136` | Logo gradient end, pressed states |
| `brand-700` | `#0f766e` | `15, 118, 110` | Darker teal accents |
| `brand-950` | `#042f2e` | `4, 47, 46` | Deepest teal (backgrounds) |

**Logo gradient (used in app):** `#14b8a6` → `#0d9488` (135° or top-left to bottom-right)

### Accent — Gold (`gold`)

| Token | Hex | RGB | Use |
|-------|-----|-----|-----|
| `gold-400` | `#fbbf24` | `251, 191, 36` | Premium highlights |
| `gold-500` | `#f59e0b` | `245, 158, 11` | **Secondary accent** — badges, card gradients |
| `gold-600` | `#d97706` | `217, 119, 6` | Dark gold |

### Backgrounds — Dark surfaces (`surface`)

| Token | Hex | RGB | Use |
|-------|-----|-----|-----|
| `surface` | `#0a0f1a` | `10, 15, 26` | Page background (dark mode) |
| `surface-elevated` | `#111827` | `17, 24, 39` | Sidebar, footer |
| `surface-card` | `#1a2332` | `26, 35, 50` | Cards, panels |
| `surface-border` | `#2a3548` | `42, 53, 72` | Borders |

### Supporting UI colors

| Role | Hex | Notes |
|------|-----|-------|
| Success | `#34d399` / Tailwind `emerald-400` | Positive balances, growth |
| Warning | `#fbbf24` | Same as `gold-400` |
| Error | `#f87171` / Tailwind `red-400` | Errors, sign out hover |
| Body text (dark) | `#f3f4f6` / `gray-100` | Primary copy on dark bg |
| Muted text | `#9ca3af` / `gray-400` | Secondary copy |

### Logo recommendations

- **Icon mark:** Shield on gradient `#14b8a6` → `#0d9488`, white glyph
- **Wordmark:** “Penny” in white (`#ffffff`), “Credit” in `#2dd4bf` (`brand-400`)
- **On light backgrounds:** Use `brand-600`–`brand-700` for the mark; wordmark in `#111827`
- **Avoid:** Pure black backgrounds — use `#0a0f1a` (`surface`) for consistency

### Quick copy-paste (logo tools)

```
Primary:    #14b8a6
Primary dark: #0d9488
Accent:     #f59e0b
Background: #0a0f1a
Text:       #ffffff
Highlight:  #2dd4bf
```

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** + custom premium dark theme
- **shadcn/ui** (Button, Accordion, Slider)
- **Framer Motion** — animations throughout
- **TanStack Query** — provider ready for API integration
- **React Hook Form** — ready for auth/onboarding forms

## Homepage Sections

1. **Hero** — Full viewport, animated headline, floating dashboard preview, dual CTAs
2. **Social Proof** — Animated counters + live global activity feed
3. **Products** — Loans, savings, investments, virtual cards, crypto
4. **Loan Calculator** — Real-time repayment & interest preview
5. **Features** — Fast approval, AI scoring, security, support
6. **Testimonials** — Auto-playing carousel with pause on hover
7. **FAQ** — Accordion-based
8. **Footer** — Security badges, regulatory info, legal & social links

## Authentication UI (frontend only)

No backend — forms validate client-side and simulate navigation.

| Route | Page |
|-------|------|
| `/login` | Sign in |
| `/signup` | Single-page registration (name, email, phone, country, 4-digit PIN, password) |
| `/transaction-pin` | Enter 4-digit PIN after login to access dashboard |
| `/dashboard` | User dashboard (wallets, loans, transactions, analytics) |

### Loans (UI only)
| `/loans` | Marketplace |
| `/loans/calculator` | Calculator |
| `/loans/eligibility` | Eligibility checker |
| `/loans/apply` | 5-step application |
| `/loans/apply/success` | Success + pending approval |
| `/loans/history` | Loan history |
| `/loans/LN-001` | Loan details |
| `/loans/LN-001/repayment` | Repayment schedule |

### Investments (UI only)
| `/investments` | Dashboard, portfolio, charts |
| `/investments/plans` | Investment plans |
| `/investments/crypto` | Crypto |
| `/investments/stocks` | Stocks |
| `/investments/real-estate` | Real estate |
| `/investments/fixed-income` | Fixed income |
| `/investments/watchlist` | Watchlist |
| `/investments/history` | History |

### Crypto deposit (simulated)
| `/crypto/deposit` | Select asset, address, QR, copy, confirmation animation |
| `/crypto/history` | Deposit history table |

### Virtual cards (simulated)
| `/cards` | Card gallery, freeze, limits, themes, CVV reveal, transactions |
| `/forgot-password` | Request reset code |
| `/verify-otp` | OTP verification (`?flow=signup\|reset`) |
| `/reset-password` | Set new password |
| `/sessions` | Sessions & device management |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## SEO

Public pages include meta titles, descriptions, keywords, Open Graph, Twitter cards, canonical URLs, and JSON-LD structured data.

- Config: `lib/seo.ts` — set `NEXT_PUBLIC_SITE_URL` in `.env.local` (see `.env.local.example`)
- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt` (dashboard and auth routes are `noindex`)
- OG image: auto-generated at `/opengraph-image`
- FAQ schema on `/help/faq`

After deploy, submit `https://your-domain.com/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).

## Build

```bash
npm run build
npm start
```

## Excluded (by design)

- Airtime purchase
- Data purchase
- Utility bill payments
