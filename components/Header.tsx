"use client";

import React from "react";
import { RefreshCw, Moon, Sun, ShieldCheck, ExternalLink } from "lucide-react";
import { timeAgoKST } from "@/lib/translations";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean | ((prev: boolean) => boolean)) => void;
  lastUpdated: string | null;
  isLoading: boolean;
  onRefresh: () => void;
  countdown: number;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  lastUpdated,
  isLoading,
  onRefresh,
  countdown,
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-[#0b101b]/80 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white tracking-tight">
                OpenAI 서비스 상태
              </h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/50">
                한국어
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              실시간 OpenAI 서버 및 API 가동 현황
            </p>
          </div>
        </div>

        {/* Actions (Refresh, Dark Mode, Link) */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <a
            href="https://status.openai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center space-x-1 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <span>공식 사이트</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Refresh Button with countdown */}
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="inline-flex items-center space-x-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 disabled:opacity-50 transition-all shadow-sm"
            title="상태 즉시 새로고침"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-slate-600 dark:text-slate-400 ${
                isLoading ? "animate-spin text-emerald-500" : ""
              }`}
            />
            <span className="hidden md:inline">
              {isLoading ? "동기화 중..." : `새로고침 (${countdown}s)`}
            </span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
            aria-label="테마 전환"
            title={darkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};


