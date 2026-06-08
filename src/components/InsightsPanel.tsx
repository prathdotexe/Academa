import React from "react";
import { AIInsight } from "../types";
import { CheckCircle2, Info, AlertTriangle, HelpCircle, Sparkles } from "lucide-react";

interface InsightsPanelProps {
  insights: AIInsight[];
}

export default function InsightsPanel({ insights }: InsightsPanelProps) {
  // Translate insight styles into modern visual cards
  const getInsightCardStyles = (type: string) => {
    switch (type) {
      case "success":
        return {
          container: "bg-emerald-500/5 border-emerald-500/20 text-emerald-800",
          badge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
          icon: CheckCircle2
        };
      case "warning":
        return {
          container: "bg-amber-500/5 border-amber-500/20 text-amber-800",
          badge: "bg-amber-500/10 text-amber-600 border-amber-500/20",
          icon: AlertTriangle
        };
      case "alert":
        return {
          container: "bg-rose-500/5 border-rose-500/20 text-rose-800",
          badge: "bg-rose-500/10 text-rose-600 border-rose-500/20",
          icon: AlertTriangle
        };
      default:
        return {
          container: "bg-orange-500/5 border-orange-500/20 text-orange-900",
          badge: "bg-orange-500/10 text-orange-600 border-orange-500/20",
          icon: Info
        };
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl" id="insights-panel-component">
      <div className="flex items-center justify-between mb-5 border-b border-orange-500/15 pb-4" id="insights-header">
        <div className="flex items-center gap-2" id="insights-title-inner">
          <Sparkles className="w-5 h-5 text-orange-600 animate-pulse" id="insights-sparkle-icon" />
          <h3 className="font-display font-semibold text-lg text-slate-900" id="insights-title">
            Smart Explanations & Advice
          </h3>
        </div>
        <span className="text-[10px] font-mono tracking-wider text-orange-700 bg-orange-50 border border-orange-100 px-2.5 py-1 rounded-full uppercase" id="intelligence-model-badge">
          Gemini Generated
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="insights-bento-grid">
        {insights && insights.length > 0 ? (
          insights.map((insight, idx) => {
            const styles = getInsightCardStyles(insight.type);
            const IconComponent = styles.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border flex gap-3.5 items-start ${styles.container}`}
                id={`insight-card-${idx}`}
              >
                <div className={`p-2 rounded-xl border flex-shrink-0 ${styles.badge}`} id={`insight-icon-box-${idx}`}>
                  <IconComponent className="w-4 h-4" id={`insight-badge-icon-${idx}`} />
                </div>
                <div className="space-y-1 text-xs" id={`insight-message-wrapper-${idx}`}>
                  <div className="flex items-center gap-2" id={`insight-meta-${idx}`}>
                    <span className="font-bold uppercase tracking-wider text-[9px] opacity-75">{insight.category}</span>
                    <span className="w-1 h-1 bg-current opacity-40 rounded-full" />
                    <span className="capitalize text-[10px] opacity-60 font-medium">{insight.type} signal</span>
                  </div>
                  <p className="text-slate-700 font-medium leading-relaxed" id={`insight-text-${idx}`}>
                    {insight.message}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 text-center py-6 text-slate-400 text-xs" id="no-insight-state">
            No contextual alerts reported for this statement ledger.
          </div>
        )}
      </div>
    </div>
  );
}
