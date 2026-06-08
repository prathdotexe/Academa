import React, { useState } from "react";
import { FinancialSummary, LedgerTransaction } from "../types";
import { ArrowUpRight, ArrowDownRight, Award, ShieldAlert, BookOpen, Home, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardsProps {
  summary: FinancialSummary;
  transactions?: LedgerTransaction[];
}

export default function MetricCards({ summary, transactions = [] }: MetricCardsProps) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Dynamically compute the chronological 3-term ending balance trend 
  const trendData = React.useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return [
        { term: "Term 5", balance: 0, x: 10, y: 25 },
        { term: "Term 6", balance: 0, x: 50, y: 25 },
        { term: "Term 7", balance: summary.pendingBalance, x: 90, y: 5 }
      ];
    }

    const termLastBalance: { [term: string]: number } = {};
    transactions.forEach((tx) => {
      // Find the last known transaction balance for each term to get its ending state
      termLastBalance[tx.termNumber] = tx.balance;
    });

    const termsSorted = Object.keys(termLastBalance).sort((a, b) => {
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });

    // Take last 3 terms
    const last3Terms = termsSorted.slice(-3);
    while (last3Terms.length < 3) {
      const firstNum = last3Terms.length > 0 ? parseInt(last3Terms[0].replace(/\D/g, "")) : 1;
      const prevTermNum = Math.max(1, firstNum - 1);
      last3Terms.unshift(`Term ${prevTermNum}`);
    }

    const balances = last3Terms.map(term => termLastBalance[term] || 0);
    const maxVal = Math.max(...balances, 1000);

    return last3Terms.map((term, idx) => {
      const balance = termLastBalance[term] || 0;
      const ratio = maxVal > 0 ? balance / maxVal : 0;
      const y = 25 - (ratio * 20); // map from y=5 to y=25 on SVG viewport
      return {
        term,
        balance,
        x: 10 + (idx * 40), // 10, 50, 90
        y
      };
    });
  }, [transactions, summary.pendingBalance]);

  // Determine trend arrow status based on last term balance vs second-last term balance
  const hasTrendUp = trendData.length >= 2 && trendData[trendData.length - 1].balance > trendData[trendData.length - 2].balance;
  const hasTrendDown = trendData.length >= 2 && trendData[trendData.length - 1].balance < trendData[trendData.length - 2].balance;

  const cards = [
    {
      id: "total-due",
      title: "Total Fees Charged",
      value: `₹${summary.totalDue.toLocaleString("en-IN")}`,
      icon: ArrowUpRight,
      iconColor: "text-orange-600 bg-orange-50/60 border border-orange-100/50",
      description: "All bills sent by the college so far"
    },
    {
      id: "total-paid",
      title: "Fees Paid Already",
      value: `₹${summary.totalPaid.toLocaleString("en-IN")}`,
      icon: ArrowDownRight,
      iconColor: "text-emerald-600 bg-emerald-50/60 border border-emerald-100/50",
      description: "Successful secure payments counted"
    },
    {
      id: "total-scholarship",
      title: "Scholarships Saved",
      value: `₹${summary.totalScholarship.toLocaleString("en-IN")}`,
      icon: Award,
      iconColor: "text-purple-600 bg-purple-50/60 border border-purple-100/50",
      description: "Money saved from LPU NEST & grants"
    },
    {
      id: "total-hostel",
      title: "Hostel & Room stay",
      value: `₹${summary.totalHostel.toLocaleString("en-IN")}`,
      icon: Home,
      iconColor: "text-sky-600 bg-sky-50/60 border border-sky-100/50",
      description: "Total hostel room rent and dining charges"
    },
    {
      id: "total-exam",
      title: "Exam Registration",
      value: `₹${summary.totalExam.toLocaleString("en-IN")}`,
      icon: BookOpen,
      iconColor: "text-amber-600 bg-amber-50/60 border border-amber-100/50",
      description: "Standard fees to book regular exams"
    },
    {
      id: "outstanding",
      title: "Unpaid Balance Left",
      value: `₹${summary.pendingBalance.toLocaleString("en-IN")}`,
      icon: ShieldAlert,
      iconColor: summary.pendingBalance > 0 
        ? "text-red-600 bg-red-50/60 border border-red-100/50 animate-pulse" 
        : "text-slate-500 bg-slate-50 border border-slate-100",
      description: summary.pendingBalance > 0 ? "Actual outstanding fees due now" : "All clear! Zero dues left"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" id="kpi-metric-cards-grid">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="glass-panel p-4.5 rounded-2xl flex flex-col justify-between h-[120px] glass-card-hover relative"
            id={`metric-card-${card.id}`}
          >
            <div className="flex items-start justify-between" id={`metric-header-${card.id}`}>
              <span className="text-[11px] font-semibold text-slate-500 tracking-tight leading-none block line-clamp-1" id={`title-${card.id}`}>
                {card.title}
              </span>
              <div className={`p-1.5 rounded-xl ${card.iconColor}`} id={`icon-box-${card.id}`}>
                <Icon className="w-3.5 h-3.5" id={`icon-tag-${card.id}`} />
              </div>
            </div>

            <div className="space-y-1 mt-auto" id={`metric-value-box-${card.id}`}>
              <div className="flex items-center gap-1.5 animate-fade-in" id={`value-row-${card.id}`}>
                <h3 className="font-display font-semibold text-base sm:text-lg lg:text-xl text-slate-900 tracking-tight leading-none" id={`value-${card.id}`}>
                  {card.value}
                </h3>
                {card.id === "outstanding" && summary.pendingBalance > 0 && (
                  <div className="flex items-center" id="trend-arrow-box">
                    {hasTrendUp && <TrendingUp className="w-4 h-4 text-rose-500 shrink-0" title="Balance increased" />}
                    {hasTrendDown && <TrendingDown className="w-4 h-4 text-emerald-500 shrink-0" title="Balance reduced" />}
                  </div>
                )}
              </div>
              <p className="text-[9px] text-slate-400 font-medium truncate" id={`desc-${card.id}`}>
                {card.description}
              </p>
            </div>

            {card.id === "outstanding" && (
              <div className="absolute right-3.5 bottom-3 h-10 w-24 flex flex-col justify-end" id="sparkline-container" title="Unpaid fees trend over the semesters">
                {/* Floating Micro Tooltip */}
                <div 
                  className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-800 text-white rounded px-2 py-0.5 text-[9px] font-mono tracking-tight pointer-events-none transition-all duration-200 shadow-md z-10 whitespace-nowrap"
                  style={{ 
                    opacity: hoveredPoint !== null ? 1 : 0,
                    transform: hoveredPoint !== null ? 'translate(-50%, -4px)' : 'translate(-50%, 0)'
                  }}
                  id="sparkline-interactive-tooltip"
                >
                  {hoveredPoint !== null ? (
                    `${trendData[hoveredPoint].term}: ₹${trendData[hoveredPoint].balance.toLocaleString("en-IN")}`
                  ) : (
                    "Trends"
                  )}
                </div>

                <svg className="w-full h-7 overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="sparkline-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EF4444" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Shading Area */}
                  <path
                    d={`M ${trendData[0].x},${trendData[0].y} L ${trendData[1].x},${trendData[1].y} L ${trendData[2].x},${trendData[2].y} L ${trendData[2].x},30 L ${trendData[0].x},30 Z`}
                    fill="url(#sparkline-grad)"
                    className="transition-all duration-300"
                  />
                  
                  {/* Trend line */}
                  <path
                    d={`M ${trendData[0].x},${trendData[0].y} L ${trendData[1].x},${trendData[1].y} L ${trendData[2].x},${trendData[2].y}`}
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-300"
                  />
                  
                  {/* Active Highlight Lines / Concentric Circles on hover */}
                  {hoveredPoint !== null && (
                    <line 
                      x1={trendData[hoveredPoint].x} 
                      y1="0" 
                      x2={trendData[hoveredPoint].x} 
                      y2="30" 
                      stroke="#EF4444" 
                      strokeWidth="1.5" 
                      strokeDasharray="2 2" 
                      opacity="0.4" 
                    />
                  )}

                  {/* Grid / Dot points */}
                  {trendData.map((pt, idx) => (
                    <g key={idx}>
                      {/* Outer Pulse/Highlight Circle on Hover */}
                      <circle 
                        cx={pt.x} 
                        cy={pt.y} 
                        r={hoveredPoint === idx ? 5.5 : 2.5} 
                        fill="#EF4444"
                        className="transition-all duration-150 ease-out"
                        opacity={hoveredPoint === idx ? 0.4 : 0.8}
                      />
                      {/* Inner Dot */}
                      <circle 
                        cx={pt.x} 
                        cy={pt.y} 
                        r={hoveredPoint === idx ? 2.5 : 1.5} 
                        fill={hoveredPoint === idx ? "#FFF" : "#EF4444"}
                        className="transition-all duration-150 ease-out"
                      />
                      {/* Large invisible hover trigger area for comfortable touch targets */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="14"
                        fill="transparent"
                        className="cursor-crosshair"
                        onMouseEnter={() => setHoveredPoint(idx)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      />
                    </g>
                  ))}
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
