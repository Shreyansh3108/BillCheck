import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchInvoices } from "../api/invoiceApi";
import type { InvoiceQueryParams } from "../api/invoiceApi"; // <-- Type is explicitly declared here

export function useInvoicesQuery(params: InvoiceQueryParams) {
  return useQuery({
    queryKey: ["invoices", params],
    queryFn: () => fetchInvoices(params),
    placeholderData: keepPreviousData,
  });
}