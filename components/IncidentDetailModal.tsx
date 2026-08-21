"use client";

import React, { useEffect } from "react";
import { IncidentItem, IncidentUpdate } from "@/lib/types";
import {
  INCIDENT_STATUS_TRANSLATIONS,
  STATUS_TRANSLATIONS,
  formatKST,
  timeAgoKST,
  translateIncidentText,
} from "@/lib/translations";
import {
  ChevronLeft,
  X,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Clock,
  Layers,
} from "lucide-react";

interface IncidentDetailModalProps {
  incident: (IncidentItem & { koreanName?: string }) | null;
  onClose: () => void;
}

export const IncidentDetailModal: React.FC<IncidentDetailModalProps> = ({
  incident,
  onClose,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!incident) return null;

  const koreanTitle =
    incident.koreanName || translateIncidentText(incident.name);
  const statusMeta =
    INCIDENT_STATUS_TRANSLATIONS[incident.status] ||
    INCIDENT_STATUS_TRANSLATIONS.resolved;
  const impactMeta =
    STATUS_TRANSLATIONS[incident.impact] || STATUS_TRANSLATIONS.minor;

  const latestUpdate = incident.incident_updates?.[0];
  const latestBody = latestUpdate
    ? (latestUpdate as IncidentUpdate & { koreanBody?: string }).koreanBody ||
      translateIncidentText(latestUpdate.body)
    : "";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0d131f] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Top Navbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
          <button
            onClick={onClose}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>목록으로 돌아가기</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          {/* 1. Header Overview Box */}
          <div
            className={`p-6 rounded-2xl border ${
              incident.status === "resolved"
                ? "bg-emerald-500/5 border-emerald-500/25 dark:bg-emerald-950/20 dark:border-emerald-800/50"
                : incident.impact === "major" || incident.impact === "critical"
                ? "bg-rose-500/5 border-rose-500/25 dark:bg-rose-950/20 dark:border-rose-800/50"
                : "bg-amber-500/5 border-amber-500/25 dark:bg-amber-950/20 dark:border-amber-800/50"
            }`}
          >
            <div className="space-y-3">
              {/* Title & Subtitle */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug break-keep">
                  {koreanTitle}
                </h3>
                {koreanTitle !== incident.name && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-mono">
                    {incident.name}
                  </p>
                )}
              </div>

              {/* Status Meta Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${statusMeta.badgeClass}`}
                >
                  {statusMeta.label}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {impactMeta.label}
                </span>
              </div>

              {/* Latest update body */}
              {latestBody && (
                <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed break-keep">
                    {latestBody}
                  </p>
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400 dark:text-slate-500 mt-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatKST(incident.resolved_at || incident.updated_at || incident.created_at)}</span>
                    <span>({timeAgoKST(incident.resolved_at || incident.created_at)})</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2. Affected Components Card */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
                <Layers className="w-4 h-4 text-emerald-500" />
                <span>영향을 받은 서비스 (Affected Components)</span>
              </h4>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>발생: {formatKST(incident.created_at)}</span>
              <span>종료: {formatKST(incident.resolved_at || incident.updated_at)}</span>
            </div>

            {/* Visual Timeline Bar */}
            <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex">
              <div className="w-1/6 bg-emerald-500" />
              <div
                className={`w-4/6 ${
                  incident.impact === "major" || incident.impact === "critical"
                    ? "bg-rose-500"
                    : "bg-amber-400"
                }`}
              />
              <div className="w-1/6 bg-emerald-500" />
            </div>

            {/* Component list tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {incident.components && incident.components.length > 0 ? (
                incident.components.map((c) => (
                  <span
                    key={c.id}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-300"
                  >
                    {c.name}
                  </span>
                ))
              ) : (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-300">
                  OpenAI 서비스 인프라
                </span>
              )}
            </div>
          </div>

          {/* 3. Updates Timeline List */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>진행 상황 업데이트 내역 (Updates Timeline)</span>
            </h4>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              {incident.incident_updates.map((update, idx) => {
                const updateMeta =
                  INCIDENT_STATUS_TRANSLATIONS[update.status] ||
                  INCIDENT_STATUS_TRANSLATIONS.investigating;
                const translatedBody =
                  (update as IncidentUpdate & { koreanBody?: string }).koreanBody ||
                  translateIncidentText(update.body);

                const isResolved = update.status === "resolved";

                return (
                  <div key={update.id} className="relative">
                    {/* Timeline Dot */}
                    <span
                      className={`absolute -left-6 top-1.5 w-3 h-3 rounded-full ring-4 ring-white dark:ring-slate-900 ${
                        isResolved ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                    />

                    {/* Step Status & Date */}
                    <div className="flex flex-wrap items-center gap-2 mb-1.5 text-xs">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {updateMeta.label}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500 font-mono">
                        {formatKST(update.created_at)}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        ({timeAgoKST(update.created_at)})
                      </span>
                    </div>

                    {/* Body Card */}
                    <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-800/40 text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed break-keep">
                      {translatedBody}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


