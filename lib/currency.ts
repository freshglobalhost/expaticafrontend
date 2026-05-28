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

/**
 * Sanitize free-text decimal amount input — never leave a lone "." in the field.
 */
export function sanitizeAmountInput(raw: string, maxDecimals = 2): string {
  const v = raw.replace(/[^\d.]/g, "");
  if (!v || v === ".") return "";

  const dot = v.indexOf(".");
  if (dot === -1) return v;

  const intPart = v.slice(0, dot);
  const decPart = v.slice(dot + 1).replace(/\./g, "").slice(0, maxDecimals);

  if (decPart.length === 0 && v.endsWith(".")) {
    return intPart.length > 0 ? `${intPart}.` : "";
  }
  return decPart.length > 0 ? `${intPart}.${decPart}` : intPart;
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
