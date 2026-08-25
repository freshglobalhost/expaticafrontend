"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRightFromLine,
  User,
  Building2,
  Banknote,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  Wallet,
} from "lucide-react";
import { PinInput } from "@/components/auth/pin-input";
import { useDashboard } from "@/components/providers/dashboard-provider";
import { createWithdrawal } from "@/lib/api/banking";
import { getErrorMessage } from "@/lib/api/get-error-message";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sanitizeAmountInput } from "@/lib/currency";
import { CRYPTO_ASSETS, type CryptoSymbol } from "@/lib/crypto-mock-data";
import {
  useAccountCurrency,
  useCurrencyInputPrefix,
  useFormatAccountMoney,
} from "@/hooks/use-account-currency";

const inputClass =
  "h-10 w-full rounded-xl border border-white/10 bg-surface-elevated px-3 text-sm text-white placeholder:text-gray-500 focus:border-brand-500/50 focus:outline-none focus:ring-1 focus:ring-brand-500/30";

const labelClass = "mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-gray-500";

interface WithdrawalModalProps {
  method: {
    id: string;
    label: string;
    subtitle: string;
  } | null;
  methodApiId?: number | string | null;
  onClose: () => void;
}

function collectRecipientDetails(form: HTMLFormElement) {
  const fd = new FormData(form);
  const details: Record<string, string> = {};
  fd.forEach((value, key) => {
    if (key === "withdrawal-amount") return;
    if (typeof value === "string" && value.trim()) {
      details[key] = value.trim();
    }
  });
  return details;
}

