"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Plus,
  Snowflake,
  Settings,
  Eye,
  CreditCard,
  Wallet,
  ArrowDownToLine,
  Loader2,
} from "lucide-react";
import {
  CARD_THEMES,
  type VirtualCard,
  type CardTheme,
} from "@/lib/cards-mock-data";
import {
  freezeCard,
  getCardTransactions,
  getVirtualCards,
  unfreezeCard,
  updateVirtualCard,
} from "@/lib/api/cards";
import { mapApiVirtualCard } from "@/lib/cards-api-mapper";
import { getErrorMessage } from "@/lib/api/get-error-message";
import { useDashboard } from "@/components/providers/dashboard-provider";
import { VirtualCardVisual } from "./virtual-card-visual";
import { CardDetailsModal } from "./card-details-modal";
import { NewCardRequestModal } from "./new-card-request-modal";
import { FundCardModal } from "./fund-card-modal";
import { WithdrawCardModal } from "./withdraw-card-modal";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

function fmtUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
}

function fmtTxDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function VirtualCardsManager() {
  const queryClient = useQueryClient();
  const { refetch: refetchDashboard } = useDashboard();

  const cardsQuery = useQuery({
    queryKey: ["virtual-cards"],
    queryFn: getVirtualCards,
  });

  const cards = useMemo(
    () => (cardsQuery.data?.results ?? []).map(mapApiVirtualCard),
    [cardsQuery.data]
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [newCardOpen, setNewCardOpen] = useState(false);
  const [fundOpen, setFundOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [customizeTheme, setCustomizeTheme] = useState<CardTheme>("teal-gold");
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const limitDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (cards.length && !selectedId) {
      setSelectedId(cards[0].id);
      setCustomizeTheme(cards[0].theme);
    }
  }, [cards, selectedId]);

  const selected = cards.find((c) => c.id === selectedId) ?? cards[0];

  const txQuery = useQuery({
    queryKey: ["card-transactions", selectedId],
    queryFn: () => getCardTransactions({ card: selectedId!, page_size: 20 }),
    enabled: !!selectedId,
  });

  const cardTx = useMemo(
    () =>
      (txQuery.data?.results ?? []).map((tx) => ({
        id: String(tx.id),
        merchant: tx.merchant_name,
        amount: parseFloat(tx.amount),
        date: fmtTxDate(tx.created_at),
      })),
    [txQuery.data]
  );

  const refresh = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ["virtual-cards"] });
    void queryClient.invalidateQueries({ queryKey: ["card-transactions"] });
    void refetchDashboard();
  }, [queryClient, refetchDashboard]);

  const patchCard = async (payload: Parameters<typeof updateVirtualCard>[1]) => {
    if (!selectedId) return;
    setActionError(null);
    try {
      await updateVirtualCard(selectedId, payload);
      refresh();
    } catch (err) {
      setActionError(getErrorMessage(err, "Could not update card."));
    }
  };

  const toggleFreeze = async () => {
    if (!selected) return;
    setActionLoading(true);
    setActionError(null);
    try {
      if (selected.frozen) {
        await unfreezeCard(selected.id);
      } else {
        await freezeCard(selected.id);
      }
      refresh();
    } catch (err) {
      setActionError(getErrorMessage(err, "Could not update freeze status."));
    } finally {
      setActionLoading(false);
    }
  };

  const updateLimit = (limit: number) => {
    if (!selectedId) return;
    if (limitDebounceRef.current) clearTimeout(limitDebounceRef.current);
    limitDebounceRef.current = setTimeout(() => {
      void patchCard({ spending_limit: limit.toFixed(2) });
    }, 400);
  };

  const applyTheme = (theme: CardTheme) => {
    setCustomizeTheme(theme);
    void patchCard({ theme });
  };

  const handleCardCreated = (card: VirtualCard) => {
    setSelectedId(card.id);
    setCustomizeTheme(card.theme);
    refresh();
  };

  const handleFunded = () => {
    refresh();
  };

  const handleWithdrawn = () => {
    refresh();
  };

  if (cardsQuery.isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-surface-card px-8 py-16 text-center">
        <CreditCard className="mx-auto h-12 w-12 text-gray-600" />
        <p className="mt-4 font-medium text-white">No virtual cards yet</p>
        <p className="mt-1 text-sm text-gray-500">
          Request a card to start spending online with your wallet balance.
        </p>
        <Button className="mt-6" onClick={() => setNewCardOpen(true)}>
          <Plus className="h-4 w-4" />
          Request your first card
        </Button>
        <NewCardRequestModal
          open={newCardOpen}
          onClose={() => setNewCardOpen(false)}
          onCardCreated={handleCardCreated}
        />
      </div>
    );
  }

  if (!selected) return null;

  const displayCard = { ...selected, theme: customizeTheme };

  return (
    <div className="grid gap-8 xl:grid-cols-12">
      <div className="space-y-4 xl:col-span-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white">Your cards</h3>
          <Button size="sm" variant="secondary" onClick={() => setNewCardOpen(true)}>
            <Plus className="h-4 w-4" />
            New card
          </Button>
        </div>
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => {
              setSelectedId(card.id);
              setCustomizeTheme(card.theme);
            }}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all",
              selectedId === card.id
                ? "border-brand-500/50 bg-brand-500/10"
                : "border-white/5 bg-surface-card hover:border-white/10"
            )}
          >
            <CreditCard className="h-5 w-5 shrink-0 text-brand-400" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-white">{card.name}</p>
              <p className="text-xs text-gray-500">
                •••• {card.last4} · {card.network.toUpperCase()}
                {card.frozen && " · Frozen"}
              </p>
              <p className="mt-0.5 text-xs font-medium text-brand-400/90">
                {fmtUsd(card.balance)} balance
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="xl:col-span-5">
        <motion.div
          key={selectedId + customizeTheme}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <VirtualCardVisual card={displayCard} />
          <p className="mt-4 text-sm text-gray-500">
            Card balance:{" "}
            <span className="font-semibold text-white">{fmtUsd(selected.balance)}</span>
          </p>
          {actionError && (
            <p className="mt-2 text-xs text-red-400">{actionError}</p>
          )}
          <div className="mt-4 grid w-full max-w-md grid-cols-2 gap-2 sm:grid-cols-4">
            <Button
              variant="secondary"
              size="sm"
              className="min-w-0 px-2"
              onClick={() => setDetailsOpen(true)}
            >
              <Eye className="h-4 w-4 shrink-0" />
              <span className="truncate">View</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="min-w-0 px-2"
              onClick={() => setFundOpen(true)}
              disabled={selected.frozen}
            >
              <Wallet className="h-4 w-4 shrink-0" />
              <span className="truncate">Fund</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="min-w-0 px-2"
              onClick={() => setWithdrawOpen(true)}
              disabled={selected.frozen || selected.balance < 10}
            >
              <ArrowDownToLine className="h-4 w-4 shrink-0" />
              <span className="truncate">Withdraw</span>
            </Button>
            <Button
              variant={selected.frozen ? "default" : "secondary"}
              size="sm"
              className="min-w-0 px-2"
              onClick={toggleFreeze}
              disabled={actionLoading}
            >
              {actionLoading ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
              ) : (
                <Snowflake className="h-4 w-4 shrink-0" />
              )}
              <span className="truncate">{selected.frozen ? "Unfreeze" : "Freeze"}</span>
            </Button>
          </div>
        </motion.div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-surface-card p-6">
          <h4 className="flex items-center gap-2 font-semibold text-white">
            <Settings className="h-4 w-4" />
            Spending controls
          </h4>
          <p className="mt-1 text-sm text-gray-500">
            Spent ${selected.spentThisMonth.toLocaleString()} of $
            {selected.spendingLimit.toLocaleString()} this month
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-brand-500"
              style={{
                width: `${Math.min(
                  selected.spendingLimit > 0
                    ? (selected.spentThisMonth / selected.spendingLimit) * 100
                    : 0,
                  100
                )}%`,
              }}
            />
          </div>
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-400">Monthly limit</span>
              <span className="font-bold text-white">
                ${selected.spendingLimit.toLocaleString()}
              </span>
            </div>
            <Slider
              value={[selected.spendingLimit]}
              onValueChange={([v]) => updateLimit(v)}
              min={500}
              max={25000}
              step={500}
              disabled={selected.frozen}
            />
          </div>
        </div>
      </div>

      <div className="xl:col-span-3">
        <h4 className="mb-4 font-semibold text-white">Customize theme</h4>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(CARD_THEMES) as CardTheme[]).map((theme) => (
            <button
              key={theme}
              type="button"
              onClick={() => applyTheme(theme)}
              disabled={selected.frozen}
              className={cn(
                "rounded-xl border p-3 text-left transition-all",
                customizeTheme === theme
                  ? "border-brand-500 ring-2 ring-brand-500/30"
                  : "border-white/5 hover:border-white/10"
              )}
            >
              <div
                className={cn(
                  "mb-2 h-8 rounded-lg bg-gradient-to-r",
                  CARD_THEMES[theme].gradient
                )}
              />
              <p className="text-xs text-gray-400">{CARD_THEMES[theme].label}</p>
            </button>
          ))}
        </div>

        <h4 className="mb-4 mt-8 font-semibold text-white">Recent transactions</h4>
        <ul className="max-h-64 space-y-2 overflow-y-auto">
          {txQuery.isLoading ? (
            <li className="flex justify-center py-6">
              <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
            </li>
          ) : cardTx.length === 0 ? (
            <li className="rounded-xl bg-white/5 px-3 py-4 text-center text-xs text-gray-500">
              No transactions on this card yet
            </li>
          ) : (
            cardTx.map((tx) => (
              <li
                key={tx.id}
                className="flex justify-between rounded-xl bg-white/5 px-3 py-2.5 text-sm"
              >
                <div>
                  <p className="text-white">{tx.merchant}</p>
                  <p className="text-xs text-gray-500">{tx.date}</p>
                </div>
                <span className="font-semibold text-red-400">
                  ${Math.abs(tx.amount).toFixed(2)}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>

      <CardDetailsModal
        card={displayCard}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
      <NewCardRequestModal
        open={newCardOpen}
        onClose={() => setNewCardOpen(false)}
        onCardCreated={handleCardCreated}
      />
      <FundCardModal
        card={selected}
        open={fundOpen}
        onClose={() => setFundOpen(false)}
        onFunded={handleFunded}
      />
      <WithdrawCardModal
        card={selected}
        open={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        onWithdrawn={handleWithdrawn}
      />
    </div>
  );
}
