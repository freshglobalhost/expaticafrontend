import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata = {
  title: "Reset Password — PennyCredit",
};

export default function ResetPasswordPage() {
  return (
    <div className="mx-auto w-full max-w-md">
      <ResetPasswordForm />
    </div>
  );
}
