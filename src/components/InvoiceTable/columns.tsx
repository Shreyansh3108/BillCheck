import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import type { Invoice } from "../../types/invoice";
import { usePermissions } from "../../hooks/usePermissions";
import { useMarkPaid } from "../../hooks/useMarkPaid";

function ActionCell({ invoice }: { invoice: Invoice }) {
  const { can } = usePermissions();
  const { mutate, isPending } = useMarkPaid();

  if (!can("invoice:markPaid") || invoice.status === "paid") return null;

  return (
    <button 
      onClick={() => mutate(invoice.id)}
      disabled={isPending}
      className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors disabled:opacity-50"
    >
      {isPending ? "Updating..." : "Mark Paid"}
    </button>
  );
}

const col = createColumnHelper<Invoice>();

export function useInvoiceColumns() {
  return [
    col.display({
      id: "select",
      header: ({ table }) => (
        <input 
          type="checkbox" 
          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/30 transition-shadow cursor-pointer"
          checked={table.getIsAllRowsSelected()} 
          onChange={table.getToggleAllRowsSelectedHandler()} 
        />
      ),
      cell: ({ row }) => (
        <input 
          type="checkbox" 
          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/30 transition-shadow cursor-pointer"
          checked={row.getIsSelected()} 
          onChange={row.getToggleSelectedHandler()} 
        />
      ),
    }),
    col.accessor("invoiceNumber", { 
      header: "Invoice #",
      cell: (c) => (
        <Link to={`/invoices/${c.row.original.id}`} className="text-slate-900 font-medium hover:text-blue-600 transition-colors">
          {c.getValue()}
        </Link>
      )
    }),
    col.accessor("clientName", { header: "Client", cell: (c) => <span className="text-slate-600">{c.getValue()}</span> }),
    col.accessor("issueDate", { header: "Issued", cell: (c) => <span className="text-slate-500">{c.getValue()}</span> }),
    col.accessor("dueDate", { header: "Due", cell: (c) => <span className="text-slate-500">{c.getValue()}</span> }),
    col.accessor("amount", { 
      header: "Amount", 
      cell: (c) => <span className="font-semibold text-slate-900">${c.getValue().toFixed(2)}</span> 
    }),
    col.accessor("status", { 
      header: "Status",
      cell: (c) => {
        const status = c.getValue();
        const styles = {
          paid: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
          pending: "bg-amber-500/10 text-amber-700 border-amber-500/20",
          overdue: "bg-rose-500/10 text-rose-700 border-rose-500/20"
        };
        return (
          <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider border ${styles[status]}`}>
            {status}
          </span>
        );
      }
    }),
    col.display({
      id: "actions",
      header: "",
      cell: ({ row }) => <ActionCell invoice={row.original} />,
    }),
  ];
}