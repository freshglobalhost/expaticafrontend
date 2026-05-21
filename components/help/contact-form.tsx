"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { FormField } from "@/components/auth/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
        <p className="mt-4 font-semibold text-white">Message sent</p>
        <p className="text-sm text-gray-400">We&apos;ll respond within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-lg space-y-4 rounded-2xl border border-white/10 bg-surface-card p-6">
      <FormField label="Name" htmlFor="name"><Input id="name" required /></FormField>
      <FormField label="Email" htmlFor="email"><Input id="email" type="email" required /></FormField>
      <FormField label="Subject" htmlFor="subject"><Input id="subject" required /></FormField>
      <FormField label="Message" htmlFor="message">
        <textarea id="message" required rows={5} className="flex w-full rounded-xl border border-surface-border bg-surface-elevated px-4 py-3 text-sm text-white" />
      </FormField>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send message"}
      </Button>
    </form>
  );
}
