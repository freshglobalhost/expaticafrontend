"use client";

import Image from "next/image";
import { useState } from "react";
import { CRYPTO_DEPOSIT_QR_IMAGES, type CryptoSymbol } from "@/lib/crypto-mock-data";
import { cn } from "@/lib/utils";

export function DepositQrImage({
  symbol,
  className,
}: {
  symbol: CryptoSymbol;
  className?: string;
}) {
  const [error, setError] = useState(false);
  const src = CRYPTO_DEPOSIT_QR_IMAGES[symbol];

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-white p-3 shadow-lg",
        className
      )}
    >
      {error ? (
        <p className="px-4 py-8 text-center text-xs text-gray-500">
          QR image missing. Add <code className="text-gray-700">public/assets/crypto/{symbol.toLowerCase()}.jpeg</code>
        </p>
      ) : (
        <Image
          src={src}
          alt={`${symbol} deposit QR code`}
          width={200}
          height={200}
          className="h-auto w-[200px] max-w-full object-contain"
          unoptimized
          onError={() => setError(true)}
          priority
        />
      )}
    </div>
  );
}
