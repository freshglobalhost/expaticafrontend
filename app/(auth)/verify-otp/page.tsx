import { Suspense } from "react";
import { OtpVerificationForm } from "@/components/auth/otp-verification-form";
import { Loader2 } from "lucide-react";

export const metadata = {
  title: "Verify Code — Expatica",
};

function OtpFallback() {
  return (
    <div className="flex justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Suspense fallback={<OtpFallback />}>
        <OtpVerificationForm />
      </Suspense>
    </div>
  );
}
