import { ComponentStatusType, IncidentStatusType, IndicatorType } from "./types";

export interface ComponentMeta {
  koreanName: string;
  category: "api" | "chatgpt" | "codex" | "fedramp" | "ads" | "other";
  categoryName: string;
  description: string;
}

export const COMPONENT_ID_MAP: Record<string, Partial<ComponentMeta>> = {
  // APIs (12 components in official order)
  "01JMXBRMFE6N2NNT7DG6XZQ6PW": {
    koreanName: "Chat Completions",
    category: "api",
    categoryName: "API 및 모델 서비스",
    description: "GPT 대화 및 텍스트 생성 API",
  },
  "01JP8CD9JR3HR6Y7G4Q75N4DVW": {
    koreanName: "Responses",
    category: "api",
    categoryName: "API 및 모델 서비스",
    description: "모델 추론 및 기본 응답 처리 API",
  },
  "01JMXBRMFEMZK0HPK19RYET250": {
    koreanName: "파인튜닝 (Fine-tuning)",
    category: "api",
    categoryName: "API 및 모델 서비스",
    description: "사용자 정의 모델 미세조정 및 학습 API",
  },
  "01JMXBRMFEV0AJ0VVS68N9CD6R": {
    koreanName: "임베딩 API (Embeddings)",
    category: "api",
    categoryName: "API 및 모델 서비스",
    description: "벡터 검색 및 RAG 구축용 임베딩 모델",
  },
  "01JMXBRMFE4MAP2BHSJNZ787WX": {
    koreanName: "이미지 API (Images)",
    category: "api",
    categoryName: "API 및 모델 서비스",
    description: "시각 분석 및 이미지 처리 API",
  },
  "01JMXBRMFE5ESNNV8JDHVCGSRD": {
    koreanName: "배치 처리 API (Batch)",
    category: "api",
    categoryName: "API 및 모델 서비스",
    description: "대량 비동기 요청 50% 할인 처리 서비스",
  },
  "01JMXBRMFEKVBWKK82B44QFMCE": {
    koreanName: "오디오 / 음성 처리 (Audio)",
    category: "api",
    categoryName: "API 및 모델 서비스",
    description: "음성 인식(Whisper) 및 음성 합성(TTS) API",
  },
  "01JMXBRMFEVZ7E0X9GD9FWR9WX": {
    koreanName: "유해성 검사 (Moderations)",
    category: "api",
    categoryName: "API 및 모델 서비스",
    description: "콘텐츠 안전성 및 유해 표현 감지 API",
  },
  "01JMXBRMFEQW613TFE89F45035": {
    koreanName: "실시간 음성 API (Realtime)",
    category: "api",
    categoryName: "API 및 모델 서비스",
    description: "초저지연 실시간 멀티모달 스트리밍 API",
  },
  "01JMXBRMFESJCBGJR10PDD3WCQ": {
    koreanName: "파일 처리 API (Files)",
    category: "api",
    categoryName: "API 및 모델 서비스",
    description: "API 파일 업로드 및 데이터셋 관리 인프라",
  },
  "01JSM5RTJWHRWDTS6Q604VEW3B": {
    koreanName: "API 계정 로그인 (Login)",
    category: "api",
    categoryName: "API 및 모델 서비스",
    description: "OpenAI 개발자 플랫폼 계정 로그인 및 인증",
  },
  "01K9G527YRPY1EFRMHTKB5BKT5": {
    koreanName: "Sora 비디오 생성",
    category: "api",
    categoryName: "API 및 모델 서비스",
    description: "AI 비디오 및 고화질 영상 생성 플랫폼",
  },

  // ChatGPT (15 components in official order)
  "01JMXBNJXGV1T5GT2M9XA83XNG": {
    koreanName: "대화 서비스 (Conversations)",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "ChatGPT 웹 및 모바일 대화 생성 서비스",
  },
  "01JMXBNJXG1S2D9V65P1ZZTD94": {
    koreanName: "ChatGPT 로그인 및 인증",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "ChatGPT 계정 로그인, 가입 및 세션 인증",
  },
  "01KX45G1SH21AX5DT93D4HMF0P": {
    koreanName: "ChatGPT Work",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "기업 및 팀 협업 워크스페이스 기능",
  },
  "01KMKFAMWKQ81YWSE1Z18R6VHR": {
    koreanName: "데스크톱 앱 코덱스 (Codex Desktop)",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "ChatGPT 데스크톱 앱 내 코딩 및 실행 기능",
  },
  "01JNKS9D9S72PMP1938PVFFQN4": {
    koreanName: "컴플라이언스 API (Compliance)",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "기업 및 규제 준수 데이터 감사 API",
  },
  "01JMXBNJXGKKP51D4DEJ2HZJ8Q": {
    koreanName: "웹 검색 (Search)",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "실시간 웹 검색 및 최신 정보 탐색 기능",
  },
  "01JMXBNJXG1YMQPPCPCQX3MPA2": {
    koreanName: "파일 업로드 (File uploads)",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "ChatGPT 대화 내 파일 업로드 인프라",
  },
  "01JMXBNJXGGT5SR5DB9J7GYY48": {
    koreanName: "음성 모드 (Voice mode)",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "실시간 양방향 고급 음성 대화 기능",
  },
  "01JSFK5QX36ZRW0TW0ZV0ZYFXQ": {
    koreanName: "맞춤형 GPTs",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "사용자 맞춤형 커스텀 GPTs 생성 및 실행",
  },
  "01JQ7EKW990MSPSWVXC7VPV2ZJ": {
    koreanName: "DALL·E 이미지 생성",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "ChatGPT 내 DALL·E 기반 고화질 이미지 생성",
  },
  "01JSYVYQSWMJ9QG35XHP08BHA7": {
    koreanName: "심층 리서치 (Deep Research)",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "복합 웹 탐색 및 심층 분석 보고서 작성 기능",
  },
  "01JSG1XMJ9RVJJQ0E85NVSJ2AZ": {
    koreanName: "에이전트 기능 (Agent)",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "자율 실행 및 워크플로우 자동화 에이전트",
  },
  "01K8C008QVXHA6JX98PAS42VPD": {
    koreanName: "ChatGPT 아틀라스 (Atlas)",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "기업용 지식 검색 및 데이터 연동 플랫폼",
  },
  "01KX45G1SHQQ9DTAX9S4W7FV8G": {
    koreanName: "Sites 배포 및 호스팅",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "ChatGPT 생성 웹사이트 배포 및 호스팅",
  },
  "01K6TVGGGDCP0PPGCHXAG3AQX8": {
    koreanName: "앱 연동 커넥터 (Connectors/Apps)",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "외부 서비스(Google Drive, Notion 등) 연동",
  },

  // Codex (4 components in official order)
  "01JVCV8YSWZFRSM1G5CVP253SK": {
    koreanName: "코덱스 웹 (Codex Web)",
    category: "codex",
    categoryName: "Codex 도구",
    description: "웹 기반 코드 생성 및 실행 샌드박스",
  },
  "01KMP3KP5MGE23B80K1EK4S8PV": {
    koreanName: "코덱스 API (Codex API)",
    category: "codex",
    categoryName: "Codex 도구",
    description: "Codex 모델 전용 프로그래밍 API",
  },
  "01KMKFAMWKNQ84Z1766MV08ZDE": {
    koreanName: "CLI 개발자 도구",
    category: "codex",
    categoryName: "Codex 도구",
    description: "터미널 명령줄 개발자 CLI 도구",
  },
  "01KMP3KP5M8X0EBTVW6KN327EE": {
    koreanName: "VS Code 확장 프로그램",
    category: "codex",
    categoryName: "Codex 도구",
    description: "Visual Studio Code용 공식 OpenAI 도구 확장",
  },

  // FedRAMP (1 component in official order)
  "01KKAD7C71MCCH3FTREMJH4AAS": {
    koreanName: "FedRAMP 공공 클라우드",
    category: "fedramp",
    categoryName: "FedRAMP",
    description: "정부 및 공공 기관 인증 클라우드 인프라",
  },

  // Ads Platform (2 components in official order)
  "01KTQBYVARFJ5KMCSECM06VKCF": {
    koreanName: "광고 관리자 (Ads Manager)",
    category: "ads",
    categoryName: "Ads Platform",
    description: "광고주 캠페인 및 계정 관리 대시보드",
  },
  "01KVR95C58GGWHV7RYBT32NP11": {
    koreanName: "광고 API (Ads API)",
    category: "ads",
    categoryName: "Ads Platform",
    description: "광고 파트너십 및 비즈니스 연동 API",
  },
};

