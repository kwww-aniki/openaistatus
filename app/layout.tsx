import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenAI 서비스 상태 대시보드 (한국어)",
  description: "ChatGPT, OpenAI API, Sora, 음성 모드 등 OpenAI 주요 서비스의 실시간 가동 현황 및 장애 이력을 한국어로 확인하세요.",
  keywords: ["OpenAI", "ChatGPT", "Status", "서버 상태", "장애", "API 상태", "한국어"],
  authors: [{ name: "OpenAI Status KR" }],
  openGraph: {
    title: "OpenAI 서비스 상태 대시보드 (한국어)",
    description: "실시간 ChatGPT 및 OpenAI API 서비스 상태 모니터링",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased font-sans selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}


