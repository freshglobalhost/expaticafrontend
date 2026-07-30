export type TransferMethodId =
  | "wire"
  | "local"
  | "paypal"
  | "skrill"
  | "googlepay"
  | "western"
  | "wise"
  | "payoneer";

export interface TransferMethod {
  id: TransferMethodId;
  label: string;
  subtitle: string;
  image: string;
}

const LOCAL = "/assets/transfer-brands";

/** Primary send methods — first row */
export const PRIMARY_SEND_OPTIONS: TransferMethod[] = [
  {
    id: "wire",
    label: "Wire Transfer",
    subtitle: "International bank transfer",
    image: `${LOCAL}/wire.svg`,
  },
  {
    id: "local",
    label: "Local Transfer",
    subtitle: "Domestic bank transfer",
    image: `${LOCAL}/local.svg`,
  },
  {
    id: "paypal",
    label: "PayPal",
    subtitle: "Send via PayPal",
    image: `${LOCAL}/paypal.svg`,
  },
  {
    id: "skrill",
    label: "Skrill",
    subtitle: "Send via Skrill",
    image: `${LOCAL}/skrill.svg`,
  },
];

/** Additional payout methods */
export const MORE_SEND_OPTIONS: TransferMethod[] = [
  {
    id: "googlepay",
    label: "Google Pay",
    subtitle: "Mobile payment",
    image: `${LOCAL}/google-pay.svg`,
  },
  {
    id: "western",
    label: "Western Union",
    subtitle: "Cash pickup",
    image: `${LOCAL}/western-union.svg`,
  },
  {
    id: "wise",
    label: "Wise",
    subtitle: "Low-fee transfer",
    image: `${LOCAL}/wise.svg`,
  },
  {
    id: "payoneer",
    label: "Payoneer",
    subtitle: "Business payments",
    image: `${LOCAL}/payoneer.svg`,
  },
];

/** Compact send row on dashboard — full list lives on /send */
export const DASHBOARD_SEND_OPTIONS: TransferMethod[] = [
  {
    id: "wire",
    label: "Wire Transfer",
    subtitle: "International bank transfer",
    image: `${LOCAL}/wire.svg`,
  },
  {
    id: "paypal",
    label: "PayPal",
    subtitle: "Send via PayPal",
    image: `${LOCAL}/paypal.svg`,
  },
  {
    id: "skrill",
    label: "Skrill",
    subtitle: "Send via Skrill",
    image: `${LOCAL}/skrill.svg`,
  },
  {
    id: "wise",
    label: "Wise",
    subtitle: "Low-fee transfer",
    image: `${LOCAL}/wise.svg`,
  },
];

export const SEND_MONEY_OPTIONS: TransferMethod[] = [
  ...PRIMARY_SEND_OPTIONS,
  ...MORE_SEND_OPTIONS,
];

export function getTransferMethod(id: TransferMethodId): TransferMethod | undefined {
  return SEND_MONEY_OPTIONS.find((m) => m.id === id);
}
