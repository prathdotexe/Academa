import React from "react";
import { User, Award, Calendar, BookOpen, CreditCard, HelpCircle, ArrowUpRight } from "lucide-react";
import { StudentDetails } from "../types";

interface StudentDetailsCardProps {
  student: StudentDetails;
}

export default function StudentDetailsCard({ student }: StudentDetailsCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 p-6 lg:p-8 text-white shadow-xl animate-fade-in" id="student-hero-card">
      {/* Decorative vector shape background */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-orange-600/15 rounded-full blur-2xl" id="vector-shading" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-orange-500/10 rounded-full blur-2xl" id="vector-shading-left" />

      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6" id="student-card-inner">
        {/* Left section: Identity Column */}
        <div className="space-y-4" id="student-identity-col">
          <div className="flex items-center gap-3.5" id="faculty-pill">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-slate-200 border border-white/10 shadow-xs" id="pill-text">
              <Award className="w-3.5 h-3.5 text-orange-400" id="pill-icon" />
              {student.faculty || "Active Department"}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-500/25 border border-emerald-500/20 text-emerald-300 text-[10px] font-bold tracking-wider rounded-md uppercase" id="status-pill">
              Active Student
            </span>
          </div>

          <div className="space-y-1.5" id="student-name-box">
            <h1 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white" id="student-display-name">
              {student.name}
            </h1>
            <p className="font-mono text-xs sm:text-sm text-slate-400 tracking-wide flex items-center gap-2" id="student-id-display">
              <User className="w-4 h-4 text-slate-500" />
              STUDENT ID (ROLL NO.) <span className="text-orange-400 font-semibold">{student.studentId}</span>
            </p>
          </div>

          {/* Details Row: Responsive grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-2 text-slate-300" id="programme-specs">
            <div className="space-y-1" id="programme-box">
              <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-widest block">Course & Branch</span>
              <span className="text-sm font-medium text-slate-200 line-clamp-1" title={student.programme}>
                {student.programme}
              </span>
            </div>
            <div className="space-y-1" id="admission-box">
              <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-widest block">Admission Batch</span>
              <span className="text-sm font-medium text-slate-200 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-orange-400" /> {student.admissionSession}
              </span>
            </div>
          </div>
        </div>

        {/* Right section: Balance card container (Apple Wallet style) */}
        <div className="w-full md:w-auto md:min-w-[270px]" id="apple-wallet-wallet-balance">
          <div className="rounded-2xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-xl p-6 relative overflow-hidden" id="wallet-panel">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3" id="wallet-header">
              <span className="text-xs text-slate-400 flex items-center gap-1.5 font-semibold animate-pulse">
                <CreditCard className="w-4 h-4 text-slate-400" id="header-wallet-icon" /> Pending Fees Left To Pay
              </span>
              <span className="text-[10px] font-bold text-slate-400 bg-white/10 px-1.5 py-0.5 rounded-sm animate-pulse" id="ledger-type-badge">
                OFFICIAL DUES
              </span>
            </div>

            <div className="space-y-1.5" id="wallet-numeric-body">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Total Due Fees</p>
              <div className="flex items-baseline gap-1" id="balance-line">
                <span className="text-3xl lg:text-4.5xl font-display font-semibold tracking-tight text-white" id="main-balance-text">
                  ₹{student.overallBalance.toLocaleString("en-IN")}
                </span>
                <span className="text-xs font-bold text-rose-400 animate-pulse" id="dr-indicator">DUE</span>
              </div>
            </div>

            {/* Split detail: Academic vs Residential if they are non-zero */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/[0.05]" id="wallet-ledger-splits">
              <div id="split-academic">
                <p className="text-[9px] uppercase tracking-wider text-slate-500">Tuition Fee Due</p>
                <p className="text-xs font-medium text-slate-300">
                  ₹{student.academicBalance.toLocaleString("en-IN")}
                </p>
              </div>
              <div id="split-resid">
                <p className="text-[9px] uppercase tracking-wider text-slate-500">Hostel Fee Due</p>
                <p className="text-xs font-medium text-slate-300">
                  ₹{student.residentialBalance.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {student.overallBalance > 0 && (
              <a
                href="https://www.lpu.in/frmLoginAccounts.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-xl text-xs transition-all duration-200 shadow-xs cursor-pointer"
                id="quick-pay-btn"
              >
                Pay Due Fees Online (₹{student.overallBalance.toLocaleString("en-IN")}) <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
