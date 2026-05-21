"use client";

import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  AlertCircle,
  Upload,
  FileCheck,
  X,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { createCryptoDeposit } from "@/lib/api/transactions";
import { getErrorMessage } from "@/lib/api/get-error-message";
import {
  CRYPTO_ASSETS,
  CRYPTO_DEPOSIT_WALLETS,
  type CryptoSymbol,
} from "@/lib/crypto-mock-data";
import { useDashboard } from "@/components/providers/dashboard-provider";
import { DepositQrImage } from "./deposit-qr-image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DEPOSIT_ASSETS = CRYPTO_ASSETS;

export function CryptoDepositFlow() {
  const { refetch } = useDashboard();
  const [selected, setSelected] = useState<CryptoSymbol>("BTC");
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [txHash, setTxHash] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const asset = useMemo(
    () => DEPOSIT_ASSETS.find((a) => a.symbol === selected) ?? DEPOSIT_ASSETS[0],
    [selected]
  );
  const address = CRYPTO_DEPOSIT_WALLETS[selected];

  const copyAddress = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
    clearProof();
    setCryptoAmount("");
    setTxHash("");
    setReference(null);
    setSubmitError(null);
  };

  const handleSubmit = async () => {
    if (!proofFile) return;
    const amount = parseFloat(cryptoAmount);
    if (!amount || amount < asset.minDeposit) {
      setSubmitError(`Minimum deposit is ${asset.minDeposit} ${asset.symbol}.`);
      return;
    }
    if (!txHash.trim()) {
      setSubmitError("Transaction hash is required.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await createCryptoDeposit({
        crypto_symbol: asset.symbol,
        crypto_amount: amount.toString(),
        transaction_hash: txHash.trim(),
        proof_image: proofFile,
      });
      setReference(result.reference_code);
      void refetch();
      setSubmitted(true);
    } catch (err) {
      setSubmitError(getErrorMessage(err, "Deposit could not be submitted."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-xs font-medium text-gray-400">Select cryptocurrency</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {DEPOSIT_ASSETS.map((c) => (
              <button
                key={c.symbol}
                type="button"
                onClick={() => {
                  setSelected(c.symbol);
                  if (submitted) resetFlow();
                }}
                disabled={submitted}
                className={cn(
                  "rounded-xl border p-3 text-left transition-all",
                  selected === c.symbol
                    ? "border-brand-500/50 bg-brand-500/10 ring-1 ring-brand-500/30"
                    : "border-white/5 bg-surface-card hover:border-white/10",
                  submitted && "opacity-60"
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-sm font-bold text-white",
                    c.gradient
                  )}
                >
                  {c.icon}
                </span>
                <p className="mt-2 text-sm font-semibold text-white">{c.symbol}</p>
                <p className="text-[10px] text-gray-500">{c.name}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
          <div className="flex gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-amber-400" />
            <div className="text-xs text-gray-400">
              <p className="font-medium text-amber-300/90">
                Send only {asset.symbol} on {asset.network}
              </p>
              <p className="mt-0.5">
                Minimum: {asset.minDeposit} {asset.symbol}. Wrong network may result in lost
                funds.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-surface-card p-4">
          <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
            Deposit address
          </p>
          <p className="mt-1.5 break-all font-mono text-xs text-white sm:text-sm">{address}</p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-3 w-full"
            onClick={copyAddress}
            type="button"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy address
              </>
            )}
          </Button>
        </div>

        {!submitted ? (
          <>
            <div className="rounded-xl border border-white/10 bg-surface-card p-4 space-y-3">
              <div>
                <p className="text-xs font-medium text-white">
                  Amount sent ({asset.symbol}) <span className="text-red-400">*</span>
                </p>
                <Input
                  type="text"
                  inputMode="decimal"
                  required
                  placeholder={`Min ${asset.minDeposit}`}
                  value={cryptoAmount}
                  onChange={(e) => setCryptoAmount(e.target.value.replace(/[^\d.]/g, ""))}
                  className="mt-2"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-white">
                  Transaction hash <span className="text-red-400">*</span>
                </p>
                <Input
                  type="text"
                  required
                  placeholder="0x… or tx id"
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  className="mt-2 font-mono text-sm"
                />
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-surface-card p-4">
              <p className="text-xs font-medium text-white">
                Payment proof <span className="text-red-400">*</span>
              </p>
              <p className="mt-0.5 text-[10px] text-gray-500">
                Upload a screenshot or receipt of your transfer
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                required
                className="hidden"
                onChange={handleProofChange}
              />

              {!proofFile ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-3 flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-6 transition-colors hover:border-brand-500/30 hover:bg-brand-500/5"
                >
                  <Upload className="h-6 w-6 text-gray-500" />
                  <span className="text-xs font-medium text-gray-400">
                    Tap to upload payment proof
                  </span>
                  <span className="text-[10px] text-gray-600">PNG, JPG, or PDF</span>
                </button>
              ) : (
                <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  {proofPreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={proofPreview}
                      alt="Payment proof preview"
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-500/15">
                      <FileCheck className="h-5 w-5 text-brand-400" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-white">{proofFile.name}</p>
                    <p className="text-[10px] text-gray-500">
                      {(proofFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={clearProof}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-white/5 hover:text-white"
                    aria-label="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-brand-500/15 bg-brand-500/5 px-3 py-2.5">
              <p className="text-xs text-gray-400">
                <span className="font-medium text-brand-300">Important:</span> Send crypto to the
                address above, then submit amount, transaction hash, and payment proof. Your wallet
                will be credited once payment is verified.
              </p>
            </div>

            {submitError && <p className="text-xs text-red-400">{submitError}</p>}

            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={!proofFile || submitting || !cryptoAmount || !txHash.trim()}
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                "Submit deposit"
              )}
            </Button>
          </>
        ) : (
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <div className="flex gap-3">
              <CheckCircle2 className="h-8 w-8 shrink-0 text-emerald-400" />
              <div>
                <p className="font-semibold text-white">Deposit submitted</p>
                <p className="mt-2 text-sm text-gray-400">
                  Thank you. Your wallet will be credited once your payment is verified.
                  {reference ? (
                    <>
                      {" "}
                      Reference: <span className="font-mono text-brand-400">{reference}</span>
                    </>
                  ) : null}
                </p>
                <Button variant="secondary" size="sm" className="mt-4" onClick={resetFlow}>
                  Make another deposit
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center">
        <div className="w-full max-w-xs rounded-xl border border-white/10 bg-surface-card p-5">
          <p className="mb-3 text-center text-xs text-gray-400">Scan to deposit</p>
          <div className="flex justify-center">
            <DepositQrImage symbol={selected} />
          </div>
          <p className="mt-3 text-center text-[10px] text-gray-500">{asset.network}</p>
        </div>
      </div>
    </div>
  );
}
