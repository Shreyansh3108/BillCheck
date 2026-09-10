import { useQuery } from "@tanstack/react-query";
import { fetchInvoiceById } from "../api/invoiceApi";

export function useInvoiceQuery(id: string) {
  return useQuery({
    queryKey: ["invoice", id],
    queryFn: () => fetchInvoiceById(id),
    enabled: !!id, // Prevent fetching if the ID is missing
  });
}