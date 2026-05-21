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

const IMG = "https://grandwellsbank.com/dash2/app/assets/img/sample/brand";
const LOCAL = "/assets/transfer-brands";

/** Primary send methods — first row */
export const PRIMARY_SEND_OPTIONS: TransferMethod[] = [
  {
    id: "wire",
    label: "Wire Transfer",
    subtitle: "International bank transfer",
    image: `${IMG}/jh.png`,
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
    image: `${IMG}/pa.png`,
  },
  {
    id: "skrill",
    label: "Skrill",
    subtitle: "Send via Skrill",
    image: `${IMG}/s.png`,
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
    image: `${IMG}/yu.png`,
  },
  {
    id: "wise",
    label: "Wise",
    subtitle: "Low-fee transfer",
    image: `${IMG}/22.png`,
  },
  {
    id: "payoneer",
    label: "Payoneer",
    subtitle: "Business payments",
    image: `${IMG}/34.png`,
  },
];

/** Compact send row on dashboard — full list lives on /send */
export const DASHBOARD_SEND_OPTIONS: TransferMethod[] = [
  {
    id: "wire",
    label: "Wire Transfer",
    subtitle: "International bank transfer",
    image: `${IMG}/jh.png`,
  },
  {
    id: "wise",
    label: "Wise",
    subtitle: "Low-fee transfer",
    image: `${IMG}/22.png`,
  },
  {
    id: "paypal",
    label: "PayPal",
    subtitle: "Send via PayPal",
    image: `${IMG}/pa.png`,
  },
  {
    id: "payoneer",
    label: "Payoneer",
    subtitle: "Business payments",
    image: `${IMG}/34.png`,
  },
];

export const SEND_MONEY_OPTIONS: TransferMethod[] = [
  ...PRIMARY_SEND_OPTIONS,
  ...MORE_SEND_OPTIONS,
];

export function getTransferMethod(id: TransferMethodId): TransferMethod | undefined {
  return SEND_MONEY_OPTIONS.find((m) => m.id === id);
}
