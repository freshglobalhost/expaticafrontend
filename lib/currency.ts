/** Format fiat amounts for the user's account currency. */
export function formatAccountMoney(
  amount: number,
  currency: string,
  options?: Intl.NumberFormatOptions
): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
}

/** Prefix shown inside amount inputs (symbol or ISO code). */
export function getCurrencyInputPrefix(currency: string): string {
  if (currency === "USD") return "$";
  try {
    const parts = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
    }).formatToParts(0);
    const sym = parts.find((p) => p.type === "currency")?.value;
    if (sym && sym !== currency) return sym;
  } catch {
    /* use ISO code */
  }
  return currency;
}
