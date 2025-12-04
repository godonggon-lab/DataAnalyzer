const GettingStarted = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <div className="flex items-center text-dark-400 text-sm mb-4">
                    <a href="/DataAnalyzer/tutorials" className="hover:text-primary-400">Tutorials</a>
                    <svg className="w-4 h-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-white">Getting Started</span>
                </div>
                <h1 className="text-5xl font-bold text-white mb-4">Getting Started with DataAnalyzer</h1>
                <div className="flex items-center gap-4 text-dark-400">
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        10 min read
                    </span>
                    <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs">Beginner</span>
                </div>
            </div>

            {/* Introduction */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">Welcome to DataAnalyzer!</h2>
                <p className="text-dark-300 leading-relaxed mb-4">
                    This tutorial will guide you through the basics of using DataAnalyzer to visualize your data.
                    By the end of this guide, you'll know how to upload files, create charts, filter data, and export your visualizations.
                </p>
                <p className="text-dark-300 leading-relaxed">
                    DataAnalyzer is designed to be intuitive and powerful. Whether you're analyzing sales data, research results,
                    or personal finances, you'll find the tools you need to gain insights from your data.
                </p>
            </div>

            {/* Step 1: Upload Your Data */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold mr-4">1</div>
                    <h2 className="text-2xl font-bold text-white">Upload Your Data</h2>
                </div>

                <p className="text-dark-300 leading-relaxed mb-4">
                    DataAnalyzer supports two file formats: <strong className="text-white">CSV</strong> (Comma-Separated Values)
                    and <strong className="text-white">Excel</strong> (.xlsx, .xls).
                </p>

                <h3 className="text-lg font-semibold text-white mb-2">How to Upload:</h3>
                <ol className="list-decimal list-inside text-dark-300 space-y-2 ml-4 mb-4">
                    <li>Click the upload area or drag and drop your file onto the page</li>
                    <li>Wait for the file to be processed (this happens in your browser - your data never leaves your device)</li>
                    <li>Once loaded, you'll see a preview of your data with column information</li>
                </ol>

                <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                    <p className="text-sm text-dark-400 mb-2">💡 <strong className="text-white">Pro Tip:</strong></p>
                    <p className="text-sm text-dark-300">
                        Make sure your data has column headers in the first row. This helps DataAnalyzer understand your data structure
                        and makes it easier to select the right columns for visualization.
                    </p>
                </div>
            </div>

            {/* Step 2: Select Your Axes */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold mr-4">2</div>
                    <h2 className="text-2xl font-bold text-white">Select Your Axes</h2>
                </div>

                <p className="text-dark-300 leading-relaxed mb-4">
                    After uploading your data, you'll need to choose which columns to visualize:
                </p>

                <h3 className="text-lg font-semibold text-white mb-2">X-Axis (Horizontal):</h3>
                <p className="text-dark-300 leading-relaxed mb-4">
                    This is typically your independent variable - what you're measuring against. Common examples include:
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-1 ml-4 mb-4">
                    <li>Time (dates, months, years)</li>
                    <li>Categories (product names, regions, departments)</li>
                    <li>Numeric ranges (age groups, price brackets)</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mb-2">Y-Axis (Vertical):</h3>
                <p className="text-dark-300 leading-relaxed mb-4">
                    This is your dependent variable - what you're measuring. You can select multiple Y-axis columns to compare different metrics:
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-1 ml-4 mb-4">
                    <li>Sales figures</li>
                    <li>Quantities or counts</li>
                    <li>Percentages or rates</li>
                    <li>Measurements (temperature, weight, etc.)</li>
                </ul>

                <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                    <p className="text-sm text-dark-400 mb-2">⚠️ <strong className="text-white">Note:</strong></p>
                    <p className="text-sm text-dark-300">
                        Only numeric columns can be used for the Y-axis. If you see a warning icon, it means the selected column
                        contains non-numeric data that may affect your visualization.
                    </p>
                </div>
            </div>

            {/* Step 3: Choose a Chart Type */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold mr-4">3</div>
                    <h2 className="text-2xl font-bold text-white">Choose a Chart Type</h2>
                </div>

                <p className="text-dark-300 leading-relaxed mb-4">
                    DataAnalyzer offers five chart types, each suited for different types of analysis:
                </p>

                <div className="space-y-4">
                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h4 className="text-white font-semibold mb-2">📊 Scatter Plot</h4>
                        <p className="text-dark-300 text-sm">
                            Best for showing relationships between two variables. Each data point is displayed as a dot.
                            Great for identifying correlations and patterns.
                        </p>
                    </div>

                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h4 className="text-white font-semibold mb-2">📈 Line Chart</h4>
                        <p className="text-dark-300 text-sm">
                            Perfect for showing trends over time. Points are connected with lines to show continuity.
                            Ideal for time-series data like sales over months or temperature changes.
                        </p>
                    </div>

                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h4 className="text-white font-semibold mb-2">📊 Bar Chart</h4>
                        <p className="text-dark-300 text-sm">
                            Great for comparing values across categories. Each category is represented by a bar.
                            Use this when comparing different groups or categories.
                        </p>
                    </div>

                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h4 className="text-white font-semibold mb-2">📊 Histogram</h4>
                        <p className="text-dark-300 text-sm">
                            Shows the distribution of a single variable. Data is grouped into bins to show frequency.
                            Perfect for understanding data distribution and identifying patterns.
                        </p>
                    </div>

                    <div className="bg-dark-700/50 rounded-lg p-4 border border-dark-600">
                        <h4 className="text-white font-semibold mb-2">📦 Box Plot</h4>
                        <p className="text-dark-300 text-sm">
                            Displays statistical distribution showing median, quartiles, and outliers.
                            Excellent for comparing distributions across different categories.
                        </p>
                    </div>
                </div>
            </div>

            {/* Step 4: Filter and Refine */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold mr-4">4</div>
                    <h2 className="text-2xl font-bold text-white">Filter and Refine Your Data</h2>
                </div>

                <p className="text-dark-300 leading-relaxed mb-4">
                    DataAnalyzer provides several tools to refine your visualization:
                </p>

                <h3 className="text-lg font-semibold text-white mb-2">Data Range Filter:</h3>
                <p className="text-dark-300 leading-relaxed mb-4">
                    When working with numeric data on the X-axis or Histograms, you can set minimum and maximum values
                    to focus on specific ranges. This is useful for:
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-1 ml-4 mb-4">
                    <li>Removing outliers that skew your visualization</li>
                    <li>Zooming into a specific range of interest</li>
                    <li>Excluding invalid or test data</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mb-2">Histogram Bins:</h3>
                <p className="text-dark-300 leading-relaxed mb-4">
                    When using Histograms, you can adjust the number of bins (5-100) to control the granularity of your distribution:
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-1 ml-4 mb-4">
                    <li><strong className="text-white">Fewer bins (5-20):</strong> Show broad patterns and general distribution</li>
                    <li><strong className="text-white">More bins (50-100):</strong> Reveal detailed patterns and subtle variations</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mb-2">Box Plot Categories:</h3>
                <p className="text-dark-300 leading-relaxed mb-4">
                    For Box Plots with many categories, you can limit the maximum number displayed to avoid overcrowding.
                </p>
            </div>

            {/* Step 5: Export and Share */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold mr-4">5</div>
                    <h2 className="text-2xl font-bold text-white">Export and Share Your Charts</h2>
                </div>

                <p className="text-dark-300 leading-relaxed mb-4">
                    Once you've created the perfect visualization, you can export it:
                </p>

                <ol className="list-decimal list-inside text-dark-300 space-y-2 ml-4 mb-4">
                    <li>Hover over your chart to reveal the toolbar</li>
                    <li>Click the download icon (camera/save icon)</li>
                    <li>Your chart will be saved as a high-quality PNG image</li>
                </ol>

                <p className="text-dark-300 leading-relaxed">
                    You can then use these images in reports, presentations, or share them with colleagues.
                </p>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-primary-500/10 to-primary-700/10 rounded-2xl p-8 border border-primary-500/20">
                <h2 className="text-2xl font-bold text-white mb-4">🎉 Congratulations!</h2>
                <p className="text-dark-300 mb-6">
                    You now know the basics of DataAnalyzer! Ready to explore more advanced features?
                </p>
                <div className="flex gap-4">
                    <a
                        href="/DataAnalyzer/tutorials/advanced-features"
                        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                    >
                        Advanced Features →
                    </a>
                    <a
                        href="/DataAnalyzer/tutorials/tips-and-tricks"
                        className="px-6 py-3 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors"
                    >
                        Tips & Tricks
                    </a>
                </div>
            </div>
        </div>
    );
};

export default GettingStarted;
