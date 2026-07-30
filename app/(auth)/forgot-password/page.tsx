import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata = {
  title: "Forgot Password — Expatica",
};

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto w-full max-w-md">
      <ForgotPasswordForm />
    </div>
  );
}
