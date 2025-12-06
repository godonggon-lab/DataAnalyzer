const SalesDataAnalysis = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <div className="flex items-center text-slate-500 dark:text-dark-400 text-sm mb-4">
                    <a href="/DataAnalyzer/blog" className="hover:text-primary-500 dark:hover:text-primary-400">Blog</a>
                    <svg className="w-4 h-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-slate-900 dark:text-white">판매 데이터 분석 실전 예제</span>
                </div>
                <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">판매 데이터 분석 실전 예제</h1>
                <div className="flex items-center gap-4 text-slate-500 dark:text-dark-400 mb-6">
                    <span className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 text-sm">실전 활용</span>
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        2025년 11월 22일
                    </span>
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        15 min read
                    </span>
                </div>
            </div>

            {/* Introduction */}
            <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                <p className="text-slate-600 dark:text-dark-300 leading-relaxed text-lg">
                    이론만으로는 데이터 분석을 완전히 익히기 어렵습니다. 실제 비즈니스 시나리오에서 자주 접하는 판매 데이터를 가지고,
                    데이터 로딩부터 전처리, 탐색적 분석(EDA), 그리고 시각화를 통한 인사이트 도출까지 전체 과정을 단계별로 따라가 보겠습니다.
                </p>
            </div>

            {/* Scenario */}
            <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">시나리오 설정</h2>
                <p className="text-slate-600 dark:text-dark-300 mb-4">
                    당신은 전자상거래 회사의 데이터 분석가입니다. 마케팅 팀장이 지난 1년간의 판매 데이터를 주며 다음과 같은 질문에 답해달라고 요청했습니다.
                </p>
                <ul className="list-disc list-inside text-slate-600 dark:text-dark-300 space-y-2 bg-slate-100 dark:bg-dark-700 p-4 rounded-lg">
                    <li>월별 매출 추이는 어떠한가? (계절성이 있는가?)</li>
                    <li>가장 많이 팔리는 제품 카테고리는 무엇인가?</li>
                    <li>지역별로 선호하는 제품이 다른가?</li>
                    <li>주요 고객층(나이, 성별)은 누구인가?</li>
                </ul>
            </div>

            {/* Step 1: Data Loading & Cleaning */}
            <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Step 1: 데이터 로딩 및 정제</h2>
                <p className="text-slate-600 dark:text-dark-300 mb-4">
                    먼저 CSV 파일을 DataAnalyzer에 업로드합니다. 데이터 컬럼은 다음과 같습니다:
                    `Order Date`, `Product Category`, `Region`, `Quantity`, `Sales`, `Customer Age`, `Gender`.
                </p>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">주요 정제 작업:</h3>
                <ul className="list-disc list-inside text-slate-600 dark:text-dark-300 space-y-2">
                    <li><strong>결측치 확인:</strong> `Customer Age`에 빈 값이 있다면 평균 나이로 채우거나 제외합니다.</li>
                    <li><strong>날짜 형식 변환:</strong> `Order Date` 컬럼이 날짜 형식(DateTime)으로 인식되었는지 확인합니다.</li>
                    <li><strong>이상치 제거:</strong> `Sales`가 음수인 기록(반품 등)을 분석 목적에 따라 제외하거나 별도로 분류합니다.</li>
                </ul>
            </div>

            {/* Step 2: EDA & Visualization */}
            <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Step 2: 탐색적 데이터 분석 (EDA)</h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">1. 월별 매출 추이 (Line Chart)</h3>
                        <p className="text-slate-600 dark:text-dark-300">
                            X축을 `Order Date`, Y축을 `Sales` (Sum)로 설정하여 Line Chart를 그립니다.
                            <br /><strong>인사이트:</strong> 11월과 12월에 매출이 급증하는 것을 확인했습니다. 연말 프로모션의 효과가 크다는 것을 알 수 있습니다.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">2. 카테고리별 판매 비중 (Pie Chart)</h3>
                        <p className="text-slate-600 dark:text-dark-300">
                            Label을 `Product Category`, Value를 `Sales` (Sum)로 설정하여 Pie Chart를 그립니다.
                            <br /><strong>인사이트:</strong> 'Electronics' 카테고리가 전체 매출의 45%를 차지하는 효자 종목임이 드러났습니다.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">3. 지역별 판매량 비교 (Bar Chart)</h3>
                        <p className="text-slate-600 dark:text-dark-300">
                            X축을 `Region`, Y축을 `Sales` (Sum)로 설정하여 Bar Chart를 그립니다.
                            <br /><strong>인사이트:</strong> 'Capital Area'의 매출이 압도적이지만, 'South Region'의 성장세도 눈여겨볼 만합니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* Step 3: Conclusion & Action */}
            <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Step 3: 결론 및 액션 플랜</h2>
                <p className="text-slate-600 dark:text-dark-300 mb-4">
                    데이터 분석을 통해 다음과 같은 전략을 제안할 수 있습니다.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-900/30">
                    <ul className="list-disc list-inside text-blue-800 dark:text-blue-200 space-y-2 font-medium">
                        <li>연말(11-12월)에 `Electronics` 카테고리 재고를 50% 추가 확보해야 합니다.</li>
                        <li>`South Region` 대상 타겟 마케팅을 강화하여 성장 모멘텀을 가속화해야 합니다.</li>
                        <li>주요 구매층인 30대 남성을 위한 맞춤형 패키지 상품을 개발을 고려해볼 수 있습니다.</li>
                    </ul>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary-500/10 to-primary-700/10 rounded-2xl p-8 border border-primary-500/20">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">직접 분석해 볼까요?</h2>
                <div className="space-y-4 text-slate-600 dark:text-dark-300">
                    <p>
                        이 예제에서 사용된 기법들은 DataAnalyzer에서 클릭 몇 번으로 바로 실행해볼 수 있습니다.
                        여러분의 데이터를 가지고 지금 바로 숨겨진 인사이트를 찾아보세요!
                    </p>
                </div>

                <div className="mt-8 flex gap-4">
                    <a
                        href="/DataAnalyzer/workspace"
                        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                    >
                        내 데이터 분석하러 가기
                    </a>
                    <a
                        href="/DataAnalyzer/blog"
                        className="px-6 py-3 bg-slate-200 dark:bg-dark-700 hover:bg-slate-300 dark:hover:bg-dark-600 text-slate-900 dark:text-white rounded-lg transition-colors"
                    >
                        목록으로 돌아가기
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SalesDataAnalysis;
