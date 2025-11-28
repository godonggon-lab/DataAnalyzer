# 🚀 프로젝트 실행 가이드

## Node.js 설치 필요

이 프로젝트를 실행하려면 **Node.js**가 설치되어 있어야 합니다.

### Node.js 설치 확인

PowerShell 또는 명령 프롬프트에서 다음 명령어를 실행하세요:

```bash
node --version
npm --version
```

버전이 표시되면 이미 설치되어 있습니다.
표시되지 않으면 아래 단계를 따라 설치해주세요.

### Node.js 설치 방법

1. **공식 웹사이트에서 다운로드**
   - https://nodejs.org/ko 접속
   - LTS 버전 (장기 지원 버전) 다운로드
   - 설치 파일 실행 후 기본 옵션으로 설치

2. **설치 확인**
   - 새 PowerShell 창을 열고 `node --version` 실행
   - 버전이 표시되면 설치 완료

## 프로젝트 실행 단계

### 1. 의존성 설치

프로젝트 폴더에서 다음 명령어 실행:

```bash
npm install
```

이 명령어는 `package.json`에 정의된 모든 라이브러리를 설치합니다.
설치에는 몇 분이 걸릴 수 있습니다.

### 2. 개발 서버 실행

```bash
npm run dev
```

성공적으로 실행되면 다음과 같은 메시지가 표시됩니다:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 3. 브라우저에서 접속

웹 브라우저를 열고 `http://localhost:5173`로 접속하세요.

## 테스트 데이터 준비

### CSV 파일 예제

간단한 CSV 파일을 만들어 테스트할 수 있습니다:

**sample_data.csv**
```csv
x,y,category
1,2.5,A
2,4.3,B
3,6.1,A
4,8.2,B
5,10.5,A
6,12.3,B
7,14.8,A
8,16.2,B
9,18.9,A
10,20.1,B
```

### 대용량 데이터 생성

Python이 설치되어 있다면 대용량 CSV 생성 스크립트:

```python
import csv
import random

with open('large_data.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['x', 'y', 'z'])
    
    for i in range(100000):  # 10만 행
        writer.writerow([
            i,
            random.uniform(0, 100),
            random.uniform(0, 50)
        ])
```

## 문제 해결

### npm install 실패

**오류**: `npm: command not found` 또는 `npm is not recognized`

**해결**:
1. Node.js를 올바르게 설치했는지 확인
2. PowerShell을 재시작
3. 시스템 환경 변수 PATH에 Node.js가 포함되어 있는지 확인

### 포트 충돌

**오류**: `Port 5173 is already in use`

**해결**:
1. 다른 Vite 서버가 실행 중인지 확인
2. 포트를 변경하려면 `vite.config.ts`에 다음 추가:
```typescript
export default defineConfig({
  server: {
    port: 3000, // 원하는 포트로 변경
  },
  // ...
})
```

### WebWorker 오류

**증상**: 파일 업로드 후 파싱이 진행되지 않음

**해결**:
- 브라우저 개발자 도구 (F12) 콘솔에서 에러 확인
- 최신 버전의 Chrome, Edge, Firefox 사용 권장
- HTTPS가 아닌 환경에서는 일부 브라우저에서 제한될 수 있음

### 메모리 부족

**증상**: 매우 큰 파일 (100MB+) 로드 시 브라우저가 느려지거나 멈춤

**해결**:
1. 파일 크기를 줄이거나
2. `src/utils/dataSampling.ts`의 threshold 값을 줄임 (예: 5000)
3. 브라우저 탭을 닫고 재시작

## 프로덕션 빌드

배포를 위한 최적화된 빌드:

```bash
npm run build
```

빌드 결과는 `dist` 폴더에 생성됩니다.

빌드 미리보기:

```bash
npm run preview
```

## 추가 도움말

- README.md: 프로젝트 전체 개요
- 이슈가 있다면 브라우저 개발자 도구의 Console 탭 확인
- 크롬 Performance 탭으로 성능 모니터링 가능

## 성공 확인

✅ `npm run dev` 실행 성공
✅ `http://localhost:5173` 접속 시 화면 표시
✅ CSV 파일 업로드 및 파싱 성공
✅ 컬럼 선택 후 차트 렌더링 확인

모든 단계가 완료되면 프로젝트가 정상적으로 동작하는 것입니다! 🎉
