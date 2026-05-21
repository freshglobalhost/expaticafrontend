"use client";

import { useEffect, useRef } from "react";
import intlTelInput, { type IntlTelInputInstance } from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import { cn } from "@/lib/utils";
import {
  countryNameFromIso,
  PHONE_COUNTRY_ISOS,
} from "@/lib/phone-countries";

const UTILS_URL = "/intl-tel-input-utils.js";

function utilsReady(): boolean {
  return (
    typeof window !== "undefined" &&
    !!(window as Window & { intlTelInputUtils?: unknown }).intlTelInputUtils
  );
}

function loadUtilsScript(): Promise<void> {
  if (utilsReady()) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${UTILS_URL}"]`);
    if (existing) {
      if (utilsReady()) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("utils load failed")), {
        once: true,
      });
      return;
    }
    const script = document.createElement("script");
    script.src = UTILS_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("utils load failed"));
    document.body.appendChild(script);
  });
}

export interface PhoneInputProps {
  id?: string;
  value: string;
  onChange: (e164: string) => void;
  countryIso?: string;
  onCountrySync?: (iso2: string, countryName: string) => void;
  onValidChange?: (valid: boolean) => void;
  error?: boolean;
  disabled?: boolean;
}

export function PhoneInput({
  id = "phone",
  value,
  onChange,
  countryIso,
  onCountrySync,
  onValidChange,
  error,
  disabled,
}: PhoneInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const itiRef = useRef<IntlTelInputInstance | null>(null);
  const itiReadyRef = useRef(false);
  const syncingFromCountryRef = useRef(false);
  const appliedCountryIsoRef = useRef<string | undefined>(undefined);

  const onChangeRef = useRef(onChange);
  const onCountrySyncRef = useRef(onCountrySync);
  const onValidChangeRef = useRef(onValidChange);
  const countryIsoRef = useRef(countryIso);
  onChangeRef.current = onChange;
  onCountrySyncRef.current = onCountrySync;
  onValidChangeRef.current = onValidChange;
  countryIsoRef.current = countryIso;

  const emitNumberRef = useRef(() => {});
  emitNumberRef.current = () => {
    const iti = itiRef.current;
    const input = inputRef.current;
    if (!iti || !input) return;

    const raw = input.value.trim();
    if (!raw) {
      onChangeRef.current("");
      onValidChangeRef.current?.(false);
      return;
    }

    try {
      if (utilsReady() && iti.isValidNumber()) {
        onChangeRef.current(iti.getNumber());
        onValidChangeRef.current?.(true);
        return;
      }
    } catch {
      /* utils not ready or invalid */
    }

    const digits = raw.replace(/\D/g, "");
    const dial = iti.getSelectedCountryData()?.dialCode ?? "";
    const candidate = raw.startsWith("+")
      ? raw.replace(/\s/g, "")
      : dial
        ? `+${dial}${digits}`
        : raw;

    onChangeRef.current(candidate);
    onValidChangeRef.current?.(/^\+[1-9]\d{7,14}$/.test(candidate));
  };

  const syncCountryToFormRef = useRef(() => {});
  syncCountryToFormRef.current = () => {
    if (syncingFromCountryRef.current) return;
    const iti = itiRef.current;
    if (!iti) return;

    const iso2 = iti.getSelectedCountryData()?.iso2?.toLowerCase() ?? "";
    if (!iso2) return;

    const name = countryNameFromIso(iso2);
    if (name && onCountrySyncRef.current) {
      appliedCountryIsoRef.current = iso2;
      onCountrySyncRef.current(iso2, name);
    }
  };

  const applyCountryIsoRef = useRef((iso?: string) => {
    const iti = itiRef.current;
    if (!iti || !itiReadyRef.current || !iso) return;

    const normalized = iso.toLowerCase();
    if (appliedCountryIsoRef.current === normalized) return;

    try {
      const current = iti.getSelectedCountryData()?.iso2?.toLowerCase();
      if (current === normalized) {
        appliedCountryIsoRef.current = normalized;
        return;
      }

      syncingFromCountryRef.current = true;
      iti.setCountry(normalized);
      appliedCountryIsoRef.current = normalized;
      emitNumberRef.current();
    } catch {
      /* ignore */
    } finally {
      requestAnimationFrame(() => {
        syncingFromCountryRef.current = false;
      });
    }
  });

  // Initialize intl-tel-input once (empty deps — never change length)
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    let destroyed = false;

    const init = () => {
      if (destroyed || itiRef.current) return;

      const iti = intlTelInput(input, {
        initialCountry: "us",
        preferredCountries: ["us", "gb", "ca", "au", "de", "ng"],
        onlyCountries: PHONE_COUNTRY_ISOS,
        separateDialCode: true,
        nationalMode: true,
        autoPlaceholder: "aggressive",
        formatAsYouType: true,
        showSelectedDialCode: true,
      });
      itiRef.current = iti;
      itiReadyRef.current = true;

      applyCountryIsoRef.current(countryIsoRef.current);

      const onInput = () => emitNumberRef.current();
      const onCountryChange = () => {
        syncCountryToFormRef.current();
        emitNumberRef.current();
      };

      input.addEventListener("input", onInput);
      input.addEventListener("countrychange", onCountryChange);
      input.addEventListener("blur", () => emitNumberRef.current());
    };

    loadUtilsScript()
      .catch(() => undefined)
      .finally(() => {
        if (!destroyed) init();
      });

    return () => {
      destroyed = true;
      itiReadyRef.current = false;
      itiRef.current?.destroy();
      itiRef.current = null;
      appliedCountryIsoRef.current = undefined;
    };
  }, []);

  // Country dropdown → phone flag (fixed 1 dependency)
  useEffect(() => {
    applyCountryIsoRef.current(countryIso);
  }, [countryIso]);

  // Restore E.164 when controlled value is set externally
  useEffect(() => {
    const iti = itiRef.current;
    const input = inputRef.current;
    if (!iti || !input || !value || !itiReadyRef.current) return;
    if (input.value) return;

    try {
      if (utilsReady()) {
        iti.setNumber(value);
      } else {
        input.value = value;
      }
      emitNumberRef.current();
    } catch {
      input.value = value;
    }
  }, [value]);

  return (
    <div className={cn("phone-input-wrap", error && "phone-input-wrap--error")}>
      <input
        ref={inputRef}
        id={id}
        type="tel"
        name="phone"
        autoComplete="tel"
        disabled={disabled}
        className={cn(
          "flex h-12 w-full rounded-xl border bg-surface-elevated/80 text-sm text-white transition-all placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-red-500/50 focus-visible:ring-red-500/50"
            : "border-surface-border focus-visible:ring-brand-500/50 hover:border-white/20"
        )}
      />
    </div>
  );
}
