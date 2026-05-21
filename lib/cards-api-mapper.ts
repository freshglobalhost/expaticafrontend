import type { ApiVirtualCard } from "@/lib/api/types";
import type { CardNetwork, CardTheme, VirtualCard } from "@/lib/cards-mock-data";

const THEMES: CardTheme[] = [
  "teal-gold",
  "midnight",
  "sunset",
  "ocean",
  "royal",
  "carbon",
];

function asTheme(value: string): CardTheme {
  return THEMES.includes(value as CardTheme) ? (value as CardTheme) : "teal-gold";
}

function asNetwork(value: string): CardNetwork {
  return value === "mastercard" ? "mastercard" : "visa";
}

export function mapApiVirtualCard(card: ApiVirtualCard): VirtualCard {
  const masked =
    card.masked_card_number ||
    (card.last_four_digits ? `**** **** **** ${card.last_four_digits}` : "**** **** **** ****");

  return {
    id: String(card.id),
    name: card.card_name,
    cardholderName: card.cardholder_name || "CARDHOLDER",
    maskedCardNumber: masked,
    network: asNetwork(card.network),
    theme: asTheme(card.theme),
    last4: card.last_four_digits,
    expiry: card.expiry_date,
    frozen: card.is_frozen,
    spendingLimit: parseFloat(card.spending_limit) || 0,
    spentThisMonth: parseFloat(card.monthly_spent_amount) || 0,
    balance: parseFloat(card.balance) || 0,
    type: "standard",
  };
}
