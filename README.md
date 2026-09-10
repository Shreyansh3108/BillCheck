# BillCheck: Enterprise Invoice Management

🚀 **Live Deployment:** [View the Live Dashboard Here](https://bill-check-beige.vercel.app/)

BillCheck is a high-performance, frontend-focused billing dashboard designed to simulate enterprise-grade data handling. Built with React and TypeScript, it features a highly optimized data grid that delegates state management to the URL, ensuring deep-linking and browser navigation work flawlessly.

## Problem Statement
Standard frontend tables often rely on client-side array manipulation (`.filter()`, `.sort()`), which completely falls apart at scale. The architectural challenge of this project was to build a data grid that strict-mocks a real backend—handling all pagination, sorting, and filtering via URL parameters as if querying a live Postgres database, while providing native file export capabilities.

## Core Features
* **Enterprise Data Grid:** Paginated, sortable, and filterable table capable of handling large datasets without freezing the main UI thread.
* **Contextual Bulk Actions:** Smooth, animated (Framer Motion) bulk-action toolbar that overrides standard filters when multiple rows are selected.
* **Interactive Dashboard:** Top-level metric cards that aggregate total invoice values, paid statuses, and overdue warnings in real-time.
* **Instant Document Export:** Download selected rows directly to `.csv` or generate fully styled, line-item `.pdf` invoices directly in the browser.
* **Role-Based Access (RBAC):** UI elements (like "Mark Paid" or "Export") are conditionally rendered based on simulated user permission levels.

## System Architecture

* **Framework:** React 19 + TypeScript + Vite
* **Data Grid:** TanStack Table v8
* **State Management:** TanStack Query (Server State) + React Router (URL State)
* **Styling:** Tailwind CSS v4 + Framer Motion
* **Document Generation:** `jspdf` + `jspdf-autotable`

## Key Technical Implementations

* **URL-Driven State Management:** All table states (search queries, date ranges, sorting directions, and pagination) are tightly synced to the URL query string. This ensures that any specific view of the data can be bookmarked, shared, and navigated natively via the browser's back/forward buttons.
* **Server-Side Rendering Simulation:** TanStack Table is configured with `manualPagination` and `manualSorting` enabled. Instead of sorting data in the browser, the UI dispatches URL updates, triggering a TanStack Query refetch that simulates a database-level query with artificial network latency.
* **Optimistic UI & Cache Invalidation:** Bulk actions (like marking invoices as paid) utilize TanStack Query mutations. Upon success, the `['invoices']` cache is invalidated, automatically triggering a seamless background refetch to update the UI without manual state lifting.
* **Client-Side Blob Generation:** Implemented native browser `Blob` APIs to instantly generate and download formatted CSV exports from selected rows without requiring a backend round-trip.
* **Dynamic PDF Construction:** Utilized `jspdf` to paint custom, dynamically colored PDF invoices directly to the client's device, complete with striped line-item tables and calculated aggregate totals.
* **Role-Based Access Control (RBAC) Stub:** Designed a scalable `usePermissions` hook to gate UI actions based on simulated user roles, establishing a foundation that is ready for drop-in JWT authentication.
* **Denormalized Data Modeling:** Optimized the TypeScript invoice interfaces by denormalizing total amounts on the parent object. This allows for O(1) sorting operations on the simulated server rather than recursively computing line-item totals during render cycles.

## Project Structure (Separation of Concerns)
The application strictly enforces a rule where **components render** and **hooks/libraries compute**:

```text
src/
├── api/             # Simulated network layer and mutable in-memory database
├── components/      # UI Layer (Dashboard, InvoiceDetail, InvoiceTable)
├── hooks/           # Business logic (Filters synced to URL, Queries, Permissions)
├── lib/             # Pure math and utility functions (PDF generation, CSV parsing, Stats)
└── types/           # TypeScript interfaces (Invoice, LineItem, DashboardStats)

# Clone the repository
git clone [https://github.com/Shreyansh3108/BillCheck.git](https://github.com/Shreyansh3108/BillCheck.git)

# Navigate to the project directory
cd BillCheck

# Install dependencies
npm install

# Start the Vite development server
npm run dev