export const COMPONENT_DICTIONARY: Record<string, ComponentMeta> = {
  "Chat Completions": {
    koreanName: "Chat Completions",
    category: "api",
    categoryName: "API 및 모델 서비스",
    description: "GPT 대화 및 텍스트 생성 API",
  },
  "Responses": {
    koreanName: "Responses",
    category: "api",
    categoryName: "API 및 모델 서비스",
    description: "모델 추론 및 기본 응답 처리 API",
  },
  "Fine-tuning": {
    koreanName: "파인튜닝 (Fine-tuning)",
    category: "api",
    categoryName: "API 및 모델 서비스",
    description: "사용자 정의 모델 미세조정 및 학습 시스템",
  },
  "Embeddings": {
    koreanName: "임베딩 API (Embeddings)",
    category: "api",
    categoryName: "API 및 모델 서비스",
    description: "벡터 검색 및 RAG 구축용 텍스트 임베딩",
  },
  "Images": {
    koreanName: "이미지 API (Images)",
    category: "api",
    categoryName: "API 및 모델 서비스",
    description: "시각 분석 및 이미지 처리 API",
  },
  "Batch": {
    koreanName: "배치 처리 API (Batch)",
    category: "api",
    categoryName: "API 및 모델 서비스",
    description: "대량 비동기 요청 50% 할인 처리 서비스",
  },
  "Audio": {
    koreanName: "오디오 / 음성 처리 (Audio)",
    category: "api",
    categoryName: "API 및 모델 서비스",
    description: "음성 인식(Whisper) 및 음성 합성(TTS) API",
  },
  "Moderations": {
    koreanName: "유해성 검사 (Moderations)",
    category: "api",
    categoryName: "API 및 모델 서비스",
    description: "콘텐츠 안전성 및 유해 표현 감지 API",
  },
  "Realtime": {
    koreanName: "실시간 음성 API (Realtime)",
    category: "api",
    categoryName: "API 및 모델 서비스",
    description: "초저지연 실시간 멀티모달 스트리밍 API",
  },
  "Files": {
    koreanName: "파일 처리 API (Files)",
    category: "api",
    categoryName: "API 및 모델 서비스",
    description: "API 파일 업로드 및 데이터셋 관리 인프라",
  },
  "Sora": {
    koreanName: "Sora 비디오 생성",
    category: "api",
    categoryName: "API 및 모델 서비스",
    description: "AI 비디오 및 고화질 영상 생성 플랫폼",
  },
  "Image Generation": {
    koreanName: "DALL·E 이미지 생성",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "ChatGPT 내 DALL·E 기반 고화질 이미지 생성",
  },
  "Compliance API": {
    koreanName: "컴플라이언스 API (Compliance)",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "기업 및 규제 준수 데이터 감사 API",
  },
  "Conversations": {
    koreanName: "대화 서비스 (Conversations)",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "ChatGPT 웹 및 모바일 대화 생성 서비스",
  },
  "Login": {
    koreanName: "로그인 및 인증",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "사용자 계정 로그인, 가입 및 세션 인증",
  },
  "Search": {
    koreanName: "웹 검색 (Search)",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "실시간 웹 검색 및 최신 정보 탐색 기능",
  },
  "Voice mode": {
    koreanName: "음성 모드 (Voice mode)",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "실시간 양방향 고급 음성 대화 기능",
  },
  "Deep Research": {
    koreanName: "심층 리서치 (Deep Research)",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "복합 웹 탐색 및 심층 분석 보고서 작성 기능",
  },
  "ChatGPT Atlas": {
    koreanName: "ChatGPT 아틀라스 (Atlas)",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "기업용 지식 검색 및 데이터 연동 플랫폼",
  },
  "ChatGPT Work": {
    koreanName: "ChatGPT Work",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "기업 및 팀 협업 워크스페이스 기능",
  },
  "GPTs": {
    koreanName: "맞춤형 GPTs",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "사용자 맞춤형 커스텀 GPTs 생성 및 실행",
  },
  "Agent": {
    koreanName: "에이전트 기능 (Agent)",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "자율 실행 및 워크플로우 자동화 에이전트",
  },
  "File uploads": {
    koreanName: "파일 업로드 (File uploads)",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "ChatGPT 내 파일 업로드 인프라",
  },
  "Sites": {
    koreanName: "Sites 배포 및 호스팅",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "ChatGPT 생성 웹사이트 배포 및 호스팅",
  },
  "Connectors/Apps": {
    koreanName: "앱 연동 커넥터 (Connectors/Apps)",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "외부 서비스(Google Drive, Notion 등) 연동",
  },
  "Codex in ChatGPT Desktop": {
    koreanName: "데스크톱 앱 코덱스 (Codex Desktop)",
    category: "chatgpt",
    categoryName: "ChatGPT 서비스",
    description: "ChatGPT 데스크톱 앱 내 코딩 및 실행 기능",
  },
  "Codex Web": {
    koreanName: "코덱스 웹 (Codex Web)",
    category: "codex",
    categoryName: "Codex 도구",
    description: "웹 기반 코드 생성 및 실행 샌드박스",
  },
  "Codex API": {
    koreanName: "코덱스 API (Codex API)",
    category: "codex",
    categoryName: "Codex 도구",
    description: "Codex 모델 전용 프로그래밍 API",
  },
  "VS Code extension": {
    koreanName: "VS Code 확장 프로그램",
    category: "codex",
    categoryName: "Codex 도구",
    description: "Visual Studio Code용 공식 OpenAI 도구 확장",
  },
  "CLI": {
    koreanName: "CLI 개발자 도구",
    category: "codex",
    categoryName: "Codex 도구",
    description: "터미널 명령줄 개발자 CLI 도구",
  },
  "FedRAMP": {
    koreanName: "FedRAMP 공공 클라우드",
    category: "fedramp",
    categoryName: "FedRAMP",
    description: "정부 및 공공 기관 인증 클라우드 인프라",
  },
  "Ads API": {
    koreanName: "광고 API (Ads API)",
    category: "ads",
    categoryName: "Ads Platform",
    description: "광고 파트너십 및 비즈니스 연동 API",
  },
  "Ads Manager": {
    koreanName: "광고 관리자 (Ads Manager)",
    category: "ads",
    categoryName: "Ads Platform",
    description: "광고주 캠페인 및 계정 관리 대시보드",
  },
};

