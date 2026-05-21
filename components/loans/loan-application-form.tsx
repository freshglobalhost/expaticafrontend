"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { StepIndicator } from "@/components/auth/step-indicator";
import { SlideTransition } from "@/components/auth/slide-transition";
import { FormField } from "@/components/auth/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { LoanDocumentUpload } from "@/components/loans/loan-document-upload";
import { createLoanApplication, getLoanProduct, getLoanProducts } from "@/lib/api/loans";
import { getErrorMessage } from "@/lib/api/get-error-message";
import { useDashboard } from "@/components/providers/dashboard-provider";
import { formatCurrency } from "@/lib/utils";
import { calculateLoan } from "@/lib/loan-calculator";

const STEPS = [
  { label: "Personal" },
  { label: "Employment" },
  { label: "Documents" },
  { label: "Loan" },
  { label: "Review" },
];

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  employer: string;
  jobTitle: string;
  income: string;
  employmentYears: string;
  purpose: string;
};

const STEP_FIELDS: Record<number, (keyof FormValues)[]> = {
  1: ["firstName", "lastName", "email", "phone", "address"],
  2: ["employer", "jobTitle", "income", "employmentYears"],
  4: ["purpose"],
};

function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children} <span className="text-red-400">*</span>
    </>
  );
}

