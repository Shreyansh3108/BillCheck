import { useSearchParams } from "react-router-dom";

export function useInvoiceFilters() {
  const [params, setParams] = useSearchParams();

  const filters = {
    search: params.get("q") ?? "",
    status: params.get("status") ?? "",
    dateFrom: params.get("from") ?? "",
    dateTo: params.get("to") ?? "",
    page: Number(params.get("page") ?? 0),
    sortBy: params.get("sort") ?? "issueDate",
    sortDir: (params.get("dir") ?? "desc") as "asc" | "desc",
  };

  const setFilter = (patch: Partial<typeof filters>) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => {
      // Map internal state keys to shorter URL query params
      const key = { search: "q", dateFrom: "from", dateTo: "to", sortBy: "sort", sortDir: "dir" }[k] ?? k;
      if (v === "" || v == null) next.delete(key);
      else next.set(key, String(v));
    });
    
    // Automatically reset to page 0 if any filter changes (except page itself)
    if (!("page" in patch)) next.delete("page");
    
    setParams(next);
  };

  return { filters, setFilter };
}