export const STATUS_TRANSLATIONS: Record<
  IndicatorType,
  { label: string; bgClass: string; textClass: string; badgeClass: string }
> = {
  none: {
    label: "모든 시스템 정상 작동 중",
    bgClass: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
    textClass: "text-emerald-500",
    badgeClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800",
  },
  minor: {
    label: "일부 시스템 성능 저하 / 경미한 문제",
    bgClass: "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400",
    textClass: "text-amber-500",
    badgeClass: "bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800",
  },
  major: {
    label: "주요 서비스 장애 발생",
    bgClass: "bg-orange-500/10 border-orange-500/30 text-orange-600 dark:text-orange-400",
    textClass: "text-orange-500",
    badgeClass: "bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300 border-orange-300 dark:border-orange-800",
  },
  critical: {
    label: "치명적인 서비스 중단 / 전면 장애",
    bgClass: "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400",
    textClass: "text-red-500",
    badgeClass: "bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-300 border-red-300 dark:border-red-800",
  },
  maintenance: {
    label: "정기 시스템 점검 진행 중",
    bgClass: "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400",
    textClass: "text-blue-500",
    badgeClass: "bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300 dark:border-blue-800",
  },
};

export const COMPONENT_STATUS_TRANSLATIONS: Record<
  ComponentStatusType,
  { label: string; dotClass: string; textClass: string; badgeClass: string }
