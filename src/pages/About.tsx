const About = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="text-center">
                <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">About DataAnalyzer</h1>
                <p className="text-xl text-slate-600 dark:text-dark-300">
                    A powerful, browser-based data analysis and visualization tool
                </p>
            </div>

            {/* Introduction */}
            <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">What is DataAnalyzer?</h2>
                <p className="text-slate-600 dark:text-dark-300 leading-relaxed mb-4">
                    DataAnalyzer is a free, open-source web application designed to make data analysis and visualization accessible to everyone.
                    Whether you're a data scientist, business analyst, student, or just curious about your data, DataAnalyzer provides
                    powerful tools to explore, analyze, and visualize your datasets directly in your browser.
                </p>
                <p className="text-slate-600 dark:text-dark-300 leading-relaxed">
                    No installation required, no data uploaded to servers - everything runs locally in your browser,
                    ensuring your data privacy and security.
                </p>
            </div>

            {/* Key Features */}
            <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-primary-500/10 dark:bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-primary-500 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white font-semibold mb-1">Multiple File Formats</h3>
                            <p className="text-slate-500 dark:text-dark-400 text-sm">Support for CSV and Excel (XLSX) files</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-primary-500/10 dark:bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-primary-500 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white font-semibold mb-1">Rich Chart Types</h3>
                            <p className="text-slate-500 dark:text-dark-400 text-sm">Scatter, Line, Bar, Histogram, and Box Plot charts</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-primary-500/10 dark:bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-primary-500 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white font-semibold mb-1">High Performance</h3>
                            <p className="text-slate-500 dark:text-dark-400 text-sm">Handle large datasets with WebWorker processing</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-primary-500/10 dark:bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-primary-500 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white font-semibold mb-1">Privacy First</h3>
                            <p className="text-slate-500 dark:text-dark-400 text-sm">All processing happens in your browser - no data leaves your device</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-primary-500/10 dark:bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-primary-500 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white font-semibold mb-1">Interactive Controls</h3>
                            <p className="text-slate-500 dark:text-dark-400 text-sm">Dynamic filtering, zooming, and data exploration</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-primary-500/10 dark:bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-primary-500 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white font-semibold mb-1">Export Charts</h3>
                            <p className="text-slate-500 dark:text-dark-400 text-sm">Download your visualizations as high-quality images</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why DataAnalyzer */}
            <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why DataAnalyzer?</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-slate-900 dark:text-white font-semibold mb-2">🎯 Built for Everyone</h3>
                        <p className="text-slate-600 dark:text-dark-300 text-sm leading-relaxed">
                            Whether you're analyzing sales data, research results, or personal finances, DataAnalyzer provides
                            an intuitive interface that doesn't require programming knowledge.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-slate-900 dark:text-white font-semibold mb-2">🔒 Your Data Stays Yours</h3>
                        <p className="text-slate-600 dark:text-dark-300 text-sm leading-relaxed">
                            Unlike cloud-based tools, DataAnalyzer processes everything locally in your browser.
                            Your sensitive data never leaves your computer.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-slate-900 dark:text-white font-semibold mb-2">⚡ Fast and Efficient</h3>
                        <p className="text-slate-600 dark:text-dark-300 text-sm leading-relaxed">
                            Leveraging modern web technologies like WebWorkers and optimized rendering,
                            DataAnalyzer can handle datasets with hundreds of thousands of rows smoothly.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-slate-900 dark:text-white font-semibold mb-2">💰 Completely Free</h3>
                        <p className="text-slate-600 dark:text-dark-300 text-sm leading-relaxed">
                            No subscriptions, no hidden fees, no feature limitations. DataAnalyzer is and will always be free to use.
                        </p>
                    </div>
                </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Technology Stack</h2>
                <p className="text-slate-600 dark:text-dark-300 mb-6">
                    DataAnalyzer is built with modern web technologies to ensure performance, reliability, and great user experience:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-100 dark:bg-dark-700/50 rounded-lg p-4 text-center">
                        <div className="text-2xl mb-2">⚛️</div>
                        <div className="text-slate-900 dark:text-white font-semibold text-sm">React</div>
                        <div className="text-slate-500 dark:text-dark-400 text-xs">UI Framework</div>
                    </div>
                    <div className="bg-slate-100 dark:bg-dark-700/50 rounded-lg p-4 text-center">
                        <div className="text-2xl mb-2">📘</div>
                        <div className="text-slate-900 dark:text-white font-semibold text-sm">TypeScript</div>
                        <div className="text-slate-500 dark:text-dark-400 text-xs">Type Safety</div>
                    </div>
                    <div className="bg-slate-100 dark:bg-dark-700/50 rounded-lg p-4 text-center">
                        <div className="text-2xl mb-2">📊</div>
                        <div className="text-slate-900 dark:text-white font-semibold text-sm">ECharts</div>
                        <div className="text-slate-500 dark:text-dark-400 text-xs">Visualization</div>
                    </div>
                    <div className="bg-slate-100 dark:bg-dark-700/50 rounded-lg p-4 text-center">
                        <div className="text-2xl mb-2">🎨</div>
                        <div className="text-slate-900 dark:text-white font-semibold text-sm">Tailwind CSS</div>
                        <div className="text-slate-500 dark:text-dark-400 text-xs">Styling</div>
                    </div>
                    <div className="bg-slate-100 dark:bg-dark-700/50 rounded-lg p-4 text-center">
                        <div className="text-2xl mb-2">⚡</div>
                        <div className="text-slate-900 dark:text-white font-semibold text-sm">Vite</div>
                        <div className="text-slate-500 dark:text-dark-400 text-xs">Build Tool</div>
                    </div>
                    <div className="bg-slate-100 dark:bg-dark-700/50 rounded-lg p-4 text-center">
                        <div className="text-2xl mb-2">🐻</div>
                        <div className="text-slate-900 dark:text-white font-semibold text-sm">Zustand</div>
                        <div className="text-slate-500 dark:text-dark-400 text-xs">State Management</div>
                    </div>
                    <div className="bg-slate-100 dark:bg-dark-700/50 rounded-lg p-4 text-center">
                        <div className="text-2xl mb-2">📦</div>
                        <div className="text-slate-900 dark:text-white font-semibold text-sm">SheetJS</div>
                        <div className="text-slate-500 dark:text-dark-400 text-xs">Excel Parsing</div>
                    </div>
                    <div className="bg-slate-100 dark:bg-dark-700/50 rounded-lg p-4 text-center">
                        <div className="text-2xl mb-2">👷</div>
                        <div className="text-slate-900 dark:text-white font-semibold text-sm">Web Workers</div>
                        <div className="text-slate-500 dark:text-dark-400 text-xs">Performance</div>
                    </div>
                </div>
            </div>

            {/* Open Source */}
            <div className="bg-gradient-to-r from-primary-500/10 to-primary-700/10 rounded-2xl p-8 border border-primary-500/20">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Open Source</h2>
                        <p className="text-slate-600 dark:text-dark-300">
                            DataAnalyzer is open source and available on GitHub. Contributions are welcome!
                        </p>
                    </div>
                    <a
                        href="https://github.com/godonggon-lab/DataAnalyzer"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors flex items-center space-x-2"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        <span>View on GitHub</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default About;
