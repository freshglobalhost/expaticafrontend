"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Copy,
  Check,
  Upload,
  FileCheck,
  X,
  Loader2,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createLocalDeposit } from "@/lib/api/transactions";
import { getErrorMessage } from "@/lib/api/get-error-message";
import { useDashboard } from "@/components/providers/dashboard-provider";
import type { ApiAssignedBankAccount } from "@/lib/api/types";
import { cn } from "@/lib/utils";
import { sanitizeAmountInput } from "@/lib/currency";

const inputClass =
  "h-10 w-full rounded-xl border border-white/10 bg-surface-elevated px-3 text-sm text-white placeholder:text-gray-500 focus:border-brand-500/50 focus:outline-none focus:ring-1 focus:ring-brand-500/30";

function BankDetailsCard({ bank }: { bank: ApiAssignedBankAccount }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (label: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const rows: { label: string; value: string; key: string }[] = [
    { label: "Account holder", value: bank.account_holder, key: "holder" },
    { label: "Bank name", value: bank.bank_name, key: "bank" },
    { label: "Account number", value: bank.account_number, key: "account" },
  ];
  if (bank.routing_or_swift) {
    rows.push({
      label: "Routing / SWIFT / IBAN",
      value: bank.routing_or_swift,
      key: "routing",
    });
  }
  if (bank.country) {
    rows.push({ label: "Country", value: bank.country, key: "country" });
  }
  rows.push({ label: "Currency", value: bank.currency, key: "currency" });

  return (
    <div className="rounded-xl border border-brand-500/20 bg-brand-500/5 p-4">
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-brand-300">
        <Building2 className="h-4 w-4" />
        Your assigned bank account
      </p>
      <dl className="space-y-2.5 text-sm">
        {rows.map((row) => (
          <div key={row.key} className="flex items-start justify-between gap-3">
            <dt className="text-gray-500">{row.label}</dt>
            <dd className="flex items-center gap-2 text-right font-medium text-white">
              <span className="break-all">{row.value}</span>
              <button
                type="button"
                onClick={() => copy(row.key, row.value)}
                className="shrink-0 rounded-lg p-1 text-gray-500 hover:bg-white/10 hover:text-white"
                aria-label={`Copy ${row.label}`}
              >
                {copied === row.key ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </dd>
          </div>
        ))}
      </dl>
      {bank.instructions ? (
        <p className="mt-3 rounded-lg border border-white/5 bg-surface-card px-3 py-2 text-xs text-gray-400">
          {bank.instructions}
        </p>
      ) : null}
    </div>
  );
}

export function LocalDepositFlow() {
  const { summary, refetch } = useDashboard();
  const bank = summary?.user?.assigned_bank_account ?? null;
  const currency = bank?.currency ?? summary?.currency_code ?? "USD";

  const [amount, setAmount] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProofFile(file);
    if (file.type.startsWith("image/")) {
      setProofPreview(URL.createObjectURL(file));
    } else {
      setProofPreview(null);
    }
  };

  const clearProof = () => {
    setProofFile(null);
    setProofPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const resetFlow = () => {
    setSubmitted(false);
    setAmount("");
    clearProof();
    setReference(null);
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proofFile) {
      setSubmitError("Please upload payment proof.");
      return;
    }
    const amountNum = parseFloat(amount);
    if (!Number.isFinite(amountNum) || amountNum <= 0) {
      setSubmitError("Enter a valid deposit amount.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      const tx = await createLocalDeposit({
        amount: amountNum.toFixed(2),
        proof_image: proofFile,
        currency_code: currency,
      });
      setReference(tx.reference_code);
      setSubmitted(true);
      void refetch();
    } catch (err) {
      setSubmitError(getErrorMessage(err, "Could not submit deposit request."));
    } finally {
      setSubmitting(false);
    }
  };

  if (!bank) {
    return null;
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-md rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center"
      >
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
        <p className="mt-3 text-sm font-medium text-white">Deposit request submitted</p>
        <p className="mt-1 text-xs text-gray-500">
          We will review your payment proof and credit your wallet once confirmed.
        </p>
        {reference && (
          <p className="mt-2 font-mono text-xs text-brand-400">Ref: {reference}</p>
        )}
        <Button variant="secondary" size="sm" className="mt-4" onClick={resetFlow}>
          Make another deposit
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-5">
      <BankDetailsCard bank={bank} />

      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-400">
          Deposit amount ({currency})
        </label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(sanitizeAmountInput(e.target.value))}
          placeholder="0"
          className={inputClass}
          required
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-400">
          Payment proof
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf"
          onChange={handleProofChange}
          className="hidden"
        />
        {!proofFile ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-white/10 bg-surface-card px-4 py-8 text-sm text-gray-400 transition-colors hover:border-brand-500/30 hover:text-white"
            )}
          >
            <Upload className="h-6 w-6" />
            Upload receipt or transfer screenshot
          </button>
        ) : (
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-surface-card p-3">
            {proofPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={proofPreview}
                alt="Payment proof preview"
                className="h-14 w-14 rounded-lg object-cover"
              />
            ) : (
              <FileCheck className="h-8 w-8 text-emerald-400" />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{proofFile.name}</p>
              <p className="text-xs text-gray-500">
                {(proofFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <button
              type="button"
              onClick={clearProof}
              className="rounded-lg p-1.5 text-gray-500 hover:bg-white/10 hover:text-white"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {submitError && (
        <p className="text-center text-xs text-red-400">{submitError}</p>
      )}

      <Button type="submit" className="w-full" disabled={submitting || !proofFile}>
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting…
          </>
        ) : (
          "Submit deposit request"
        )}
      </Button>
    </form>
  );
}
