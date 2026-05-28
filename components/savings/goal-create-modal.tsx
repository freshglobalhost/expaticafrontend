"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/auth/form-field";
import { Button } from "@/components/ui/button";
import { createSavingsGoal } from "@/lib/api/savings";
import { getErrorMessage } from "@/lib/api/get-error-message";
import { ApiError } from "@/lib/api/client";
import { useAccountCurrency } from "@/hooks/use-account-currency";

export function GoalCreateModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
}) {
  const queryClient = useQueryClient();
  const accountCurrency = useAccountCurrency();
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!name || !target) return;
    setLoading(true);
    setError(null);
    try {
      const label = deadline
        ? new Date(deadline + "-01").toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
        : "";
      await createSavingsGoal({
        goal_name: name,
        target_amount: target,
        target_date_label: label,
      });
      await queryClient.invalidateQueries({ queryKey: ["savings"] });
      onCreated?.();
      onClose();
      setName("");
      setTarget("");
      setDeadline("");
    } catch (err) {
      setError(
        err instanceof ApiError
          ? getErrorMessage(err, "Could not create goal.")
          : "Could not create goal."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title="Create savings goal">
      <div className="space-y-4">
        {error && <p className="text-sm text-red-400">{error}</p>}
        <FormField label="Goal name" htmlFor="goalName">
          <Input
            id="goalName"
            placeholder="e.g. Dream vacation"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormField>
        <FormField label={`Target amount (${accountCurrency})`} htmlFor="target">
          <Input
            id="target"
            type="number"
            placeholder="5000"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        </FormField>
        <FormField label="Target date" htmlFor="deadline">
          <Input
            id="deadline"
            type="month"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </FormField>
        <Button className="w-full" onClick={handleCreate} disabled={!name || !target || loading}>
          {loading ? "Creating…" : "Create goal"}
        </Button>
      </div>
    </Dialog>
  );
}
