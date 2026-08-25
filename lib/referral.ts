const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://expaticaonline.com";

/** Username (or email local-part) used as the public referral handle. */
export function getReferralCode(value?: string | null): string {
  const trimmed = (value || "").trim();
  if (!trimmed) return "";
  if (trimmed.includes("@")) return trimmed.split("@")[0] || trimmed;
  return trimmed.replace(/[^a-zA-Z0-9._-]/g, "") || trimmed;
}

export function getReferralLink(codeOrUsername?: string | null): string {
  const code = getReferralCode(codeOrUsername);
  if (!code) return "";
  return `${SITE_URL}/signup?ref=${encodeURIComponent(code)}`;
}

type ReferralUser = {
  referral_code?: string | null;
  referral_link?: string | null;
  username?: string | null;
  email?: string | null;
  display_name?: string | null;
  first_name?: string | null;
  account_reference?: string | null;
} | null;

export function resolveReferral(user?: ReferralUser): { code: string; link: string } {
  const code =
    (user?.referral_code || "").trim() ||
    getReferralCode(user?.username) ||
    getReferralCode(user?.email) ||
    getReferralCode(user?.display_name) ||
    getReferralCode(user?.first_name) ||
    getReferralCode(user?.account_reference);

  const link = (user?.referral_link || "").trim() || getReferralLink(code);
  return { code, link };
}