> = {
  operational: {
    label: "정상 작동",
    dotClass: "bg-emerald-500 shadow-emerald-500/50 shadow-[0_0_6px]",
    textClass: "text-emerald-600 dark:text-emerald-400",
    badgeClass: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60",
  },
  degraded_performance: {
    label: "성능 저하",
    dotClass: "bg-amber-500 shadow-amber-500/50 shadow-[0_0_6px]",
    textClass: "text-amber-600 dark:text-amber-400",
    badgeClass: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800/60",
  },
  partial_outage: {
    label: "일부 장애",
    dotClass: "bg-orange-500 shadow-orange-500/50 shadow-[0_0_6px]",
    textClass: "text-orange-600 dark:text-orange-400",
    badgeClass: "bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300 border-orange-200 dark:border-orange-800/60",
  },
  major_outage: {
    label: "주요 장애",
    dotClass: "bg-red-500 shadow-red-500/50 shadow-[0_0_6px]",
    textClass: "text-red-600 dark:text-red-400",
    badgeClass: "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 border-red-200 dark:border-red-800/60",
  },
  under_maintenance: {
    label: "점검 중",
    dotClass: "bg-blue-500 shadow-blue-500/50 shadow-[0_0_6px]",
    textClass: "text-blue-600 dark:text-blue-400",
    badgeClass: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200 dark:border-blue-800/60",
  },
};

