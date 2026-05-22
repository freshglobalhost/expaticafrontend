export type TransactionStatus =
  | "pending"
  | "completed"
  | "failed"
  | "cancelled"
  | "refunded"
  | "rejected"
  | string;

export function transactionStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: "Pending",
    completed: "Completed",
    failed: "Failed",
    cancelled: "Cancelled",
    refunded: "Refunded",
    rejected: "Rejected",
  };
  return labels[status] ?? status;
}

export function transactionStatusBadgeVariant(
  status: string
): "default" | "success" | "warning" | "danger" | "info" {
  switch (status) {
    case "completed":
      return "success";
    case "pending":
      return "warning";
    case "failed":
    case "rejected":
      return "danger";
    case "refunded":
      return "info";
    case "cancelled":
      return "default";
    default:
      return "default";
  }
}
