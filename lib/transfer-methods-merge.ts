import type { ApiTransferMethod } from "@/lib/api/types";
import {
  SEND_MONEY_OPTIONS,
  DASHBOARD_SEND_OPTIONS,
  WITHDRAW_OPTIONS,
  type TransferMethod,
  type TransferMethodId,
} from "@/lib/transfer-methods";

export type MergedTransferMethod = TransferMethod & {
  apiId: number | string | null;
  displayOrder: number;
  category?: string;
};

const UI_BY_SLUG = new Map<TransferMethodId, TransferMethod>(
  [...SEND_MONEY_OPTIONS, ...WITHDRAW_OPTIONS].map((m) => [m.id, m])
);

const WITHDRAW_ONLY_SLUGS = new Set<string>(["crypto"]);

export type MergeTransferMethodsOptions = {
  /** When true, append API methods not listed in uiMethods (full /send page). Default false. */
  allowApiExtras?: boolean;
};

/** Merge API methods with UI metadata (labels, images). */
export function mergeTransferMethods(
  uiMethods: TransferMethod[],
  apiMethods: ApiTransferMethod[],
  options?: MergeTransferMethodsOptions
): MergedTransferMethod[] {
  const allowApiExtras = options?.allowApiExtras ?? false;
  const apiBySlug = new Map(apiMethods.map((m) => [m.slug, m]));

  const mergedFromUi = uiMethods.map((ui, index) => {
    const api = apiBySlug.get(ui.id);
    if (api) {
      return {
        ...ui,
        label: ui.label || api.name,
        apiId: api.id,
        displayOrder: api.display_order,
        category: api.category,
      };
    }
    return {
      ...ui,
      apiId: null,
      displayOrder: index,
    };
  });

  if (!allowApiExtras || apiMethods.length === 0) {
    return mergedFromUi;
  }

  const uiSlugs = new Set(uiMethods.map((m) => m.id));
  const extraFromApi = apiMethods
    .filter(
      (api) =>
        !uiSlugs.has(api.slug as TransferMethodId) &&
        !WITHDRAW_ONLY_SLUGS.has(api.slug)
    )
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

  return [...mergedFromUi, ...extraFromApi].sort((a, b) => a.displayOrder - b.displayOrder);
}

export { DASHBOARD_SEND_OPTIONS, SEND_MONEY_OPTIONS };
