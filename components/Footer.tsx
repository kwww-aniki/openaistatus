import React from "react";
import { ExternalLink, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-8 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3">
          <span>본 사이트는 공식 OpenAI 상태 정보를 한국어로 실시간 번역하여 제공합니다.</span>
        </div>

        <div className="flex items-center space-x-4">
          <a
            href="https://status.openai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
          >
            <span>OpenAI 공식 Status</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
          >
            <span>Vercel 배포</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
};


