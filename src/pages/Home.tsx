import FileUploader from '../components/FileUploader';
import ColumnSelector from '../components/ColumnSelector';
import ChartRenderer from '../components/ChartRenderer';
import DataStats from '../components/DataStats';

const Home = () => {
    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500/20 via-primary-600/10 to-transparent border border-primary-500/30 p-12 text-center">
                <div className="relative z-10">
                    <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
                        Transform Your Data Into
                        <span className="block bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                            Beautiful Insights
                        </span>
                    </h1>
                    <p className="text-xl text-dark-200 max-w-3xl mx-auto mb-8 leading-relaxed">
                        Upload Excel or CSV files and create stunning visualizations in seconds.
                        No installation, no coding required. Your data stays private in your browser.
                    </p>
                    <div className="flex items-center justify-center gap-6 text-dark-300">
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
                <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-dark-700 hover:border-primary-500/50 transition-all">
                    <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Upload & Analyze</h3>
                    <p className="text-dark-400 text-sm">
                        Drag and drop your CSV or Excel files. Instant processing with no file size limits.
                    </p>
                </div>

                <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-dark-700 hover:border-primary-500/50 transition-all">
                    <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Create Charts</h3>
                    <p className="text-dark-400 text-sm">
                        Choose from 5 chart types: Scatter, Line, Bar, Histogram, and Box Plot.
                    </p>
                </div>

                <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-dark-700 hover:border-primary-500/50 transition-all">
                    <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Export & Share</h3>
                    <p className="text-dark-400 text-sm">
                        Download your visualizations as high-quality images for reports and presentations.
                    </p>
                </div>
            </div>

            {/* Main Tool Section */}
            <div className="space-y-6">
                <FileUploader />
                <ColumnSelector />
                <ChartRenderer />
                <DataStats />
            </div>
        </div>
    );
};

export default Home;

