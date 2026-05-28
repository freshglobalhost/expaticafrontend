"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Loader2,
  ArrowDownToLine,
  Info,
  AlertTriangle,
} from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CardPinSection } from "./card-pin-section";
import { withdrawCard } from "@/lib/api/cards";
import { getErrorMessage } from "@/lib/api/get-error-message";
import {
  MIN_CARD_WITHDRAW_AMOUNT,
  type VirtualCard,
} from "@/lib/cards-mock-data";
import { cn } from "@/lib/utils";
import {
  useAccountCurrency,
  useCurrencyInputPrefix,
  useFormatAccountMoney,
} from "@/hooks/use-account-currency";

const inputClass =
  "h-10 w-full rounded-xl border border-white/10 bg-surface-elevated px-3 text-sm text-white placeholder:text-gray-500 focus:border-brand-500/50 focus:outline-none focus:ring-1 focus:ring-brand-500/30";

interface WithdrawCardModalProps {
  card: VirtualCard | null;
  open: boolean;
  onClose: () => void;
  onWithdrawn: (cardId: string, amount: number) => void;
}

export function WithdrawCardModal({
  card,
  open,
  onClose,
  onWithdrawn,
}: WithdrawCardModalProps) {
  const accountCurrency = useAccountCurrency();
  const formatMoney = useFormatAccountMoney();
  const currencyPrefix = useCurrencyInputPrefix();

  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const amountNum = parseFloat(amount) || 0;
  const overCard = amountNum > (card?.balance ?? 0);
  const belowMin = amountNum > 0 && amountNum < MIN_CARD_WITHDRAW_AMOUNT;

  const fmtCardBal = card ? formatMoney(card.balance) : "";

  const canSubmit =
    !!card &&
    amountNum >= MIN_CARD_WITHDRAW_AMOUNT &&
    !overCard &&
    pin.length === 4 &&
    !loading;

  useEffect(() => {
    if (!open) {
      setAmount("");
      setPin("");
      setLoading(false);
      setError(null);
      setDone(false);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!card || !canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      await withdrawCard(card.id, {
        amount: amountNum.toFixed(2),
        transaction_pin: pin,
      });
      onWithdrawn(card.id, amountNum);
      setDone(true);
    } catch (err) {
      setError(getErrorMessage(err, "Could not withdraw from card."));
      setLoading(false);
    }
  };

  if (!card) return null;

  if (done) {
    return (
      <Dialog open={open} onClose={onClose} title="Withdrawal complete">
        <div className="py-4 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
          <p className="mt-3 font-medium text-white">Funds returned to wallet</p>
          <p className="mt-1 text-xs text-gray-500">
            {formatMoney(amountNum)} moved from{" "}
            {card.name} to your main balance.
          </p>
          <Button variant="secondary" size="sm" className="mt-4" onClick={onClose}>
            Done
          </Button>
        </div>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} title="Withdraw to wallet">
      <form onSubmit={handleSubmit} className="flex min-h-0 flex-col" autoComplete="off">
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto">
          <div className="rounded-xl border border-brand-500/20 bg-brand-500/5 px-3 py-2.5 text-xs text-gray-400">
            <p className="flex items-start gap-2">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <span>
                Move funds from <strong className="text-white">{card.name}</strong> back to your
                main wallet balance.
              </span>
            </p>
          </div>

          <div className="rounded-lg bg-white/5 px-3 py-2 text-sm">
            <p className="text-[10px] uppercase text-gray-500">Available on card</p>
            <p className="font-semibold text-white">{fmtCardBal}</p>
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              Amount to withdraw ({accountCurrency})
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-400">
                {currencyPrefix}
              </span>
              <input
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
                className={cn(inputClass, "pl-8 text-lg font-bold")}
                placeholder="0.00"
                autoComplete="off"
                required
              />
            </div>
            <p className="mt-1.5 text-[10px] text-gray-500">
              Minimum {formatMoney(MIN_CARD_WITHDRAW_AMOUNT)}
            </p>
            {belowMin && (
              <p className="mt-1 flex items-center gap-1 text-xs text-amber-400">
                <AlertTriangle className="h-3.5 w-3.5" />
                Minimum withdraw is ${MIN_CARD_WITHDRAW_AMOUNT.toFixed(2)}
              </p>
            )}
            {overCard && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-400">
                <AlertTriangle className="h-3.5 w-3.5" />
                Exceeds card balance
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {[25, 50, 100].map((preset) => {
              const p = Math.min(preset, card.balance);
              if (p < MIN_CARD_WITHDRAW_AMOUNT) return null;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(String(p))}
                  className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-gray-400 hover:border-brand-500/30 hover:text-brand-400"
                >
                  ${p}
                </button>
              );
            })}
            {card.balance >= MIN_CARD_WITHDRAW_AMOUNT && (
              <button
                type="button"
                onClick={() => setAmount(String(Math.floor(card.balance * 100) / 100))}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-gray-400 hover:border-brand-500/30 hover:text-brand-400"
              >
                Max
              </button>
            )}
          </div>

          <CardPinSection
            pin={pin}
            onPinChange={setPin}
            formKey={open ? `withdraw-${card.id}` : "closed"}
          />

          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>

        <div className="mt-4 shrink-0 border-t border-white/5 pt-4">
          <Button type="submit" className="w-full" disabled={!canSubmit}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing…
              </>
            ) : (
              <>
                <ArrowDownToLine className="h-4 w-4" />
                Withdraw to wallet
              </>
            )}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