export const INCIDENT_STATUS_TRANSLATIONS: Record<
  IncidentStatusType,
  { label: string; colorClass: string; badgeClass: string }
> = {
  investigating: {
    label: "원인 조사 중",
    colorClass: "text-red-500",
    badgeClass: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border-red-300 dark:border-red-800",
  },
  identified: {
    label: "원인 파악 완료 (완화 조치 중)",
    colorClass: "text-amber-500",
    badgeClass: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-800",
  },
  monitoring: {
    label: "조치 후 모니터링 중",
    colorClass: "text-blue-500",
    badgeClass: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300 dark:border-blue-800",
  },
  resolved: {
    label: "해결 완료",
    colorClass: "text-emerald-500",
    badgeClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800",
  },
  postmortem: {
    label: "사후 보고서",
    colorClass: "text-purple-500",
    badgeClass: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300 dark:border-purple-800",
  },
};

/**
 * Exact known incident dictionary for 100% precision
 */
const KNOWN_INCIDENTS_DICT: Record<string, string> = {
  "Chatgpt.com is down - all signups and logins are down as of right now":
    "Chatgpt.com 접속 장애 - 현재 모든 신규 가입 및 로그인 일시 중단",
  "Elevated errors deploying Sites":
    "사이트 배포 오류율 증가",
  "Elevated errors in ChatGPT conversations for Free users":
    "ChatGPT 무료 사용자 대상 대화 오류율 증가",
  "Error while creating custom RBAC roles for Enterprise users":
    "Enterprise 사용자 맞춤형 RBAC 권한 역할 생성 오류",
  "Increase in errors on API, Codex and Work Mode":
    "API, 코덱스 및 워크 모드(Work Mode) 오류 발생 증가",
  "Users unable to login to ads manager":
    "광고 관리자(Ads Manager) 로그인 불가 현상",
  "Increased error rates":
    "전반적인 서비스 오류율 증가",
  "Elevated errors affecting ChatGPT Go conversations":
    "ChatGPT Go 대화 기능 오류율 증가",
  "Increased errors for some ChatGPT users":
    "일부 ChatGPT 사용자 대상 오류율 증가",
  "Elevated errors with image generation":
    "이미지 생성 기능 오류율 증가",
  "Issues with Custom GPT actions":
    "Custom GPT 액션(Action) 실행 오류",
  "Elevated errors in ChatGPT conversations with files":
    "파일 첨부 대화 시 오류율 증가",
  "Elevated ChatGPT conversation errors affecting Plus, Pro, Business, and Edu users":
    "Plus, Pro, Business, Edu 사용자 ChatGPT 대화 오류율 증가",
  "Enterprise & Education Chat Errors":
    "기업 및 교육용 계정 채팅 오류",
  "Elevated errors affecting ChatGPT conversations":
    "ChatGPT 대화 서비스 오류율 증가",
  "Elevated error rates with the invalid_prompt error code":
    "invalid_prompt 에러 코드를 동반한 오류율 증가",
  "Elevated Image Generation Error Rate in ChatGPT":
    "ChatGPT 내 이미지 생성 오류율 증가",
  "Image generation unavailable in ChatGPT":
    "ChatGPT 내 이미지 생성 기능 일시 불가",
  "We’re seeing elevated latency, timeouts, and interrupted streaming across gpt 5.1 mini model and gpt 4.1 mini":
    "gpt 5.1 mini 및 gpt 4.1 mini 모델의 응답 지연, 타임아웃 및 스트리밍 끊김 현상",
  "Elevated Errors in Codex Review":
    "코덱스 리뷰(Codex Review) 기능 오류율 증가",
  "Elevated API error rates and latency on gpt-image-2 model":
    "gpt-image-2 모델의 API 오류율 및 응답 지연 시간 증가",
  "FedRAMP workspaces and API orgs have degraded performance":
    "FedRAMP 워크스페이스 및 API 조직 성능 저하",
};

