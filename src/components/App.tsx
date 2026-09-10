import { Routes, Route } from "react-router-dom";
import { useInvoiceFilters } from "../hooks/useInvoiceFilters";
import { useInvoicesQuery } from "../hooks/useInvoicesQuery";
import { InvoiceTable } from "./InvoiceTable/InvoiceTable";
import { InvoiceDetail } from "./InvoiceDetail/InvoiceDetail";
import type { Invoice } from "../types/invoice";

function DashboardView() {
  const { filters, setFilter } = useInvoiceFilters();
  
  const queryParams = {
    ...filters,
    pageSize: 5,
    sortBy: filters.sortBy as keyof Invoice
  };

  const { data, isLoading } = useInvoicesQuery(queryParams);

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto animate-in fade-in duration-500">
      <InvoiceTable 
        data={data?.rows ?? []}
        totalRows={data?.total ?? 0}
        isLoading={isLoading}
        pagination={{ pageIndex: filters.page, pageSize: 5 }}
        setPagination={(updater) => {
          const next = typeof updater === "function" ? updater({ pageIndex: filters.page, pageSize: 5 }) : updater;
          setFilter({ page: next.pageIndex });
        }}
        sorting={[{ id: filters.sortBy, desc: filters.sortDir === "desc" }]}
        setSorting={(updater) => {
          const next = typeof updater === "function" ? updater([{ id: filters.sortBy, desc: filters.sortDir === "desc" }]) : updater;
          if (next[0]) {
            setFilter({ sortBy: next[0].id, sortDir: next[0].desc ? "desc" : "asc" });
          }
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans">
      <Routes>
        <Route path="/" element={<DashboardView />} />
        <Route path="/invoices/:id" element={<InvoiceDetail />} />
      </Routes>
    </div>
  );
}