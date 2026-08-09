"use client";

import { motion } from "framer-motion";
import {
  Download,
  FileText,
  BadgeCheck,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const COMPANY_PDF = "/assets/company/about-expatica.pdf";
const COMPANY_CERTIFICATE = "/assets/company/company-certificate.pdf";
const COMPANY_VIDEO = "/assets/company/expatica.mp4";

export function TrustAssetsSection() {
  return (
    <section
      id="trust"
      className="relative border-y border-white/5 bg-surface-elevated py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-400">
            Transparency
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Documents &amp; company credentials
          </h2>
          <p className="mt-4 text-gray-400">
            Review our company overview, official certificate, and introductory
            video — built for transparency and trust.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="flex flex-col rounded-2xl border border-white/10 bg-surface p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/15">
              <FileText className="h-6 w-6 text-brand-400" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-white">
              About Expatica (PDF)
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-400">
              Download a concise overview of Expatica — our platform, services,
              and how we operate.
            </p>
            <Button className="mt-6 w-full" asChild>
              <a href={COMPANY_PDF} download>
                <Download className="h-4 w-4" />
                Download PDF
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="flex flex-col rounded-2xl border border-white/10 bg-surface p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/15">
              <BadgeCheck className="h-6 w-6 text-brand-400" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-white">
              Company certificate
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-400">
              View or download our official company registration certificate.
            </p>
            <Button className="mt-6 w-full" variant="secondary" asChild>
              <a href={COMPANY_CERTIFICATE} target="_blank" rel="noopener noreferrer">
                <BadgeCheck className="h-4 w-4" />
                View certificate
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="flex flex-col rounded-2xl border border-white/10 bg-surface p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/15">
              <PlayCircle className="h-6 w-6 text-brand-400" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-white">
              Company video
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              Watch a short introduction to Expatica and how we support customers
              worldwide.
            </p>
            <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-black/40">
              <video
                className="aspect-video w-full object-cover"
                controls
                playsInline
                preload="metadata"
              >
                <source src={COMPANY_VIDEO} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
