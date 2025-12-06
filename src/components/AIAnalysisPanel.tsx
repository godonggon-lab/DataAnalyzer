import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { analyzeDataWithGemini } from '../utils/ai';
import { useDataStore } from '../store/dataStore';

const AIAnalysisPanel = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Get data from store
    const { processedData, processedColumns } = useDataStore();

    const handleAnalyze = async () => {
        if (!processedData || processedData.length === 0) {
            setError("No data available to analyze. Please upload a file first.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setAnalysisResult(null);

        try {
            // Prepare summary data specifically for AI
            // 1. Column Metadata
            const columnInfo = processedColumns
                .map(col => `- ${col.name} (${col.type})`)
                .join('\n');

            // 2. Data Sampling (First 5 rows + minimal stats if manageable)
            // We'll just send the first 10 rows as a raw sample for now to keep it cheap on tokens
            const sampleData = processedData.slice(0, 10);
            const dataSummary = JSON.stringify(sampleData, null, 2);

            const result = await analyzeDataWithGemini(dataSummary, columnInfo);
            setAnalysisResult(result);
        } catch (err: any) {
            setError(err.message || "Failed to analyze data.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-slate-200 dark:border-dark-700 shadow-sm transition-all">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">AI Data Analyst</h3>
                        <p className="text-sm text-slate-500 dark:text-dark-400">Powered by Google Gemini</p>
                    </div>
                </div>

                {/* Analyze Button */}
                <button
                    onClick={handleAnalyze}
                    disabled={isLoading || !processedData?.length}
                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2
                        ${isLoading
                            ? 'bg-slate-100 dark:bg-dark-700 text-slate-400 dark:text-dark-500 cursor-not-allowed'
                            : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-purple-500/30'
                        }
                    `}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 mr-1" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <span>✨ Analyze Now</span>
                        </>
                    )}
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-4 mb-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {/* Empty State */}
            {!analysisResult && !isLoading && !error && (
                <div className="text-center py-8 text-slate-500 dark:text-dark-400 border-2 border-dashed border-slate-200 dark:border-dark-700 rounded-xl">
                    <p>Click "Analyze Now" to get AI-powered insights from your data.</p>
                </div>
            )}

            {/* Results Area */}
            {analysisResult && (
                <div className="bg-slate-50 dark:bg-dark-700/30 rounded-xl p-6 border border-slate-100 dark:border-dark-600">
                    <ReactMarkdown
                        components={{
                            h1: ({ children }) => (
                                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-dark-600">
                                    {children}
                                </h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">
                                    {children}
                                </h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">
                                    {children}
                                </h3>
                            ),
                            p: ({ children }) => (
                                <p className="text-slate-700 dark:text-dark-200 leading-relaxed mb-4">
                                    {children}
                                </p>
                            ),
                            ul: ({ children }) => (
                                <ul className="list-disc list-inside space-y-2 mb-4 text-slate-700 dark:text-dark-200">
                                    {children}
                                </ul>
                            ),
                            ol: ({ children }) => (
                                <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-700 dark:text-dark-200">
                                    {children}
                                </ol>
                            ),
                            li: ({ children }) => (
                                <li className="ml-4">
                                    {children}
                                </li>
                            ),
                            strong: ({ children }) => (
                                <strong className="font-bold text-slate-900 dark:text-white">
                                    {children}
                                </strong>
                            ),
                            em: ({ children }) => (
                                <em className="italic text-slate-600 dark:text-dark-300">
                                    {children}
                                </em>
                            ),
                            code: ({ inline, children }: any) =>
                                inline ? (
                                    <code className="px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-sm font-mono">
                                        {children}
                                    </code>
                                ) : (
                                    <code className="block bg-slate-800 dark:bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono mb-4">
                                        {children}
                                    </code>
                                ),
                            blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-4 bg-purple-50 dark:bg-purple-900/10 text-slate-700 dark:text-dark-200 italic">
                                    {children}
                                </blockquote>
                            ),
                            table: ({ children }) => (
                                <div className="overflow-x-auto mb-4">
                                    <table className="min-w-full border border-slate-200 dark:border-dark-600 rounded-lg">
                                        {children}
                                    </table>
                                </div>
                            ),
                            thead: ({ children }) => (
                                <thead className="bg-slate-100 dark:bg-dark-700">
                                    {children}
                                </thead>
                            ),
                            th: ({ children }) => (
                                <th className="px-4 py-2 text-left font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-dark-600">
                                    {children}
                                </th>
                            ),
                            td: ({ children }) => (
                                <td className="px-4 py-2 text-slate-700 dark:text-dark-200 border-b border-slate-100 dark:border-dark-700">
                                    {children}
                                </td>
                            ),
                        }}
                    >
                        {analysisResult}
                    </ReactMarkdown>
                </div>
            )}
        </div>
    );
};

export default AIAnalysisPanel;
