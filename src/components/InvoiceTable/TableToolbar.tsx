import { useInvoiceFilters } from "../../hooks/useInvoiceFilters";
import { Search, Filter, Download, X } from "lucide-react";
import type { Invoice } from "../../types/invoice";
import { buildCsv, triggerDownload } from "../../lib/csv";
import { usePermissions } from "../../hooks/usePermissions";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  selectedInvoices: Invoice[];
  onClearSelection: () => void;
}

export function TableToolbar({ selectedInvoices, onClearSelection }: Props) {
  const { filters, setFilter } = useInvoiceFilters();
  const { can } = usePermissions();

  const handleExport = () => {
    const csv = buildCsv(selectedInvoices);
    triggerDownload(csv, `invoices-export-${new Date().toISOString().split('T')[0]}.csv`);
    onClearSelection();
  };

  return (
    <div className="relative overflow-hidden bg-white rounded-t-xl border-b border-slate-200 min-h-[72px] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        
        {selectedInvoices.length > 0 ? (
          <motion.div 
            key="bulk-actions"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-blue-50/80 backdrop-blur-sm px-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <button onClick={onClearSelection} className="p-1 rounded-md text-blue-500 hover:bg-blue-100/50 transition-colors">
                <X size={18} />
              </button>
              <span className="text-sm font-semibold text-blue-900">
                {selectedInvoices.length} selected
              </span>
            </div>
            {can("invoice:export") && (
              <button 
                onClick={handleExport} 
                className="flex items-center gap-2 bg-white border border-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 hover:border-blue-300 shadow-sm transition-all active:scale-95"
              >
                <Download size={16} /> Export CSV
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="filters"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 py-3 flex flex-col md:flex-row gap-4 items-center justify-between"
          >
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search client or invoice #..." 
                value={filters.search}
                onChange={(e) => setFilter({ search: e.target.value })}
                className="w-full pl-9 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-1.5 bg-slate-50/50 hover:bg-white focus-within:ring-4 focus-within:ring-slate-200/50 transition-all">
                <Filter size={14} className="text-slate-400" />
                <select 
                  value={filters.status}
                  onChange={(e) => setFilter({ status: e.target.value })}
                  className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer py-1"
                >
                  <option value="">All Statuses</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="date" 
                  value={filters.dateFrom}
                  onChange={(e) => setFilter({ dateFrom: e.target.value })}
                  className="bg-slate-50/50 hover:bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
                <span className="text-slate-300">-</span>
                <input 
                  type="date" 
                  value={filters.dateTo}
                  onChange={(e) => setFilter({ dateTo: e.target.value })}
                  className="bg-slate-50/50 hover:bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}