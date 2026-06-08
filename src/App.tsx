import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SAMPLE_STATEMENT_DATA } from "./sampleData";
import { StatementData } from "./types";
import StudentDetailsCard from "./components/StudentDetailsCard";
import MetricCards from "./components/MetricCards";
import AnalyticsCharts from "./components/AnalyticsCharts";
import TransactionList from "./components/TransactionList";
import InsightsPanel from "./components/InsightsPanel";
import UploadZone from "./components/UploadZone";
import { Shield, Sparkles, LogOut, Code, GraduationCap, CheckCircle2, Printer, Mail, X, Plus } from "lucide-react";

export default function App() {
  const [statementData, setStatementData] = useState<StatementData | null>(() => {
    try {
      const saved = localStorage.getItem("academa_statement_cache");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error("Error reading saved statement from localStorage:", e);
      return null;
    }
  });
  
  const [isFabOpen, setIsFabOpen] = useState(false);

  useEffect(() => {
    try {
      if (statementData) {
        localStorage.setItem("academa_statement_cache", JSON.stringify(statementData));
      } else {
        localStorage.removeItem("academa_statement_cache");
      }
    } catch (e) {
      console.error("Error saving statement to localStorage:", e);
    }
  }, [statementData]);

  const handleParsed = (data: StatementData) => {
    setStatementData(data);
  };

  const handleUseSample = () => {
    // Instantly load high fidelity LPU sample parsed ledger to experience bento dashboard
    setStatementData(SAMPLE_STATEMENT_DATA);
  };

  const handleReset = () => {
    setStatementData(null);
  };

  const handleEmailShare = () => {
    if (!statementData) return;
    const { student, summary } = statementData;
    const subject = encodeURIComponent(`LPU Student Fee Tracker Summary - ${student.name}`);
    
    const bodyText = `LPU Student Fee Tracker Report Summary
----------------------------------------
Student Name: ${student.name}
Student ID: ${student.studentId}
Programme: ${student.programme}
Faculty/Department: ${student.faculty}

--- FINANCIAL OVERVIEW ---
Total Fee Billed: ₹${summary.totalDue.toLocaleString("en-IN")}
Scholarship Savings: ₹${summary.totalScholarship.toLocaleString("en-IN")}
Hostel & Mess Billed: ₹${summary.totalHostel.toLocaleString("en-IN")}
Exam Fees Billed: ₹${summary.totalExam.toLocaleString("en-IN")}
Total Received Payment: ₹${summary.totalPaid.toLocaleString("en-IN")}

--- OUTSTANDING STATUS ---
${summary.pendingBalance > 0 ? `⚠️ Outstanding Balance: ₹${summary.pendingBalance.toLocaleString("en-IN")} (Please process outstanding dues in university portals)` : "✅ Outstanding Balance: ₹0 (No pending dues detected)!"}

This digest message of fee records has been prepared via LPU Simple Fee Tracker.
Thank you!`;

    const mailtoUrl = `mailto:?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="min-h-screen bg-[#F6F8FB] flex flex-col font-sans selection:bg-orange-500 selection:text-white" id="root-layout-wrapper">
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#F6F8FB]/80 backdrop-blur-md border-b border-slate-100 px-4 sm:px-6 lg:px-8 py-3.5" id="nav-header">
        <div className="max-w-7xl mx-auto flex items-center justify-between" id="header-container">
          <div className="flex items-center gap-2.5" id="brand-box">
            <div className="p-2 bg-orange-600 text-white rounded-xl shadow-xs" id="logo-icon-container">
              <GraduationCap className="w-5 h-5" id="navbar-main-cap" />
            </div>
            <div id="brand-titles">
              <span className="font-display font-bold text-sm sm:text-base text-slate-900 tracking-tight block leading-none">
                Academa
              </span>
              <span className="text-[10px] text-orange-600 font-bold block mt-1">
                LPU Student Fee Tracker
              </span>
            </div>
          </div>
 
          <div className="flex items-center gap-2" id="header-actions">
            {statementData ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 bg-white shadow-2xs rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200"
                id="reset-statement-btn"
              >
                <LogOut className="w-3.5 h-3.5" /> Upload New Statement
              </motion.button>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-100 text-orange-700 text-[10px] font-bold tracking-tight rounded-full" id="ready-tag">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" id="header-sparkle" /> AGENT CODER ACTIVE
              </span>
            )}
          </div>
        </div>
      </header>

      {/* 2. Main Content Canvas */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="layout-body">
        <AnimatePresence mode="wait">
          {!statementData ? (
            <motion.div
              key="upload-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center items-center py-6 sm:py-12"
              id="upload-grid-container"
            >
              <UploadZone
                onParsed={handleParsed}
                onUseSample={handleUseSample}
              />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
              id="bento-dashboard-workspace"
            >
              {/* Elegant Document Header for Printed Sheets */}
              <div className="hidden print:flex flex-row items-center justify-between border-b border-slate-300 pb-4 mb-6" id="print-document-brand-header">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-900 text-white rounded-xl shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900">LPU Simple Fee Tracker Report</h1>
                    <p className="text-[10px] text-slate-500 font-semibold tracking-wide uppercase">Official Study Finance Statement & Analysis Portfolio</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-mono uppercase font-bold tracking-widest text-slate-400">Statement Date</p>
                  <p className="text-xs font-bold text-slate-800">{new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3" id="doc-integrity-box">
                <div id="active-dataset-meta">
                  <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-1.5" id="ledger-title-nav">
                    Your Student Billing Workspace <span className="text-[11px] font-mono font-medium text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full uppercase print:hidden">Verified</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1" id="ledger-desc-nav">
                    Simple breakdown and overview of college fees, hostel rent, and payments
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start sm:self-center print:hidden" id="dashboard-action-buttons">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleEmailShare}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white shadow-xs hover:shadow-md transition-all rounded-xl text-xs font-semibold cursor-pointer"
                    id="share-email-action-btn"
                  >
                    <Mail className="w-4 h-4" /> Share via Email
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white shadow-xs hover:shadow-md transition-all rounded-xl text-xs font-semibold cursor-pointer"
                    id="print-report-action-btn"
                  >
                    <Printer className="w-4 h-4" /> Print Report
                  </motion.button>

                  {/* Integration Verification Stamp */}
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-xl border border-emerald-100" id="sec-audit-stamp">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" id="check-stamp-icon" /> Checked & Verified by AI
                  </div>
                </div>
              </div>

              {/* Bento Row 1: Student Profile Big Banner */}
              <StudentDetailsCard student={statementData.student} />

              {/* Bento Row 2: Analytics Cards Grid */}
              <MetricCards summary={statementData.summary} transactions={statementData.transactions} />

              {/* Bento Row 3: AI Ledger Learnings & Observations */}
              <InsightsPanel insights={statementData.insights} />

              {/* Bento Row 4: Interactive Charts and Categorization Graphs */}
              <AnalyticsCharts
                transactions={statementData.transactions}
                semesterAnalytics={statementData.semesterAnalytics}
              />

              {/* Bento Row 5: Normalized Searchable Table Explorer */}
              <TransactionList transactions={statementData.transactions} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. Footer branding info */}
      <footer className="w-full bg-white border-t border-slate-100 py-6 px-4 sm:px-6 lg:px-8 text-center" id="nav-footer">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium" id="footer-inner">
          <p id="copyright-brand">
            Simple LPU College Fee Statements & Easy Tracker for Parents.
          </p>
          <div className="flex items-center gap-3" id="brand-disclaimer-wrapper">
            <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full text-[10px] text-slate-500 font-mono" id="engine-info">
              <Shield className="w-3.5 h-3.5 text-slate-400" /> SECURED AND PRIVATE
            </span>
          </div>
        </div>
      </footer>

      {/* Mobile Floating Quick Actions Menu */}
      {statementData && (
        <div className="fixed bottom-6 right-6 z-50 sm:hidden print:hidden flex flex-col items-end gap-3" id="mobile-quick-actions-fab">
          {/* Backdrop Overlay when Menu is Open */}
          {isFabOpen && (
            <div 
              className="fixed inset-0 bg-slate-950/20 backdrop-blur-xs z-40" 
              onClick={() => setIsFabOpen(false)}
              id="fab-backdrop-overlay"
            />
          )}

          {/* Quick Actions Panel */}
          <AnimatePresence>
            {isFabOpen && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.92 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="relative z-50 bg-slate-900 border border-slate-800 text-white rounded-2xl p-3 shadow-xl flex flex-col gap-1.5 min-w-[210px] mr-1"
                id="fab-actions-popup"
              >
                <div className="px-3.5 py-1 border-b border-slate-800 mb-1" id="fab-header-meta">
                  <p className="text-[9px] font-bold text-orange-500 uppercase tracking-wider">Quick Actions</p>
                </div>
                
                <button
                  onClick={() => {
                    handleEmailShare();
                    setIsFabOpen(false);
                  }}
                  className="flex items-center gap-2.5 px-3 py-2 w-full text-xs font-semibold hover:bg-slate-800 text-slate-100 rounded-xl transition-all text-left cursor-pointer"
                  id="fab-btn-share-email"
                >
                  <div className="p-1.5 bg-orange-500/10 text-orange-400 rounded-lg">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  Share via Email
                </button>
                
                <button
                  onClick={() => {
                    setIsFabOpen(false);
                    setTimeout(() => window.print(), 200);
                  }}
                  className="flex items-center gap-2.5 px-3 py-2 w-full text-xs font-semibold hover:bg-slate-800 text-slate-100 rounded-xl transition-all text-left cursor-pointer"
                  id="fab-btn-print-report"
                >
                  <div className="p-1.5 bg-slate-800 text-slate-300 rounded-lg">
                    <Printer className="w-3.5 h-3.5" />
                  </div>
                  Print Full Report
                </button>
                
                <button
                  onClick={() => {
                    handleReset();
                    setIsFabOpen(false);
                  }}
                  className="flex items-center gap-2.5 px-3 py-2 w-full text-xs font-semibold hover:bg-slate-800 text-rose-400 rounded-xl transition-all text-left cursor-pointer border-t border-slate-800 mt-1 pt-2.5"
                  id="fab-btn-upload-new"
                >
                  <div className="p-1.5 bg-rose-500/10 text-rose-400 rounded-lg">
                    <LogOut className="w-3.5 h-3.5" />
                  </div>
                  Upload New Statement
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Core Toggle Action Button (FAB) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFabOpen(!isFabOpen)}
            className="relative z-50 p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg flex items-center justify-center cursor-pointer border border-orange-500 hover:border-orange-600 transition-colors"
            id="fab-trigger"
            aria-label="Toggle Quick Navigation Shortcuts"
          >
            <motion.div
              animate={{ rotate: isFabOpen ? 135 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
              id="fab-icon-wrapper"
            >
              <Plus className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </div>
      )}
    </div>
  );
}
