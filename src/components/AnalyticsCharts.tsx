import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid
} from "recharts";
import { LedgerTransaction, SemesterAnalytics } from "../types";

interface AnalyticsChartsProps {
  transactions: LedgerTransaction[];
  semesterAnalytics: SemesterAnalytics[];
}

export default function AnalyticsCharts({ transactions, semesterAnalytics }: AnalyticsChartsProps) {
  const [chartMode, setChartMode] = useState<"payments" | "billed">("payments");
  // 1. Calculate category breakdown for Pie Chart
  const categoryBreakdown = useMemo(() => {
    const categoryMap: { [key: string]: number } = {};
    
    transactions.forEach((tx) => {
      // We list dues only, not credits/receipts
      if (tx.debit > 0 && tx.feeCategory !== "Opening Balance") {
        const category = tx.feeCategory;
        categoryMap[category] = (categoryMap[category] || 0) + tx.debit;
      }
    });

    return Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value
    })).sort((a, b) => b.value - a.value);
  }, [transactions]);

  // 2. Prepare trend data (payments vs due vs scholarships over academic years)
  const yearlyTrendData = useMemo(() => {
    const yearMap: { [key: string]: { due: number; paid: number; scholarship: number } } = {};

    transactions.forEach((tx) => {
      const year = tx.academicYear;
      if (!yearMap[year]) {
        yearMap[year] = { due: 0, paid: 0, scholarship: 0 };
      }

      if (tx.debit > 0 && tx.feeCategory !== "Opening Balance") {
        yearMap[year].due += tx.debit;
      } else if (tx.credit > 0) {
        if (tx.feeCategory === "Scholarship") {
          yearMap[year].scholarship += tx.credit;
        } else if (tx.feeCategory === "Payment") {
          yearMap[year].paid += tx.credit;
        }
      }
    });

    return Object.entries(yearMap).map(([year, values]) => ({
      year,
      ...values
    })).sort((a,b) => a.year.localeCompare(b.year));
  }, [transactions]);

  // 3. Compute per-semester fees paid like Academic vs Hostel & Mess vs Scholarship
  const parsedSemesterData = useMemo(() => {
    const termMap: {
      [term: string]: {
        term: string;
        academicCharges: number;
        messCharges: number;
        academicPayments: number;
        messPayments: number;
        scholarship: number;
      };
    } = {};

    transactions.forEach((tx) => {
      const term = tx.termNumber;
      if (!term) return;

      if (!termMap[term]) {
        termMap[term] = {
          term,
          academicCharges: 0,
          messCharges: 0,
          academicPayments: 0,
          messPayments: 0,
          scholarship: 0
        };
      }

      if (tx.debit > 0) {
        if (tx.feeCategory === "Residential Charges") {
          termMap[term].messCharges += tx.debit;
        } else if (tx.feeCategory !== "Opening Balance") {
          termMap[term].academicCharges += tx.debit;
        }
      } else if (tx.credit > 0) {
        if (tx.feeCategory === "Scholarship" || tx.feeCategory === "Adjustment") {
          termMap[term].scholarship += tx.credit;
        } else if (tx.feeCategory === "Payment") {
          const narr = tx.narration.toUpperCase();
          const isMess = narr.includes("RESIDENTIAL") || narr.includes("RD") || narr.includes("MC") || narr.includes("HOSTEL") || narr.includes("MESS") || narr.includes("ROOM") || narr.includes("RENT");
          if (isMess) {
            termMap[term].messPayments += tx.credit;
          } else {
            termMap[term].academicPayments += tx.credit;
          }
        }
      }
    });

    // We ensure standard Term 1 to 7 are present
    const standardTerms = ["Term 1", "Term 2", "Term 3", "Term 4", "Term 5", "Term 6", "Term 7"];
    standardTerms.forEach((k) => {
      if (!termMap[k]) {
        termMap[k] = {
          term: k,
          academicCharges: 0,
          messCharges: 0,
          academicPayments: 0,
          messPayments: 0,
          scholarship: 0
        };
      }
    });

    // Helper: Split annual hostel/room billing and payments across odd and even semesters of each year
    const applyAnnualSplits = (oddTerm: string, evenTerm: string) => {
      const odd = termMap[oddTerm];
      const even = termMap[evenTerm];
      if (odd && even) {
        // Find total annual charges and payments
        const totalAnnualMessCharge = odd.messCharges + even.messCharges;
        const totalAnnualMessPayment = odd.messPayments + even.messPayments;

        // Split them equally (50-50) between odd and even terms of that year!
        odd.messCharges = totalAnnualMessCharge / 2;
        even.messCharges = totalAnnualMessCharge / 2;

        odd.messPayments = totalAnnualMessPayment / 2;
        even.messPayments = totalAnnualMessPayment / 2;
      }
    };

    // Apply splits for each year (since Hostel is booked/paid annually, typically in the odd term)
    applyAnnualSplits("Term 1", "Term 2"); // Year 1
    applyAnnualSplits("Term 3", "Term 4"); // Year 2
    applyAnnualSplits("Term 5", "Term 6"); // Year 3

    let result = Object.values(termMap);

    // Sort terms
    result.sort((a, b) => a.term.localeCompare(b.term, undefined, { numeric: true, sensitivity: "base" }));

    // Fallback if transaction records are empty
    if (transactions.length === 0 && semesterAnalytics && semesterAnalytics.length > 0) {
      return semesterAnalytics.map((sa) => {
        const termName = sa.term;
        let messEstCharge = 0;
        let messEstPayment = 0;
        let acadEstCharge = sa.totalDue;
        let acadEstPayment = sa.totalPaid;

        if (termName.includes("Term 1") || termName.includes("Term 2")) {
          messEstCharge = 55000;
          messEstPayment = 47000;
          acadEstCharge = sa.totalDue - (termName.includes("Term 1") ? 110000 : 0);
          acadEstPayment = sa.totalPaid - (termName.includes("Term 1") ? 94000 : 0);
        } else if (termName.includes("Term 3") || termName.includes("Term 4")) {
          messEstCharge = 45000;
          messEstPayment = 40000;
          acadEstCharge = sa.totalDue - (termName.includes("Term 3") ? 90000 : 0);
          acadEstPayment = sa.totalPaid - (termName.includes("Term 3") ? 80000 : 0);
        } else if (termName.includes("Term 5") || termName.includes("Term 6")) {
          messEstCharge = 45000;
          messEstPayment = 40000;
          acadEstCharge = sa.totalDue - (termName.includes("Term 5") ? 90000 : 0);
          acadEstPayment = sa.totalPaid - (termName.includes("Term 5") ? 80000 : 0);
        }

        return {
          term: termName,
          academicCharges: Math.max(0, acadEstCharge),
          messCharges: messEstCharge,
          academicPayments: Math.max(0, acadEstPayment),
          messPayments: messEstPayment,
          scholarship: sa.totalScholarship
        };
      });
    }

    return result;
  }, [transactions, semesterAnalytics]);

  // Beautiful Soft LPU Orange & Amber Accent Colours
  const PIE_COLORS = ["#EA580C", "#F59E0B", "#10B981", "#0EA5E9", "#EF4444", "#64748B"];

  // Custom Chart Tooltips
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 border border-slate-100 shadow-xl" id="custom-pie-tooltip">
          <p className="text-xs font-bold text-slate-800 font-display mb-1.5">{label || payload[0].name}</p>
          <div className="space-y-1" id="tooltip-item-col">
            {payload.map((item: any, idx: number) => (
              <div key={idx} className="flex items-center gap-2 text-xs" id="tooltip-item">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color || item.fill }} id="tooltip-dot" />
                <span className="text-slate-500 font-medium">{item.name}:</span>
                <span className="text-slate-900 font-bold font-mono">₹{item.value.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="charts-main-panel">
      {/* 1. Semester-Wise Balance Analytics BarChart */}
      <div className="glass-panel p-6 rounded-3xl" id="semester-bar-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4" id="bar-header-row">
          <div id="bar-header">
            <h3 className="font-display font-semibold text-lg text-slate-900" id="bar-title">Semester Fee Breakdown</h3>
            <p className="text-xs text-slate-400 font-medium font-sans" id="bar-desc">
              {chartMode === "payments" 
                ? "Direct student payments and scholarship credits registered"
                : "Academic tuition fee invoices and hostel rent bills charged"}
            </p>
          </div>

          <div className="flex bg-slate-100 rounded-xl p-1 shrink-0 self-start sm:self-center" id="chart-tab-group">
            <button
              onClick={() => setChartMode("payments")}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                chartMode === "payments"
                  ? "bg-white text-orange-600 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              id="btn-tab-payments"
            >
              Payments & Saved
            </button>
            <button
              onClick={() => setChartMode("billed")}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                chartMode === "billed"
                  ? "bg-white text-orange-600 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              id="btn-tab-billed"
            >
              Bills Charged
            </button>
          </div>
        </div>

        <div className="h-[250px] sm:h-[280px]" id="bar-responsive-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={parsedSemesterData}
              margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis 
                dataKey="term" 
                stroke="#94A3B8" 
                fontSize={9} 
                tickLine={false} 
                axisLine={false}
              />
              <YAxis 
                stroke="#94A3B8" 
                fontSize={9} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `₹${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top" 
                height={36} 
                iconType="circle" 
                iconSize={8}
                wrapperStyle={{ fontSize: 10, fontWeight: 500, color: "#64748B" }}
              />
              {chartMode === "payments" ? (
                <>
                  <Bar name="Academic Fees Paid" dataKey="academicPayments" fill="#EA580C" stackId="a" radius={[0, 0, 0, 0]} barSize={16} />
                  <Bar name="Hostel & Mess Paid" dataKey="messPayments" fill="#F59E0B" stackId="a" radius={[0, 0, 0, 0]} barSize={16} />
                  <Bar name="Scholarship Credit" dataKey="scholarship" fill="#10B981" stackId="a" radius={[4, 4, 0, 0]} barSize={16} />
                </>
              ) : (
                <>
                  <Bar name="Academic Fees Billed" dataKey="academicCharges" fill="#EA580C" stackId="a" radius={[0, 0, 0, 0]} barSize={16} />
                  <Bar name="Hostel & Room Billed" dataKey="messCharges" fill="#F59E0B" stackId="a" radius={[4, 4, 0, 0]} barSize={16} />
                </>
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Category Breakdown Pie Chart */}
      <div className="glass-panel p-6 rounded-3xl" id="pie-card">
        <div className="mb-4" id="pie-header">
          <h3 className="font-display font-semibold text-lg text-slate-900" id="pie-title">Where is Your Money Going?</h3>
          <p className="text-xs text-slate-400" id="pie-desc">Simple breakdown of all charges billed by the college</p>
        </div>

        <div className="min-h-[380px] sm:min-h-0 sm:h-[280px] flex flex-col sm:flex-row items-center justify-between gap-4 py-2" id="pie-responsive-container">
          <div className="w-full sm:w-1/2 h-[180px] sm:h-[220px] shrink-0" id="pie-inner-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Custom Custom Legend that works beautifully on dynamic mobile stacks */}
          <div className="w-full sm:w-1/2 flex flex-col gap-2 px-1 sm:px-4" id="legend-side-box">
            {categoryBreakdown.map((item, index) => {
              const percentage = ((item.value / categoryBreakdown.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(1);
              return (
                <div key={item.name} className="flex items-center justify-between text-xs font-semibold" id={`legend-item-${index}`}>
                  <div className="flex items-center gap-2 max-w-[60%] sm:max-w-none" id="legend-label">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }} />
                    <span className="text-slate-600 truncate text-[11px]" title={item.name}>{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0" id="legend-vals">
                    <span className="text-slate-400 font-normal text-[10px]">{percentage}%</span>
                    <span className="text-slate-800 font-bold font-mono text-[11px]">₹{item.value.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
