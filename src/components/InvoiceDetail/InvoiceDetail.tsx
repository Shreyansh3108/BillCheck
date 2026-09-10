import { useParams, Link } from "react-router-dom";
import { useInvoiceQuery } from "../../hooks/useInvoiceQuery";
import { ArrowLeft, Download } from "lucide-react";
import { downloadInvoicePdf } from "../../lib/pdf"; // <-- Import the PDF logic

export function InvoiceDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: invoice, isLoading } = useInvoiceQuery(id!);

  if (isLoading) {
    return <div className="p-12 text-center text-slate-500 animate-pulse">Loading invoice details...</div>;
  }

  if (!invoice) {
    return <div className="p-12 text-center text-red-500">Invoice not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Invoice {invoice.invoiceNumber}</h1>
          <p className="text-slate-500 mt-1">Client: <span className="font-medium text-slate-700">{invoice.clientName}</span></p>
        </div>
        
        <div className="flex gap-3">
          <div className="text-right mr-4">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Status</p>
            <p className="font-bold text-slate-700 uppercase">{invoice.status}</p>
          </div>
          <button 
            onClick={() => downloadInvoicePdf(invoice)} // <-- Trigger the actual download
            className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors border border-blue-100 cursor-pointer"
          >
            <Download size={16} /> Download PDF
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <h2 className="font-semibold text-slate-700">Line Items</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-slate-500 uppercase bg-white border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Description</th>
                <th className="px-6 py-4 font-semibold text-right">Qty</th>
                <th className="px-6 py-4 font-semibold text-right">Unit Price</th>
                <th className="px-6 py-4 font-semibold text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoice.lineItems.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">{item.description}</td>
                  <td className="px-6 py-4 text-right">{item.quantity}</td>
                  <td className="px-6 py-4 text-right">${item.unitPrice.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900">
                    ${(item.quantity * item.unitPrice).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50 border-t border-slate-200">
              <tr>
                <td colSpan={3} className="px-6 py-4 text-right font-bold text-slate-700">Total Amount</td>
                <td className="px-6 py-4 text-right font-bold text-slate-900 text-lg">${invoice.amount.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}