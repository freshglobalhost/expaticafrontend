"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MULTI_CURRENCY } from "@/lib/dashboard-mock-data";
import { cn } from "@/lib/utils";

type FlowType = "send" | "receive";

const COPY: Record<
  FlowType,
  { submit: string; success: string; amountLabel: string }
> = {
  send: {
    submit: "Send money",
    success: "Transfer initiated. Funds will arrive within 1–2 business days.",
    amountLabel: "Amount to send",
  },
  receive: {
    submit: "Generate payment link",
    success: "Payment link created. Share it to get paid instantly.",
    amountLabel: "Amount to request",
  },
};

export function MoneyFlowForm({ type }: { type: FlowType }) {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [recipient, setRecipient] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const copy = COPY[type];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1200);
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center"
      >
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
        <p className="mt-3 text-sm font-medium text-white">{copy.success}</p>
        <Button
          variant="secondary"
          size="sm"
          className="mt-4"
          onClick={() => setDone(false)}
        >
          New {type === "receive" ? "request" : "transfer"}
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      {(type === "send" || type === "receive") && (
        <Field label={type === "send" ? "Recipient" : "Payer name (optional)"}>
          <input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder={
              type === "send" ? "Name, email, or account ID" : "Who is paying you?"
            }
            className={inputClass}
            required={type === "send"}
          />
        </Field>
      )}

      {type === "send" && (
        <Field label="Transfer type">
          <select className={inputClass} defaultValue="wire">
            <option value="wire">International wire</option>
            <option value="local">Local bank transfer</option>
            <option value="internal">Expatica user</option>
          </select>
        </Field>
      )}

      <Field label={copy.amountLabel}>
        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className={cn(inputClass, "flex-1")}
            required
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className={cn(inputClass, "w-24 shrink-0")}
          >
            {MULTI_CURRENCY.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code}
              </option>
            ))}
          </select>
        </div>
      </Field>

      <Field label="Note (optional)">
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What's this for?"
          className={inputClass}
        />
      </Field>

      {type === "receive" && (
        <p className="rounded-lg border border-white/5 bg-surface-card px-3 py-2 text-xs text-gray-500">
          You&apos;ll get a shareable link and QR code after submitting.
        </p>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing…
          </>
        ) : (
          copy.submit
        )}
      </Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-400">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "h-10 w-full rounded-xl border border-white/5 bg-surface-card px-3 text-sm text-white placeholder:text-gray-500 focus:border-brand-500/50 focus:outline-none focus:ring-1 focus:ring-brand-500/30";
