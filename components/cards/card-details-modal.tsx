"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Copy, Check, Loader2 } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { VirtualCardVisual } from "./virtual-card-visual";
import type { VirtualCard } from "@/lib/cards-mock-data";
import { revealCardSensitive } from "@/lib/api/cards";
import { getErrorMessage } from "@/lib/api/get-error-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function CopyRow({
  label,
  value,
  copyValue,
  mono = true,
  copyDisabled,
}: {
  label: string;
  value: string;
  copyValue?: string;
  mono?: boolean;
  copyDisabled?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const toCopy = copyValue ?? value;

  const handleCopy = async () => {
    if (copyDisabled) return;
    try {
      await navigator.clipboard.writeText(toCopy.replace(/\s/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg bg-white/5 px-3 py-2.5">
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
          {label}
        </p>
        <p
          className={cn(
            "mt-0.5 truncate text-sm text-white",
            mono && "font-mono"
          )}
        >
          {value}
        </p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        disabled={copyDisabled}
        className={cn(
          "flex shrink-0 items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs font-medium transition-colors",
          copyDisabled
            ? "cursor-not-allowed opacity-40"
            : "text-gray-400 hover:border-brand-500/30 hover:bg-brand-500/10 hover:text-brand-400"
        )}
        aria-label={`Copy ${label}`}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-emerald-400">Copied</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}

export function CardDetailsModal({
  card,
  open,
  onClose,
}: {
  card: VirtualCard;
  open: boolean;
  onClose: () => void;
}) {
  const [showSensitive, setShowSensitive] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");

  const hideSensitive = useCallback(() => {
    setShowSensitive(false);
    setFlipped(false);
    setPin("");
    setCardNumber("");
    setCvv("");
    setError(null);
  }, []);

  const reveal = async () => {
    if (pin.length !== 4) {
      setError("Enter your 4-digit transaction PIN.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await revealCardSensitive(card.id, pin);
      setCardNumber(data.card_number);
      setCvv(data.cvv);
      setFlipped(true);
      setTimeout(() => setShowSensitive(true), 300);
    } catch (err) {
      setError(getErrorMessage(err, "Could not reveal card details."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!showSensitive) return;
    const t = setTimeout(hideSensitive, 30000);
    return () => clearTimeout(t);
  }, [showSensitive, hideSensitive]);

  useEffect(() => {
    if (!open) hideSensitive();
  }, [open, hideSensitive]);

  const displayNumber = showSensitive
    ? cardNumber
    : card.maskedCardNumber || `**** **** **** ${card.last4}`;

  return (
    <Dialog open={open} onClose={onClose} title="Card details">
      <div className="flex min-h-0 flex-col">
        <div className="flex shrink-0 justify-center">
          <VirtualCardVisual
            card={card}
            flipped={flipped}
            showCvv={showSensitive}
            cvv={cvv}
            className="w-full max-w-[min(100%,220px)]"
          />
        </div>

        <div className="mt-4 min-h-0 flex-1 space-y-2">
          <CopyRow
            label="Card number"
            value={displayNumber}
            copyValue={showSensitive ? cardNumber.replace(/\s/g, "") : undefined}
            copyDisabled={!showSensitive}
          />
          <CopyRow label="Expiry" value={card.expiry} copyValue={card.expiry} mono={false} />
          <CopyRow
            label="CVV"
            value={showSensitive ? cvv : "•••"}
            copyValue={cvv}
            copyDisabled={!showSensitive}
          />
          <CopyRow
            label="Cardholder"
            value={card.cardholderName}
            copyValue={card.cardholderName}
            mono={false}
          />
        </div>

        <div className="mt-4 shrink-0 border-t border-white/5 pt-4 space-y-3">
          {!showSensitive && (
            <div>
              <p className="mb-2 text-xs text-gray-500">Transaction PIN to reveal full number & CVV</p>
              <Input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
                placeholder="••••"
                className="text-center font-mono tracking-[0.3em]"
                autoComplete="off"
              />
            </div>
          )}
          {error && <p className="text-xs text-red-400">{error}</p>}
          <Button
            variant="secondary"
            className="w-full"
            disabled={loading}
            onClick={showSensitive ? hideSensitive : reveal}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : showSensitive ? (
              <>
                <EyeOff className="h-4 w-4" />
                Hide details
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                Reveal number & CVV
              </>
            )}
          </Button>
          {showSensitive && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-xs text-amber-400"
            >
              Details auto-hide in 30 seconds
            </motion.p>
          )}
        </div>
      </div>
    </Dialog>
  );
}
