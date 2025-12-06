const CsvVsExcel = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <div className="flex items-center text-slate-500 dark:text-dark-400 text-sm mb-4">
                    <a href="/DataAnalyzer/blog" className="hover:text-primary-500 dark:hover:text-primary-400">Blog</a>
                    <svg className="w-4 h-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-slate-900 dark:text-white">CSV vs Excel: 어떤 형식을 선택해야 할까?</span>
                </div>
                <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">CSV vs Excel: 어떤 형식을 선택해야 할까?</h1>
                <div className="flex items-center gap-4 text-slate-500 dark:text-dark-400 mb-6">
                    <span className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 text-sm">데이터 분석 기초</span>
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        2025년 11월 28일
                    </span>
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        8 min read
                    </span>
                </div>
            </div>

            {/* Introduction */}
            <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                <p className="text-slate-600 dark:text-dark-300 leading-relaxed text-lg">
                    데이터 분석을 시작할 때 가장 먼저 마주하는 결정 중 하나는 데이터를 어떤 형식으로 저장하고 관리할 것인가입니다.
                    가장 흔히 사용되는 두 가지 형식인 CSV와 Excel은 겉보기에 비슷해 보이지만, 실제로는 매우 다른 특성과 용도를 가지고 있습니다.
                    이 글에서는 두 형식의 장단점을 비교하고 상황에 맞는 최적의 선택 가이드를 제공합니다.
                </p>
            </div>

            {/* Comparison Section */}
            <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">CSV와 Excel의 핵심 차이</h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-dark-600">
                                <th className="p-4 font-semibold text-slate-900 dark:text-white">특징</th>
                                <th className="p-4 font-semibold text-slate-900 dark:text-white">CSV (Comma Separated Values)</th>
                                <th className="p-4 font-semibold text-slate-900 dark:text-white">Excel (.xlsx, .xls)</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-600 dark:text-dark-300">
                            <tr className="border-b border-slate-200 dark:border-dark-700">
                                <td className="p-4 font-medium">형식</td>
                                <td className="p-4">단순 텍스트 파일</td>
                                <td className="p-4">바이너리 파일 (기능 포함)</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-dark-700">
                                <td className="p-4 font-medium">용량</td>
                                <td className="p-4">작음 (가벼움)</td>
                                <td className="p-4">큼 (서식, 매크로 등 포함)</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-dark-700">
                                <td className="p-4 font-medium">호환성</td>
                                <td className="p-4">모든 텍스트 에디터, 분석 도구</td>
                                <td className="p-4">MS Excel, 일부 호환 프로그램</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-dark-700">
                                <td className="p-4 font-medium">기능</td>
                                <td className="p-4">데이터 저장만 가능</td>
                                <td className="p-4">서식, 함수, 차트, VBA 등</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CSV Pros & Cons */}
            <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">CSV: 심플함의 미학</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">장점 (Pros)</h3>
                        <ul className="list-disc list-inside text-slate-600 dark:text-dark-300 space-y-2">
                            <li>모든 운영체제와 프로그램에서 열 수 있음</li>
                            <li>파일 크기가 작아 전송과 처리가 빠름</li>
                            <li>프로그래밍 언어(Python, R 등)에서 읽기 쉬움</li>
                            <li>버전 관리 시스템(Git)과 호환성이 좋음</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3">단점 (Cons)</h3>
                        <ul className="list-disc list-inside text-slate-600 dark:text-dark-300 space-y-2">
                            <li>데이터 타입(날짜, 숫자 등) 정보가 저장되지 않음</li>
                            <li>수식, 차트, 서식을 저장할 수 없음</li>
                            <li>복잡한 데이터 구조(시트 여러 개 등)를 표현할 수 없음</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Excel Pros & Cons */}
            <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Excel: 강력한 기능의 올인원</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">장점 (Pros)</h3>
                        <ul className="list-disc list-inside text-slate-600 dark:text-dark-300 space-y-2">
                            <li>직관적인 UI로 데이터 편집과 보기가 쉬움</li>
                            <li>강력한 내장 함수, 피벗 테이블, 차트 기능</li>
                            <li>데이터 시각화와 보고서 작성이 한 번에 가능</li>
                            <li>여러 시트를 하나의 파일로 관리 가능</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3">단점 (Cons)</h3>
                        <ul className="list-disc list-inside text-slate-600 dark:text-dark-300 space-y-2">
                            <li>대용량 데이터(100만 행 이상) 처리 시 느려질 수 있음</li>
                            <li>전용 프로그램(Excel)이 필요함</li>
                            <li>프로그래밍 언어에서 처리하기 위해 라이브러리 필요</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-r from-primary-500/10 to-primary-700/10 rounded-2xl p-8 border border-primary-500/20">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">결론: 언제 무엇을 써야 할까?</h2>
                <div className="space-y-4 text-slate-600 dark:text-dark-300">
                    <p>
                        <strong>CSV를 선택하세요:</strong> 시스템 간 데이터 이동, 대용량 데이터 처리, 프로그래밍 언어(Python/R)를 이용한 분석, 단순히 데이터를 저장할 때.
                    </p>
                    <p>
                        <strong>Excel을 선택하세요:</strong> 데이터 편집과 서식 지정이 필요할 때, 보고서를 작성할 때, 비전문가와 데이터를 공유할 때, 소규모 데이터를 직관적으로 분석하고 싶을 때.
                    </p>
                </div>

                <div className="mt-8 flex gap-4">
                    <a
                        href="/DataAnalyzer/workspace"
                        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                    >
                        데이터 분석 시작하기
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

export default CsvVsExcel;
