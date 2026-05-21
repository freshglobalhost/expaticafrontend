import type { ApiTransaction } from "@/lib/api/types";

export type DisplayTransaction = {
  id: string;
  date: string;
  time: string;
  description: string;
  category: string;
  amount: number;
  amountLabel: string;
  status: string;
  reference: string;
  counterparty: string;
  cryptoSymbol?: string | null;
  cryptoAmount?: string | null;
};

export function formatMoney(
  n: number,
  currency = "USD",
  options?: { signed?: boolean }
) {
  const abs = Math.abs(n);
  const str = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(abs);
  if (options?.signed === false) return str;
  return n >= 0 ? `+${str}` : `-${str}`;
}

export function formatTxAmountLabel(tx: ApiTransaction | DisplayTransaction): string {
  const cryptoSymbol =
    "crypto_symbol" in tx ? tx.crypto_symbol : tx.cryptoSymbol;
  const cryptoAmount =
    "crypto_amount" in tx ? tx.crypto_amount : tx.cryptoAmount;
  const amount = "amount" in tx && typeof tx.amount === "number" ? tx.amount : Number(
    "amount" in tx ? (tx as ApiTransaction).amount : 0
  );
  const direction =
    "direction" in tx ? (tx as ApiTransaction).direction : amount >= 0 ? "credit" : "debit";

  if (cryptoSymbol && cryptoAmount && Number(amount) === 0) {
    const prefix = direction === "credit" ? "+" : "-";
    return `${prefix}${cryptoAmount} ${cryptoSymbol}`;
  }

  const signed =
    direction === "credit" ? Math.abs(Number(amount)) : -Math.abs(Number(amount));
  const currency =
    "currency_code" in tx && typeof tx.currency_code === "string"
      ? tx.currency_code
      : "USD";
  return formatMoney(signed, currency);
}

export function mapApiTransaction(tx: ApiTransaction): DisplayTransaction {
  const created = new Date(tx.created_at);
  const fiat = Number(tx.amount);
  const signed =
    tx.direction === "credit" ? Math.abs(fiat) : -Math.abs(fiat);

  let description = tx.description || tx.category;
  if (tx.crypto_symbol && tx.crypto_amount && fiat === 0) {
    description = `${description} · ${tx.crypto_amount} ${tx.crypto_symbol}`;
  }

  return {
    id: tx.reference_code,
    date: created.toLocaleDateString("en-CA"),
    time: created.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    description,
    category: tx.category,
    amount: signed,
    amountLabel: formatTxAmountLabel(tx),
    status: tx.status,
    reference: tx.reference_code,
    counterparty: tx.counterparty_name || "—",
    cryptoSymbol: tx.crypto_symbol,
    cryptoAmount: tx.crypto_amount != null ? String(tx.crypto_amount) : null,
  };
}
