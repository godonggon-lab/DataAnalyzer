import { Link } from 'react-router-dom';

const AIDataAnalysis = () => {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-block px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium mb-6">
                    New Feature
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                    Introducing AI Data Analyst:<br />
                    Powered by Gemini 2.0 Flash
                </h1>
                <div className="flex items-center justify-center gap-6 text-slate-500 dark:text-dark-400 text-sm">
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        2025-12-06
                    </span>
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        5 min read
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="prose dark:prose-invert prose-lg max-w-none">
                <p className="lead text-xl text-slate-600 dark:text-dark-300 mb-12">
                    Data visualization is powerful, but sometimes you need more than just charts.
                    You need insights. That's why we're excited to announce our newest feature:
                    <strong> AI Data Analyst</strong>.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Why AI for Data Analysis?
                </h2>
                <p className="text-slate-600 dark:text-dark-300 mb-6">
                    Charts tell you <em>"what"</em> happened, but they don't always explain <em>"why"</em> or <em>"so what"</em>.
                    The new AI Analyst fills that gap by automatically reading your dataset and providing:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-slate-600 dark:text-dark-300 mb-8">
                    <li><strong>Hidden Patterns:</strong> Trends that aren't immediately obvious from a quick glance.</li>
                    <li><strong>Statistical Summaries:</strong> Key metrics explained in plain English.</li>
                    <li><strong>Hypotheses:</strong> Potential reasons behind the data points.</li>
                </ul>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    Powered by Gemini 2.0 Flash
                </h2>
                <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30 rounded-2xl p-6 mb-8">
                    <p className="text-slate-600 dark:text-dark-300">
                        We are using Google's absolute latest model, <strong>Gemini 2.0 Flash</strong>.
                        It offers blazing fast performance and reasoning capabilities that rival much larger models.
                        This means you get instant insights without waiting.
                    </p>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    How to Use It
                </h2>
                <ol className="list-decimal pl-6 space-y-4 text-slate-600 dark:text-dark-300 mb-12">
                    <li>
                        <strong>Get your API Key (It's Free):</strong><br />
                        Visit <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600">Google AI Studio</a> to get your free Gemini API key.
                    </li>
                    <li>
                        <strong>Upload Data:</strong><br />
                        Load your Excel or CSV file as usual on the Home page.
                    </li>
                    <li>
                        <strong>Click "AI Analyst":</strong><br />
                        In the Workspace, look for the new purple button "🔮 AI Analyst" at the top right.
                    </li>
                    <li>
                        <strong>Discover Insights:</strong><br />
                        Watch as the AI generates a professional report in seconds.
                    </li>
                </ol>

                <div className="border-t border-slate-200 dark:border-dark-700 pt-12 mt-12">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                        Ready to try?
                    </h3>
                    <p className="text-slate-600 dark:text-dark-300 mb-8">
                        Experience the future of data analysis today. It's free, private, and powerful.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors font-medium"
                    >
                        Start Analyzing Now
                        <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AIDataAnalysis;
