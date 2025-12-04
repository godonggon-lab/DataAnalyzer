const TipsAndTricks = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <div className="flex items-center text-dark-400 text-sm mb-4">
                    <a href="/DataAnalyzer/tutorials" className="hover:text-primary-400">Tutorials</a>
                    <svg className="w-4 h-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-white">Tips and Tricks</span>
                </div>
                <h1 className="text-5xl font-bold text-white mb-4">Tips and Tricks</h1>
                <div className="flex items-center gap-4 text-dark-400">
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        12 min read
                    </span>
                    <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 text-xs">Intermediate</span>
                </div>
            </div>

            {/* Introduction */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">Become a DataAnalyzer Power User</h2>
                <p className="text-dark-300 leading-relaxed">
                    Discover hidden features, keyboard shortcuts, and best practices that will make you more efficient
                    and help you create better visualizations. These tips come from real users and our development team.
                </p>
            </div>

            {/* Performance Tips */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">⚡ Performance Optimization</h2>

                <div className="space-y-4">
                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h3 className="text-white font-semibold mb-2">💡 Pre-filter Your Data</h3>
                        <p className="text-dark-300 text-sm mb-2">
                            Before uploading, remove unnecessary columns in Excel or your data tool. This reduces file size
                            and speeds up processing.
                        </p>
                        <p className="text-dark-400 text-xs italic">
                            Example: If analyzing sales data, remove internal notes or audit columns that won't be visualized.
                        </p>
                    </div>

                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h3 className="text-white font-semibold mb-2">💡 Use Line Charts for Large Datasets</h3>
                        <p className="text-dark-300 text-sm mb-2">
                            Line charts render faster than scatter plots when you have thousands of data points.
                            They also make trends easier to see.
                        </p>
                    </div>

                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h3 className="text-white font-semibold mb-2">💡 Clear Browser Cache Regularly</h3>
                        <p className="text-dark-300 text-sm mb-2">
                            If DataAnalyzer feels slow, clear your browser cache. This removes old data and frees up memory.
                        </p>
                        <p className="text-dark-400 text-xs">
                            Chrome: Settings → Privacy → Clear browsing data → Cached images and files
                        </p>
                    </div>

                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h3 className="text-white font-semibold mb-2">💡 Limit Box Plot Categories</h3>
                        <p className="text-dark-300 text-sm mb-2">
                            When you have many categories (50+), use the "Max Categories" option to show only the most important ones.
                            This improves both performance and readability.
                        </p>
                    </div>
                </div>
            </div>

            {/* Data Preparation */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">📊 Data Preparation Best Practices</h2>

                <div className="space-y-4">
                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h3 className="text-white font-semibold mb-2">✅ Use Clear Column Headers</h3>
                        <p className="text-dark-300 text-sm mb-2">
                            Name your columns descriptively. Instead of "Col1" or "Data", use "Monthly Revenue" or "Customer Count".
                        </p>
                        <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-red-500/10 border border-red-500/30 rounded p-2">
                                <p className="text-red-400 font-semibold mb-1">❌ Bad:</p>
                                <p className="text-dark-400">A, B, C, Data1, Data2</p>
                            </div>
                            <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                                <p className="text-green-400 font-semibold mb-1">✅ Good:</p>
                                <p className="text-dark-400">Date, Revenue, Units Sold</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h3 className="text-white font-semibold mb-2">✅ Format Dates Consistently</h3>
                        <p className="text-dark-300 text-sm mb-2">
                            Use a standard date format throughout your file (e.g., YYYY-MM-DD or MM/DD/YYYY).
                            Inconsistent formats can cause sorting issues.
                        </p>
                    </div>

                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h3 className="text-white font-semibold mb-2">✅ Remove Empty Rows and Columns</h3>
                        <p className="text-dark-300 text-sm mb-2">
                            Empty rows at the end of your data or blank columns can confuse the parser.
                            Clean them up before uploading.
                        </p>
                    </div>

                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h3 className="text-white font-semibold mb-2">✅ Handle Missing Values</h3>
                        <p className="text-dark-300 text-sm mb-2">
                            Decide how to handle missing data before uploading:
                        </p>
                        <ul className="text-dark-300 text-xs space-y-1 ml-4 mt-2">
                            <li>• Remove rows with missing values</li>
                            <li>• Replace with 0 or average (if appropriate)</li>
                            <li>• Use a placeholder like "N/A" for categories</li>
                        </ul>
                    </div>

                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h3 className="text-white font-semibold mb-2">✅ Avoid Special Characters in Numbers</h3>
                        <p className="text-dark-300 text-sm mb-2">
                            Remove currency symbols ($), percentages (%), and commas from numeric columns.
                            Use: 1000 instead of $1,000 or 1,000.
                        </p>
                    </div>
                </div>
            </div>

            {/* Visualization Best Practices */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">🎨 Visualization Best Practices</h2>

                <div className="space-y-4">
                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h3 className="text-white font-semibold mb-2">📈 Choose the Right Chart Type</h3>
                        <div className="text-dark-300 text-sm space-y-2 mt-2">
                            <p><strong className="text-white">Trends over time?</strong> → Line Chart</p>
                            <p><strong className="text-white">Comparing categories?</strong> → Bar Chart</p>
                            <p><strong className="text-white">Relationship between variables?</strong> → Scatter Plot</p>
                            <p><strong className="text-white">Distribution of values?</strong> → Histogram</p>
                            <p><strong className="text-white">Statistical comparison?</strong> → Box Plot</p>
                        </div>
                    </div>

                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h3 className="text-white font-semibold mb-2">🎯 Keep It Simple</h3>
                        <p className="text-dark-300 text-sm mb-2">
                            Don't plot too many series on one chart. If you have more than 5-7 lines or categories,
                            consider splitting into multiple charts or using filters.
                        </p>
                    </div>

                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h3 className="text-white font-semibold mb-2">📊 Use Appropriate Scales</h3>
                        <p className="text-dark-300 text-sm mb-2">
                            When comparing metrics with very different ranges, consider:
                        </p>
                        <ul className="text-dark-300 text-xs space-y-1 ml-4 mt-2">
                            <li>• Creating separate charts</li>
                            <li>• Normalizing data (converting to percentages)</li>
                            <li>• Using logarithmic scales (in external tools)</li>
                        </ul>
                    </div>

                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h3 className="text-white font-semibold mb-2">🔍 Remove Outliers Wisely</h3>
                        <p className="text-dark-300 text-sm mb-2">
                            Outliers can distort your visualization, but they might also be important!
                            Before removing them, ask:
                        </p>
                        <ul className="text-dark-300 text-xs space-y-1 ml-4 mt-2">
                            <li>• Are they data errors or real values?</li>
                            <li>• Do they represent important events?</li>
                            <li>• Should they be investigated separately?</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Common Issues */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">🔧 Troubleshooting Common Issues</h2>

                <div className="space-y-4">
                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h3 className="text-white font-semibold mb-2">❓ "My chart is empty"</h3>
                        <p className="text-dark-300 text-sm mb-2">Check:</p>
                        <ul className="text-dark-300 text-xs space-y-1 ml-4">
                            <li>• Are you selecting the right columns?</li>
                            <li>• Do your filters exclude all data?</li>
                            <li>• Is your Y-axis column actually numeric?</li>
                        </ul>
                    </div>

                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h3 className="text-white font-semibold mb-2">❓ "Numbers look wrong"</h3>
                        <p className="text-dark-300 text-sm mb-2">
                            If your column has mixed text and numbers, DataAnalyzer might skip non-numeric values.
                            Clean your data to ensure all values in numeric columns are actually numbers.
                        </p>
                    </div>

                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h3 className="text-white font-semibold mb-2">❓ "Chart is too crowded"</h3>
                        <p className="text-dark-300 text-sm mb-2">Solutions:</p>
                        <ul className="text-dark-300 text-xs space-y-1 ml-4">
                            <li>• Use filters to show fewer data points</li>
                            <li>• Limit categories in Box Plots</li>
                            <li>• Switch to a different chart type</li>
                            <li>• Create multiple charts for different subsets</li>
                        </ul>
                    </div>

                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h3 className="text-white font-semibold mb-2">❓ "File won't upload"</h3>
                        <p className="text-dark-300 text-sm mb-2">Try:</p>
                        <ul className="text-dark-300 text-xs space-y-1 ml-4">
                            <li>• Checking file size (very large files may timeout)</li>
                            <li>• Ensuring file is .csv, .xlsx, or .xls format</li>
                            <li>• Refreshing the page and trying again</li>
                            <li>• Using a different browser</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Hidden Features */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">🎁 Hidden Features & Shortcuts</h2>

                <div className="space-y-4">
                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h3 className="text-white font-semibold mb-2">🖱️ Chart Interactions</h3>
                        <ul className="text-dark-300 text-sm space-y-2">
                            <li><strong className="text-white">Hover:</strong> See exact values for any data point</li>
                            <li><strong className="text-white">Click legend:</strong> Toggle series visibility</li>
                            <li><strong className="text-white">Toolbar icons:</strong> Download chart as image, reset zoom</li>
                        </ul>
                    </div>

                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h3 className="text-white font-semibold mb-2">🔄 Quick Reset</h3>
                        <p className="text-dark-300 text-sm">
                            Use the "New Start" button in the header to quickly clear all data and start fresh
                            without refreshing the page.
                        </p>
                    </div>

                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h3 className="text-white font-semibold mb-2">💾 Browser Storage</h3>
                        <p className="text-dark-300 text-sm mb-2">
                            Your chart settings are saved in your browser's local storage. This means:
                        </p>
                        <ul className="text-dark-300 text-xs space-y-1 ml-4">
                            <li>• Settings persist between sessions</li>
                            <li>• Each browser/device has separate settings</li>
                            <li>• Clearing browser data will reset everything</li>
                        </ul>
                    </div>

                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h3 className="text-white font-semibold mb-2">🎨 Color Coding</h3>
                        <p className="text-dark-300 text-sm">
                            DataAnalyzer automatically assigns distinct colors to different series.
                            The colors are chosen to be visually distinct and colorblind-friendly.
                        </p>
                    </div>
                </div>
            </div>

            {/* Pro Tips Summary */}
            <div className="bg-gradient-to-r from-primary-500/10 to-primary-700/10 rounded-2xl p-8 border border-primary-500/20">
                <h2 className="text-2xl font-bold text-white mb-4">🌟 Quick Reference: Top 10 Tips</h2>
                <ol className="text-dark-300 space-y-2 text-sm">
                    <li>1. Clean your data before uploading (remove empty rows, fix formats)</li>
                    <li>2. Use descriptive column headers</li>
                    <li>3. Choose the right chart type for your data</li>
                    <li>4. Filter early to improve performance</li>
                    <li>5. Don't overcrowd charts - less is more</li>
                    <li>6. Use Line charts for large time-series data</li>
                    <li>7. Adjust histogram bins to find the right level of detail</li>
                    <li>8. Hover over charts to see exact values</li>
                    <li>9. Export charts as images for reports and presentations</li>
                    <li>10. Your data never leaves your browser - it's completely private!</li>
                </ol>
                <div className="mt-6 flex gap-4">
                    <a
                        href="/DataAnalyzer/tutorials"
                        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                    >
                        All Tutorials
                    </a>
                    <a
                        href="/DataAnalyzer/contact"
                        className="px-6 py-3 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors"
                    >
                        Need Help?
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TipsAndTricks;
