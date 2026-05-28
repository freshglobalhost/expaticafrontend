"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Loader2,
  Lock,
  Info,
  AlertTriangle,
} from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { CardPinSection } from "./card-pin-section";
import { createCardRequest } from "@/lib/api/cards";
import { mapApiVirtualCard } from "@/lib/cards-api-mapper";
import { getErrorMessage } from "@/lib/api/get-error-message";
import { useDashboard } from "@/components/providers/dashboard-provider";
import {
  NEW_CARD_REQUEST_FEE,
  type VirtualCard,
  type CardNetwork,
} from "@/lib/cards-mock-data";
import {
  useFormatAccountMoney,
} from "@/hooks/use-account-currency";

const DEFAULT_CARD_THEME = "teal-gold" as const;

const inputClass =
  "h-10 w-full rounded-xl border border-white/10 bg-surface-elevated px-3 text-sm text-white placeholder:text-gray-500 focus:border-brand-500/50 focus:outline-none focus:ring-1 focus:ring-brand-500/30";

const labelClass = "mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-gray-500";

interface NewCardRequestModalProps {
  open: boolean;
  onClose: () => void;
  onCardCreated: (card: VirtualCard) => void;
}

export function NewCardRequestModal({
  open,
  onClose,
  onCardCreated,
}: NewCardRequestModalProps) {
  const { summary } = useDashboard();
  const walletBalance = parseFloat(summary?.primary_wallet_balance ?? "0");

  const [name, setName] = useState("");
  const [network, setNetwork] = useState<CardNetwork>("visa");
  const [spendingLimit, setSpendingLimit] = useState(2000);
  const [pin, setPin] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const formatMoney = useFormatAccountMoney();
  const fmtWallet = formatMoney(walletBalance);

  const canSubmit =
    name.trim().length >= 2 &&
    agreed &&
    pin.length === 4 &&
    walletBalance >= NEW_CARD_REQUEST_FEE &&
    !loading;

  const reset = () => {
    setName("");
    setNetwork("visa");
    setSpendingLimit(2000);
    setPin("");
    setAgreed(false);
    setLoading(false);
    setError(null);
    setDone(false);
  };

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      const result = await createCardRequest({
        card_name: name.trim(),
        theme: DEFAULT_CARD_THEME,
        network,
        spending_limit: spendingLimit.toFixed(2),
        transaction_pin: pin,
      });
      const card = result.issued_card_detail
        ? mapApiVirtualCard(result.issued_card_detail)
        : null;
      if (card) {
        onCardCreated(card);
      }
      setDone(true);
    } catch (err) {
      setError(getErrorMessage(err, "Could not create card."));
      setLoading(false);
    }
  };

  if (done) {
    return (
      <Dialog open={open} onClose={onClose} title="Card requested">
        <div className="py-4 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
          <p className="mt-3 font-medium text-white">Virtual card created</p>
          <p className="mt-1 text-xs text-gray-500">
            {formatMoney(NEW_CARD_REQUEST_FEE)} issuance fee charged. Fund your card to
            start spending.
          </p>
          <Button variant="secondary" size="sm" className="mt-4" onClick={onClose}>
            Done
          </Button>
        </div>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} title="Request new card">
      <form onSubmit={handleSubmit} className="flex min-h-0 flex-col" autoComplete="off">
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto">
          <div className="rounded-xl border border-brand-500/20 bg-brand-500/5 px-3 py-2.5 text-xs text-gray-400">
            <p className="flex items-start gap-2">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <span>
                One-time <strong className="text-white">{formatMoney(NEW_CARD_REQUEST_FEE)}</strong>{" "}
                issuance fee per card. Instant virtual Visa/Mastercard — no physical card
                shipped. Fund the card after creation to use it online.
              </span>
            </p>
          </div>

          <div className="flex justify-between rounded-lg bg-white/5 px-3 py-2 text-sm">
            <span className="text-gray-500">Wallet balance</span>
            <span className="font-semibold text-white">{fmtWallet}</span>
          </div>

          {walletBalance < NEW_CARD_REQUEST_FEE && (
            <p className="flex items-center gap-1 text-xs text-red-400">
              <AlertTriangle className="h-3.5 w-3.5" />
              Insufficient balance for the {formatMoney(NEW_CARD_REQUEST_FEE)} fee
            </p>
          )}

          <div>
            <label className={labelClass} htmlFor="card-name">
              Card nickname
            </label>
            <Input
              id="card-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Online shopping"
              className={inputClass}
              autoComplete="off"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass} htmlFor="card-network">
                Network
              </label>
              <Select
                id="card-network"
                value={network}
                onChange={(e) => setNetwork(e.target.value as CardNetwork)}
              >
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
              </Select>
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-400">Monthly spending limit</span>
              <span className="font-bold text-white">
                {formatMoney(spendingLimit, { maximumFractionDigits: 0 })}
              </span>
            </div>
            <Slider
              value={[spendingLimit]}
              onValueChange={([v]) => setSpendingLimit(v)}
              min={500}
              max={25000}
              step={500}
            />
          </div>

          <label className="flex cursor-pointer items-start gap-2 text-xs text-gray-400">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 rounded border-white/20"
            />
            <span>
              I agree to the {formatMoney(NEW_CARD_REQUEST_FEE)} issuance fee and virtual card
              terms.
            </span>
          </label>

          <CardPinSection
            pin={pin}
            onPinChange={setPin}
            formKey={open ? "new-card-pin" : "closed"}
          />

          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>

        <div className="mt-4 shrink-0 border-t border-white/5 pt-4">
          <div className="mb-3 flex justify-between text-sm">
            <span className="text-gray-500">Issuance fee</span>
            <span className="font-bold text-white">{formatMoney(NEW_CARD_REQUEST_FEE)}</span>
          </div>
          <Button type="submit" className="w-full" disabled={!canSubmit}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating card…
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Request card — {formatMoney(NEW_CARD_REQUEST_FEE)}
              </>
            )}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