export function WithdrawalModal({ method, methodApiId, onClose }: WithdrawalModalProps) {
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
                        <ArrowRightFromLine className="h-4 w-4 text-brand-400" />
                      </span>
                      Withdraw via {method.label}
                    </h3>
                    <p className="mt-0.5 pl-11 text-xs text-gray-500">
                      Secure withdrawal · {method.subtitle}
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
                <WithdrawalForm
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

function WithdrawalForm({
  methodId,
  methodApiId,
  onSuccess,
}: {
  methodId: string;
  methodApiId: number | string | null;
  onSuccess: () => void;
}) {
  const { summary, refetch } = useDashboard();
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  const [cryptoSymbol, setCryptoSymbol] = useState<CryptoSymbol>("BTC");

  useEffect(() => {
    setPin("");
    setAmount("");
    setDone(false);
    setLoading(false);
    setError(null);
    setReference(null);
    setCryptoSymbol("BTC");
  }, [methodId]);

  const isCrypto = methodId === "crypto";

  const accountCurrency = useAccountCurrency();
  const formatMoney = useFormatAccountMoney();
  const currencyPrefix = useCurrencyInputPrefix();

  const cryptoBalances: Record<CryptoSymbol, number> = {
    BTC: parseFloat(summary?.btc_balance ?? "0") || 0,
    ETH: parseFloat(summary?.eth_balance ?? "0") || 0,
    USDT: parseFloat(summary?.usdt_balance ?? "0") || 0,
    SOL: parseFloat(summary?.sol_balance ?? "0") || 0,
    BNB: parseFloat(summary?.bnb_balance ?? "0") || 0,
    LTC: parseFloat(summary?.ltc_balance ?? "0") || 0,
  };

  const cryptoAsset =
    CRYPTO_ASSETS.find((a) => a.symbol === cryptoSymbol) ?? CRYPTO_ASSETS[0];
  const cryptoBal = cryptoBalances[cryptoSymbol] ?? 0;
  const minCrypto = cryptoAsset.minDeposit;

  const fiatMax = parseFloat(summary?.primary_wallet_balance ?? summary?.total_balance ?? "0") || 0;
  const maxBal = isCrypto ? cryptoBal : fiatMax;

  const amountNum = parseFloat(amount) || 0;
  const overBalance = amountNum > maxBal;
  const belowMinimum = isCrypto ? amountNum > 0 && amountNum < minCrypto : amountNum > 0 && amountNum < 1;

  const fmtBal = isCrypto
    ? cryptoBal.toLocaleString("en-US", { maximumFractionDigits: 8 })
    : formatMoney(fiatMax);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pin.length !== 4 || overBalance || belowMinimum) return;
    if (!isCrypto && amountNum < 1) return;
    if (isCrypto && amountNum < minCrypto) return;
    if (!methodApiId) {
      setError("Unable to process withdrawal right now. Please try again in a moment.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const recipient_details = collectRecipientDetails(e.currentTarget);
      if (isCrypto) {
        recipient_details.crypto_symbol = cryptoSymbol;
        recipient_details.crypto_amount = amountNum.toString();
      }
      const withdrawal = await createWithdrawal({
        method: methodApiId,
        amount: isCrypto ? amountNum.toString() : amountNum.toFixed(2),
        transaction_pin: pin,
        recipient_details,
      });
      setReference(withdrawal.reference_code);
      void refetch();
      setDone(true);
    } catch (err) {
      setError(getErrorMessage(err, "Withdrawal could not be submitted."));
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="py-6 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
        <p className="mt-3 font-medium text-white">Withdrawal submitted</p>
        <p className="mt-1 text-xs text-gray-500">
          {reference
            ? `Reference ${reference}. Your withdrawal is being processed.`
            : "Your withdrawal request is being processed. You'll receive a confirmation shortly."}
        </p>
        <Button variant="secondary" size="sm" className="mt-4" onClick={onSuccess}>
          Done
        </Button>
      </div>
    );
  }

  const pinValid = pin.length === 4;
  const minOk = isCrypto ? amountNum >= minCrypto : amountNum >= 1;
  const canSubmit =
    minOk && !overBalance && pinValid && !loading && !!methodApiId;

  const processingNote = isCrypto
    ? "Crypto withdrawals typically complete after network confirmation"
    : "Typically 1–2 business days";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
      {methodId === "local" && <LocalWithdrawalFields />}
      {isCrypto && (
        <CryptoWithdrawalFields
          symbol={cryptoSymbol}
          onSymbolChange={setCryptoSymbol}
          balances={cryptoBalances}
        />
      )}

      <AmountSection
        amount={amount}
        onAmountChange={(v) =>
          setAmount(sanitizeAmountInput(v, isCrypto ? 8 : 2))
        }
        maxBal={maxBal}
        fmtBal={fmtBal}
        overBalance={overBalance}
        belowMinimum={belowMinimum}
        minLabel={
          isCrypto ? `Minimum ${minCrypto} ${cryptoSymbol}` : "Minimum 1.00"
        }
        processingNote={processingNote}
        currencyCode={isCrypto ? cryptoSymbol : accountCurrency}
        currencyPrefix={isCrypto ? cryptoSymbol : currencyPrefix}
      />

      <Section icon={ShieldCheck} title="Secure transaction" accent="amber">
        <p className="mb-3 text-center text-xs text-gray-500">
          Enter your 4-digit PIN to authorize this withdrawal
        </p>
        <PinInput key={`withdrawal-pin-${methodId}`} value={pin} onChange={setPin} />
      </Section>

      {isCrypto ? <CryptoInfoBanner /> : <InfoBanner />}

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
            Authorize & withdraw
          </>
        )}
      </Button>

      <p className="text-center text-[10px] text-gray-500">
        Secured with bank-grade encryption
      </p>
    </form>
  );
}

