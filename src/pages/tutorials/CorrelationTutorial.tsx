
import { Link } from 'react-router-dom';

const CorrelationTutorial = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-slide-up">
            {/* Header */}
            <div>
                <div className="flex items-center text-slate-500 dark:text-dark-400 text-sm mb-4">
                    <Link to="/tutorials" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Tutorials</Link>
                    <svg className="w-4 h-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-slate-900 dark:text-white">Mastering Correlation Matrix</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                    Mastering the Correlation Matrix
                </h1>
                <div className="flex items-center gap-4 text-slate-500 dark:text-dark-400">
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        10 min read
                    </span>
                    <span className="px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium">
                        Advanced
                    </span>
                </div>
            </div>

            {/* Introduction */}
            <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Uncover Hidden Patterns</h2>
                <p className="text-slate-600 dark:text-dark-300 leading-relaxed mb-4">
                    The Correlation Matrix is a powerful tool for exploratory data analysis. It allows you to quickly identify
                    relationships between multiple numerical variables in your dataset. This tutorial will guide you through
                    creating and interpreting a correlation heatmap in DataAnalyzer.
                </p>
            </div>

            {/* Step-by-Step Guide */}
            <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Step-by-Step Guide</h2>

                <div className="space-y-8">
                    {/* Step 1 */}
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold">1</div>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Select Chart Type</h3>
                            <p className="text-slate-600 dark:text-dark-300">
                                In the Workspace, navigate to the <strong>Chart Type</strong> selector and choose <strong>Correlation Matrix (Heatmap)</strong>.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold">2</div>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Select Columns</h3>
                            <p className="text-slate-600 dark:text-dark-300 mb-2">
                                A new section <strong>"Select Columns for Correlation"</strong> will appear.
                            </p>
                            <ul className="list-disc list-inside text-slate-600 dark:text-dark-300 ml-2">
                                <li>Select at least <strong>2 numerical columns</strong>.</li>
                                <li>We recommend selecting 3-10 columns for the best visualization.</li>
                                <li>Categorical columns (text) cannot be used for correlation.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold">3</div>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Analyze the Heatmap</h3>
                            <p className="text-slate-600 dark:text-dark-300">
                                The chart will render automatically. Hover over any cell to see the exact correlation coefficient
                                between the two variables.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tips */}
            <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">💡 Pro Tips</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 dark:bg-dark-900/50 p-6 rounded-xl border border-slate-200 dark:border-dark-700">
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Data Cleaning</h3>
                        <p className="text-sm text-slate-600 dark:text-dark-300">
                            Ensure your data is clean. Outliers can significantly skew correlation results.
                            Use the Box Plot view to identify and filter outliers before running correlation analysis.
                        </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-dark-900/50 p-6 rounded-xl border border-slate-200 dark:border-dark-700">
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Feature Selection</h3>
                        <p className="text-sm text-slate-600 dark:text-dark-300">
                            Correlation matrices are great for feature selection in machine learning.
                            If two variables are highly correlated (e.g., &gt; 0.9), you might only need one of them for your model.
                        </p>
                    </div>
                </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-2xl p-8 border border-primary-200 dark:border-primary-500/20">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Ready to try it out?</h2>
                <div className="flex gap-4">
                    <Link
                        to="/workspace"
                        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors font-medium"
                    >
                        Go to Workspace
                    </Link>
                    <Link
                        to="/blog/correlation-analysis"
                        className="px-6 py-3 bg-white dark:bg-dark-700 hover:bg-slate-50 dark:hover:bg-dark-600 text-slate-700 dark:text-white border border-slate-200 dark:border-dark-600 rounded-lg transition-colors font-medium"
                    >
                        Read the Blog Post
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CorrelationTutorial;
