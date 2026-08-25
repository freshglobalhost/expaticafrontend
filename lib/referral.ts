import { SITE_URL } from "@/lib/seo";

/** Username (or email local-part) used as the public referral handle. */
export function getReferralCode(username?: string | null): string {
  const trimmed = (username || "").trim();
  if (!trimmed) return "";
  if (trimmed.includes("@")) return trimmed.split("@")[0] || trimmed;
  return trimmed;
}

export function getReferralLink(username?: string | null): string {
  const code = getReferralCode(username);
  if (!code) return "";
  return `${SITE_URL}/signup?ref=${encodeURIComponent(code)}`;
}
