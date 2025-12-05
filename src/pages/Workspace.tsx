import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ColumnSelector from '../components/ColumnSelector';
import ChartRenderer from '../components/ChartRenderer';
import DataStats from '../components/DataStats';
import { useDataStore } from '../store/dataStore';

const Workspace = () => {
    const { rawData, fileInfo, reset } = useDataStore();
    const navigate = useNavigate();
    const hasData = rawData.length > 0;

    // Redirect to home if no data
    useEffect(() => {
        if (!hasData) {
            navigate('/');
        }
    }, [hasData, navigate]);

    if (!hasData) {
        return null;
    }

    return (
        <div className="space-y-6">
            {/* Workspace Header */}
            <div className="bg-gradient-to-r from-primary-500/10 to-primary-700/10 rounded-2xl p-6 border border-primary-500/20">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Analysis Workspace</h1>
                        <p className="text-slate-500 dark:text-dark-300">
                            {fileInfo?.name && (
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span className="font-semibold text-base">{fileInfo.name}</span>
                                    <span className="text-slate-400 dark:text-dark-400">• {rawData.length.toLocaleString()} rows</span>
                                </span>
                            )}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to start over? All current work will be lost.')) {
                                reset();
                                navigate('/');
                            }
                        }}
                        className="px-6 py-3 bg-slate-800 hover:bg-slate-700 dark:bg-dark-700 dark:hover:bg-dark-600 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        New Analysis
                    </button>
                </div>
            </div>

            {/* Main Workspace Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Left Panel - Configuration */}
                <div className="xl:col-span-1 space-y-6">
                    <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-dark-700 overflow-hidden">
                        <div className="bg-slate-100/50 dark:bg-dark-700/50 px-6 py-4 border-b border-slate-200 dark:border-dark-600">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                                Chart Configuration
                            </h2>
                        </div>
                        <div className="p-6 text-base">
                            <ColumnSelector />
                        </div>
                    </div>

                    <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-dark-700 overflow-hidden">
                        <div className="bg-slate-100/50 dark:bg-dark-700/50 px-6 py-4 border-b border-slate-200 dark:border-dark-600">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Data Statistics
                            </h2>
                        </div>
                        <div className="p-6 text-base">
                            <DataStats />
                        </div>
                    </div>
                </div>

                {/* Right Panel - Visualization */}
                <div className="xl:col-span-2">
                    <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-dark-700 overflow-hidden flex flex-col" style={{ minHeight: '1100px' }}>
                        <div className="bg-slate-100/50 dark:bg-dark-700/50 px-6 py-4 border-b border-slate-200 dark:border-dark-600">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                </svg>
                                Visualization
                            </h2>
                        </div>
                        <div className="flex-1 relative min-h-0">
                            <ChartRenderer />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-primary-500/5 border border-primary-500/20 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Quick Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600 dark:text-dark-300">
                    <div>
                        <span className="text-primary-400 font-semibold">💡 Tip 1:</span> Select X and Y axes to create your first chart
                    </div>
                    <div>
                        <span className="text-primary-400 font-semibold">💡 Tip 2:</span> Try different chart types to find the best visualization
                    </div>
                    <div>
                        <span className="text-primary-400 font-semibold">💡 Tip 3:</span> Use filters to focus on specific data ranges
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Workspace;

