export type PasswordStrength = "weak" | "fair" | "good" | "strong";

export interface StrengthResult {
  score: number;
  label: PasswordStrength;
  color: string;
  checks: { label: string; met: boolean }[];
}

export function getPasswordStrength(password: string): StrengthResult {
  const checks = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Lowercase letter", met: /[a-z]/.test(password) },
    { label: "Number", met: /\d/.test(password) },
    { label: "Special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  const metCount = checks.filter((c) => c.met).length;
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  let label: PasswordStrength = "weak";
  let color = "bg-red-500";

  if (score >= 5) {
    label = "strong";
    color = "bg-emerald-500";
  } else if (score >= 4) {
    label = "good";
    color = "bg-brand-500";
  } else if (score >= 2) {
    label = "fair";
    color = "bg-amber-500";
  }

  return { score: Math.min(score, 5), label, color, checks };
}
