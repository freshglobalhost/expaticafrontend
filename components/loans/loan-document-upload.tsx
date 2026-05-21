"use client";

import { useRef } from "react";
import { Upload, FileCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_MB = 10;

export function LoanDocumentUpload({
  label,
  file,
  onFileChange,
  error,
  required,
}: {
  label: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  error?: string;
  required?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (!picked) return;
    if (picked.size > MAX_MB * 1024 * 1024) {
      onFileChange(null);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    onFileChange(picked);
  };

  const clear = () => {
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex w-full items-center gap-4 rounded-xl border border-dashed p-4 text-left transition-colors",
          error
            ? "border-red-500/40 bg-red-500/5"
            : "border-white/20 bg-white/5 hover:border-brand-500/50"
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/15">
          {file ? (
            <FileCheck className="h-5 w-5 text-emerald-400" />
          ) : (
            <Upload className="h-5 w-5 text-brand-400" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-white">
            {label}
            {required && <span className="text-red-400"> *</span>}
          </p>
          <p className="text-xs text-gray-500">
            {file ? `${file.name} (${(file.size / 1024).toFixed(1)} KB)` : "PDF, JPG or PNG — max 10MB"}
          </p>
        </div>
        {file && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              clear();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.stopPropagation();
                clear();
              }
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-white/5 hover:text-white"
            aria-label="Remove file"
          >
            <X className="h-4 w-4" />
          </span>
        )}
      </button>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