export function LoanApplicationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productSlug = searchParams.get("product") ?? searchParams.get("type") ?? "personal";
  const { user } = useDashboard();

  const productQuery = useQuery({
    queryKey: ["loan-product", productSlug],
    queryFn: () => getLoanProduct(productSlug),
    retry: false,
  });

  const productsQuery = useQuery({
    queryKey: ["loan-products"],
    queryFn: getLoanProducts,
  });

  const product = productQuery.data;
  const minAmount = product ? parseFloat(product.minimum_amount) : 1000;
  const maxAmount = product ? parseFloat(product.maximum_amount) : 50000;
  const rate = product ? parseFloat(product.minimum_interest_rate) / 100 : 0.06;
  const terms = useMemo(
    () =>
      product?.available_terms_months?.length
        ? [...product.available_terms_months].sort((a, b) => a - b)
        : [12, 24, 36, 48, 60],
    [product]
  );

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [stepError, setStepError] = useState<string | null>(null);
  const [amount, setAmount] = useState(25000);
  const [term, setTerm] = useState(36);
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [incomeDocument, setIncomeDocument] = useState<File | null>(null);
  const [docErrors, setDocErrors] = useState<{ id?: string; income?: string }>({});

  useEffect(() => {
    if (product) {
      const mid = (minAmount + maxAmount) / 2;
      setAmount(Math.min(maxAmount, Math.max(minAmount, mid)));
      setTerm(terms.includes(36) ? 36 : terms[Math.floor(terms.length / 2)] ?? 36);
    }
  }, [product, minAmount, maxAmount, terms]);

  const form = useForm<FormValues>({
    defaultValues: {
      firstName: user?.first_name ?? "",
      lastName: user?.last_name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      address: user?.address ?? "",
      employer: "",
      jobTitle: "",
      income: "",
      employmentYears: "",
      purpose: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.first_name ?? "",
        lastName: user.last_name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        address: user.address ?? "",
        employer: form.getValues("employer"),
        jobTitle: form.getValues("jobTitle"),
        income: form.getValues("income"),
        employmentYears: form.getValues("employmentYears"),
        purpose: form.getValues("purpose"),
      });
    }
  }, [user, form]);

  const calc = calculateLoan(amount, term, rate);
  const data = form.watch();

  const validateStep = async (): Promise<boolean> => {
    setStepError(null);

    if (step === 3) {
      const errors: { id?: string; income?: string } = {};
      if (!idDocument) errors.id = "Government ID is required.";
      if (!incomeDocument) errors.income = "Proof of income is required.";
      setDocErrors(errors);
      if (errors.id || errors.income) {
        setStepError("Please upload all required documents.");
        return false;
      }
      return true;
    }

    const fields = STEP_FIELDS[step];
    if (!fields?.length) return true;

    const valid = await form.trigger(fields);
    if (!valid) {
      setStepError("Please complete all required fields.");
      return false;
    }
    return true;
  };

  const next = async () => {
    const ok = await validateStep();
    if (!ok) return;
    setDirection("forward");
    setStep((s) => Math.min(s + 1, 5));
  };

  const back = () => {
    setStepError(null);
    setDirection("back");
    setStep((s) => Math.max(s - 1, 1));
  };

  const submit = async () => {
    if (!product || !idDocument || !incomeDocument) return;
    const valid = await form.trigger();
    if (!valid) {
      setSubmitError("Please complete all required fields.");
      return;
    }

    setLoading(true);
    setSubmitError(null);
    try {
      await createLoanApplication({
        product: product.id,
        requested_amount: amount.toFixed(2),
        term_months: term,
        purpose: data.purpose.trim(),
        first_name: data.firstName.trim(),
        last_name: data.lastName.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        address: data.address.trim(),
        employer: data.employer.trim(),
        job_title: data.jobTitle.trim(),
        annual_income: data.income.trim(),
        employment_years: data.employmentYears.trim(),
        id_document: idDocument,
        income_document: incomeDocument,
      });
      router.push("/loans/apply/success");
    } catch (err) {
      setSubmitError(getErrorMessage(err, "Could not submit application."));
      setLoading(false);
    }
  };

  const registerRequired = (name: keyof FormValues) =>
    form.register(name, { required: "This field is required." });

  if (productQuery.isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-lg rounded-xl border border-white/10 bg-surface-card p-8 text-center">
        <p className="text-gray-400">Loan product not found.</p>
        <Button className="mt-4" asChild variant="secondary">
          <Link href="/loans">Back to marketplace</Link>
        </Button>
      </div>
    );
  }

  const termMin = terms[0];
  const termMax = terms[terms.length - 1];
  const fieldError = (name: keyof FormValues) => form.formState.errors[name]?.message;

  return (
    <div className="mx-auto max-w-3xl">
      <StepIndicator steps={STEPS} currentStep={step} />
      <p className="mt-3 text-center text-xs text-gray-500">
        All fields marked with <span className="text-red-400">*</span> are required.
      </p>
      <div className="mt-4 rounded-2xl border border-white/10 bg-surface-card p-6 sm:p-8">
        <SlideTransition stepKey={step} direction={direction}>
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-white">Personal information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label={<RequiredLabel>First name</RequiredLabel>} htmlFor="firstName">
                  <Input id="firstName" {...registerRequired("firstName")} />
                  {fieldError("firstName") && (
                    <p className="mt-1 text-xs text-red-400">{fieldError("firstName")}</p>
                  )}
                </FormField>
                <FormField label={<RequiredLabel>Last name</RequiredLabel>} htmlFor="lastName">
                  <Input id="lastName" {...registerRequired("lastName")} />
                  {fieldError("lastName") && (
                    <p className="mt-1 text-xs text-red-400">{fieldError("lastName")}</p>
                  )}
                </FormField>
              </div>
              <FormField label={<RequiredLabel>Email</RequiredLabel>} htmlFor="email">
                <Input
                  id="email"
                  type="email"
                  {...registerRequired("email")}
                />
                {fieldError("email") && (
                  <p className="mt-1 text-xs text-red-400">{fieldError("email")}</p>
                )}
              </FormField>
              <FormField label={<RequiredLabel>Phone</RequiredLabel>} htmlFor="phone">
                <Input id="phone" {...registerRequired("phone")} />
                {fieldError("phone") && (
                  <p className="mt-1 text-xs text-red-400">{fieldError("phone")}</p>
                )}
              </FormField>
              <FormField label={<RequiredLabel>Residential address</RequiredLabel>} htmlFor="address">
                <Input
                  id="address"
                  placeholder="Street, city, country"
                  {...registerRequired("address")}
                />
                {fieldError("address") && (
                  <p className="mt-1 text-xs text-red-400">{fieldError("address")}</p>
                )}
              </FormField>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-white">Employment details</h2>
              <FormField label={<RequiredLabel>Employer name</RequiredLabel>} htmlFor="employer">
                <Input id="employer" {...registerRequired("employer")} />
                {fieldError("employer") && (
                  <p className="mt-1 text-xs text-red-400">{fieldError("employer")}</p>
                )}
              </FormField>
              <FormField label={<RequiredLabel>Job title</RequiredLabel>} htmlFor="jobTitle">
                <Input id="jobTitle" {...registerRequired("jobTitle")} />
                {fieldError("jobTitle") && (
                  <p className="mt-1 text-xs text-red-400">{fieldError("jobTitle")}</p>
                )}
              </FormField>
              <FormField label={<RequiredLabel>Annual income</RequiredLabel>} htmlFor="income">
                <Input id="income" placeholder="$85,000" {...registerRequired("income")} />
                {fieldError("income") && (
                  <p className="mt-1 text-xs text-red-400">{fieldError("income")}</p>
                )}
              </FormField>
              <FormField
                label={<RequiredLabel>Years at current employer</RequiredLabel>}
                htmlFor="employmentYears"
              >
                <Input id="employmentYears" placeholder="3" {...registerRequired("employmentYears")} />
                {fieldError("employmentYears") && (
                  <p className="mt-1 text-xs text-red-400">{fieldError("employmentYears")}</p>
                )}
              </FormField>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-white">Upload documents</h2>
              <p className="text-sm text-gray-400">
                Both documents are required before you can continue.
              </p>
              <LoanDocumentUpload
                label="Government-issued ID"
                required
                file={idDocument}
                onFileChange={(f) => {
                  setIdDocument(f);
                  setDocErrors((e) => ({ ...e, id: undefined }));
                }}
                error={docErrors.id}
              />
              <LoanDocumentUpload
                label="Proof of income (payslip / tax return)"
                required
                file={incomeDocument}
                onFileChange={(f) => {
                  setIncomeDocument(f);
                  setDocErrors((e) => ({ ...e, income: undefined }));
                }}
                error={docErrors.income}
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="font-semibold text-white">Loan details</h2>
              <FormField label="Loan product" htmlFor="loan-product">
                <Select id="loan-product" defaultValue={product.slug} disabled>
                  {(productsQuery.data?.results ?? [product]).map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.name}
                    </option>
                  ))}
                </Select>
              </FormField>
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-gray-400">
                    Amount <span className="text-red-400">*</span>
                  </span>
                  <span className="font-bold text-white">{formatCurrency(amount)}</span>
                </div>
                <Slider
                  value={[amount]}
                  onValueChange={([v]) => setAmount(v)}
                  min={minAmount}
                  max={maxAmount}
                  step={1000}
                />
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-gray-400">
                    Term <span className="text-red-400">*</span>
                  </span>
                  <span className="font-bold text-white">{term} months</span>
                </div>
                <Slider
                  value={[term]}
                  onValueChange={([v]) => setTerm(v)}
                  min={termMin}
                  max={termMax}
                  step={terms.length > 12 ? 12 : 1}
                />
              </div>
              <FormField label={<RequiredLabel>Loan purpose</RequiredLabel>} htmlFor="purpose">
                <Input
                  id="purpose"
                  placeholder="e.g. Home renovation"
                  {...registerRequired("purpose")}
                />
                {fieldError("purpose") && (
                  <p className="mt-1 text-xs text-red-400">{fieldError("purpose")}</p>
                )}
              </FormField>
              <div className="rounded-xl bg-brand-500/10 p-4 text-center">
                <p className="text-xs text-gray-400">Estimated monthly payment</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(calc.monthlyPayment)}</p>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-white">Review application</h2>
              <dl className="space-y-3 text-sm">
                {[
                  ["Applicant", `${data.firstName} ${data.lastName}`],
                  ["Email", data.email],
                  ["Phone", data.phone],
                  ["Address", data.address],
                  ["Employer", data.employer],
                  ["Product", product.name],
                  ["Amount", formatCurrency(amount)],
                  ["Term", `${term} months`],
                  ["Purpose", data.purpose],
                  ["Monthly est.", formatCurrency(calc.monthlyPayment)],
                  ["ID document", idDocument?.name ?? "—"],
                  ["Income document", incomeDocument?.name ?? "—"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-white/5 pb-2">
                    <dt className="text-gray-500">{k}</dt>
                    <dd className="max-w-[60%] text-right font-medium text-white">{v}</dd>
                  </div>
                ))}
              </dl>
              <label className="flex items-start gap-2 text-xs text-gray-400">
                <input type="checkbox" required className="mt-0.5" />
                I confirm all information is accurate and authorize a credit check.
              </label>
              {submitError && <p className="text-sm text-red-400">{submitError}</p>}
            </div>
          )}
        </SlideTransition>

        {stepError && (
          <p className="mt-4 text-sm text-red-400">{stepError}</p>
        )}

        <div className="mt-8 flex gap-3">
          {step > 1 && (
            <Button type="button" variant="secondary" onClick={back}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          )}
          {step < 5 ? (
            <Button type="button" className="flex-1" onClick={next}>
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              className="flex-1"
              disabled={loading || !idDocument || !incomeDocument}
              onClick={submit}
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Submit application"}
            </Button>
          )}
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-gray-500">
        <Link href="/loans" className="text-brand-400 hover:underline">
          Back to marketplace
        </Link>
      </p>
    </div>
  );
}
