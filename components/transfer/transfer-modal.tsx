"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowLeftRight,
  User,
  Building2,
  Banknote,
  ShieldCheck,
  Lock,
  Mail,
  Globe,
  CheckCircle2,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { PinInput } from "@/components/auth/pin-input";
import {
  getTransferMethod,
  type TransferMethodId,
} from "@/lib/transfer-methods";
import { useDashboard } from "@/components/providers/dashboard-provider";
import { createTransfer } from "@/lib/api/banking";
import { getErrorMessage } from "@/lib/api/get-error-message";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sanitizeAmountInput } from "@/lib/currency";
import {
  useAccountCurrency,
  useCurrencyInputPrefix,
  useFormatAccountMoney,
} from "@/hooks/use-account-currency";

const inputClass =
  "h-10 w-full rounded-xl border border-white/10 bg-surface-elevated px-3 text-sm text-white placeholder:text-gray-500 focus:border-brand-500/50 focus:outline-none focus:ring-1 focus:ring-brand-500/30";

const labelClass = "mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-gray-500";

interface TransferModalProps {
  methodId: TransferMethodId | null;
  methodApiId?: number | null;
  onClose: () => void;
}

function collectRecipientDetails(form: HTMLFormElement) {
  const fd = new FormData(form);
  const details: Record<string, string> = {};
  fd.forEach((value, key) => {
    if (key === "transfer-amount") return;
    if (typeof value === "string" && value.trim()) {
      details[key] = value.trim();
    }
  });
  return details;
}

