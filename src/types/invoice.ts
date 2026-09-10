export type InvoiceStatus = "paid" | "pending" | "overdue";

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  issueDate: string;   
  dueDate: string;      
  status: InvoiceStatus;
  amount: number;       
  lineItems: LineItem[];
}

export interface DashboardStats {
  totalInvoices: number;
  paidInvoices: number;
  pendingAmount: number;
  overdueInvoices: number;
}