# Academa 🎓
### LPU Student Statement of Accounts & Fee Analytics Workspace

Academa is a highly polished, interactive full-stack student financial workspace specifically designed for students of Lovely Professional University (LPU). It allows users to parse, visualizes, and analyze official PDF "Statement of Accounts" ledgers. Built with a responsive, modern Bento-grid design inspired by high-end financial platforms, Academa translates dense, confusing university transaction histories into clear visual stories.

---

## 🎨 Visual Identity & Theme
Academa utilizes a bespoke **LPU Alumni Sunset** color palette:
*   **Dominant Tones**: Deep Slate Grays and Off-Whites (`#F6F8FB`) form the ultra-clean negative space canvas.
*   **Accents**: Warm LPU Orange (`#EA580C`/`#F97316`) and Vibrant Amber/Gold represent brand identity, paired with Emerald Green (`#10B981`) for discount/savings credits.
*   **Typography**: Clean sans-serif headings for high-density legibility, paired with spaced monospaced font codes (`JetBrains Mono`) for transaction details, currency values, and billing identifiers.

---

## ✨ Key Features & Functionality

### 📁 1. Intelligent PDF Statement Parser
*   **Interactive Drag & Drop**: Drop an official PDF statement directly into the secure upload interface or choose it manually.
*   **Zero-Config Demo Playground**: Access the workspace immediately with one click using our high-fidelity, verified LPU mock client profile.
*   **Secure Client-Side Safe Engine**: All confidential accounts are kept secure from outer servers.

### 💾 2. Local State Persistence (Auto-Save)
*   **Session Continuity**: Never lose parsed data details. Academa automatically serializes the last parsed student portfolio to `localStorage`.
*   **Instant Load**: Re-opening or refreshing the page instantly boots up your last analyzed workspace without requiring you to re-upload.

### 📊 3. Modern Bento Financial Analytics
*   **KPI Summary Metric Panels**: Display total college fee bills, hostel/mess rent charges, total scholarship savings, and outstanding net balances with precise Indian Rupee (₹) localization.
*   **Dual-Mode Academic Bar Chart**: Toggle effortlessly between:
    *   *Payments & Saved*: Total student payments and scholarship credit registrations.
    *   *Bills Charged*: Invoiced tuition dues versus residential hostel rentals.
*   **Categorized Expense Donut Chart**: Hover-sensitive pie chart breaking down custom university billing slices (Tuition, Residential, Examination, etc.) with custom percentages.
*   **Responsive View Optimization**: Charts auto-resize and stack perfectly, preventing layout clipping regardless of screen size.

### 🔍 4. High-Density Transaction Ledger
*   **Comprehensive Multi-Field Filter**: Perform rapid desktop search by:
    *   *Keyword Queries*: Description narratives, specific billing dates (`DD-MM-YYYY`), or official Voucher Numbers.
    *   *Structural Filters*: Select specific semesters (*Term 1* to *Term 7*), fee categories, or ledger directions (*Debits/Charges* or *Credits/Payments*).
*   **Indian Numerical Formatting**: Every numeric entry is localized for easier readability.

### ✉️ 5. Instant Share via Email
*   **Dynamic Summary Digest**: Automatically generates a structured, plain-text financial report.
*   **Pre-Formatted Mailto Link**: One click opens your system’s default mail app (such as Microsoft Outlook, Apple Mail, or Gmail) with a fully populated student report, perfect for sharing with family, sponsors, or campus boards.

### 🖨️ 6. High-Fidelity Printable Reporting (A4 Layout)
*   **Interactive Media Queries**: Press `Ctrl+P` or click **Print Report** to trigger a customized print template stylesheet.
*   **Automated Clean-Up**: Non-essential controls (search inputs, buttons, sliders, filter grids, pagination rails, floating menus) disappear.
*   **Optimized Contrast**: Saturated gradient cards convert into minimalist border blocks, and interactive scrollable tables stretch out completely to print transaction histories seamlessly across multiple pages without cropping.

### 📱 7. Mobile Navigation Quick-Action Panel (FAB)
*   **Floating Action Button (FAB)**: A responsive, elegant action wheel sits in the lower corner of visual screens on mobile.
*   **Smart Access Shortcuts**: Tap to instantly toggle *Email Share*, *Print Full Report*, or *Upload New Statement* without having to scroll through long transaction tables.

---

## 🛠️ Project Structure
*   `src/App.tsx`: Central application state machine orchestrating data workflows, Fab toggles, and email generation mechanisms.
*   `src/components/UploadZone.tsx`: Handles PDF file drop states, validation tracking, analysis animations, and sample playground data boots.
*   `src/components/MetricCards.tsx`: Top horizontal row displaying key financial indicators.
*   `src/components/AnalyticsCharts.tsx`: Contains Recharts charts (the categorical donut plot and stacked semester-wise balance comparison graph).
*   `src/components/TransactionList.tsx`: High-performance searchable and paginated datagrid ledger with optimized print table renders.
*   `src/components/InsightsPanel.tsx`: Gemini-powered smart textual insights summarizing dues, scholarship benefits, and custom payment advice.
*   `src/index.css`: Contains custom CSS animations, Tailwind variables, scrollbar customizers, and high-fidelity media overrides for physical printing.

---

## 🚀 Installation & Local Development

### 1. Prerequisites
Ensure you have node environment installed in your developer machine:
```bash
node -v  # Recommended Node 18+
npm -v   # Recommended NPM 9+
```

### 2. Setup Dependencies
From your project terminal, execute the following command:
```bash
npm install
```

### 3. Star Dev Server
Boots up the local server with hot reload capabilities:
```bash
npm run dev
```
Open your modern browser and navigate to `http://localhost:3000` to interact with the workspace.

### 4. Build for Production
Stitches, minifies, and bundles assets:
```bash
npm run build
```
The compiled output is located under `/dist` and serves index.html flawlessly.
