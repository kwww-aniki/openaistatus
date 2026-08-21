"use client";

import React, { useState } from "react";
import { ComponentItem, IncidentItem } from "@/lib/types";
import { compute90DaysHistory, ComponentGroup } from "@/lib/uptime";
import { UptimeBarChart } from "./UptimeBarChart";
import {
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";

interface SystemStatusViewProps {
  components: ComponentItem[];
  incidents: IncidentItem[];
  isLoading: boolean;
  onSelectIncident?: (incident: IncidentItem) => void;
}

const GROUP_COLORS: Record<
  string,
  {
    header: string;
    accent: string;
  }
> = {
  apis: {
    header: "bg-sky-50/70 hover:bg-sky-100/70 dark:bg-sky-950/20 dark:hover:bg-sky-950/35",
    accent: "text-sky-600 dark:text-sky-400",
  },
  chatgpt: {
    header: "bg-emerald-50/70 hover:bg-emerald-100/70 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/35",
    accent: "text-emerald-600 dark:text-emerald-400",
  },
  codex: {
    header: "bg-violet-50/70 hover:bg-violet-100/70 dark:bg-violet-950/20 dark:hover:bg-violet-950/35",
    accent: "text-violet-600 dark:text-violet-400",
  },
  fedramp: {
    header: "bg-amber-50/70 hover:bg-amber-100/70 dark:bg-amber-950/20 dark:hover:bg-amber-950/35",
    accent: "text-amber-600 dark:text-amber-400",
  },
  ads: {
    header: "bg-rose-50/70 hover:bg-rose-100/70 dark:bg-rose-950/20 dark:hover:bg-rose-950/35",
    accent: "text-rose-600 dark:text-rose-400",
  },
};

const DEFAULT_GROUP_COLOR = GROUP_COLORS.chatgpt;

export const SystemStatusView: React.FC<SystemStatusViewProps> = ({
  components,
  incidents,
  isLoading,
  onSelectIncident,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const groups: ComponentGroup[] = compute90DaysHistory(components, incidents);

  return (
    <section className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>시스템 상태 및 90일 가동률</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            항목을 클릭하여 세부 리스트를 펼치고, 오류가 발생한 바를 클릭하면 상세 타임라인을 볼 수 있습니다.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="서비스 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Main Groups Accordion */}
      {isLoading && components.length === 0 ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-28 rounded-2xl bg-slate-200/50 dark:bg-slate-800/40 animate-pulse border border-slate-200 dark:border-slate-800"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => {
            const isExpanded = !!expandedGroups[group.id];
            const colors = GROUP_COLORS[group.id] ?? DEFAULT_GROUP_COLOR;
            const filteredGroupComponents = group.components.filter((c) => {
              const query = searchQuery.toLowerCase();
              return (
                c.name.toLowerCase().includes(query) ||
                c.koreanName.toLowerCase().includes(query) ||
                c.description.toLowerCase().includes(query)
              );
            });

            if (searchQuery && filteredGroupComponents.length === 0) {
              return null;
            }

            const allOperational = group.components.every(
              (c) => c.status === "operational"
            );

            return (
              <div
                key={group.id}
                className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800/90 overflow-hidden shadow-sm transition-all"
              >
                {/* Group Header Button */}
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`group-${group.id}-content`}
                  className={`w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer transition-colors select-none ${colors.header}`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Status Icon */}
                    {allOperational ? (
                      <CheckCircle2 className={`w-5 h-5 shrink-0 ${colors.accent}`} />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                    )}

                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                        {group.name}
                      </h4>
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                        ({group.koreanName} • {group.components.length}개 서비스)
                      </span>
                    </div>

                    <span className={`p-1 transition-transform ${colors.accent}`} aria-hidden="true">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </div>

                  {/* Group Uptime Percentage */}
                  <div className="flex items-center space-x-2">
                    <span className={`font-semibold text-xs sm:text-sm font-mono ${colors.accent}`}>
                      {group.uptimePercentage}% 가동률
                    </span>
                    <span className="text-[10px] text-slate-400 hidden sm:inline">
                      (최근 90일)
                    </span>
                  </div>
                </button>

                {/* If collapsed: Show group-level 90-day bar preview */}
                {!isExpanded && (
                  <div
                    id={`group-${group.id}-content`}
                    className="px-5 pb-4 pt-1 border-t border-slate-100 dark:border-slate-800/50"
                  >
                    <UptimeBarChart
                      history={group.history90Days}
                      showLegend={false}
                      onSelectIncident={onSelectIncident}
                    />
                  </div>
                )}

                {/* If expanded: Show list of components with individual 90-day bars */}
                {isExpanded && (
                  <div
                    id={`group-${group.id}-content`}
                    className="divide-y divide-slate-100 dark:divide-slate-800/60 border-t border-slate-100 dark:border-slate-800/60"
                  >
                    {filteredGroupComponents.map((comp) => {
                      const isNormal = comp.status === "operational";

                      return (
                        <div
                          key={comp.id}
                          className="p-4 sm:px-6 sm:py-4.5 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
                        >
                          {/* Row 1: Name and Uptime Percentage */}
                          <div className="flex items-center justify-between gap-4 mb-2">
                            <div className="flex items-center space-x-2.5 min-w-0">
                              {isNormal ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                              )}
                              <div className="flex items-baseline space-x-2 truncate">
                                <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                                  {comp.koreanName}
                                </span>
                                {comp.koreanName !== comp.name && (
                                  <span className="text-xs text-slate-400 dark:text-slate-500 truncate hidden sm:inline">
                                    {comp.name}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Uptime % Right aligned */}
                            <div className="shrink-0 flex items-center space-x-1.5">
                              <span className="font-semibold text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-mono">
                                {comp.uptimePercentage}% 가동률
                              </span>
                            </div>
                          </div>

                          {/* Row 2: Interactive 90-Day Bar Chart */}
                          <div className="mt-2 pt-1">
                            <UptimeBarChart
                              history={comp.history90Days}
                              showLegend={true}
                              onSelectIncident={onSelectIncident}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

