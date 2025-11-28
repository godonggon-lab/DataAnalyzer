# Data Visualizer

대용량 CSV/Excel 파일을 브라우저에서 직접 처리하고 시각화하는 고성능 웹 애플리케이션입니다.

## ✨ 주요 기능

- 📊 **대용량 파일 처리**: 수십 MB~100MB 규모의 CSV/Excel 파일 지원
- ⚡ **고성능 파싱**: WebWorker를 활용한 백그라운드 처리
- 🎨 **동적 시각화**: ECharts 기반의 인터랙티브 차트 (Scatter, Line, Bar)
- 🔍 **자동 타입 추론**: 컬럼 데이터 타입 자동 감지 (숫자, 문자열, 날짜)
- 🎯 **다운샘플링**: LTTB 알고리즘으로 대용량 데이터를 효율적으로 시각화
- 🔒 **클라이언트 전용**: 데이터는 브라우저에서만 처리 (서버 업로드 없음)
- 📱 **반응형 디자인**: 모든 화면 크기에서 최적화된 UX

## 🛠 기술 스택

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: TailwindCSS 3
- **State Management**: Zustand 4
- **Chart Library**: ECharts 5 + echarts-for-react
- **CSV Parser**: PapaParse 5 (streaming mode)
- **Excel Parser**: SheetJS (xlsx)
- **Performance**: WebWorker API

## 📁 프로젝트 구조

```
ToyProject/
├── src/
│   ├── components/
│   │   ├── FileUploader.tsx      # 파일 업로드 (Drag & Drop)
│   │   ├── ColumnSelector.tsx    # X/Y축 컬럼 선택
│   │   ├── ChartRenderer.tsx     # ECharts 차트 렌더링
│   │   └── DataStats.tsx         # 데이터 통계 정보
│   ├── workers/
│   │   ├── csvParser.worker.ts   # CSV 파싱 WebWorker
│   │   └── excelParser.worker.ts # Excel 파싱 WebWorker
│   ├── utils/
│   │   ├── parseCSV.ts           # CSV 파싱 유틸리티
│   │   ├── parseExcel.ts         # Excel 파싱 유틸리티
│   │   ├── typeInference.ts      # 데이터 타입 추론
│   │   └── dataSampling.ts       # 다운샘플링 (LTTB)
│   ├── store/
│   │   └── dataStore.ts          # Zustand 전역 상태
│   ├── types/
│   │   └── index.ts              # TypeScript 타입 정의
│   ├── App.tsx                   # 메인 앱 컴포넌트
│   ├── main.tsx                  # React 진입점
│   └── index.css                 # 전역 스타일
├── public/
│   └── vite.svg                  # 파비콘
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🚀 시작하기

### 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

### 사용 방법

1. **파일 업로드**
   - 브라우저에서 `http://localhost:5173` 접속
   - CSV 또는 Excel 파일을 Drag & Drop 또는 파일 선택 버튼으로 업로드
   - 지원 형식: `.csv`, `.xlsx`, `.xls`

2. **컬럼 선택**
   - 업로드 완료 후 자동으로 컬럼 목록이 표시됩니다
   - X축과 Y축에 사용할 컬럼을 선택
   - 숫자형 컬럼 권장 (자동 validation 제공)
   - 차트 타입 선택 (Scatter, Line, Bar)

3. **데이터 시각화**
   - 컬럼 선택 즉시 차트가 렌더링됩니다
   - 차트 인터랙션:
     - 마우스 휠: 확대/축소
     - 드래그: 팬 (이동)
     - 툴팁: 데이터 포인트에 마우스 오버
     - 툴박스: 저장, 복원 등

## 📊 성능 최적화

### WebWorker
- CSV/Excel 파싱을 메인 스레드와 분리
- UI 블로킹 없이 대용량 파일 처리

### 스트리밍 파싱
- PapaParse의 chunk 모드로 메모리 효율적 처리
- 진행률 실시간 업데이트

### 다운샘플링
- LTTB (Largest-Triangle-Three-Buckets) 알고리즘 사용
- 10,000 포인트로 자동 제한 (설정 가능)
- 시각적 품질 유지하면서 성능 향상

### 메모리 관리
- TypedArray 활용
- 불필요한 데이터 복사 최소화

## 🎨 디자인 특징

- **다크 모드**: 눈의 피로를 줄이는 프리미엄 다크 테마
- **글래스모피즘**: 반투명 배경과 블러 효과
- **그라디언트**: 생동감 있는 색상 전환
- **애니메이션**: 부드러운 전환 효과
- **반응형**: 모바일, 태블릿, 데스크톱 대응

## 🔮 향후 확장 기능

### 필터링
- 조건부 데이터 필터링
- 범위 선택
- 다중 조건 조합

### 정렬
- 컬럼별 정렬
- 다중 컬럼 정렬

### 통계
- 기술 통계량 (평균, 중앙값, 표준편차 등)
- 상관관계 분석
- 히스토그램

### 데이터 다운로드
- 필터링/정렬된 데이터 CSV 내보내기
- 차트 이미지 저장
- PDF 리포트 생성

### 다중 Y축
- 여러 Y축 컬럼 동시 선택
- 비교 차트

## 🤝 기여

이슈와 풀 리퀘스트를 환영합니다!

## 📄 라이선스

MIT License

## 👨‍💻 개발자

Built with ❤️ using modern web technologies