function LocalWithdrawalFields() {
  return (
    <>
      <Section icon={User} title="Recipient information">
        <Field label="Account holder name">
          <input
            name="account_holder_name"
            type="text"
            className={inputClass}
            required
            placeholder="Account holder name"
            autoComplete="off"
          />
        </Field>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Account number">
            <input
              name="account_number"
              type="text"
              className={inputClass}
              required
              placeholder="Account number"
              autoComplete="off"
            />
          </Field>
          <Field label="Routing number">
            <input
              name="routing_number"
              type="text"
              className={inputClass}
              required
              placeholder="Routing number"
              autoComplete="off"
            />
          </Field>
        </div>
      </Section>
      <Section icon={Building2} title="Bank details" accent="amber">
        <Field label="Bank name">
          <input
            name="bank_name"
            type="text"
            className={inputClass}
            required
            placeholder="Bank name"
            autoComplete="off"
          />
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

function AmountSection({
  amount,
  onAmountChange,
  maxBal,
  fmtBal,
  overBalance,
  belowMinimum,
  minLabel,
  processingNote,
  currencyCode,
  currencyPrefix,
}: {
  amount: string;
  onAmountChange: (v: string) => void;
  maxBal: number;
  fmtBal: string;
  overBalance: boolean;
  belowMinimum: boolean;
  minLabel: string;
  processingNote: string;
  currencyCode: string;
  currencyPrefix: string;
}) {
  return (
    <Section icon={Banknote} title="Withdrawal amount">
      <Field label="Amount to withdraw">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
            {currencyPrefix}
          </span>
          <input
            name="withdrawal-amount"
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="0.00"
            className={cn(inputClass, currencyPrefix.length > 3 ? "pl-12" : "pl-7")}
            required
          />
        </div>
      </Field>

      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">Available balance</span>
        <span className={overBalance ? "text-red-400" : "text-brand-400"}>
          {fmtBal} {currencyCode}
        </span>
      </div>

      {overBalance && (
        <p className="text-xs text-red-400">Insufficient balance for this withdrawal</p>
      )}
      {belowMinimum && !overBalance && (
        <p className="text-xs text-red-400">{minLabel}</p>
      )}

      <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2">
        <p className="text-[10px] text-gray-500">{processingNote}</p>
      </div>
    </Section>
  );
}

function CryptoWithdrawalFields({
  symbol,
  onSymbolChange,
  balances,
}: {
  symbol: CryptoSymbol;
  onSymbolChange: (s: CryptoSymbol) => void;
  balances: Record<CryptoSymbol, number>;
}) {
  return (
    <>
      <Section icon={Wallet} title="Choose wallet">
        <Field label="Cryptocurrency">
          <select
            name="crypto_symbol"
            className={inputClass}
            required
            value={symbol}
            onChange={(e) => onSymbolChange(e.target.value as CryptoSymbol)}
          >
            {CRYPTO_ASSETS.map((asset) => (
              <option key={asset.symbol} value={asset.symbol}>
                {asset.symbol} · {asset.name} ({balances[asset.symbol] || 0})
              </option>
            ))}
          </select>
        </Field>
        <p className="text-[10px] text-gray-500">{CRYPTO_ASSETS.find((a) => a.symbol === symbol)?.network}</p>
      </Section>
      <Section icon={User} title="Destination">
        <Field label="Destination wallet address">
          <input
            name="destination_address"
            type="text"
            className={inputClass}
            required
            placeholder="Paste your wallet address"
            autoComplete="off"
          />
        </Field>
        <Field label="Withdrawal access code">
          <input
            name="withdrawal_access_code"
            type="text"
            className={inputClass}
            required
            placeholder="Withdrawal access code"
            autoComplete="off"
          />
        </Field>
      </Section>
    </>
  );
}

function InfoBanner() {
  return (
    <div className="rounded-xl border border-brand-500/15 bg-brand-500/5 px-3 py-2.5 text-xs text-gray-400">
      Domestic withdrawals typically settle within the same business day.
    </div>
  );
}

function CryptoInfoBanner() {
  return (
    <div className="rounded-xl border border-brand-500/15 bg-brand-500/5 px-3 py-2.5 text-xs text-gray-400">
      Crypto is sent from your selected wallet to the destination address you enter. Double-check the
      network and address before authorizing.
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}
