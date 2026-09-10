import initialMock from "../data/mockInvoices.json";
import type { Invoice } from "../types/invoice";

// 1. Load mock data into a mutable in-memory array
let memoryDb: Invoice[] = [...initialMock] as Invoice[];

export interface InvoiceQueryParams {
  page: number;
  pageSize: number;
  search?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: keyof Invoice;
  sortDir?: "asc" | "desc";
}

export async function fetchInvoices(params: InvoiceQueryParams) {
  await new Promise((r) => setTimeout(r, 400));
  
  // Use memoryDb instead of the static mock
  let rows = [...memoryDb];

  if (params.search) {
    const q = params.search.toLowerCase();
    rows = rows.filter((r) => 
      r.clientName.toLowerCase().includes(q) || 
      r.invoiceNumber.toLowerCase().includes(q)
    );
  }
  if (params.status) rows = rows.filter((r) => r.status === params.status);
  if (params.dateFrom) rows = rows.filter((r) => r.issueDate >= params.dateFrom!);
  if (params.dateTo) rows = rows.filter((r) => r.issueDate <= params.dateTo!);

  if (params.sortBy) {
    rows = rows.sort((a, b) => {
      const dir = params.sortDir === "desc" ? -1 : 1;
      return a[params.sortBy!] > b[params.sortBy!] ? dir : -dir;
    });
  }

  const total = rows.length;
  const start = params.page * params.pageSize;
  const page = rows.slice(start, start + params.pageSize);
  
  return { rows: page, total };
}

export async function fetchInvoiceById(id: string): Promise<Invoice | undefined> {
  await new Promise((r) => setTimeout(r, 200));
  return memoryDb.find((i) => i.id === id);
}

// 2. Add the mutation function
export async function markInvoicePaid(id: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 300)); // simulate network delay
  const index = memoryDb.findIndex(i => i.id === id);
  if (index !== -1) {
    memoryDb[index] = { ...memoryDb[index], status: "paid" };
  }
}