"use client";

import React, { useState, useMemo } from "react";
import { IncidentItem, IncidentUpdate } from "@/lib/types";
import {
  INCIDENT_STATUS_TRANSLATIONS,
  formatKST,
  timeAgoKST,
  translateIncidentText,
} from "@/lib/translations";
import {
  ChevronLeft,
  Calendar,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface IncidentHistoryViewProps {
  incidents: (IncidentItem & { koreanName?: string })[];
  isLoading: boolean;
  onBackToStatus?: () => void;
  onSelectIncident?: (incident: IncidentItem) => void;
}

interface MonthGroup {
  monthKey: string; // "2026-08"
  monthTitleKo: string; // "2026년 8월"
  monthNameEn: string; // "August"
  days: {
    dayNum: string; // "20"
    dayOfWeekKo: string; // "목"
    dayOfWeekEn: string; // "Thu"
    dateStr: string; // "2026-08-20"
    incidents: (IncidentItem & { koreanName?: string; displayTimeKo: string; displayTimeEn: string })[];
  }[];
}

export const IncidentHistoryView: React.FC<IncidentHistoryViewProps> = ({
  incidents,
  isLoading,
  onBackToStatus,
  onSelectIncident,
}) => {
  // Group all incidents by Year-Month (in KST) and then by Day (in KST)
  const monthGroups: MonthGroup[] = useMemo(() => {
    // Sort by event resolution / update time descending
    const sorted = [...incidents].sort((a, b) => {
      const timeA = new Date(a.resolved_at || a.updated_at || a.created_at).getTime();
      const timeB = new Date(b.resolved_at || b.updated_at || b.created_at).getTime();
      return timeB - timeA;
    });

    const groupsMap = new Map<string, Map<string, (IncidentItem & { koreanName?: string; displayTimeKo: string; displayTimeEn: string })[]>>();

    for (const inc of sorted) {
      const targetDate = new Date(inc.resolved_at || inc.updated_at || inc.created_at);

      // KST Year-Month formatting
      const year = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Seoul", year: "numeric" }).format(targetDate);
      const month = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Seoul", month: "2-digit" }).format(targetDate);
      const monthKey = `${year}-${month}`;

      // KST YYYY-MM-DD formatting
      const day = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Seoul", day: "2-digit" }).format(targetDate);
      const dateStr = `${year}-${month}-${day}`;

      const displayTimeEn = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Seoul",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(targetDate);

      const displayTimeKo = new Intl.DateTimeFormat("ko-KR", {
        timeZone: "Asia/Seoul",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(targetDate);

      if (!groupsMap.has(monthKey)) {
        groupsMap.set(monthKey, new Map());
      }
      const monthDaysMap = groupsMap.get(monthKey)!;

      if (!monthDaysMap.has(dateStr)) {
        monthDaysMap.set(dateStr, []);
      }
      monthDaysMap.get(dateStr)!.push({
        ...inc,
        displayTimeKo,
        displayTimeEn,
      });
    }

    const result: MonthGroup[] = [];

    groupsMap.forEach((daysMap, monthKey) => {
      const [year, month] = monthKey.split("-").map(Number);
      const sampleDate = new Date(Date.UTC(year, month - 1, 15));

      const monthTitleKo = new Intl.DateTimeFormat("ko-KR", {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "long",
      }).format(sampleDate);

      const monthNameEn = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Seoul",
        month: "long",
      }).format(sampleDate);

      const daysArr: MonthGroup["days"] = [];

      daysMap.forEach((incList, dateStr) => {
        const [y, m, d] = dateStr.split("-").map(Number);
        const dayDate = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));

        const dayNum = String(d);
        const dayOfWeekKo = new Intl.DateTimeFormat("ko-KR", {
          timeZone: "Asia/Seoul",
          weekday: "short",
        }).format(dayDate);
        const dayOfWeekEn = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Seoul",
          weekday: "short",
        }).format(dayDate);

        daysArr.push({
          dayNum,
          dayOfWeekKo,
          dayOfWeekEn,
          dateStr,
          incidents: incList,
        });
      });

      // Days sorted descending (latest first)
      daysArr.sort((a, b) => b.dateStr.localeCompare(a.dateStr));

      result.push({
        monthKey,
        monthTitleKo,
        monthNameEn,
        days: daysArr,
      });
    });

    return result;
  }, [incidents]);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Breadcrumb / Return to Status Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToStatus}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>← 실시간 상태 대시보드로 돌아가기</span>
        </button>

        <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-1.5 rounded-xl">
          <Calendar className="w-3.5 h-3.5" />
          <span>한국 표준시 (KST, UTC+9) 기준</span>
        </div>
      </div>

      {/* Main History Container Card matching status.openai.com/history */}
      <div className="bg-white dark:bg-[#0d131f] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-6 sm:p-8 space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <span>과거 장애 및 점검 이력</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              OpenAI 공식 사이트([status.openai.com/history](https://status.openai.com/history))와 1:1 일치하는 한국 표준시(KST) 타임라인입니다.
            </p>
          </div>

          {/* Month Range Indicator (e.g. 2026년 5월 - 8월) */}
          <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>2026년 5월</span>
            <span className="text-slate-400">-</span>
            <span>2026년 8월</span>
          </div>
        </div>

        {/* Month Groups Timeline */}
        {isLoading && incidents.length === 0 ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-36 rounded-2xl bg-slate-100 dark:bg-slate-800/40 animate-pulse"
              />
            ))}
          </div>
        ) : monthGroups.length === 0 ? (
          <div className="text-center py-16">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <p className="font-bold text-base text-slate-900 dark:text-white">
              해당 기간 동안 발생한 장애 이력이 없습니다.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              모든 시스템이 100% 정상 작동하였습니다.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {monthGroups.map((monthGroup) => (
              <div key={monthGroup.monthKey} className="space-y-4">
                {/* Month Name Section Header (August, July, June ...) */}
                <div className="flex items-center space-x-3">
                  <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {monthGroup.monthTitleKo}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                    {monthGroup.monthNameEn}
                  </span>
                  <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
                </div>

                {/* Days in Month */}
                <div className="divide-y divide-slate-100 dark:divide-slate-800/60 border-t border-b border-slate-100 dark:border-slate-800/60">
                  {monthGroup.days.map((day) => (
                    <div key={day.dateStr} className="py-4 flex flex-col sm:flex-row gap-3 sm:gap-6">
                      {/* Left: Day Badge (20 Thu / 20일 목 - exactly like official site) */}
                      <div className="flex sm:flex-row items-baseline shrink-0 w-24 sm:w-20 text-slate-900 dark:text-white space-x-1.5">
                        <span className="text-xl sm:text-2xl font-black leading-none tracking-tight">
                          {day.dayNum}
                        </span>
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                          {day.dayOfWeekEn} <span className="text-[11px]">({day.dayOfWeekKo})</span>
                        </span>
                      </div>

                      {/* Right: Incidents on this Day */}
                      <div className="flex-1 space-y-3 min-w-0">
                        {day.incidents.map((inc) => {
                          const koreanTitle =
                            inc.koreanName || translateIncidentText(inc.name);
                          const isMajor =
                            inc.impact === "major" || inc.impact === "critical";

                          const latestUpdate = inc.incident_updates?.[0];
                          const translatedBody = latestUpdate
                            ? (latestUpdate as IncidentUpdate & { koreanBody?: string }).koreanBody ||
                              translateIncidentText(latestUpdate.body)
                            : "";

                          return (
                            <div
                              key={inc.id}
                              onClick={() => onSelectIncident && onSelectIncident(inc)}
                              className="group flex gap-3.5 p-3.5 sm:p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 hover:bg-slate-100/70 dark:bg-slate-900/40 dark:hover:bg-slate-800/60 transition-all cursor-pointer shadow-sm hover:shadow-md"
                            >
                              {/* Left Colored Accent Bar */}
                              <div
                                className={`w-1.5 rounded-full shrink-0 ${
                                  isMajor
                                    ? "bg-rose-500 dark:bg-rose-500"
                                    : "bg-amber-400 dark:bg-amber-500"
                                }`}
                              />

                              {/* Content */}
                              <div className="flex-1 min-w-0 space-y-1.5">
                                {/* Title & Time Row */}
                                <div className="flex items-start justify-between gap-2">
                                  <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug break-keep">
                                    {koreanTitle}
                                  </h4>
                                  <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 shrink-0 mt-0.5">
                                    {inc.displayTimeEn}
                                  </span>
                                </div>

                                {koreanTitle !== inc.name && (
                                  <p className="text-xs text-slate-400 font-mono truncate">
                                    {inc.name}
                                  </p>
                                )}

                                {/* Latest Update snippet */}
                                {translatedBody && (
                                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed break-keep pt-0.5">
                                    {translatedBody}
                                  </p>
                                )}

                                {/* Card Footer: Status Pill & View Details link */}
                                <div className="pt-2 flex items-center justify-between text-xs">
                                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold text-[11px] border border-emerald-300/40 dark:border-emerald-800">
                                    <CheckCircle2 className="w-3 h-3" />
                                    <span>해결 완료</span>
                                  </span>

                                  <span className="inline-flex items-center space-x-1 font-bold text-slate-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 text-xs">
                                    <span>상세 타임라인 보기</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