export function TransferModal({ methodId, methodApiId, onClose }: TransferModalProps) {
  const method = methodId ? getTransferMethod(methodId) : null;
  const open = !!method;

  return (
    <AnimatePresence>
      {open && method && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[60] flex items-end justify-center p-3 sm:items-center sm:p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[min(90dvh,100%)] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-white/10 bg-surface-card shadow-2xl"
            >
              <div className="sticky top-0 z-10 border-b border-white/5 bg-surface-card">
                <div className="flex items-start justify-between gap-3 p-4">
                  <div>
                    <h3 className="flex items-center gap-2 text-base font-bold text-white">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/15">
                        <ArrowLeftRight className="h-4 w-4 text-brand-400" />
                      </span>
                      Send via {method.label}
                    </h3>
                    <p className="mt-0.5 pl-11 text-xs text-gray-500">
                      Secure transfer · {method.subtitle}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto overscroll-contain p-4">
                <TransferForm
                  key={method.id}
                  methodId={method.id}
                  methodApiId={methodApiId ?? null}
                  onSuccess={onClose}
                />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function TransferForm({
  methodId,
  methodApiId,
  onSuccess,
}: {
  methodId: TransferMethodId;
  methodApiId: number | null;
  onSuccess: () => void;
}) {
  const { summary, refetch } = useDashboard();
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  useEffect(() => {
    setPin("");
    setAmount("");
    setDone(false);
    setLoading(false);
    setError(null);
    setReference(null);
  }, [methodId]);

  const accountCurrency = useAccountCurrency();
  const formatMoney = useFormatAccountMoney();
  const currencyPrefix = useCurrencyInputPrefix();

  const maxBal = parseFloat(summary?.primary_wallet_balance ?? summary?.total_balance ?? "0") || 0;
  const amountNum = parseFloat(amount) || 0;
  const overBalance = amountNum > maxBal;

  const fmtBal = formatMoney(maxBal);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pin.length !== 4 || amountNum < 1 || overBalance) return;
    if (!methodApiId) {
      setError("This transfer method is not available. Please try again later.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const recipient_details = collectRecipientDetails(e.currentTarget);
      const transfer = await createTransfer({
        method: methodApiId,
        amount: amountNum.toFixed(2),
        transaction_pin: pin,
        recipient_details,
      });
      setReference(transfer.reference_code);
      void refetch();
      setDone(true);
    } catch (err) {
      setError(getErrorMessage(err, "Transfer could not be submitted."));
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="py-6 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
        <p className="mt-3 font-medium text-white">Transfer submitted</p>
        <p className="mt-1 text-xs text-gray-500">
          {reference
            ? `Reference ${reference}. Your request is being processed.`
            : "Your request is being processed. You'll receive a confirmation shortly."}
        </p>
        <Button variant="secondary" size="sm" className="mt-4" onClick={onSuccess}>
          Done
        </Button>
      </div>
    );
  }

  const pinValid = pin.length === 4;
  const canSubmit =
    amountNum >= 1 && !overBalance && pinValid && !loading && !!methodApiId;

  const processingNote =
    methodId === "wire"
      ? "1–3 business days"
      : methodId === "local"
        ? "Same-day domestic"
        : methodId === "western"
          ? "Cash pickup available"
          : methodId === "wise"
            ? "Low-fee international"
            : "Usually within minutes";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
      {methodId === "wire" && <WireFields />}
      {methodId === "local" && <LocalFields />}
      {methodId === "paypal" && <PayPalFields />}
      {methodId === "skrill" && <EmailOnlyFields title="Skrill recipient" hint="Skrill email address" />}
      {methodId === "googlepay" && <GooglePayFields />}
      {methodId === "western" && <WesternUnionFields />}
      {methodId === "wise" && <EmailOnlyFields title="Wise recipient" />}
      {methodId === "payoneer" && <PayoneerFields />}

      <AmountSection
        amount={amount}
        onAmountChange={setAmount}
        maxBal={maxBal}
        fmtBal={fmtBal}
        overBalance={overBalance}
        processingNote={processingNote}
        currencyCode={accountCurrency}
        currencyPrefix={currencyPrefix}
      />

      <Section icon={ShieldCheck} title="Secure transaction" accent="amber">
        <p className="mb-3 text-center text-xs text-gray-500">
          Enter your 4-digit PIN to authorize this transfer
        </p>
        <PinInput key={`transfer-pin-${methodId}`} value={pin} onChange={setPin} />
      </Section>

      <InfoBanner methodId={methodId} />

      {error && (
        <p className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={!canSubmit}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing…
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            Authorize & send
          </>
        )}
      </Button>

      <p className="text-center text-[10px] text-gray-500">
        Secured with bank-grade encryption
      </p>
    </form>
  );
}

function wireInputProps(name: string) {
  return { name, className: inputClass, autoComplete: "off" as const };
}

function WireFields() {
  return (
    <>
      <Section icon={User} title="Beneficiary information">
        <Field label="Account holder name">
          <input {...wireInputProps("account_holder_name")} required placeholder="John Smith" />
        </Field>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Account number">
            <input {...wireInputProps("account_number")} required placeholder="Account number" />
          </Field>
          <Field label="IBAN">
            <input {...wireInputProps("iban")} required placeholder="IBAN (if applicable)" />
          </Field>
        </div>
      </Section>
      <Section icon={Building2} title="Bank details" accent="amber">
        <Field label="Bank name">
          <input {...wireInputProps("bank_name")} required placeholder="Bank name" />
        </Field>
        <div className="grid grid-cols-2 gap-2">
          <Field label="SWIFT / BIC">
            <input {...wireInputProps("swift_bic")} required placeholder="SWIFT / BIC code" />
          </Field>
          <Field label="Country">
            <input {...wireInputProps("country")} required placeholder="Country" />
          </Field>
        </div>
        <Field label="Bank address">
          <input {...wireInputProps("bank_address")} required placeholder="Bank address" />
        </Field>
        <Field label="Account type">
          <select name="account_type" className={inputClass} required defaultValue="">
            <option value="" disabled>
              Select type…
            </option>
            <option>Checking</option>
            <option>Savings Account</option>
            <option>Current</option>
            <option>Corporate</option>
          </select>
        </Field>
      </Section>
    </>
  );
}

function LocalFields() {
  return (
    <>
      <Section icon={User} title="Recipient information">
        <Field label="Account holder name">
          <input {...wireInputProps("account_holder_name")} required placeholder="Account holder name" />
        </Field>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Account number">
            <input {...wireInputProps("account_number")} required placeholder="Account number" />
          </Field>
          <Field label="Routing number">
            <input {...wireInputProps("routing_number")} required placeholder="Routing number" />
          </Field>
        </div>
      </Section>
      <Section icon={Building2} title="Bank details" accent="amber">
        <Field label="Bank name">
          <input {...wireInputProps("bank_name")} required placeholder="Bank name" />
        </Field>
        <Field label="Account type">
          <select name="account_type" className={inputClass} required defaultValue="">
            <option value="" disabled>
              Select type…
            </option>
            <option>Checking</option>
            <option>Savings Account</option>
          </select>
        </Field>
      </Section>
    </>
  );
}

function PayPalFields() {
  return (
    <Section icon={Mail} title="PayPal recipient">
      <Field label="PayPal email">
        <input name="recipient_email" type="email" className={inputClass} required placeholder="recipient@example.com" />
      </Field>
    </Section>
  );
}

function GooglePayFields() {
  return (
    <Section icon={Mail} title="Google Pay recipient">
      <Field label="Email or phone">
        <input name="recipient_contact" className={inputClass} required placeholder="recipient@email.com or +1 555 000 0000" />
      </Field>
      <p className="text-[10px] text-gray-500">Linked to the recipient&apos;s Google Pay account.</p>
    </Section>
  );
}

function PayoneerFields() {
  return (
    <Section icon={Mail} title="Payoneer recipient">
      <Field label="Payoneer email">
        <input name="recipient_email" type="email" className={inputClass} required placeholder="business@example.com" />
      </Field>
      <Field label="Business name (optional)">
        <input name="business_name" className={inputClass} placeholder="Company name" />
      </Field>
    </Section>
  );
}

function WesternUnionFields() {
  return (
    <Section icon={Globe} title="Recipient information">
      <Field label="Full name">
        <input name="full_name" className={inputClass} required placeholder="As shown on ID" />
      </Field>
      <div className="grid grid-cols-2 gap-2">
        <Field label="Country">
          <input name="country" className={inputClass} required placeholder="Destination country" />
        </Field>
        <Field label="City">
          <input name="city" className={inputClass} required placeholder="Pickup city" />
        </Field>
      </div>
      <Field label="Postal / zip code">
        <input name="postal_code" className={inputClass} required placeholder="Postal code" />
      </Field>
    </Section>
  );
}

function EmailOnlyFields({ title, hint }: { title: string; hint?: string }) {
  return (
    <Section icon={Mail} title={title}>
      <Field label="Recipient email">
        <input name="recipient_email" type="email" className={inputClass} required placeholder="recipient@example.com" />
      </Field>
      {hint && <p className="text-[10px] text-gray-500">{hint}</p>}
    </Section>
  );
}

function AmountSection({
  amount,
  onAmountChange,
  maxBal,
  fmtBal,
  overBalance,
  processingNote,
  currencyCode,
  currencyPrefix,
}: {
  amount: string;
  onAmountChange: (v: string) => void;
  maxBal: number;
  fmtBal: string;
  overBalance: boolean;
  processingNote: string;
  currencyCode: string;
  currencyPrefix: string;
}) {
  return (
    <Section icon={Banknote} title="Transfer amount" accent="brand">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-400">
          {currencyPrefix}
        </span>
        <input
          type="text"
          inputMode="decimal"
          required
          value={amount}
          onChange={(e) => onAmountChange(sanitizeAmountInput(e.target.value))}
          className={cn(inputClass, "pl-14 text-lg font-bold")}
          aria-label={`Amount in ${currencyCode}`}
          placeholder="0"
          autoComplete="off"
          name="transfer-amount"
        />
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px]">
        <span className="text-gray-500">Available: {fmtBal}</span>
        {amount && !overBalance && (
          <span className="font-medium text-brand-400">{processingNote}</span>
        )}
      </div>
      {overBalance && (
        <p className="mt-1 flex items-center gap-1 text-xs text-red-400">
          <AlertTriangle className="h-3.5 w-3.5" />
          Insufficient balance
        </p>
      )}
    </Section>
  );
}

function InfoBanner({ methodId }: { methodId: TransferMethodId }) {
  const messages: Partial<Record<TransferMethodId, string>> = {
    local: "Domestic transfers typically settle within the same business day.",
    paypal: "Funds sent directly to the recipient's PayPal account.",
    skrill: "Funds sent to the recipient's Skrill wallet.",
    googlepay: "Sent to the recipient's Google Pay linked account.",
    western: "Recipient can collect cash with valid ID.",
    wise: "Low-cost international transfer with transparent pricing.",
    payoneer: "Ideal for business and freelancer payouts worldwide.",
  };
  const msg = messages[methodId];
  if (!msg) return null;
  return (
    <div className="rounded-xl border border-brand-500/15 bg-brand-500/5 px-3 py-2.5 text-xs text-gray-400">
      {msg}
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  accent = "brand",
  children,
}: {
  icon: React.ElementType;
  title: string;
  accent?: "brand" | "amber";
  children: React.ReactNode;
}) {
  const iconColor = accent === "amber" ? "text-amber-400" : "text-brand-400";
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
      <h4 className="mb-3 flex items-center gap-2 text-xs font-bold text-white">
        <Icon className={cn("h-3.5 w-3.5", iconColor)} />
        {title}
      </h4>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}