/**
 * Universal Intelligent Translator for OpenAI Status incidents & body updates
 */
export function translateIncidentText(text: string): string {
  if (!text) return "";

  const trimmed = text.trim();
  if (KNOWN_INCIDENTS_DICT[trimmed]) {
    return KNOWN_INCIDENTS_DICT[trimmed];
  }

  let result = text;

  // 1. Sentences & common Statuspage phrases
  const sentenceMap: [RegExp, string][] = [
    [/All impacted services have now fully recovered\./gi, "영향을 받은 모든 서비스가 정상적으로 완전 복구되었습니다."],
    [/We have applied the mitigation and are monitoring the recovery\./gi, "긴급 완화 조치를 적용하였으며 정상화 여부를 모니터링하고 있습니다."],
    [/We have applied a mitigation and are monitoring recovery\./gi, "완화 조치가 적용되었으며 복구 상황을 모니터링 중입니다."],
    [/We have identified that users are experiencing login issues for the impacted services\./gi, "영향을 받는 서비스에서 사용자의 로그인 문제가 발생하고 있는 것을 확인했습니다."],
    [/We have identified that users are experiencing elevated errors for the impacted services\./gi, "영향을 받는 서비스에서 비정상적으로 높은 오류율이 발생하고 있는 것을 확인했습니다."],
    [/We are still investigating the issue for the listed services\./gi, "목록에 기재된 서비스의 장애 원인을 지속적으로 조사하고 있습니다."],
    [/We are working on implementing a mitigation\./gi, "현재 장애 완화 및 긴급 복구 조치를 적용하고 있습니다."],
    [/We are continuing to investigate this issue\./gi, "현재 본 장애 원인을 지속적으로 조사하고 있습니다."],
    [/We are investigating the issue for the listed services\./gi, "목록에 기재된 서비스의 장애 원인을 조사하고 있습니다."],
    [/The issue affecting site deployments has been resolved\./gi, "사이트 배포에 영향을 미치던 문제가 해결되었습니다."],
    [/We have implemented a mitigation for the issue affecting site deployments and are monitoring the results\./gi, "사이트 배포 관련 문제에 대한 완화 조치가 적용되었으며 결과를 모니터링 중입니다."],
    [/We have identified an issue causing elevated errors when deploying Sites\. We are working to implement a mitigation\./gi, "사이트 배포 시 오류를 유발하는 원인을 확인하여 복구 조치를 진행 중입니다."],
    [/The issue has been resolved and all services are operating normally\./gi, "문제가 완전히 해결되었으며 모든 서비스가 정상 작동하고 있습니다."],
    [/The issue has been resolved and all systems are operational\./gi, "문제가 해결되었으며 모든 시스템이 정상화되었습니다."],
    [/This incident has been resolved\./gi, "해당 장애가 완전히 해결되었습니다."],
    [/We have restored service and are monitoring for stability\./gi, "서비스가 복구되었으며 안정성을 면밀히 모니터링하고 있습니다."],
    [/We have identified the root cause and are working on a fix\./gi, "근본 원인을 파악하였으며 해결 패치를 준비하고 있습니다."],
    [/Scheduled Maintenance/gi, "정기 시스템 점검"],
  ];

  for (const [pattern, replacement] of sentenceMap) {
    result = result.replace(pattern, replacement);
  }

  // 2. Dynamic Grammatical Patterns
  const dynamicPatterns: [RegExp, string][] = [
    [/Elevated API error rates and latency on (.+)/i, "$1의 API 오류율 및 응답 지연 시간 증가"],
    [/Elevated error rates and latency on (.+)/i, "$1의 오류율 및 응답 지연 시간 증가"],
    [/Elevated errors in (.+) conversations for (.+)/i, "$2 대상 $1 대화 오류율 증가"],
    [/Elevated errors in (.+) conversations with files/i, "$1 파일 첨부 대화 오류율 증가"],
    [/Elevated errors in (.+) conversations/i, "$1 대화 오류율 증가"],
    [/Elevated errors affecting (.+) conversations/i, "$1 대화 서비스 오류율 증가"],
    [/Elevated errors affecting (.+)/i, "$1 관련 오류율 증가"],
    [/Elevated errors with (.+)/i, "$1 관련 오류율 증가"],
    [/Elevated errors deploying (.+)/i, "$1 배포 오류율 증가"],
    [/Elevated errors in (.+)/i, "$1 오류율 증가"],
    [/Increase in errors on (.+)/i, "$1 관련 오류 발생 증가"],
    [/Increased errors for some (.+) users/i, "일부 $1 사용자 대상 오류율 증가"],
    [/Increased errors for (.+)/i, "$1 대상 오류율 증가"],
    [/Increased error rates on (.+)/i, "$1 오류율 증가"],
    [/Increased error rates/i, "전반적인 서비스 오류율 증가"],
    [/Elevated error rates/i, "전반적인 서비스 오류율 증가"],
    [/Issues with (.+)/i, "$1 관련 장애 및 오류"],
    [/Users unable to login to (.+)/i, "$1 로그인 불가 현상"],
    [/Error while creating (.+) for (.+)/i, "$2 대상 $1 생성 오류"],
    [/(.+) is down - (.+)/i, "$1 접속 장애 - $2"],
    [/(.+) unavailable in (.+)/i, "$2 내 $1 일시 이용 불가"],
    [/(.+) have degraded performance/i, "$1 성능 저하"],
  ];

  for (const [pattern, replacement] of dynamicPatterns) {
    if (pattern.test(result)) {
      result = result.replace(pattern, replacement);
      break;
    }
  }

  // 3. Keyword / Terminology cleanup
  const termMap: [RegExp, string][] = [
    [/image generation/gi, "이미지 생성"],
    [/deploying Sites/gi, "사이트 배포"],
    [/custom RBAC roles/gi, "맞춤형 RBAC 역할"],
    [/Enterprise users/gi, "Enterprise 사용자"],
    [/Free users/gi, "무료 사용자"],
    [/Work Mode/gi, "워크 모드"],
    [/Codex Review/gi, "코덱스 리뷰"],
    [/ads manager/gi, "광고 관리자"],
    [/Custom GPT actions/gi, "Custom GPT 액션"],
    [/gpt-image-2 model/gi, "gpt-image-2 모델"],
    [/model/gi, "모델"],
    [/FedRAMP workspaces and API orgs/gi, "FedRAMP 워크스페이스 및 API 조직"],
  ];

  for (const [term, koTerm] of termMap) {
    result = result.replace(term, koTerm);
  }

  return result;
}

/**
 * Format ISO date string into KST (한국 표준시, UTC+9)
 */
export function formatKST(dateString: string | undefined | null): string {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return new Intl.DateTimeFormat("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date) + " (KST)";
  } catch {
    return dateString;
  }
}

/**
 * Format ISO date string into UTC (세계 표준시)
 */
export function formatUTC(dateString: string | undefined | null): string {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return new Intl.DateTimeFormat("ko-KR", {
      timeZone: "UTC",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date) + " (UTC)";
  } catch {
    return dateString;
  }
}

/**
 * Relative time in Korean
 */
export function timeAgoKST(dateString: string | undefined | null): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSec < 60) return "방금 전";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}분 전`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}시간 전`;
    return `${Math.floor(diffSec / 86400)}일 전`;
  } catch {
    return "";
  }
}


