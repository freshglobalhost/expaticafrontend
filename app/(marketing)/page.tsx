import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { SocialProofSection } from "@/components/home/social-proof-section";
import { ProductsSection } from "@/components/home/products-section";
import { LoanCalculator } from "@/components/home/loan-calculator";
import { FeaturesSection } from "@/components/home/features-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FAQSection } from "@/components/home/faq-section";
import { Footer } from "@/components/home/footer";
import { HomePageJsonLd } from "@/components/seo/json-ld";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "PennyCredit — Instant Loans, Banking, Cards & Investments",
  description:
    "Join PennyCredit for premium digital banking: get personal and business loans in minutes, grow wealth with curated investment plans, spend with virtual cards, deposit crypto, and send money worldwide with transparent fees.",
  path: "/",
  keywords: [
    "instant personal loan",
    "digital wallet app",
    "invest money online",
    "buy crypto with bank transfer",
    "international remittance",
  ],
});

export default function HomePage() {
  return (
    <main>
      <HomePageJsonLd />
      <HeroSection />
      <SocialProofSection />
      <ProductsSection />
      <LoanCalculator />
      <FeaturesSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
