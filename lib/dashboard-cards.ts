import type { ApiVirtualCard } from "@/lib/api/types";

export type DisplayCard = {
  id: string;
  name: string;
  last4: string;
  frozen: boolean;
  available: number;
};

export function mapApiCard(card: ApiVirtualCard): DisplayCard {
  return {
    id: String(card.id),
    name: card.card_name,
    last4: card.last_four_digits,
    frozen: card.is_frozen,
    available: Number(card.balance),
  };
}
