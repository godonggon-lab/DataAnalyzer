import { useNavigate } from 'react-router-dom';
import FileUploader from '../components/FileUploader';
import { SAMPLE_DATASETS, loadSampleData } from '../utils/sampleData';
import { useDataStore } from '../store/dataStore';
import { useState } from 'react';

const Home = () => {
    const navigate = useNavigate();
    const { setData } = useDataStore();
    const [loadingDataset, setLoadingDataset] = useState<string | null>(null);

    const handleLoadSample = async (datasetId: string) => {
        setLoadingDataset(datasetId);
        try {
            const { data, columns } = await loadSampleData(datasetId);
            const dataset = SAMPLE_DATASETS.find(d => d.id === datasetId);
            setData(data, columns, {
                name: dataset?.fileName || 'sample.csv',
                size: data.length * columns.length * 10, // Approximate
                type: 'text/csv'
            });
            navigate('/workspace');
        } catch (error) {
            console.error('Failed to load sample data:', error);
            alert('Failed to load sample data. Please try again.');
        } finally {
            setLoadingDataset(null);
        }
    };

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500/10 via-primary-600/5 to-transparent border border-primary-500/20 p-6 md:p-10 lg:p-12 text-center">
                <div className="relative z-10">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 leading-tight">
                        Transform Your Data Into
                        <span className="block bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mt-2">
                            Beautiful Insights
                        </span>
                    </h1>
                    <p className="text-base sm:text-lg text-slate-600 dark:text-dark-200 max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed px-4">
                        Upload Excel or CSV files and create stunning visualizations in seconds.
                        No installation, no coding required. Your data stays private in your browser.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-slate-500 dark:text-dark-300">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">100% Free</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">Privacy First</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">No Sign-up</span>
                        </div>
                    </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl"></div>
            </div>

            {/* Quick Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-dark-700 hover:border-primary-500/50 transition-all">
                    <div className="w-12 h-12 bg-primary-500/10 dark:bg-primary-500/20 rounded-xl flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-primary-500 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Upload & Analyze</h3>
                    <p className="text-slate-500 dark:text-dark-400 text-sm">
                        Drag and drop your CSV or Excel files. Instant processing with no file size limits.
                    </p>
                </div>

                <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-dark-700 hover:border-primary-500/50 transition-all">
                    <div className="w-12 h-12 bg-primary-500/10 dark:bg-primary-500/20 rounded-xl flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-primary-500 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Create Charts</h3>
                    <p className="text-slate-500 dark:text-dark-400 text-sm">
                        Choose from 8 chart types: Scatter, Line, Bar, Histogram, Box Plot, Pie, Word Cloud, and Heatmap.
                    </p>
                </div>

                <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-dark-700 hover:border-primary-500/50 transition-all">
                    <div className="w-12 h-12 bg-primary-500/10 dark:bg-primary-500/20 rounded-xl flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-primary-500 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Export & Share</h3>
                    <p className="text-slate-500 dark:text-dark-400 text-sm">
                        Download your visualizations as high-quality images for reports and presentations.
                    </p>
                </div>
            </div>

            {/* Sample Datasets Section */}
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        Try Sample Datasets
                    </h2>
                    <p className="text-slate-600 dark:text-dark-300">
                        No data? No problem! Start exploring with our curated sample datasets
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {SAMPLE_DATASETS.map((dataset) => (
                        <div
                            key={dataset.id}
                            className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-dark-700 hover:border-primary-500/50 transition-all group"
                        >
                            <div className="text-4xl mb-4">{dataset.icon}</div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                {dataset.name}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-dark-300 mb-4 min-h-[3rem]">
                                {dataset.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {dataset.suggestedCharts.map((chart) => (
                                    <span
                                        key={chart}
                                        className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full"
                                    >
                                        {chart}
                                    </span>
                                ))}
                            </div>
                            <button
                                onClick={() => handleLoadSample(dataset.id)}
                                disabled={loadingDataset === dataset.id}
                                className={`w-full py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2
                                    ${loadingDataset === dataset.id
                                        ? 'bg-slate-100 dark:bg-dark-700 text-slate-400 dark:text-dark-500 cursor-not-allowed'
                                        : 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-primary-500/30 group-hover:scale-105'
                                    }
                                `}
                            >
                                {loadingDataset === dataset.id ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        Try it now
                                    </>
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-dark-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-slate-50 dark:bg-dark-900 text-slate-500 dark:text-dark-400">
                        Or upload your own data
                    </span>
                </div>
            </div>

            {/* Main Tool Section */}
            <div className="space-y-6">
                <FileUploader />
            </div>
        </div>
    );
};

export default Home;


