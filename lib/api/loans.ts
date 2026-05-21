import { apiFormRequest, apiRequest } from "./client";
import type { ApiLoan, ApiLoanApplication, ApiLoanProduct, Paginated } from "./types";

export async function getLoanProducts() {
  return apiRequest<Paginated<ApiLoanProduct>>("/loans/products/");
}

export async function getLoanProduct(slug: string) {
  return apiRequest<ApiLoanProduct>(`/loans/products/${slug}/`);
}

export async function getLoans() {
  return apiRequest<Paginated<ApiLoan>>("/loans/");
}

export async function getLoan(id: number | string) {
  return apiRequest<ApiLoan>(`/loans/${id}/`);
}

export async function getLoanApplications() {
  return apiRequest<Paginated<ApiLoanApplication>>("/loans/applications/");
}

export type LoanApplicationPayload = {
  product: number;
  requested_amount: string;
  term_months: number;
  purpose: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  employer: string;
  job_title: string;
  annual_income: string;
  employment_years: string;
  id_document: File;
  income_document: File;
};

export async function createLoanApplication(payload: LoanApplicationPayload) {
  const form = new FormData();
  form.set("product", String(payload.product));
  form.set("requested_amount", payload.requested_amount);
  form.set("term_months", String(payload.term_months));
  form.set("purpose", payload.purpose);
  form.set("first_name", payload.first_name);
  form.set("last_name", payload.last_name);
  form.set("email", payload.email);
  form.set("phone", payload.phone);
  form.set("address", payload.address);
  form.set("employer", payload.employer);
  form.set("job_title", payload.job_title);
  form.set("annual_income", payload.annual_income);
  form.set("employment_years", payload.employment_years);
  form.set("id_document", payload.id_document);
  form.set("income_document", payload.income_document);
  return apiFormRequest<ApiLoanApplication>("/loans/applications/", form, "POST");
}
