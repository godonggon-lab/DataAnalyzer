
import { Link } from 'react-router-dom';

const CorrelationAnalysis = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-slide-up">
            {/* Header */}
            <div>
                <div className="flex items-center text-slate-500 dark:text-dark-400 text-sm mb-4">
                    <Link to="/blog" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Blog</Link>
                    <svg className="w-4 h-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-slate-900 dark:text-white">Understanding Correlation Analysis</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                    Understanding Correlation Analysis: Uncovering Hidden Relationships
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-slate-500 dark:text-dark-400">
                    <span className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium">
                        Data Science
                    </span>
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        December 5, 2025
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
            <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="lead text-xl text-slate-600 dark:text-dark-300">
                    Have you ever wondered if your marketing spend actually drives sales? Or if temperature affects customer footfall?
                    Correlation analysis is the key to answering these questions by quantifying the relationship between two variables.
                </p>
            </div>

            {/* Section 1 */}
            <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">What is Correlation?</h2>
                <p className="text-slate-600 dark:text-dark-300 leading-relaxed mb-6">
                    Correlation is a statistical measure that describes the extent to which two variables change together.
                    The most common measure is the <strong>Pearson correlation coefficient (r)</strong>, which ranges from -1 to 1.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-dark-700/50 p-6 rounded-xl border border-slate-100 dark:border-dark-600">
                        <div className="text-3xl mb-2">📈</div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Positive Correlation (0 to 1)</h3>
                        <p className="text-sm text-slate-500 dark:text-dark-400">
                            As one variable increases, the other also increases.
                            <br />
                            <span className="italic">Example: Height and Weight</span>
                        </p>
                    </div>
                    <div className="bg-white dark:bg-dark-700/50 p-6 rounded-xl border border-slate-100 dark:border-dark-600">
                        <div className="text-3xl mb-2">📉</div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Negative Correlation (-1 to 0)</h3>
                        <p className="text-sm text-slate-500 dark:text-dark-400">
                            As one variable increases, the other decreases.
                            <br />
                            <span className="italic">Example: Price and Demand</span>
                        </p>
                    </div>
                    <div className="bg-white dark:bg-dark-700/50 p-6 rounded-xl border border-slate-100 dark:border-dark-600">
                        <div className="text-3xl mb-2">➡️</div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No Correlation (~0)</h3>
                        <p className="text-sm text-slate-500 dark:text-dark-400">
                            There is no apparent relationship between the variables.
                            <br />
                            <span className="italic">Example: Shoe size and IQ</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Section 2 */}
            <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">The Power of the Heatmap</h2>
                <p className="text-slate-600 dark:text-dark-300 leading-relaxed mb-6">
                    When dealing with multiple variables, a <strong>Correlation Matrix Heatmap</strong> is the best way to visualize relationships.
                    It displays correlation coefficients for all pairs of variables in a grid, using color intensity to represent the strength of the relationship.
                </p>

                <div className="bg-slate-50 dark:bg-dark-900/50 p-6 rounded-xl border border-slate-200 dark:border-dark-700">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">How to Read a Heatmap</h3>
                    <ul className="space-y-3 text-slate-600 dark:text-dark-300">
                        <li className="flex items-start">
                            <span className="w-4 h-4 mt-1 mr-3 rounded-full bg-red-500 flex-shrink-0"></span>
                            <span><strong>Red/Warm Colors:</strong> Strong positive correlation. These variables move in the same direction.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="w-4 h-4 mt-1 mr-3 rounded-full bg-blue-500 flex-shrink-0"></span>
                            <span><strong>Blue/Cool Colors:</strong> Strong negative correlation. These variables move in opposite directions.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="w-4 h-4 mt-1 mr-3 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0"></span>
                            <span><strong>Light/Neutral Colors:</strong> Weak or no correlation.</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Section 3 */}
            <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">⚠️ Correlation != Causation</h2>
                <p className="text-slate-600 dark:text-dark-300 leading-relaxed mb-4">
                    This is the golden rule of statistics. Just because two variables are correlated doesn't mean one causes the other.
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700/30">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        <strong>Classic Example:</strong> Ice cream sales and drowning incidents are positively correlated.
                        Does eating ice cream cause drowning? No! Both are influenced by a third variable: <strong>Summer Heat</strong>.
                    </p>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-2xl p-8 border border-primary-200 dark:border-primary-500/20">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Ready to Analyze Your Data?</h2>
                <p className="text-slate-600 dark:text-dark-300 mb-6">
                    DataAnalyzer now supports Correlation Matrix Heatmaps! Upload your dataset and discover hidden patterns today.
                </p>
                <div className="flex gap-4">
                    <Link
                        to="/tutorials/correlation-matrix"
                        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors font-medium"
                    >
                        View Tutorial
                    </Link>
                    <Link
                        to="/workspace"
                        className="px-6 py-3 bg-white dark:bg-dark-700 hover:bg-slate-50 dark:hover:bg-dark-600 text-slate-700 dark:text-white border border-slate-200 dark:border-dark-600 rounded-lg transition-colors font-medium"
                    >
                        Go to Workspace
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CorrelationAnalysis;
