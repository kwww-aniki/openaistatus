"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/Header";
import { OverallStatusBanner } from "@/components/OverallStatusBanner";
import { SystemStatusView } from "@/components/SystemStatusView";
import { ComponentGrid } from "@/components/ComponentGrid";
import { IncidentList } from "@/components/IncidentList";
import { IncidentDetailModal } from "@/components/IncidentDetailModal";
import { IncidentHistoryView } from "@/components/IncidentHistoryView";
import { Footer } from "@/components/Footer";
import { StatusSummaryResponse, IncidentItem } from "@/lib/types";
import { translateIncidentText } from "@/lib/translations";
import { AlertCircle, ListFilter, LayoutGrid } from "lucide-react";

const AUTO_REFRESH_SECONDS = 30;

export default function Home() {
  const [data, setData] = useState<StatusSummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(AUTO_REFRESH_SECONDS);
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid" | "history">("list");
  const [selectedIncident, setSelectedIncident] = useState<IncidentItem | null>(null);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const isDarkStored = localStorage.getItem("theme") === "dark";
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = isDarkStored || (!("theme" in localStorage) && prefersDark);
    setDarkMode(initialDark);
  }, []);

  // Update theme class on html tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const fetchStatus = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      let summaryData: StatusSummaryResponse | null = null;

      // 1. Try fetching from internal API proxy
      try {
        const res = await fetch("/api/status", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json && json.status && json.components) {
            summaryData = json as StatusSummaryResponse;
          }
        }
      } catch (e) {
        console.warn("Internal API route failed, trying direct Statuspage fetch fallback:", e);
      }

      // 2. Client-side direct fallback if internal API failed
      if (!summaryData) {
        const directRes = await fetch("https://status.openai.com/api/v2/summary.json", {
          cache: "no-store",
        });
        if (!directRes.ok) {
          throw new Error("OpenAI 공식 서버로부터 상태 데이터를 가져오지 못했습니다.");
        }
        const rawData: StatusSummaryResponse = await directRes.json();

        // Fetch components list
        let componentsList = rawData.components || [];
        try {
          const compRes = await fetch("https://status.openai.com/api/v2/components.json", {
            cache: "no-store",
          });
          if (compRes.ok) {
            const compJson = await compRes.json();
            if (Array.isArray(compJson.components) && compJson.components.length > 0) {
              componentsList = compJson.components;
            }
          }
        } catch {
          // fallback
        }

        // Fetch past incidents for full 90-day history
        let incidentsList = rawData.incidents || [];
        try {
          const incRes = await fetch("https://status.openai.com/api/v2/incidents.json", {
            cache: "no-store",
          });
          if (incRes.ok) {
            const incJson = await incRes.json();
            if (Array.isArray(incJson.incidents)) {
              incidentsList = incJson.incidents;
            }
          }
        } catch {
          // fallback
        }

        // Translate client-side
        const translatedIncidents = (incidentsList || []).map((incident) => ({
          ...incident,
          koreanName: translateIncidentText(incident.name),
          incident_updates: (incident.incident_updates || []).map((update) => ({
            ...update,
            koreanBody: translateIncidentText(update.body),
          })),
        }));

        summaryData = {
          ...rawData,
          components: componentsList,
          incidents: translatedIncidents,
        };
      }

      setData(summaryData);
      setLastRefreshedAt(new Date().toISOString());
      setCountdown(AUTO_REFRESH_SECONDS);
    } catch (err) {
      console.error("Fetch status error:", err);
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // Countdown timer & auto-refresh
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchStatus();
          return AUTO_REFRESH_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [fetchStatus]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070b13] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        lastUpdated={lastRefreshedAt || (data as any)?.fetchedAt || new Date().toISOString()}
        isLoading={isLoading}
        onRefresh={fetchStatus}
        countdown={countdown}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-between text-red-600 dark:text-red-400 text-xs sm:text-sm">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={fetchStatus}
              className="px-3 py-1 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              다시 시도
            </button>
          </div>
        )}

        {/* If in History View Mode (matching status.openai.com/history) */}
        {viewMode === "history" ? (
          <IncidentHistoryView
            incidents={data?.incidents || []}
            isLoading={isLoading}
            onBackToStatus={() => setViewMode("list")}
            onSelectIncident={setSelectedIncident}
          />
        ) : (
          /* Dashboard Home View */
          <>
            {/* Top Summary Banner */}
            <OverallStatusBanner
              status={data?.status || null}
              updatedAt={lastRefreshedAt || (data as any)?.fetchedAt || new Date().toISOString()}
              isLoading={isLoading}
            />

            {/* View Mode Switcher */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    viewMode === "list"
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                  }`}
                >
                  <ListFilter className="w-3.5 h-3.5" />
                  <span>90일 가동률 리스트 뷰 (공식 스타일)</span>
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    viewMode === "grid"
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>카드 그리드 뷰</span>
                </button>
              </div>
            </div>

            {/* System Status View (List with 90-day bars & Hover tooltips & Uptime %) */}
            {viewMode === "list" ? (
              <SystemStatusView
                components={data?.components || []}
                incidents={data?.incidents || []}
                isLoading={isLoading}
                onSelectIncident={setSelectedIncident}
              />
            ) : (
              <ComponentGrid
                components={data?.components || []}
                isLoading={isLoading}
              />
            )}

            {/* Incident List with View history trigger button */}
            <IncidentList
              incidents={data?.incidents || []}
              isLoading={isLoading}
              onSelectIncident={setSelectedIncident}
              onOpenHistoryView={() => setViewMode("history")}
            />
          </>
        )}
      </main>

      {/* Incident Detail Modal View */}
      {selectedIncident && (
        <IncidentDetailModal
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
        />
      )}

      <Footer />
    </div>
  );
}


