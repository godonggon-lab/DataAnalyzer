const ExcelDataAnalysisGuide = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <div className="flex items-center text-dark-400 text-sm mb-4">
                    <a href="/DataAnalyzer/blog" className="hover:text-primary-400">Blog</a>
                    <svg className="w-4 h-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-white">Excel 데이터 분석 완벽 가이드</span>
                </div>
                <h1 className="text-5xl font-bold text-white mb-4">Excel 데이터 분석 완벽 가이드</h1>
                <div className="flex items-center gap-4 text-dark-400 mb-6">
                    <span className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-sm">데이터 분석 기초</span>
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        2025년 12월 1일
                    </span>
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        10 min read
                    </span>
                </div>
            </div>

            {/* Introduction */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <p className="text-dark-300 leading-relaxed text-lg">
                    Excel은 전 세계에서 가장 널리 사용되는 데이터 분석 도구입니다. 간단한 계산부터 복잡한 통계 분석까지,
                    Excel의 강력한 기능을 제대로 활용하면 데이터에서 의미 있는 인사이트를 도출할 수 있습니다.
                    이 가이드에서는 Excel 데이터 분석의 기초부터 고급 기법까지 단계별로 알아보겠습니다.
                </p>
            </div>

            {/* Section 1 */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-3xl font-bold text-white mb-4">1. 데이터 준비와 정리</h2>

                <p className="text-dark-300 leading-relaxed mb-4">
                    효과적인 데이터 분석의 첫 단계는 깨끗하고 잘 구조화된 데이터를 준비하는 것입니다.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3">데이터 구조화</h3>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4 mb-4">
                    <li><strong className="text-white">첫 행에 헤더 배치:</strong> 각 열의 의미를 명확하게 설명하는 헤더를 사용하세요</li>
                    <li><strong className="text-white">일관된 데이터 형식:</strong> 날짜, 숫자, 텍스트 형식을 일관되게 유지하세요</li>
                    <li><strong className="text-white">빈 행/열 제거:</strong> 불필요한 공백은 분석을 방해할 수 있습니다</li>
                    <li><strong className="text-white">중복 데이터 제거:</strong> 데이터 &gt; 중복된 항목 제거 기능을 활용하세요</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">데이터 정제</h3>
                <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600 mb-4">
                    <p className="text-dark-300 text-sm mb-2">
                        <strong className="text-white">텍스트 정리:</strong> TRIM() 함수로 불필요한 공백 제거
                    </p>
                    <p className="text-dark-300 text-sm mb-2">
                        <strong className="text-white">대소문자 통일:</strong> UPPER(), LOWER(), PROPER() 함수 활용
                    </p>
                    <p className="text-dark-300 text-sm">
                        <strong className="text-white">결측값 처리:</strong> 빈 셀을 0, 평균값, 또는 "N/A"로 대체
                    </p>
                </div>
            </div>

            {/* Section 2 */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-3xl font-bold text-white mb-4">2. 기본 분석 함수 활용</h2>

                <p className="text-dark-300 leading-relaxed mb-4">
                    Excel의 내장 함수를 사용하면 복잡한 계산도 쉽게 수행할 수 있습니다.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3">통계 함수</h3>
                <div className="space-y-3 mb-4">
                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <p className="text-white font-semibold mb-2">SUM(), AVERAGE(), MEDIAN()</p>
                        <p className="text-dark-300 text-sm">
                            기본적인 집계 함수로 합계, 평균, 중앙값을 계산합니다.
                            예: =AVERAGE(A2:A100)
                        </p>
                    </div>
                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <p className="text-white font-semibold mb-2">COUNT(), COUNTA(), COUNTIF()</p>
                        <p className="text-dark-300 text-sm">
                            데이터 개수를 세는 함수입니다. COUNTIF는 조건에 맞는 셀만 계산합니다.
                            예: =COUNTIF(B2:B100, "&gt;100")
                        </p>
                    </div>
                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <p className="text-white font-semibold mb-2">MAX(), MIN(), STDEV()</p>
                        <p className="text-dark-300 text-sm">
                            최댓값, 최솟값, 표준편차를 구합니다. 데이터의 분포를 이해하는 데 유용합니다.
                        </p>
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">조건부 함수</h3>
                <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                    <p className="text-dark-300 text-sm mb-2">
                        <strong className="text-white">SUMIF/SUMIFS:</strong> 조건에 맞는 값들의 합계
                    </p>
                    <p className="text-dark-300 text-sm mb-2">
                        <strong className="text-white">AVERAGEIF/AVERAGEIFS:</strong> 조건부 평균 계산
                    </p>
                    <p className="text-dark-300 text-sm">
                        <strong className="text-white">IF, IFS:</strong> 조건에 따라 다른 값 반환
                    </p>
                </div>
            </div>

            {/* Section 3 */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-3xl font-bold text-white mb-4">3. 피벗 테이블로 데이터 요약</h2>

                <p className="text-dark-300 leading-relaxed mb-4">
                    피벗 테이블은 Excel의 가장 강력한 데이터 분석 도구 중 하나입니다.
                    대량의 데이터를 빠르게 요약하고 다양한 관점에서 분석할 수 있습니다.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3">피벗 테이블 생성 방법</h3>
                <ol className="list-decimal list-inside text-dark-300 space-y-2 ml-4 mb-4">
                    <li>데이터 범위 선택</li>
                    <li>삽입 &gt; 피벗 테이블 클릭</li>
                    <li>행, 열, 값 필드에 원하는 항목 드래그</li>
                    <li>집계 방식 선택 (합계, 평균, 개수 등)</li>
                </ol>

                <h3 className="text-xl font-semibold text-white mb-3">피벗 테이블 활용 팁</h3>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                    <li><strong className="text-white">그룹화:</strong> 날짜를 월/분기/년도로, 숫자를 범위로 그룹화</li>
                    <li><strong className="text-white">필터:</strong> 슬라이서를 추가하여 대화형 필터링</li>
                    <li><strong className="text-white">계산 필드:</strong> 사용자 정의 계산식 추가</li>
                    <li><strong className="text-white">피벗 차트:</strong> 피벗 테이블을 시각화</li>
                </ul>
            </div>

            {/* Section 4 */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-3xl font-bold text-white mb-4">4. 데이터 시각화</h2>

                <p className="text-dark-300 leading-relaxed mb-4">
                    숫자만으로는 보이지 않던 패턴과 트렌드가 차트를 통해 명확하게 드러납니다.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3">차트 유형 선택 가이드</h3>
                <div className="space-y-3">
                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <p className="text-white font-semibold mb-2">📊 세로 막대형/가로 막대형</p>
                        <p className="text-dark-300 text-sm">
                            카테고리 간 비교에 적합. 판매량, 인구, 점수 등을 비교할 때 사용
                        </p>
                    </div>
                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <p className="text-white font-semibold mb-2">📈 꺾은선형</p>
                        <p className="text-dark-300 text-sm">
                            시간에 따른 변화 추이 표시. 주가, 온도, 트래픽 변화 등
                        </p>
                    </div>
                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <p className="text-white font-semibold mb-2">🥧 원형</p>
                        <p className="text-dark-300 text-sm">
                            전체에서 각 부분이 차지하는 비율 표시. 시장 점유율, 예산 배분 등
                        </p>
                    </div>
                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <p className="text-white font-semibold mb-2">📉 분산형</p>
                        <p className="text-dark-300 text-sm">
                            두 변수 간의 상관관계 분석. 키와 몸무게, 광고비와 매출 등
                        </p>
                    </div>
                </div>
            </div>

            {/* Section 5 */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-3xl font-bold text-white mb-4">5. 고급 분석 기법</h2>

                <h3 className="text-xl font-semibold text-white mb-3">조건부 서식</h3>
                <p className="text-dark-300 leading-relaxed mb-4">
                    데이터의 패턴을 시각적으로 강조합니다. 색상 척도, 데이터 막대, 아이콘 집합을 사용하여
                    중요한 값을 즉시 식별할 수 있습니다.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3">데이터 유효성 검사</h3>
                <p className="text-dark-300 leading-relaxed mb-4">
                    입력 오류를 방지하고 데이터 품질을 유지합니다. 드롭다운 목록, 숫자 범위 제한,
                    날짜 형식 강제 등을 설정할 수 있습니다.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3">What-If 분석</h3>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                    <li><strong className="text-white">시나리오 관리자:</strong> 여러 시나리오의 결과 비교</li>
                    <li><strong className="text-white">목표값 찾기:</strong> 원하는 결과를 얻기 위한 입력값 계산</li>
                    <li><strong className="text-white">데이터 표:</strong> 여러 변수 조합의 결과를 표로 정리</li>
                </ul>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-r from-primary-500/10 to-primary-700/10 rounded-2xl p-8 border border-primary-500/20">
                <h2 className="text-2xl font-bold text-white mb-4">결론</h2>
                <p className="text-dark-300 leading-relaxed mb-4">
                    Excel은 단순한 스프레드시트 프로그램이 아닌 강력한 데이터 분석 플랫폼입니다.
                    이 가이드에서 소개한 기법들을 실제 데이터에 적용해보면서 점차 고급 기능들을 익혀나가세요.
                </p>
                <p className="text-dark-300 leading-relaxed mb-6">
                    더 복잡한 분석이나 대용량 데이터 처리가 필요하다면, DataAnalyzer와 같은 전문 도구를
                    활용하는 것도 좋은 방법입니다.
                </p>
                <div className="flex gap-4">
                    <a
                        href="/DataAnalyzer/tutorials/getting-started"
                        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                    >
                        DataAnalyzer 시작하기
                    </a>
                    <a
                        href="/DataAnalyzer/blog"
                        className="px-6 py-3 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors"
                    >
                        더 많은 블로그 보기
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ExcelDataAnalysisGuide;
