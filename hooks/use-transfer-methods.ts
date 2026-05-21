"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTransferMethods } from "@/lib/api/banking";
import {
  mergeTransferMethods,
  type MergedTransferMethod,
} from "@/lib/transfer-methods-merge";
import type { TransferMethod } from "@/lib/transfer-methods";

export function useTransferMethods(uiMethods: TransferMethod[]) {
  const query = useQuery({
    queryKey: ["transfer-methods"],
    queryFn: () => getTransferMethods({ page_size: 50 }),
  });

  const methods = useMemo(
    () => mergeTransferMethods(uiMethods, query.data?.results ?? []),
    [uiMethods, query.data]
  );

  const methodIdBySlug = useMemo(() => {
    const map = new Map<string, number>();
    for (const m of methods) {
      if (m.apiId != null) map.set(m.id, m.apiId);
    }
    return map;
  }, [methods]);

  return {
    methods,
    methodIdBySlug,
    isLoading: query.isLoading,
    isError: query.isError,
    isReady: query.isSuccess,
    refetch: query.refetch,
  };
}

export function getApiIdForMethod(
  methods: MergedTransferMethod[],
  slug: string | null
): number | null {
  if (!slug) return null;
  return methods.find((m) => m.id === slug)?.apiId ?? null;
}
