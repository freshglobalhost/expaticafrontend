import { apiRequest } from "./client";
import type { ApiFaq, ApiHelpArticle, ApiHelpCategory, Paginated } from "./types";

export async function getHelpCategories() {
  return apiRequest<Paginated<ApiHelpCategory>>("/support/categories/?page_size=20", {
    auth: false,
  });
}

export async function getHelpArticles(params?: { category?: string }) {
  const qs = new URLSearchParams({ page_size: "50" });
  if (params?.category) qs.set("category", params.category);
  return apiRequest<Paginated<ApiHelpArticle>>(`/support/articles/?${qs}`, { auth: false });
}

export async function getHelpArticle(slug: string) {
  return apiRequest<ApiHelpArticle>(`/support/articles/${slug}/`, { auth: false });
}

export async function getFaqs() {
  return apiRequest<Paginated<ApiFaq>>("/support/faqs/?page_size=50", { auth: false });
}

export async function createSupportTicket(payload: {
  subject: string;
  message_body: string;
  priority?: string;
}) {
  return apiRequest<{ id: number; reference_code: string; subject: string }>(
    "/support/tickets/",
    {
      method: "POST",
      json: {
        subject: payload.subject,
        priority: payload.priority ?? "normal",
        message_body: payload.message_body,
      },
    }
  );
}
