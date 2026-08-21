"use client";

import React from "react";
import { IncidentItem, IncidentUpdate } from "@/lib/types";
import {
  INCIDENT_STATUS_TRANSLATIONS,
  formatKST,
  timeAgoKST,
  translateIncidentText,
} from "@/lib/translations";
import {
  History,
  Activity,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

interface IncidentListProps {
  incidents: (IncidentItem & { koreanName?: string })[];
  isLoading: boolean;
  onSelectIncident?: (incident: IncidentItem) => void;
  onOpenHistoryView?: () => void;
}

export const IncidentList: React.FC<IncidentListProps> = ({
  incidents,
  isLoading,
  onSelectIncident,
  onOpenHistoryView,
}) => {
  const activeIncidents = incidents.filter(
    (inc) => inc.status !== "resolved" && inc.status !== "postmortem"
  );
  const resolvedIncidents = incidents.filter(
    (inc) => inc.status === "resolved" || inc.status === "postmortem"
  );

  return (
    <section className="space-y-6">
      {/* 1. Active Incidents Banner (Always visible if any ongoing incident exists) */}
      {activeIncidents.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 font-bold text-lg">
            <Activity className="w-5 h-5 animate-pulse" />
            <h3>진행 중인 서비스 장애 ({activeIncidents.length}건)</h3>
          </div>

          <div className="space-y-4">
            {activeIncidents.map((incident) => {
              const statusMeta =
                INCIDENT_STATUS_TRANSLATIONS[incident.status] ||
                INCIDENT_STATUS_TRANSLATIONS.investigating;

              return (
                <div
                  key={incident.id}
                  onClick={() => onSelectIncident && onSelectIncident(incident)}
                  className="p-5 sm:p-6 rounded-2xl border border-red-300 dark:border-red-900/60 bg-red-50/50 dark:bg-red-950/20 shadow-sm cursor-pointer hover:border-red-400 dark:hover:border-red-800 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${statusMeta.badgeClass}`}
                        >
                          {statusMeta.label}
                        </span>
                        <span className="text-xs text-slate-500">
                          {timeAgoKST(incident.created_at)}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {incident.koreanName || translateIncidentText(incident.name)}
                      </h4>
                      {incident.koreanName && incident.koreanName !== incident.name && (
                        <p className="text-xs text-slate-400 mt-0.5">
                          {incident.name}
                        </p>
                      )}
                    </div>

                    <div className="text-xs text-slate-500 whitespace-nowrap">
                      발생: {formatKST(incident.created_at)}
                    </div>
                  </div>

                  {/* Updates Timeline Preview */}
                  <div className="mt-4 border-t border-red-200/60 dark:border-red-900/40 pt-4 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <span>최근 진행 상황</span>
                      <span className="text-red-500 flex items-center space-x-1 font-bold">
                        <span>전체 상세 타임라인 보기</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    {incident.incident_updates[0] && (
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed bg-white/70 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                        {(incident.incident_updates[0] as IncidentUpdate & { koreanBody?: string }).koreanBody ||
                          translateIncidentText(incident.incident_updates[0].body)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Official "View incident history" Link Button Card matching status.openai.com */}
      <div className="pt-2">
        <div
          onClick={onOpenHistoryView}
          className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 hover:shadow-md cursor-pointer transition-all"
        >
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-emerald-500/10 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center space-x-2">
                <span>과거 장애 및 점검 이력 보기</span>
                <span className="text-xs font-normal text-slate-400 font-mono">
                  (View history)
                </span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                최근 90일간(5월~8월) 발생했던 총 {resolvedIncidents.length}건의 월별/일별 상세 장애 타임라인을 확인합니다.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-xs font-bold transition-all shadow-sm shrink-0">
            <span>이력 전체 보기</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </section>
  );
};


