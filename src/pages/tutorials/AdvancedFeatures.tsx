const AdvancedFeatures = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <div className="flex items-center text-dark-400 text-sm mb-4">
                    <a href="/DataAnalyzer/tutorials" className="hover:text-primary-400">Tutorials</a>
                    <svg className="w-4 h-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-white">Advanced Features</span>
                </div>
                <h1 className="text-5xl font-bold text-white mb-4">Advanced Features Guide</h1>
                <div className="flex items-center gap-4 text-dark-400">
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        15 min read
                    </span>
                    <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs">Advanced</span>
                </div>
            </div>

            {/* Introduction */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">Unlock DataAnalyzer's Full Potential</h2>
                <p className="text-dark-300 leading-relaxed mb-4">
                    Now that you're comfortable with the basics, it's time to explore DataAnalyzer's advanced features.
                    This guide will show you how to create multi-axis charts, work with statistical visualizations,
                    and handle large datasets efficiently.
                </p>
                <p className="text-dark-300 leading-relaxed">
                    These features are designed for users who need deeper insights and more sophisticated visualizations.
                </p>
            </div>

            {/* Multi-Axis Charts */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">📊 Multi-Axis Charts</h2>

                <p className="text-dark-300 leading-relaxed mb-4">
                    One of DataAnalyzer's most powerful features is the ability to plot multiple Y-axis columns on the same chart.
                    This is perfect for comparing different metrics that share the same X-axis.
                </p>

                <h3 className="text-lg font-semibold text-white mb-2">When to Use Multi-Axis:</h3>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4 mb-4">
                    <li>Comparing sales and profit over time</li>
                    <li>Analyzing temperature and humidity together</li>
                    <li>Tracking multiple KPIs (Key Performance Indicators)</li>
                    <li>Comparing different product lines or categories</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mb-2">How to Create Multi-Axis Charts:</h3>
                <ol className="list-decimal list-inside text-dark-300 space-y-2 ml-4 mb-4">
                    <li>Select your X-axis column as usual</li>
                    <li>In the Y-axis section, check multiple columns (not available for Histogram)</li>
                    <li>Each column will be plotted as a separate series with its own color</li>
                    <li>Use the legend to identify which line/bar represents which metric</li>
                </ol>

                <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                    <p className="text-sm text-dark-400 mb-2">💡 <strong className="text-white">Pro Tip:</strong></p>
                    <p className="text-sm text-dark-300">
                        When comparing metrics with very different scales (e.g., revenue in millions vs. conversion rate in percentages),
                        consider normalizing your data or using separate charts for better readability.
                    </p>
                </div>
            </div>

            {/* Box Plots */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">📦 Mastering Box Plots</h2>

                <p className="text-dark-300 leading-relaxed mb-4">
                    Box Plots (also called box-and-whisker plots) are statistical charts that show the distribution of your data.
                    They're incredibly useful for identifying outliers and comparing distributions across categories.
                </p>

                <h3 className="text-lg font-semibold text-white mb-2">Understanding Box Plot Components:</h3>
                <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600 mb-4">
                    <ul className="text-dark-300 space-y-2">
                        <li><strong className="text-white">Box:</strong> Represents the middle 50% of your data (interquartile range)</li>
                        <li><strong className="text-white">Line in box:</strong> Shows the median (middle value)</li>
                        <li><strong className="text-white">Whiskers:</strong> Extend to show the range of typical values</li>
                        <li><strong className="text-white">Dots:</strong> Individual outliers that fall outside the typical range</li>
                    </ul>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">Best Use Cases:</h3>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4 mb-4">
                    <li>Comparing salary distributions across departments</li>
                    <li>Analyzing test scores by class or school</li>
                    <li>Examining product prices across different categories</li>
                    <li>Identifying quality control issues in manufacturing</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mb-2">Multi-Series Box Plots:</h3>
                <p className="text-dark-300 leading-relaxed mb-4">
                    You can select multiple Y-axis columns to create side-by-side box plots for comparison:
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4 mb-4">
                    <li><strong className="text-white">With X-axis:</strong> Each Y-column gets its own color, grouped by X-axis categories</li>
                    <li><strong className="text-white">Without X-axis:</strong> Each Y-column becomes a separate category for easy comparison</li>
                </ul>

                <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                    <p className="text-sm text-dark-400 mb-2">⚠️ <strong className="text-white">Note:</strong></p>
                    <p className="text-sm text-dark-300">
                        Box Plots work best with at least 5-10 data points per category. With fewer points,
                        the statistical measures may not be meaningful.
                    </p>
                </div>
            </div>

            {/* Histograms */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">📊 Deep Dive into Histograms</h2>

                <p className="text-dark-300 leading-relaxed mb-4">
                    Histograms are essential for understanding the distribution of a single variable. Unlike bar charts that compare
                    categories, histograms show how frequently values occur within ranges (bins).
                </p>

                <h3 className="text-lg font-semibold text-white mb-2">Key Concepts:</h3>
                <div className="space-y-3 mb-4">
                    <div className="bg-dark-700/50 rounded-lg p-3 border border-dark-600">
                        <h4 className="text-white font-semibold text-sm mb-1">Bins</h4>
                        <p className="text-dark-300 text-sm">
                            Ranges that group your data. For example, ages 0-10, 10-20, 20-30, etc.
                        </p>
                    </div>
                    <div className="bg-dark-700/50 rounded-lg p-3 border border-dark-600">
                        <h4 className="text-white font-semibold text-sm mb-1">Frequency</h4>
                        <p className="text-dark-300 text-sm">
                            The height of each bar shows how many data points fall within that bin.
                        </p>
                    </div>
                    <div className="bg-dark-700/50 rounded-lg p-3 border border-dark-600">
                        <h4 className="text-white font-semibold text-sm mb-1">Distribution Shape</h4>
                        <p className="text-dark-300 text-sm">
                            The overall pattern reveals if your data is normal, skewed, bimodal, etc.
                        </p>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">Choosing the Right Number of Bins:</h3>
                <p className="text-dark-300 leading-relaxed mb-4">
                    The number of bins significantly affects how your histogram looks:
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4 mb-4">
                    <li><strong className="text-white">Too few bins (5-10):</strong> May hide important patterns and details</li>
                    <li><strong className="text-white">Too many bins (80-100):</strong> May show too much noise and make patterns hard to see</li>
                    <li><strong className="text-white">Sweet spot (20-50):</strong> Usually provides good balance for most datasets</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mb-2">Common Distribution Patterns:</h3>
                <div className="space-y-2 mb-4">
                    <p className="text-dark-300"><strong className="text-white">Normal (Bell Curve):</strong> Most values cluster around the center</p>
                    <p className="text-dark-300"><strong className="text-white">Skewed:</strong> Values tail off to one side</p>
                    <p className="text-dark-300"><strong className="text-white">Bimodal:</strong> Two distinct peaks indicating two groups</p>
                    <p className="text-dark-300"><strong className="text-white">Uniform:</strong> Values spread evenly across the range</p>
                </div>

                <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                    <p className="text-sm text-dark-400 mb-2">💡 <strong className="text-white">Pro Tip:</strong></p>
                    <p className="text-sm text-dark-300">
                        Use the min/max filters to remove outliers before creating your histogram. This helps you focus on
                        the main distribution without extreme values distorting the scale.
                    </p>
                </div>
            </div>

            {/* Large Datasets */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">⚡ Handling Large Datasets</h2>

                <p className="text-dark-300 leading-relaxed mb-4">
                    DataAnalyzer uses advanced techniques to handle large datasets efficiently. Here's what happens behind the scenes
                    and how to get the best performance:
                </p>

                <h3 className="text-lg font-semibold text-white mb-2">WebWorker Processing:</h3>
                <p className="text-dark-300 leading-relaxed mb-4">
                    When you upload a file, DataAnalyzer processes it in a separate thread (WebWorker) to keep the interface responsive.
                    This means you can work with files containing hundreds of thousands of rows without freezing your browser.
                </p>

                <h3 className="text-lg font-semibold text-white mb-2">Data Sampling:</h3>
                <p className="text-dark-300 leading-relaxed mb-4">
                    For extremely large datasets (100,000+ rows), DataAnalyzer automatically samples your data for visualization
                    while maintaining statistical accuracy. This ensures:
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4 mb-4">
                    <li>Fast chart rendering</li>
                    <li>Smooth interactions (zooming, panning)</li>
                    <li>Accurate representation of patterns and trends</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mb-2">Performance Tips:</h3>
                <ol className="list-decimal list-inside text-dark-300 space-y-2 ml-4 mb-4">
                    <li><strong className="text-white">Filter early:</strong> Use min/max filters to reduce data before visualizing</li>
                    <li><strong className="text-white">Choose appropriate chart types:</strong> Line charts handle large datasets better than scatter plots</li>
                    <li><strong className="text-white">Limit categories:</strong> For Box Plots, use the max categories option to avoid overcrowding</li>
                    <li><strong className="text-white">Close unused tabs:</strong> Free up browser memory for better performance</li>
                </ol>

                <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                    <p className="text-sm text-dark-400 mb-2">⚠️ <strong className="text-white">Memory Limits:</strong></p>
                    <p className="text-sm text-dark-300">
                        Browser memory limits vary by device. If you encounter issues with very large files (&gt;100MB),
                        consider pre-processing your data to include only the columns you need.
                    </p>
                </div>
            </div>

            {/* Advanced Filtering */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">🎯 Advanced Filtering Techniques</h2>

                <p className="text-dark-300 leading-relaxed mb-4">
                    Effective filtering is key to creating meaningful visualizations. Here are advanced strategies:
                </p>

                <h3 className="text-lg font-semibold text-white mb-2">Range-Based Filtering:</h3>
                <p className="text-dark-300 leading-relaxed mb-4">
                    For numeric X-axis data and Histograms, you can set precise min and max values:
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4 mb-4">
                    <li><strong className="text-white">Remove outliers:</strong> Exclude extreme values that skew your visualization</li>
                    <li><strong className="text-white">Focus on ranges:</strong> Zoom into specific value ranges of interest</li>
                    <li><strong className="text-white">Compare periods:</strong> Filter dates to compare specific time periods</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mb-2">Statistical Filtering:</h3>
                <p className="text-dark-300 leading-relaxed mb-4">
                    Common filtering strategies based on statistics:
                </p>
                <div className="space-y-2 mb-4">
                    <p className="text-dark-300"><strong className="text-white">IQR Method:</strong> Keep values within 1.5× the interquartile range</p>
                    <p className="text-dark-300"><strong className="text-white">Percentile:</strong> Filter to top/bottom percentiles (e.g., top 10%)</p>
                    <p className="text-dark-300"><strong className="text-white">Standard Deviation:</strong> Keep values within 2-3 standard deviations</p>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">Category Limiting:</h3>
                <p className="text-dark-300 leading-relaxed mb-4">
                    For Box Plots with many categories, limit the number displayed to:
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4 mb-4">
                    <li>Improve readability</li>
                    <li>Focus on most important categories</li>
                    <li>Reduce chart clutter</li>
                </ul>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-primary-500/10 to-primary-700/10 rounded-2xl p-8 border border-primary-500/20">
                <h2 className="text-2xl font-bold text-white mb-4">🚀 You're Now an Advanced User!</h2>
                <p className="text-dark-300 mb-6">
                    You've mastered DataAnalyzer's advanced features. Want to learn some hidden tricks and optimization tips?
                </p>
                <div className="flex gap-4">
                    <a
                        href="/DataAnalyzer/tutorials/tips-and-tricks"
                        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                    >
                        Tips & Tricks →
                    </a>
                    <a
                        href="/DataAnalyzer/tutorials"
                        className="px-6 py-3 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors"
                    >
                        All Tutorials
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdvancedFeatures;
