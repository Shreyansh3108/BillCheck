import type { Invoice, DashboardStats } from "../types/invoice";

export function deriveDashboardStats(invoices: Invoice[]): DashboardStats {
  return {
    totalInvoices: invoices.length,
    paidInvoices: invoices.filter((i) => i.status === "paid").length,
    pendingAmount: invoices.filter((i) => i.status === "pending").reduce((s, i) => s + i.amount, 0),
    overdueInvoices: invoices.filter((i) => i.status === "overdue").length,
  };
}