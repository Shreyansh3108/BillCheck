import type { Invoice } from "../types/invoice";

export function buildCsv(rows: Invoice[]): string {
  const header = ["Invoice #", "Client", "Issued", "Due", "Amount", "Status"];
  
  const lines = rows.map((r) => 
    [r.invoiceNumber, r.clientName, r.issueDate, r.dueDate, r.amount, r.status].join(",")
  );
  
  return [header.join(","), ...lines].join("\n");
}

export function triggerDownload(content: string, filename: string, mime = "text/csv") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url; 
  a.download = filename; 
  a.click();
  
  URL.revokeObjectURL(url);
}