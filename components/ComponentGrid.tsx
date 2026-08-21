"use client";

import React, { useState } from "react";
import { ComponentItem } from "@/lib/types";
import {
  COMPONENT_DICTIONARY,
  COMPONENT_ID_MAP,
  COMPONENT_STATUS_TRANSLATIONS,
  ComponentMeta,
} from "@/lib/translations";
import {
  Layers,
  MessageSquare,
  Cpu,
  Terminal,
  Shield,
  Megaphone,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

interface ComponentGridProps {
  components: ComponentItem[];
  isLoading: boolean;
}

type CategoryKey = "all" | "api" | "chatgpt" | "codex" | "fedramp" | "ads";

export const ComponentGrid: React.FC<ComponentGridProps> = ({
  components,
  isLoading,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "전체 서비스", icon: Layers },
    { id: "api", label: "APIs (12)", icon: Cpu },
    { id: "chatgpt", label: "ChatGPT (15)", icon: MessageSquare },
    { id: "codex", label: "Codex (4)", icon: Terminal },
    { id: "fedramp", label: "FedRAMP (1)", icon: Shield },
    { id: "ads", label: "Ads Platform (2)", icon: Megaphone },
  ];

  // Helper to get metadata
  const getMeta = (comp: ComponentItem): ComponentMeta => {
    const idOverride = COMPONENT_ID_MAP[comp.id];
    const dictEntry = COMPONENT_DICTIONARY[comp.name] || {
      koreanName: comp.name,
      category: "other",
      categoryName: "기타 서비스",
      description: "OpenAI 공식 서비스 컴포넌트",
    };

    return {
      ...dictEntry,
      ...idOverride,
    };
  };

  const filteredComponents = components.filter((comp) => {
    const meta = getMeta(comp);
    const matchesCategory =
      selectedCategory === "all" || meta.category === selectedCategory;
    const matchesSearch =
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meta.koreanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meta.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const operationalCount = components.filter(
    (c) => c.status === "operational"
  ).length;

  return (
    <section className="space-y-6">
      {/* Section Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>서비스별 상세 카드</span>
            <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
              (총 {components.length}개 중 정상 {operationalCount}개)
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            각 개별 세부 서비스의 실시간 가동 상태를 카드 형태로 확인하세요.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="서비스 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as CategoryKey)}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isActive
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/20"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Components */}
      {isLoading && components.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-32 rounded-2xl bg-slate-200/50 dark:bg-slate-800/40 animate-pulse border border-slate-200 dark:border-slate-800"
            />
          ))}
        </div>
      ) : filteredComponents.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
          <HelpCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            검색 결과와 일치하는 서비스가 없습니다.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredComponents.map((comp) => {
            const meta = getMeta(comp);
            const statusConfig =
              COMPONENT_STATUS_TRANSLATIONS[comp.status] ||
              COMPONENT_STATUS_TRANSLATIONS.operational;

            const isNormal = comp.status === "operational";

            return (
              <div
                key={comp.id}
                className={`relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl border transition-all duration-200 hover:shadow-md min-h-[140px] ${
                  isNormal
                    ? "bg-white dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-500/40"
                    : "bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/30 hover:border-amber-500/60"
                }`}
              >
                <div>
                  {/* Top row: Name & Status badge */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug break-keep">
                        {meta.koreanName}
                      </h4>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
                        {comp.name}
                      </p>
                    </div>

                    {/* Status Pill Badge */}
                    <div
                      className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border whitespace-nowrap shrink-0 ${statusConfig.badgeClass}`}
                    >
                      <span className={`w-2 h-2 rounded-full shrink-0 ${statusConfig.dotClass}`} />
                      <span className="whitespace-nowrap">{statusConfig.label}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed break-keep">
                    {meta.description}
                  </p>
                </div>

                {/* Footer of card */}
                <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-medium text-slate-400 dark:text-slate-500">
                    {meta.categoryName}
                  </span>
                  <span className="flex items-center space-x-1">
                    {isNormal ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};


