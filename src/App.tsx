import FileUploader from './components/FileUploader';
import ColumnSelector from './components/ColumnSelector';
import ChartRenderer from './components/ChartRenderer';
import DataStats from './components/DataStats';
import { useDataStore } from './store/dataStore';

function App() {
    const { rawData, reset, isLoading } = useDataStore();
    const hasData = rawData.length > 0;

    return (
        <div className="min-h-screen relative">
            {/* 헤더 */}
            <header className="sticky top-0 z-50 glass border-b border-dark-700">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold gradient-text">
                                    Data Visualizer
                                </h1>
                                <p className="text-xs text-dark-400">
                                    대용량 CSV/Excel 데이터 시각화 도구
                                </p>
                            </div>
                        </div>

                        {hasData && (
                            <button
                                onClick={reset}
                                className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2 border border-dark-600"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span>새로 시작</span>
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* 메인 컨텐츠 */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10">
                {isLoading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <h2 className="text-xl font-bold text-white">데이터 처리 중...</h2>
                            <p className="text-dark-300">잠시만 기다려주세요</p>
                        </div>
                    </div>
                )}

                {!hasData ? (
                    /* 파일 업로드 화면 */
                    <div className="max-w-3xl mx-auto mt-20 animate-fade-in">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-white mb-4">
                                데이터 시각화를 시작하세요
                            </h2>
                            <p className="text-lg text-dark-300">
                                CSV 또는 Excel 파일을 업로드하여 강력한 차트로 시각화합니다
                            </p>
                        </div>

                        <FileUploader />

                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="glass rounded-xl p-6 text-center card-hover">
                                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">빠른 처리</h3>
                                <p className="text-sm text-dark-400">
                                    WebWorker를 활용한 대용량 파일 처리
                                </p>
                            </div>

                            <div className="glass rounded-xl p-6 text-center card-hover">
                                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">안전한 처리</h3>
                                <p className="text-sm text-dark-400">
                                    데이터는 브라우저에서만 처리됩니다
                                </p>
                            </div>

                            <div className="glass rounded-xl p-6 text-center card-hover">
                                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">강력한 시각화</h3>
                                <p className="text-sm text-dark-400">
                                    다양한 차트 타입과 인터랙션 지원
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* 데이터 시각화 화면 */
                    <div className="space-y-8 animate-fade-in">
                        <DataStats />
                        <ColumnSelector />
                        <ChartRenderer />
                    </div>
                )}
            </main>

            {/* 푸터 */}
            <footer className="relative z-10 mt-20 py-8 border-t border-dark-700">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-dark-500 text-sm">
                        <p>
                            Built with React, TypeScript, ECharts, and TailwindCSS
                        </p>
                        <p className="mt-2">
                            © 2024 Data Visualizer. 브라우저 기반 데이터 시각화 도구.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
