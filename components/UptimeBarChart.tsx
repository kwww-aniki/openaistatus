"use client";

import React, { useState } from "react";
import { DayStatus } from "@/lib/uptime";
import { IncidentItem } from "@/lib/types";
import { CheckCircle2, AlertTriangle, AlertCircle, ExternalLink } from "lucide-react";

interface UptimeBarChartProps {
  history: DayStatus[];
  showLegend?: boolean;
  onSelectIncident?: (incident: IncidentItem) => void;
}

export const UptimeBarChart: React.FC<UptimeBarChartProps> = ({
  history,
  showLegend = true,
  onSelectIncident,
}) => {
  const [hoveredDay, setHoveredDay] = useState<{
    day: DayStatus;
    x: number;
    y: number;
  } | null>(null);

  const getBarColor = (status: DayStatus["status"]) => {
    switch (status) {
      case "operational":
        return "bg-emerald-500 hover:bg-emerald-400 dark:bg-emerald-500/90 dark:hover:bg-emerald-400";
      case "degraded":
      case "partial_outage":
        return "bg-amber-400 hover:bg-amber-300 dark:bg-amber-400 dark:hover:bg-amber-300 ring-1 ring-amber-300/40";
      case "major_outage":
        return "bg-rose-500 hover:bg-rose-400 dark:bg-rose-500 dark:hover:bg-rose-400 ring-1 ring-rose-300/40";
      default:
        return "bg-emerald-500 hover:bg-emerald-400";
    }
  };

  const handleBarClick = (day: DayStatus) => {
    if (day.incident && onSelectIncident) {
      onSelectIncident(day.incident);
    }
  };

  return (
    <div className="w-full relative group">
      {/* 90-day bars container */}
      <div className="flex items-center gap-[2.5px] sm:gap-[3px] w-full h-8 py-1">
        {history.map((day, idx) => {
          const barColor = getBarColor(day.status);
          const hasIncident = !!day.incident;

          return (
            <div
              key={day.dateStr + idx}
              onClick={() => handleBarClick(day)}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setHoveredDay({
                  day,
                  x: rect.left + rect.width / 2,
                  y: rect.top,
                });
              }}
              onMouseLeave={() => setHoveredDay(null)}
              className={`flex-1 h-full min-w-[2px] rounded-[1.5px] cursor-pointer transition-all duration-150 transform hover:scale-y-125 hover:z-20 ${barColor} ${
                hasIncident ? "hover:brightness-110 active:scale-95" : ""
              }`}
            />
          );
        })}
      </div>

      {/* Floating Tooltip */}
      {hoveredDay && (
        <div
          style={{
            position: "fixed",
            left: `${hoveredDay.x}px`,
            top: `${hoveredDay.y - 8}px`,
            transform: "translate(-50%, -100%)",
            zIndex: 9999,
          }}
          className="pointer-events-none transition-all duration-150 animate-in fade-in zoom-in-95"
        >
          <div className="bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-md text-white px-3.5 py-2.5 rounded-xl shadow-xl border border-slate-700/80 text-xs w-64 max-w-xs space-y-1.5">
            {/* Header: Date */}
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-1.5 text-[11px]">
              <span className="font-semibold text-slate-200">
                {hoveredDay.day.displayDateKo}
              </span>
              <span className="text-slate-400 text-[10px]">
                {hoveredDay.day.displayDateEn}
              </span>
            </div>

            {/* Body: Status and incident info */}
            {hoveredDay.day.status === "operational" ? (
              <div className="flex items-center space-x-1.5 text-emerald-400 py-0.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>정상 작동 (관련 장애 없음)</span>
              </div>
            ) : hoveredDay.day.status === "major_outage" ? (
              <div className="space-y-1 py-0.5">
                <div className="flex items-center space-x-1.5 text-rose-400 font-bold">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>주요 서비스 장애 발생</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug break-keep">
                  {hoveredDay.day.incidentTitleKo || hoveredDay.day.incidentTitleEn}
                </p>
                {hoveredDay.day.incident && (
                  <div className="pt-1 flex items-center space-x-1 text-[10px] text-rose-300/90 font-medium">
                    <span>클릭하여 상세 타임라인 보기</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-1 py-0.5">
                <div className="flex items-center space-x-1.5 text-amber-400 font-bold">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>성능 저하 및 오류율 증가</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug break-keep">
                  {hoveredDay.day.incidentTitleKo || hoveredDay.day.incidentTitleEn}
                </p>
                {hoveredDay.day.incident && (
                  <div className="pt-1 flex items-center space-x-1 text-[10px] text-amber-300/90 font-medium">
                    <span>클릭하여 상세 타임라인 보기</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </div>
                )}
              </div>
            )}

            {/* Arrow indicator at bottom of tooltip */}
            <div className="absolute left-1/2 -bottom-1 w-2 h-2 -translate-x-1/2 rotate-45 bg-slate-900 dark:bg-slate-800 border-r border-b border-slate-700/80" />
          </div>
        </div>
      )}

      {/* Legend below the bar */}
      {showLegend && (
        <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-1 select-none font-medium">
          <span>90일 전</span>
          <span className="hidden sm:inline-block text-slate-400/80 text-[10px]">
            오류 발생 바를 클릭하면 상세 내역이 표시됩니다
          </span>
          <span>오늘</span>
        </div>
      )}
    </div>
  );
};


