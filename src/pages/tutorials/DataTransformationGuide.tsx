import { Link } from 'react-router-dom';

const DataTransformationGuide = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <div className="flex items-center text-slate-500 dark:text-dark-400 text-sm mb-4">
                    <Link to="/tutorials" className="hover:text-primary-500 dark:hover:text-primary-400">Tutorials</Link>
                    <svg className="w-4 h-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-slate-900 dark:text-white">Data Transformation</span>
                </div>
                <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">Data Transformation Guide</h1>
                <div className="flex items-center gap-4 text-slate-500 dark:text-dark-400">
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        10 min read
                    </span>
                    <span className="px-2 py-1 rounded bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs">Intermediate</span>
                </div>
            </div>

            {/* Introduction */}
            <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Clean and Shape Your Data</h2>
                <p className="text-slate-600 dark:text-dark-300 leading-relaxed mb-4">
                    Raw data is rarely perfect. It often contains missing values, duplicates, or is not in the right format for analysis.
                    DataAnalyzer's <strong>Data Pipeline</strong> allows you to clean and transform your data without altering the original file.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Note:</strong> All transformations are non-destructive. Your original uploaded file remains unchanged,
                        and you can reset the pipeline at any time.
                    </p>
                </div>
            </div>

            {/* Accessing the Panel */}
            <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Accessing the Data Pipeline</h2>
                <p className="text-slate-600 dark:text-dark-300 leading-relaxed mb-4">
                    To start transforming your data:
                </p>
                <ol className="list-decimal list-inside text-slate-600 dark:text-dark-300 space-y-2 ml-4">
                    <li>Go to the <strong>Workspace</strong> page.</li>
                    <li>Click the <strong>Data Pipeline</strong> toggle button in the top header (next to the Theme toggle).</li>
                    <li>The transformation panel will appear on the left side of the screen.</li>
                </ol>
            </div>

            {/* Transformation Types */}
            <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Available Transformations</h2>

                <div className="space-y-8">
                    {/* Drop Missing */}
                    <div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 flex items-center">
                            <span className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center mr-3 text-sm">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </span>
                            Drop Missing Values
                        </h3>
                        <p className="text-slate-600 dark:text-dark-300 mb-2">
                            Removes entire rows that contain missing (null/undefined) or empty values in specific columns.
                        </p>
                        <ul className="list-disc list-inside text-slate-500 dark:text-dark-400 text-sm ml-11">
                            <li>Select specific columns to check for missing values.</li>
                            <li>Useful for removing incomplete records that could skew analysis.</li>
                        </ul>
                    </div>

                    {/* Fill Missing */}
                    <div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 flex items-center">
                            <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3 text-sm">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </span>
                            Fill Missing Values
                        </h3>
                        <p className="text-slate-600 dark:text-dark-300 mb-2">
                            Replaces missing values with a specific value or a calculated statistic.
                        </p>
                        <ul className="list-disc list-inside text-slate-500 dark:text-dark-400 text-sm ml-11">
                            <li><strong>Specific Value:</strong> Fill with 0, "Unknown", etc.</li>
                            <li><strong>Mean/Median:</strong> Fill numeric columns with the average or median value.</li>
                            <li><strong>Mode:</strong> Fill with the most frequent value (useful for categorical data).</li>
                        </ul>
                    </div>

                    {/* Remove Duplicates */}
                    <div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 flex items-center">
                            <span className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center mr-3 text-sm">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </span>
                            Remove Duplicates
                        </h3>
                        <p className="text-slate-600 dark:text-dark-300 mb-2">
                            Identifies and removes duplicate rows based on selected columns.
                        </p>
                        <ul className="list-disc list-inside text-slate-500 dark:text-dark-400 text-sm ml-11">
                            <li>Select columns that define uniqueness (e.g., ID, Email).</li>
                            <li>Keeps the first occurrence and removes subsequent duplicates.</li>
                        </ul>
                    </div>

                    {/* Sort Data */}
                    <div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 flex items-center">
                            <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mr-3 text-sm">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                                </svg>
                            </span>
                            Sort Data
                        </h3>
                        <p className="text-slate-600 dark:text-dark-300 mb-2">
                            Reorders your dataset based on one or more columns.
                        </p>
                        <ul className="list-disc list-inside text-slate-500 dark:text-dark-400 text-sm ml-11">
                            <li>Sort by multiple columns (e.g., Date then Sales).</li>
                            <li>Choose Ascending (A-Z, 0-9) or Descending (Z-A, 9-0) order.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Managing Steps */}
            <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Managing Transformation Steps</h2>
                <p className="text-slate-600 dark:text-dark-300 leading-relaxed mb-4">
                    Transformations are applied sequentially, like a recipe.
                </p>
                <ul className="space-y-3 text-slate-600 dark:text-dark-300">
                    <li className="flex items-start">
                        <span className="mr-2 mt-1 text-primary-500">1.</span>
                        <span><strong>Add Step:</strong> Click "Add Transformation" and configure the options.</span>
                    </li>
                    <li className="flex items-start">
                        <span className="mr-2 mt-1 text-primary-500">2.</span>
                        <span><strong>View Pipeline:</strong> The list shows all applied steps in order.</span>
                    </li>
                    <li className="flex items-start">
                        <span className="mr-2 mt-1 text-primary-500">3.</span>
                        <span><strong>Remove Step:</strong> Click the trash icon next to a step to remove it. The data will be re-processed instantly.</span>
                    </li>
                    <li className="flex items-start">
                        <span className="mr-2 mt-1 text-primary-500">4.</span>
                        <span><strong>Reset All:</strong> Click "Reset All" to clear the entire pipeline and revert to the original raw data.</span>
                    </li>
                </ul>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-primary-500/10 to-primary-700/10 rounded-2xl p-8 border border-primary-500/20">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Ready to Clean Your Data?</h2>
                <p className="text-slate-600 dark:text-dark-300 mb-6">
                    Head over to the Workspace and try out the Data Pipeline on your dataset.
                </p>
                <div className="flex gap-4">
                    <Link
                        to="/workspace"
                        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                    >
                        Go to Workspace
                    </Link>
                    <Link
                        to="/tutorials"
                        className="px-6 py-3 bg-slate-200 dark:bg-dark-700 hover:bg-slate-300 dark:hover:bg-dark-600 text-slate-900 dark:text-white rounded-lg transition-colors"
                    >
                        Back to Tutorials
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DataTransformationGuide;
