import { deriveDashboardStats } from "../../lib/stats";
import type { Invoice } from "../../types/invoice";
import { FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export function DashboardStats({ invoices }: { invoices: Invoice[] }) {
  // Note: In a true production app, these stats would be fetched from a separate aggregate 
  // endpoint rather than just calculating from the current paginated rows.
  const stats = deriveDashboardStats(invoices);

  const cards = [
    { title: "Total Invoices", value: stats.totalInvoices, icon: FileText, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Paid Invoices", value: stats.paidInvoices, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" },
    { title: "Overdue", value: stats.overdueInvoices, icon: AlertCircle, color: "text-red-600", bg: "bg-red-100" },
    { title: "Pending Amount", value: `$${stats.pendingAmount.toFixed(2)}`, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((c, i) => (
        <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className={`p-3 rounded-lg ${c.bg}`}>
            <c.icon size={24} className={c.color} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">{c.title}</p>
            <p className="text-2xl font-bold text-slate-900">{c.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}