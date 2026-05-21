"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { TICKET_CATEGORIES } from "@/lib/help-mock-data";
import { FormField } from "@/components/auth/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function TicketForm() {
  const [loading, setLoading] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setTicketId("TKT-2026-44281");
  };

  if (ticketId) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-brand-500/30 bg-brand-500/10 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-brand-400" />
        <p className="mt-4 font-semibold text-white">Ticket submitted</p>
        <p className="mt-2 font-mono text-brand-400">{ticketId}</p>
        <p className="mt-2 text-sm text-gray-400">Our team will respond within 1 business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-lg space-y-4 rounded-2xl border border-white/10 bg-surface-card p-6">
      <FormField label="Category" htmlFor="cat">
        <Select id="cat" required defaultValue="">
          <option value="" disabled>Select category</option>
          {TICKET_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>
      </FormField>
      <FormField label="Subject" htmlFor="sub"><Input id="sub" required /></FormField>
      <FormField label="Description" htmlFor="desc">
        <textarea id="desc" required rows={6} placeholder="Describe your issue in detail..." className="flex w-full rounded-xl border border-surface-border bg-surface-elevated px-4 py-3 text-sm text-white placeholder:text-gray-500" />
      </FormField>
      <FormField label="Attachment (optional)" htmlFor="file">
        <Input id="file" type="file" className="text-gray-400" />
      </FormField>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Submit ticket"}
      </Button>
    </form>
  );
}
