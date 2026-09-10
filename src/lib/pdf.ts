import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Invoice } from "../types/invoice";

export function downloadInvoicePdf(invoice: Invoice) {
  const doc = new jsPDF();

  // 1. Document Header
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text(`Invoice ${invoice.invoiceNumber}`, 14, 22);
  
  // 2. Client & Status Details
  doc.setFontSize(11);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text(`Client: ${invoice.clientName}`, 14, 32);
  doc.text(`Issued: ${invoice.issueDate}`, 14, 38);
  doc.text(`Due: ${invoice.dueDate}`, 14, 44);
  
  const statusColor = invoice.status === 'paid' ? [22, 163, 74] : [220, 38, 38];
  doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
  doc.text(`Status: ${invoice.status.toUpperCase()}`, 14, 50);

  // 3. Line Items Table
  const tableData = invoice.lineItems.map(item => [
    item.description,
    item.quantity.toString(),
    `$${item.unitPrice.toFixed(2)}`,
    `$${(item.quantity * item.unitPrice).toFixed(2)}`
  ]);

  autoTable(doc, {
    startY: 60,
    head: [['Description', 'Qty', 'Unit Price', 'Total']],
    body: tableData,
    foot: [['', '', 'Total Amount', `$${invoice.amount.toFixed(2)}`]],
    theme: 'striped',
    headStyles: { fillColor: [15, 23, 42] }, // slate-900 header
    footStyles: { fillColor: [248, 250, 252], textColor: [15, 23, 42], fontStyle: 'bold' }
  });

  // 4. Trigger Download
  doc.save(`${invoice.invoiceNumber}.pdf`);
}