import React, { useState, useMemo } from "react";
import { LedgerTransaction } from "../types";
import { Search, Download, Filter, ChevronLeft, ChevronRight, CornerDownRight } from "lucide-react";

interface TransactionListProps {
  transactions: LedgerTransaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTerm, setSelectedTerm] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All"); // "All", "Debit", "Credit"
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // 1. Categories list for dropdown
  const categories = useMemo(() => {
    const list = new Set(transactions.map((tx) => tx.feeCategory));
    return ["All", ...Array.from(list)];
  }, [transactions]);

  // 2. Terms list for dropdown
  const terms = useMemo(() => {
    const list = new Set(transactions.map((tx) => tx.termNumber));
    return ["All", ...Array.from(list)];
  }, [transactions]);

  // 3. Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.narration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.vNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.date.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || tx.feeCategory === selectedCategory;
      const matchesTerm = selectedTerm === "All" || tx.termNumber === selectedTerm;
      const matchesType =
        selectedType === "All" ||
        (selectedType === "Debit" && tx.debit > 0) ||
        (selectedType === "Credit" && tx.credit > 0);

      return matchesSearch && matchesCategory && matchesTerm && matchesType;
    });
  }, [transactions, searchTerm, selectedCategory, selectedTerm, selectedType]);

  // 4. Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(start, start + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 5. CSV Export function
  const handleExportCSV = () => {
    const headers = ["Date", "VNo", "Narration", "Debit (INR)", "Credit (INR)", "Running Balance (INR)", "Type", "Category", "Academic Year", "Term"];
    const csvRows = [headers.join(",")];

    filteredTransactions.forEach((tx) => {
      const row = [
        tx.date,
        `"${tx.vNo.replace(/"/g, '""')}"`,
        `"${tx.narration.replace(/"/g, '""')}"`,
        tx.debit,
        tx.credit,
        tx.balance,
        tx.transactionType,
        tx.feeCategory,
        tx.academicYear,
        tx.termNumber
      ];
      csvRows.push(row.join(","));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `student_ledger_statement_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get color values for categories dynamically to show sleek badges
  const getCategoryBadgeClass = (category: string) => {
    const base = "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border";
    switch (category) {
      case "Tuition Fee":
        return `${base} bg-orange-50 border-orange-100 text-orange-700`;
      case "Residential Charges":
        return `${base} bg-sky-50 border-sky-100 text-sky-700`;
      case "Exam Fee":
        return `${base} bg-amber-50 border-amber-100 text-amber-700`;
      case "Scholarship":
        return `${base} bg-purple-50 border-purple-100 text-purple-700`;
      case "Payment":
        return `${base} bg-emerald-50 border-emerald-100 text-emerald-700`;
      case "Fine/Late Fee":
        return `${base} bg-red-50 border-red-100 text-red-700`;
      case "Opening Balance":
        return `${base} bg-slate-100 border-slate-200 text-slate-700`;
      default:
        return `${base} bg-slate-50 border-slate-100 text-slate-600`;
    }
  };

  return (
    <div className="glass-panel rounded-3xl overflow-hidden" id="tx-explorer-panel">
      {/* Search & Dynamic Filter Actions Header */}
      <div className="p-6 border-b border-white/[0.25] space-y-4" id="explorer-header">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4" id="header-action-row">
          <div id="explorer-title-box">
            <h3 className="font-display font-semibold text-lg text-slate-900" id="explorer-title">Detailed Bill List</h3>
            <p className="text-xs text-slate-400" id="explorer-desc">Search, sort, and download your college billing details</p>
          </div>
          
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm transition-all print:hidden"
            id="export-csv-btn"
          >
            <Download className="w-3.5 h-3.5" id="download-tx-icon" /> Download Excel/CSV List
          </button>
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 print:hidden" id="grid-filters-row">
          {/* Keyword Search */}
          <div className="relative" id="filter-search-box">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" id="search-sub-icon" />
            <input
              type="text"
              placeholder="Search description, date, or code..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 pr-4 py-2 w-full bg-white/50 border border-slate-200 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-slate-700"
              id="search-input"
            />
          </div>

          {/* Category Dropdown */}
          <div id="filter-category-box">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="py-2 px-3 w-full bg-white/50 border border-slate-200 text-xs rounded-xl focus:outline-none text-slate-600"
              id="category-dropdown"
            >
              <option value="All">All Categories</option>
              {categories.filter(c => c !== "All").map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Term Dropdown */}
          <div id="filter-term-box">
            <select
              value={selectedTerm}
              onChange={(e) => {
                setSelectedTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="py-2 px-3 w-full bg-white/50 border border-slate-200 text-xs rounded-xl focus:outline-none text-slate-600"
              id="term-dropdown"
            >
              <option value="All">All Semesters</option>
              {terms.filter(t => t !== "All").map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Type Selector (Debit vs Credit) */}
          <div id="filter-type-box">
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentPage(1);
              }}
              className="py-2 px-3 w-full bg-white/50 border border-slate-200 text-xs rounded-xl focus:outline-none text-slate-600"
              id="type-dropdown"
            >
              <option value="All">All Transactions</option>
              <option value="Debit">University Charges Only</option>
              <option value="Credit">Your Payments & Discounts Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Responsive Table */}
      <div className="overflow-x-auto w-full print:hidden" id="table-scroll-container">
        <table className="w-full text-left border-collapse" id="ledger-table">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500 sticky top-0" id="table-head-row">
              <th className="py-3 px-4" id="th-date">Date</th>
              <th className="py-3 px-4" id="th-vno">Billing Code</th>
              <th className="py-3 px-4 min-w-[200px]" id="th-narration">Description</th>
              <th className="py-3 px-4 text-right" id="th-debit">Fees Charged (₹)</th>
              <th className="py-3 px-4 text-right" id="th-credit">Paid / Discount (₹)</th>
              <th className="py-3 px-4 text-right font-semibold" id="th-balance">Balance Left (₹)</th>
              <th className="py-3 px-4 text-center" id="th-category">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-600 font-medium" id="table-body">
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((tx, index) => (
                <tr
                  key={`${tx.vNo}-${index}`}
                  className={`hover:bg-orange-50/20 transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-white/40" : "bg-slate-50/20"
                  }`}
                  id={`row-${index}`}
                >
                  <td className="py-3.5 px-4 font-mono font-normal text-slate-400" id={`tx-date-${index}`}>
                    {tx.date}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-700 tracking-tight" id={`tx-vno-${index}`}>
                    {tx.vNo}
                  </td>
                  <td className="py-3.5 px-4 max-w-[340px]" id={`tx-narr-${index}`}>
                    <div id="narr-cell-inner">
                      <p className="text-slate-900 font-semibold mb-0.5 line-clamp-2" title={tx.narration}>
                        {tx.narration}
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono" id="tx-meta">
                        <span>{tx.academicYear}</span>
                        <span>•</span>
                        <span className="text-orange-500 font-bold">{tx.termNumber}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono" id={`tx-deb-${index}`}>
                    {tx.debit > 0 ? (
                      <span className="text-rose-600 font-semibold">₹{tx.debit.toLocaleString("en-IN")}</span>
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono" id={`tx-cred-${index}`}>
                    {tx.credit > 0 ? (
                      <span className="text-emerald-600 font-semibold">₹{tx.credit.toLocaleString("en-IN")}</span>
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-slate-800" id={`tx-bal-${index}`}>
                    <div className="flex items-center justify-end gap-1" id="running-balance-cell">
                      <span className="font-bold">₹{tx.balance.toLocaleString("en-IN")}</span>
                      <span className={`text-[9px] font-bold ${tx.balanceType === 'DR' ? 'text-rose-500' : tx.balanceType === 'CR' ? 'text-emerald-500' : 'text-slate-300'}`}>
                        {tx.balanceType}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center" id={`tx-cat-${index}`}>
                    <span className={getCategoryBadgeClass(tx.feeCategory)} id="class-tag">
                      {tx.feeCategory}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr id="empty-results-row">
                <td colSpan={7} className="py-12 px-4 text-center text-slate-400 text-sm" id="empty-state-cell">
                  No ledger results match the current filters. Clear filters to reset.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Complete Print-Only Ledger Table (Hides on screen, prints completely on physical sheets) */}
      <div className="hidden print:block w-full border border-slate-200 rounded-2xl overflow-hidden mt-4" id="tx-print-table-container">
        <table className="w-full text-left border-collapse text-xs" id="print-ledger-table">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-700" id="print-table-head">
              <th className="py-2.5 px-3">Date</th>
              <th className="py-2.5 px-3">Billing Code</th>
              <th className="py-2.5 px-3">Description</th>
              <th className="py-2.5 px-3 text-right">Fee Charged (₹)</th>
              <th className="py-2.5 px-3 text-right">Paid / Discount (₹)</th>
              <th className="py-2.5 px-3 text-right font-semibold">Running Balance (₹)</th>
              <th className="py-2.5 px-3 text-center">Category</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
            {filteredTransactions.map((tx, idx) => (
              <tr key={`${tx.vNo}-${idx}`} className="bg-white">
                <td className="py-2 px-3 font-mono text-slate-500 whitespace-nowrap">{tx.date}</td>
                <td className="py-2 px-3 font-mono text-[10px] text-slate-600">{tx.vNo}</td>
                <td className="py-2 px-3">
                  <div>
                    <p className="font-semibold text-slate-900 leading-tight">{tx.narration}</p>
                    <span className="text-[9px] text-slate-400 font-mono">{tx.academicYear} • {tx.termNumber}</span>
                  </div>
                </td>
                <td className="py-2 px-3 text-right font-mono text-rose-600 font-medium whitespace-nowrap">
                  {tx.debit > 0 ? `₹${tx.debit.toLocaleString("en-IN")}` : "-"}
                </td>
                <td className="py-2 px-3 text-right font-mono text-emerald-600 font-medium whitespace-nowrap">
                  {tx.credit > 0 ? `₹${tx.credit.toLocaleString("en-IN")}` : "-"}
                </td>
                <td className="py-2 px-3 text-right font-mono text-slate-900 font-bold whitespace-nowrap">
                  ₹{tx.balance.toLocaleString("en-IN")} <span className="text-[9px]">{tx.balanceType}</span>
                </td>
                <td className="py-2 px-3 text-center text-[10px] font-semibold text-slate-600">{tx.feeCategory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between print:hidden" id="tx-pagination-footer">
          <span className="text-xs text-slate-400 font-medium" id="pagination-indicator">
            Showing <span className="font-semibold text-slate-600">{filteredTransactions.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to{" "}
            <span className="font-semibold text-slate-600">
              {Math.min(currentPage * itemsPerPage, filteredTransactions.length)}
            </span>{" "}
            of <span className="font-semibold text-slate-600">{filteredTransactions.length}</span> records
          </span>

          <div className="flex items-center gap-2" id="pagination-buttons">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              id="prev-btn"
            >
              <ChevronLeft className="w-4 h-4" id="chevron-left-icon" />
            </button>
            <span className="text-xs text-slate-500 font-bold" id="page-indicator">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              id="next-btn"
            >
              <ChevronRight className="w-4 h-4" id="chevron-right-icon" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
