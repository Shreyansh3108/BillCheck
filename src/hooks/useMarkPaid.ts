import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markInvoicePaid } from "../api/invoiceApi";

export function useMarkPaid() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markInvoicePaid,
    onSuccess: () => {
      // Invalidate the cache to trigger a seamless background refetch
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}