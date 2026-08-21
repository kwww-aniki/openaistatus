"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, Clock } from "lucide-react";
import { StatusInfo } from "@/lib/types";
import { STATUS_TRANSLATIONS, formatKST, formatUTC } from "@/lib/translations";

interface OverallStatusBannerProps {
  status: StatusInfo | null;
  updatedAt: string | null;
  isLoading: boolean;
}

export const OverallStatusBanner: React.FC<OverallStatusBannerProps> = ({
  status,
  updatedAt,
  isLoading,
}) => {
  const indicator = status?.indicator || "none";
  const translation = STATUS_TRANSLATIONS[indicator] || STATUS_TRANSLATIONS.none;

  const renderIcon = () => {
    switch (indicator) {
      case "none":
        return <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-500 shrink-0" />;
      case "minor":
        return <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8 text-amber-500 shrink-0" />;
      case "major":
      case "critical":
        return <AlertCircle className="w-7 h-7 sm:w-8 sm:h-8 text-red-500 shrink-0" />;
      default:
        return <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-500 shrink-0" />;
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-5 sm:p-7 transition-all ${
        indicator === "none"
          ? "bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border-emerald-500/30"
          : indicator === "minor"
          ? "bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent border-amber-500/30"
          : "bg-gradient-to-r from-red-500/10 via-rose-500/5 to-transparent border-red-500/30"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
            {renderIcon()}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    indicator === "none" ? "bg-emerald-400" : "bg-red-400"
                  }`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    indicator === "none" ? "bg-emerald-500" : "bg-red-500"
                  }`}
                ></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                실시간 시스템 상태
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white mt-1 break-keep">
              {isLoading && !status ? "상태 확인 중..." : translation.label}
            </h2>
          </div>
        </div>

        {/* Timestamp Box with KST (+9) and UTC */}
        <div className="flex flex-col sm:items-end text-xs text-slate-500 dark:text-slate-400 space-y-1 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/60 shrink-0">
          <div className="flex items-center space-x-1.5 font-medium text-slate-700 dark:text-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>최종 상태 업데이트</span>
          </div>
          <div className="whitespace-nowrap font-mono text-[11px] text-slate-800 dark:text-slate-200 font-semibold">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold mr-1">KST(+9):</span>
            <span>{formatKST(updatedAt)}</span>
          </div>
          <div className="whitespace-nowrap font-mono text-[10px] text-slate-400 dark:text-slate-500">
            <span className="font-medium mr-1">UTC(본사):</span>
            <span>{formatUTC(updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};


