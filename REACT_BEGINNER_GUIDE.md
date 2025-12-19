# ?? React 초보자를 위한 DataAnalyzer 프로젝트 완벽 가이드

> 이 문서는 React를 처음 접하는 개발자를 위해 작성되었습니다.  
> 차근차근 읽어보면서 이 프로젝트가 어떻게 구성되어 있는지 이해해봅시다! ??

---

## ?? 목차

1. [프로젝트 소개](#1-프로젝트-소개)
2. [기술 스택과 도구](#2-기술-스택과-도구)
3. [프로젝트 구조](#3-프로젝트-구조)
4. [React 핵심 개념 설명](#4-react-핵심-개념-설명)
5. [주요 컴포넌트 분석](#5-주요-컴포넌트-분석)
6. [상태 관리 (Zustand)](#6-상태-관리-zustand)
7. [커스텀 Hook 활용](#7-커스텀-hook-활용)
8. [고급 기법과 최적화](#8-고급-기법과-최적화)
9. [실전 팁](#9-실전-팁)

---

## 1. 프로젝트 소개

### ?? DataAnalyzer가 하는 일

DataAnalyzer는 **CSV/Excel 파일을 업로드하고 시각화하는 웹 애플리케이션**입니다.

- ?? 대용량 데이터 처리 (수백만 행)
- ?? 다양한 차트 제공 (Scatter, Line, Bar, Histogram, Box Plot 등)
- ?? 다크/라이트 테마 전환
- ?? 차트에 수동으로 포인트 마킹 (Annotation 기능)
- ?? 데이터 변환 및 필터링

### ?? 이 프로젝트로 배울 수 있는 것

- React 컴포넌트 구조
- 상태 관리 (Zustand)
- 커스텀 Hook 작성법
- 성능 최적화 기법
- TypeScript 사용법
- SEO 최적화
- Google Analytics 연동

---

## 2. 기술 스택과 도구

### ??? 주요 기술

#### React 18
```
React는 사용자 인터페이스(UI)를 만들기 위한 JavaScript 라이브러리입니다.
```

**왜 React를 사용하나요?**
- ?? **컴포넌트 기반**: UI를 작은 조각(컴포넌트)으로 나눠서 재사용 가능
- ? **빠른 렌더링**: Virtual DOM으로 변경사항만 업데이트
- ?? **대규모 커뮤니티**: 수많은 라이브러리와 도구 지원

#### Vite
```
Vite는 빠른 개발 서버와 빌드 도구입니다.
```

**왜 Vite를 사용하나요?**
- ? **엄청나게 빠름**: 기존 webpack보다 10배 이상 빠른 개발 서버
- ?? **Hot Module Replacement (HMR)**: 코드 변경 시 페이지 새로고침 없이 즉시 반영
- ?? **간단한 설정**: 복잡한 설정 파일 필요 없음

#### TypeScript
```
TypeScript는 JavaScript에 타입(type)을 추가한 언어입니다.
```

**왜 TypeScript를 사용하나요?**
- ? **에러 사전 방지**: 코드 작성 중에 실수를 미리 발견
- ?? **자동 완성**: VS Code에서 자동 완성 지원
- ??? **안정성**: 대규모 프로젝트에서 버그 감소

#### Zustand
```
Zustand는 상태 관리 라이브러리입니다.
```

**왜 Zustand를 사용하나요?**
- ?? **간단함**: Redux보다 훨씬 간단한 API
- ?? **작은 용량**: 1KB 미만
- ? **빠름**: 불필요한 리렌더링 없음

#### Tailwind CSS
```
Tailwind CSS는 유틸리티 기반 CSS 프레임워크입니다.
```

**왜 Tailwind CSS를 사용하나요?**
- ?? **빠른 스타일링**: HTML에서 바로 스타일 적용
- ?? **반응형 디자인**: 모바일/태블릿/데스크톱 대응 쉬움
- ?? **일관성**: 디자인 시스템 자동 유지

---

## 3. 프로젝트 구조

```
DataAnalyzer/
├── public/                    # 정적 파일 (이미지, sitemap 등)
│   ├── sitemap.xml           # SEO용 사이트맵
│   └── favicon.svg           # 파비콘
│
├── src/                       # 소스 코드
│   ├── components/           # 재사용 가능한 UI 컴포넌트
│   │   ├── layout/          # 레이아웃 컴포넌트
│   │   │   ├── Layout.tsx   # 전체 페이지 레이아웃
│   │   │   ├── Header.tsx   # 헤더 (네비게이션)
│   │   │   └── Footer.tsx   # 푸터
│   │   ├── ChartRenderer.tsx     # 차트 렌더링 (핵심!)
│   │   ├── ColumnSelector.tsx    # 컬럼 선택 UI
│   │   ├── FileUploader.tsx      # 파일 업로드
│   │   ├── SEO.tsx               # SEO 메타 태그
│   │   └── ...
│   │
│   ├── pages/                # 페이지 컴포넌트
│   │   ├── Home.tsx         # 홈 페이지
│   │   ├── Workspace.tsx    # 작업 공간 (차트 생성)
│   │   ├── About.tsx        # 소개 페이지
│   │   └── ...
│   │
│   ├── store/               # 상태 관리
│   │   ├── dataStore.ts    # 데이터 상태 (Zustand)
│   │   └── themeStore.ts   # 테마 상태
│   │
│   ├── hooks/              # 커스텀 Hook
│   │   └── useDebounceThrottle.ts
│   │
│   ├── utils/              # 유틸리티 함수
│   │   ├── fileParser.ts   # 파일 파싱
│   │   ├── statistics.ts   # 통계 계산
│   │   ├── dataSampling.ts # 데이터 샘플링
│   │   └── analytics.ts    # Google Analytics
│   │
│   ├── types/              # TypeScript 타입 정의
│   │   └── index.ts
│   │
│   ├── App.tsx             # 메인 앱 컴포넌트
│   ├── main.tsx            # 진입점 (Entry Point)
│   └── index.css           # 전역 스타일
│
├── index.html              # HTML 템플릿
├── vite.config.ts          # Vite 설정
├── tsconfig.json           # TypeScript 설정
├── tailwind.config.js      # Tailwind CSS 설정
└── package.json            # 프로젝트 정보 및 의존성
```

---

## 4. React 핵심 개념 설명

### 4.1 컴포넌트 (Component)

**컴포넌트는 UI의 작은 조각입니다.**

```tsx
// 가장 간단한 컴포넌트
function HelloWorld() {
    return <h1>Hello, World!</h1>;
}

// 화살표 함수로 작성
const HelloWorld: React.FC = () => {
    return <h1>Hello, World!</h1>;
};
```

**우리 프로젝트의 예시:**
```tsx
// src/components/ThemeToggle.tsx
const ThemeToggle: React.FC = () => {
    return (
        <button onClick={toggleTheme}>
            {theme === 'dark' ? '??' : '??'}
        </button>
    );
};
```

### 4.2 Props (속성)

**Props는 부모 컴포넌트가 자식 컴포넌트에게 데이터를 전달하는 방법입니다.**

```tsx
// Props 타입 정의
interface SEOProps {
    title?: string;
    description?: string;
}

// Props를 받는 컴포넌트
const SEO: React.FC<SEOProps> = ({ title, description }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>
    );
};

// 사용 예시
<SEO title="데이터 분석 툴" description="무료 CSV 분석 도구" />
```

**왜 Props를 사용하나요?**
- ?? **재사용성**: 같은 컴포넌트를 다른 데이터로 여러 번 사용
- ?? **독립성**: 컴포넌트를 독립적으로 만들어 유지보수 쉬움

### 4.3 State (상태)

**State는 컴포넌트가 가지고 있는 데이터입니다. 변경되면 자동으로 화면이 업데이트됩니다.**

```tsx
import { useState } from 'react';

function Counter() {
    // [현재값, 값을변경하는함수] = useState(초기값)
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>카운트: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                증가
            </button>
        </div>
    );
}
```

**우리 프로젝트의 예시:**
```tsx
// src/components/ChartRenderer.tsx
const ChartRenderer: React.FC = () => {
    const [isChartLoading, setIsChartLoading] = useState(false);
    
    // isChartLoading이 true면 로딩 스피너 표시
    if (isChartLoading) {
        return <LoadingSpinner />;
    }
    
    return <Chart />;
};
```

### 4.4 useEffect (부수 효과)

**useEffect는 컴포넌트가 렌더링된 후 실행할 코드를 작성하는 Hook입니다.**

```tsx
import { useEffect } from 'react';

function UserProfile({ userId }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // 컴포넌트가 마운트되면 실행
        fetch(`/api/users/${userId}`)
            .then(res => res.json())
            .then(data => setUser(data));
        
        // cleanup 함수 (컴포넌트가 사라질 때 실행)
        return () => {
            console.log('컴포넌트 언마운트');
        };
    }, [userId]); // userId가 변경될 때마다 실행

    return <div>{user?.name}</div>;
}
```

**우리 프로젝트의 예시:**
```tsx
// src/components/ChartRenderer.tsx
useEffect(() => {
    // 윈도우 리사이즈 감지
    const handleResize = () => {
        chartRef.current?.resize();
    };

    window.addEventListener('resize', handleResize);

    // cleanup: 이벤트 리스너 제거
    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);
```

### 4.5 useMemo (메모이제이션)

**useMemo는 비싼 계산의 결과를 캐싱(저장)하는 Hook입니다.**

```tsx
import { useMemo } from 'react';

function ProductList({ products, filter }) {
    // filter가 변경될 때만 재계산
    const filteredProducts = useMemo(() => {
        console.log('필터링 실행!');
        return products.filter(p => p.category === filter);
    }, [products, filter]);

    return <div>{filteredProducts.map(...)}</div>;
}
```

**왜 사용하나요?**
- ? **성능 최적화**: 불필요한 재계산 방지
- ?? **렌더링 최적화**: 같은 값이면 리렌더링 스킵

**우리 프로젝트의 예시:**
```tsx
// src/components/ChartRenderer.tsx
const chartOption = useMemo(() => {
    // 차트 옵션은 데이터가 변경될 때만 재계산
    return {
        series: chartData.series,
        xAxis: { /* ... */ },
        yAxis: { /* ... */ }
    };
}, [chartData, chartType, annotations]);
```

### 4.6 useRef (참조)

**useRef는 DOM 요소나 값을 직접 참조하는 Hook입니다.**

```tsx
import { useRef } from 'react';

function InputFocus() {
    const inputRef = useRef<HTMLInputElement>(null);

    const focusInput = () => {
        inputRef.current?.focus(); // input에 포커스
    };

    return (
        <>
            <input ref={inputRef} />
            <button onClick={focusInput}>포커스!</button>
        </>
    );
}
```

**useRef vs useState 차이점:**
- `useState`: 값이 변경되면 **리렌더링 발생** ?
- `useRef`: 값이 변경되어도 **리렌더링 안 됨** ?

**우리 프로젝트의 예시:**
```tsx
// src/components/ChartRenderer.tsx
const chartRef = useRef<ReactECharts>(null);

const handleZoom = () => {
    const instance = chartRef.current?.getEchartsInstance();
    instance?.resize();
};
```

---

## 5. 주요 컴포넌트 분석

### 5.1 ChartRenderer.tsx (핵심 컴포넌트)

**이 컴포넌트는 차트를 렌더링하는 가장 중요한 컴포넌트입니다.**

#### ?? Import 부분 분석

```tsx
import React, { useMemo, useEffect, useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
```

- `React`: React 라이브러리
- `useMemo, useEffect, useRef, useState`: React Hooks
- `ReactECharts`: ECharts 라이브러리를 React에서 사용하기 위한 래퍼
- `echarts`: 차트 라이브러리 코어

#### ?? 컴포넌트 구조

```tsx
const ChartRenderer: React.FC = () => {
    // 1?? Hooks 선언
    const chartRef = useRef<ReactECharts>(null);
    const [isChartLoading, setIsChartLoading] = useState(false);
    const { theme } = useThemeStore();
    
    // 2?? Store에서 데이터 가져오기
    const {
        processedData,
        selectedXColumn,
        selectedYColumns,
        annotations,
        addAnnotation,
        removeAnnotation,
    } = useDataStore();

    // 3?? 차트 데이터 계산
    useEffect(() => {
        // 데이터 처리 로직
        setChartData(result);
    }, [processedData, selectedXColumn]);

    // 4?? 차트 옵션 생성 (메모이제이션)
    const chartOption = useMemo(() => {
        return {
            series: [...],
            xAxis: { ... },
            yAxis: { ... }
        };
    }, [chartData, annotations]);

    // 5?? JSX 반환
    return (
        <div>
            <ReactECharts ref={chartRef} option={chartOption} />
        </div>
    );
};
```

#### ?? 왜 이렇게 구성했나요?

1. **`useRef`로 차트 인스턴스 참조**
   - 차트의 메서드를 직접 호출하기 위해 (resize, dispatchAction 등)
   
2. **`useState`로 로딩 상태 관리**
   - 사용자에게 로딩 스피너를 보여주기 위해

3. **`useDataStore`로 전역 상태 가져오기**
   - 여러 컴포넌트가 같은 데이터를 공유하기 위해

4. **`useEffect`로 데이터 처리**
   - 데이터가 변경될 때마다 차트 데이터를 재계산

5. **`useMemo`로 차트 옵션 캐싱**
   - 같은 데이터면 재계산하지 않아서 성능 향상

#### ?? Ctrl+Click으로 Annotation 추가 기능

```tsx
<ReactECharts
    onEvents={{
        click: (params: any) => {
            // Ctrl 또는 Cmd 키를 누른 상태에서 클릭했는지 확인
            if (params.event?.event?.ctrlKey || params.event?.event?.metaKey) {
                const x = params.value[0];
                const y = params.value[1];
                
                // 주석 추가
                addAnnotation({
                    x,
                    y,
                    color: '#ef4444',
                    label: `Point ${annotations.length + 1}`
                });
            }
        }
    }}
/>
```

**왜 이렇게 했나요?**
- 사용자가 차트에서 특정 포인트를 마킹하고 싶을 때 편리
- Ctrl 키를 눌러야만 작동하므로 실수로 추가되는 것 방지

### 5.2 FileUploader.tsx (파일 업로드)

```tsx
const FileUploader: React.FC = () => {
    const handleFileUpload = async (file: File) => {
        // 파일 확장자 확인
        const extension = file.name.split('.').pop()?.toLowerCase();
        
        if (extension === 'csv') {
            // CSV 파일 처리
            await parseCSV(file);
        } else if (extension === 'xlsx' || extension === 'xls') {
            // Excel 파일 처리
            await parseExcel(file);
        }
    };

    return (
        <input 
            type="file" 
            accept=".csv,.xlsx,.xls"
            onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
            }}
        />
    );
};
```

**왜 이렇게 했나요?**
- 파일 타입에 따라 다른 파서(parser) 사용
- `accept` 속성으로 파일 선택 다이얼로그에서 필터링

### 5.3 SEO.tsx (검색엔진 최적화)

```tsx
interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            
            {/* Open Graph (Facebook) */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            
            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
        </Helmet>
    );
};
```

**왜 SEO가 필요한가요?**
- ?? **Google 검색 노출**: 사람들이 검색해서 우리 사이트를 찾을 수 있음
- ?? **소셜 미디어 공유**: 링크 공유 시 예쁜 미리보기 표시
- ?? **트래픽 증가**: 검색 순위가 높아지면 방문자 증가

---

## 6. 상태 관리 (Zustand)

### 6.1 왜 상태 관리가 필요한가요?

**문제 상황:**
```
FileUploader 컴포넌트 → 파일 업로드
    ↓ (데이터 전달이 어려움!)
ColumnSelector 컴포넌트 → 컬럼 선택
    ↓
ChartRenderer 컴포넌트 → 차트 표시
```

**해결책: Zustand로 전역 상태 관리**
```
       ?? Zustand Store (중앙 저장소)
         ↙     ↓     ↘
FileUploader ColumnSelector ChartRenderer
```

### 6.2 dataStore.ts 분석

```tsx
// src/store/dataStore.ts

interface DataState {
    // ?? 데이터
    rawData: any[][];              // 원본 데이터
    processedData: any[][];        // 변환된 데이터
    columns: ColumnInfo[];         // 컬럼 정보
    
    // ?? 선택된 항목
    selectedXColumn: string | null;
    selectedYColumns: string[];
    
    // ?? 주석 (Annotation)
    annotations: ChartAnnotation[];
    
    // ?? 액션 (함수)
    setData: (data: any[][], columns: ColumnInfo[]) => void;
    addAnnotation: (annotation: ChartAnnotation) => void;
    removeAnnotation: (id: string) => void;
}

export const useDataStore = create<DataState>((set) => ({
    // 초기 상태
    rawData: [],
    selectedXColumn: null,
    annotations: [],
    
    // 액션 구현
    setData: (data, columns) => set({ 
        rawData: data, 
        columns 
    }),
    
    addAnnotation: (annotation) => set((state) => ({
        annotations: [...state.annotations, {
            ...annotation,
            id: `ann-${Date.now()}`,
            timestamp: Date.now()
        }]
    })),
    
    removeAnnotation: (id) => set((state) => ({
        annotations: state.annotations.filter(a => a.id !== id)
    })),
}));
```

### 6.3 사용 예시

```tsx
// 컴포넌트에서 사용
function MyComponent() {
    // Store에서 필요한 것만 가져오기
    const { 
        rawData, 
        annotations,
        addAnnotation 
    } = useDataStore();
    
    const handleClick = () => {
        addAnnotation({ x: 10, y: 20, label: 'Point' });
    };
    
    return (
        <div>
            <p>데이터 개수: {rawData.length}</p>
            <p>주석 개수: {annotations.length}</p>
            <button onClick={handleClick}>주석 추가</button>
        </div>
    );
}
```

**Zustand의 장점:**
- ? **간단한 API**: `create`로 Store 생성, `set`으로 상태 업데이트
- ? **보일러플레이트 없음**: Redux처럼 복잡한 설정 불필요
- ? **자동 구독**: 사용하는 컴포넌트만 리렌더링
- ? **TypeScript 지원**: 타입 안정성

---

## 7. 커스텀 Hook 활용

### 7.1 useDebounceThrottle.ts

**문제 상황:**
사용자가 검색창에 타이핑할 때마다 API 호출하면?
```
사용자 입력: "React"
R → API 호출
Re → API 호출
Rea → API 호출
Reac → API 호출
React → API 호출
(총 5번의 불필요한 API 호출!)
```

**해결책: Debounce (디바운스)**
```
사용자 입력: "React"
R
Re
Rea
Reac
React
  ↓ (입력이 멈춘 후 300ms 대기)
API 호출 1번만!
```

```tsx
// src/hooks/useDebounceThrottle.ts

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // delay 시간 후에 실행할 타이머 설정
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // value가 변경되면 이전 타이머 취소
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}
```

**사용 예시:**
```tsx
function SearchComponent() {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        // 입력이 멈춘 후 500ms 뒤에만 실행
        if (debouncedSearchTerm) {
            fetchSearchResults(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    return (
        <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    );
}
```

### 7.2 Throttle (쓰로틀)

**Throttle은 일정 시간 간격으로만 함수 실행을 허용합니다.**

```tsx
export function useThrottle<T>(value: T, interval: number): T {
    const [throttledValue, setThrottledValue] = useState(value);
    const lastExecuted = useRef(Date.now());

    useEffect(() => {
        if (Date.now() >= lastExecuted.current + interval) {
            lastExecuted.current = Date.now();
            setThrottledValue(value);
        } else {
            const timer = setTimeout(() => {
                lastExecuted.current = Date.now();
                setThrottledValue(value);
            }, interval);

            return () => clearTimeout(timer);
        }
    }, [value, interval]);

    return throttledValue;
}
```

**사용 예시: 스크롤 이벤트**
```tsx
function ScrollComponent() {
    const [scrollY, setScrollY] = useState(0);
    const throttledScrollY = useThrottle(scrollY, 200);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 200ms마다 한 번만 실행
    useEffect(() => {
        console.log('Scroll position:', throttledScrollY);
    }, [throttledScrollY]);

    return <div>...</div>;
}
```

**Debounce vs Throttle:**
- **Debounce**: 마지막 이벤트 후 일정 시간 대기
  - 예: 검색창 입력, 윈도우 리사이즈
- **Throttle**: 일정 시간 간격으로만 실행
  - 예: 스크롤 이벤트, 마우스 이동

---

## 8. 고급 기법과 최적화

### 8.1 React.memo (컴포넌트 메모이제이션)

**문제 상황:**
부모 컴포넌트가 리렌더링되면 자식 컴포넌트도 모두 리렌더링됩니다.

```tsx
function Parent() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>증가</button>
            <ExpensiveChild />  {/* count 변경 시 불필요하게 리렌더링! */}
        </div>
    );
}
```

**해결책: React.memo**
```tsx
// src/components/ChartRenderer.tsx

const ChartRenderer: React.FC = () => {
    // ... 차트 렌더링 로직
    return <div>...</div>;
};

// Props가 변경되지 않으면 리렌더링 스킵!
export default React.memo(ChartRenderer);
```

**언제 사용하나요?**
- ? 렌더링 비용이 큰 컴포넌트 (차트, 테이블 등)
- ? Props가 자주 변경되지 않는 컴포넌트
- ? 항상 변경되는 Props를 가진 컴포넌트 (오히려 느려짐)

### 8.2 Code Splitting (코드 분할)

**문제: 첫 로딩이 너무 느림**
```
모든 페이지 코드를 한 번에 다운로드
Home + Blog + Tutorials + ... = 5MB
```

**해결책: Lazy Loading**
```tsx
// src/App.tsx

import { lazy, Suspense } from 'react';

// 필요할 때만 로드
const BlogList = lazy(() => import('./pages/BlogList'));
const TutorialList = lazy(() => import('./pages/TutorialList'));

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                
                {/* Suspense로 감싸기 */}
                <Route path="/blog" element={
                    <Suspense fallback={<LoadingSpinner />}>
                        <BlogList />
                    </Suspense>
                } />
            </Routes>
        </BrowserRouter>
    );
}
```

**효과:**
- ?? 초기 로딩 속도 50% 이상 향상
- ?? 번들 크기 감소
- ?? 트래픽 비용 절감

### 8.3 Progressive Rendering (점진적 렌더링)

**문제: 100만 개 데이터를 한 번에 렌더링하면 브라우저가 멈춤**

**해결책: ECharts의 Progressive 옵션**
```tsx
// src/components/ChartRenderer.tsx

const chartOption = {
    progressive: 5000,           // 5000개씩 나눠서 렌더링
    progressiveThreshold: 2000,  // 2000개 이상부터 적용
    // ...
};
```

**동작 원리:**
```
전체 데이터: 100만 개
↓
5000개 렌더링 → 화면 업데이트
5000개 렌더링 → 화면 업데이트
...
(계속 반복하며 점진적으로 그림)
```

### 8.4 Data Sampling (데이터 샘플링)

**문제: 100만 개 포인트를 모두 그리면 의미 없음**
(화면 해상도가 1920x1080이면 최대 2백만 픽셀밖에 안 됨)

**해결책: LTTB 알고리즘**
```tsx
// src/utils/dataSampling.ts

export function downsampleData(
    data: ChartDataPoint[], 
    threshold: number
): ChartDataPoint[] {
    if (data.length <= threshold) {
        return data;
    }

    // Largest Triangle Three Buckets 알고리즘
    // 시각적으로 중요한 포인트만 선택
    const sampled = lttbDownsample(data, threshold);
    return sampled;
}
```

**효과:**
- 100만 개 → 30만 개로 줄여도 차트 모양은 거의 동일
- ? 렌더링 속도 3배 이상 빨라짐

### 8.5 Web Worker (백그라운드 처리)

**문제: 큰 파일 파싱 중에는 UI가 멈춤**

**해결책: Web Worker로 백그라운드에서 처리**
```tsx
// src/workers/csvParser.worker.ts

self.onmessage = async (e: MessageEvent) => {
    const file = e.data;
    
    // 백그라운드에서 파싱
    const result = await parseCSV(file);
    
    // 메인 스레드로 결과 전송
    self.postMessage({
        type: 'complete',
        data: result
    });
};
```

```tsx
// 사용하는 컴포넌트
const worker = new Worker(new URL('./csvParser.worker', import.meta.url));

worker.onmessage = (e) => {
    if (e.data.type === 'complete') {
        setData(e.data.data);
    }
};

worker.postMessage(file);
```

---

## 9. 실전 팁

### 9.1 성능 최적화 체크리스트

? **리렌더링 최소화**
- `React.memo` 사용
- `useMemo`, `useCallback` 적절히 사용
- 상태를 최대한 하위 컴포넌트로 내리기

? **번들 크기 최적화**
- Code Splitting (lazy import)
- Tree Shaking (사용하지 않는 코드 제거)
- 이미지 최적화 (WebP, 압축)

? **네트워크 최적화**
- API 요청 최소화 (Debounce, Throttle)
- 캐싱 활용
- CDN 사용

### 9.2 디버깅 팁

**1. React DevTools 사용**
```
크롬 확장 프로그램: React Developer Tools
- 컴포넌트 트리 확인
- Props/State 실시간 확인
- 리렌더링 하이라이트
```

**2. Console.log 대신 Debugger**
```tsx
function MyComponent() {
    const data = processData();
    
    debugger; // 이 줄에서 브라우저가 멈춤
    
    return <div>{data}</div>;
}
```

**3. Strict Mode 활성화**
```tsx
// src/main.tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>  {/* 잠재적 문제 미리 발견 */}
        <App />
    </React.StrictMode>
);
```

### 9.3 TypeScript 활용

**타입을 잘 정의하면 버그가 줄어듭니다!**

```tsx
// ? 나쁜 예
function addAnnotation(annotation: any) {
    // annotation이 무엇인지 모름
}

// ? 좋은 예
interface ChartAnnotation {
    id: string;
    x: number;
    y: number;
    color?: string;
    label?: string;
    timestamp: number;
}

function addAnnotation(annotation: Omit<ChartAnnotation, 'id' | 'timestamp'>) {
    // IDE가 자동 완성 지원
    // 잘못된 타입 입력 시 에러 표시
}
```

### 9.4 폴더 구조 Best Practice

```
src/
├── components/
│   ├── common/        # 공통 컴포넌트 (Button, Input 등)
│   ├── features/      # 기능별 컴포넌트
│   └── layout/        # 레이아웃 컴포넌트
│
├── hooks/             # 커스텀 Hook
├── store/             # 상태 관리
├── utils/             # 유틸리티 함수
├── types/             # TypeScript 타입
├── pages/             # 페이지 컴포넌트
└── constants/         # 상수 정의
```

### 9.5 Git 커밋 메시지 Convention

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 리팩토링
test: 테스트 추가
chore: 빌드 설정 등

예시:
feat: Add manual chart annotation with Ctrl+Click
fix: Fix chart zoom rendering bug
docs: Update README with installation guide
```

---

## ?? 학습 로드맵

### 1단계: 기초 다지기 (1-2주)
- [ ] JavaScript ES6+ 문법
- [ ] HTML/CSS 기초
- [ ] React 공식 문서 읽기

### 2단계: React 핵심 (2-3주)
- [ ] useState, useEffect 마스터
- [ ] 컴포넌트 설계 패턴
- [ ] Props vs State 이해

### 3단계: 실전 프로젝트 (3-4주)
- [ ] Todo 앱 만들기
- [ ] API 연동 프로젝트
- [ ] 간단한 대시보드

### 4단계: 고급 기법 (4주 이상)
- [ ] 상태 관리 (Zustand, Redux)
- [ ] TypeScript 적용
- [ ] 성능 최적화
- [ ] 테스트 작성

---

## ?? 추천 학습 자료

### 공식 문서
- [React 공식 문서 (한글)](https://ko.react.dev/)
- [TypeScript 핸드북](https://www.typescriptlang.org/ko/docs/handbook/intro.html)
- [Zustand 문서](https://github.com/pmndrs/zustand)

### 유튜브 채널
- 코딩애플
- 드림코딩
- Fireship (영어)

### 온라인 강의
- Udemy - React 완벽 가이드
- 인프런 - React 강의들
- freeCodeCamp (무료)

---

## ? 자주 묻는 질문 (FAQ)

### Q1: React와 Vue 중 어떤 걸 배워야 하나요?
**A:** 둘 다 좋은 프레임워크입니다!
- React: 더 많은 일자리, 큰 생태계
- Vue: 배우기 쉬움, 작은 프로젝트에 적합

이 프로젝트는 React를 사용했으므로 React를 먼저 배우는 것을 추천합니다.

### Q2: useState와 useRef의 차이가 뭔가요?
**A:**
- `useState`: 값이 변경되면 **리렌더링 발생**
- `useRef`: 값이 변경되어도 **리렌더링 안 됨**

```tsx
// 화면에 표시할 값 → useState
const [count, setCount] = useState(0);

// DOM 요소 참조 → useRef
const inputRef = useRef<HTMLInputElement>(null);
```

### Q3: useMemo는 언제 사용하나요?
**A:** 비싼 계산이 반복될 때만 사용하세요.

```tsx
// ? 불필요한 useMemo
const fullName = useMemo(() => {
    return firstName + ' ' + lastName;
}, [firstName, lastName]);

// ? 필요한 useMemo
const expensiveResult = useMemo(() => {
    return heavyCalculation(data); // 수백만 번 반복
}, [data]);
```

### Q4: 왜 Zustand를 사용하나요? Redux는요?
**A:**
- **Zustand**: 간단하고 배우기 쉬움 (이 프로젝트에 적합)
- **Redux**: 매우 큰 프로젝트에서 사용 (보일러플레이트 많음)

작은 프로젝트라면 Zustand, 대규모 팀 프로젝트라면 Redux를 추천합니다.

---

## ?? 마치며

이 문서를 통해 React와 이 프로젝트의 구조를 이해하셨기를 바랍니다!

**학습은 마라톤입니다. 천천히, 꾸준히!** ???♂?

궁금한 점이 있다면:
1. React 공식 문서 확인
2. 구글 검색
3. Stack Overflow
4. 개발자 커뮤니티 질문

**Happy Coding! ??**

---

## ?? 변경 이력

- 2024-12-14: 초판 작성
- Annotation 기능 추가 설명 포함
- Web Worker, Data Sampling 설명 추가

---

**작성자:** DataAnalyzer Team  
**라이선스:** MIT  
**GitHub:** [https://github.com/godonggon-lab/DataAnalyzer](https://github.com/godonggon-lab/DataAnalyzer)
