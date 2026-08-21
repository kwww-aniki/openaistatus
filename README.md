# 🟢 OpenAI 상태(Status) 대시보드 - 한국어판

[status.openai.com](https://status.openai.com)의 공식 실시간 상태 정보를 한국어로 번역 및 현지화(KST 시간 적용)하여 제공하는 Next.js 대시보드 웹 애플리케이션입니다. **Vercel**에 1분 만에 무료 배포할 수 있습니다.

---

## ✨ 주요 기능

- ⚡ **실시간 상태 동기화**: OpenAI 공식 Status API와 자동 연동 (30초 주기 자동 갱신 및 수동 즉시 새로고침)
- 🌐 **완벽한 한국어 로컬라이징**:
  - ChatGPT, Responses(API), Sora, Voice mode, Deep Research, 로그인, 파일 업로드 등 모든 컴포넌트 한글명 및 설명
  - 정상 작동, 성능 저하, 부분 장애, 주요 장애 상태 배지
  - 장애/인시던트 진행 단계(조사 중, 원인 파악 완료, 모니터링 중, 해결 완료) 및 설명 번역
- ⏰ **한국 표준시(KST) 적용**: 모든 타임스탬프를 한국 시간(UTC+9)으로 자동 변환
- 🌓 **다크 모드 & 라이트 모드**: 사용자의 OS 설정 및 브라우저 테마 자동 감지 및 토글 지원
- 🔍 **카테고리 필터 및 검색**: ChatGPT, API 및 모델, 개발자 도구별 필터링 및 실시간 검색
- 🚀 **Vercel 원클릭 배포 지원**: Vercel에 최적화된 Next.js App Router 아키텍처

---

## 🛠️ 로컬 개발 환경 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 로컬 개발 서버 실행
npm run dev

# 3. 브라우저에서 확인
http://localhost:3000
```

---

## 🚀 Vercel 배포 가이드

이 프로젝트는 별도의 데이터베이스나 환경 변수 설정 없이 Vercel에 바로 배포할 수 있습니다.

### 방법 1: GitHub 연동 배포 (가장 추천)

1. 현재 프로젝트를 본인의 GitHub 저장소(Repository)에 푸시(Push)합니다:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: OpenAI Status Korean"
   git branch -M main
   git remote add origin <본인의-깃허브-저장소-URL>
   git push -u origin main
   ```
2. [Vercel 대시보드](https://vercel.com/dashboard)로 이동하여 **"Add New Project"**를 클릭합니다.
3. 방금 푸시한 GitHub 저장소를 선택(Import)합니다.
4. Framework Preset이 **Next.js**로 자동 감지됩니다.
5. **"Deploy"** 버튼을 클릭하면 약 1분 이내에 무료 `.vercel.app` 도메인으로 배포가 완료됩니다!

---

### 방법 2: Vercel CLI로 즉시 배포

터미널에서 Vercel CLI를 통해 바로 배포할 수도 있습니다:

```bash
# Vercel CLI 전역 설치 (미설치 시)
npm i -g vercel

# 배포 실행
vercel
```

---

## 📂 프로젝트 구조

```
├── app/
│   ├── api/
│   │   └── status/
│   │       └── route.ts         # OpenAI Statuspage API 프록시 & 자동 번역 라우트
│   ├── globals.css              # Tailwind CSS 스타일 및 애니메이션
│   ├── layout.tsx               # 루트 레이아웃 & 메타데이터
│   └── page.tsx                 # 대시보드 메인 뷰
├── components/
│   ├── Header.tsx               # 네비게이션 헤더 & 다크모드/새로고침
│   ├── OverallStatusBanner.tsx  # 전체 시스템 상태 요약 배너
│   ├── ComponentGrid.tsx        # 서비스 목록 (카테고리별 그리드)
│   ├── IncidentList.tsx         # 진행 중인 장애 및 최근 해결 이력
│   └── Footer.tsx               # 푸터
├── lib/
│   ├── translations.ts          # 한국어 번역 사전 및 헬퍼 함수
│   └── types.ts                 # Status API 데이터 타입 인터페이스
└── package.json
```


