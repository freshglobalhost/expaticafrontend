import type { ApiTransferMethod } from "@/lib/api/types";
import {
  SEND_MONEY_OPTIONS,
  DASHBOARD_SEND_OPTIONS,
  type TransferMethod,
  type TransferMethodId,
} from "@/lib/transfer-methods";

export type MergedTransferMethod = TransferMethod & {
  apiId: number | null;
  displayOrder: number;
  category?: string;
};

const UI_BY_SLUG = new Map<TransferMethodId, TransferMethod>(
  SEND_MONEY_OPTIONS.map((m) => [m.id, m])
);

/** Merge API methods with UI metadata (labels, images). */
export function mergeTransferMethods(
  uiMethods: TransferMethod[],
  apiMethods: ApiTransferMethod[]
): MergedTransferMethod[] {
  const apiBySlug = new Map(apiMethods.map((m) => [m.slug, m]));

  if (apiMethods.length === 0) {
    return uiMethods.map((ui, index) => ({
      ...ui,
      apiId: null,
      displayOrder: index,
    }));
  }

  const fromUi = uiMethods
    .filter((ui) => apiBySlug.has(ui.id))
    .map((ui) => {
      const api = apiBySlug.get(ui.id)!;
      return {
        ...ui,
        label: ui.label || api.name,
        apiId: api.id,
        displayOrder: api.display_order,
        category: api.category,
      };
    });

  const uiSlugs = new Set(uiMethods.map((m) => m.id));
  const extraFromApi = apiMethods
    .filter((api) => !uiSlugs.has(api.slug as TransferMethodId))
    .map((api) => {
      const ui = UI_BY_SLUG.get(api.slug as TransferMethodId);
      return {
        id: api.slug as TransferMethodId,
        label: ui?.label ?? api.name,
        subtitle: ui?.subtitle ?? api.category,
        image: ui?.image ?? "/assets/transfer-brands/local.svg",
        apiId: api.id,
        displayOrder: api.display_order,
        category: api.category,
      };
    });

  return [...fromUi, ...extraFromApi].sort((a, b) => a.displayOrder - b.displayOrder);
}

export { DASHBOARD_SEND_OPTIONS, SEND_MONEY_OPTIONS };
