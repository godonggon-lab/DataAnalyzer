const Contact = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="text-center">
                <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">Get in Touch</h1>
                <p className="text-xl text-slate-600 dark:text-dark-300">
                    Have questions, suggestions, or feedback? We'd love to hear from you!
                </p>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* GitHub */}
                <a
                    href="https://github.com/godonggon-lab/DataAnalyzer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700 hover:border-primary-500 transition-colors group"
                >
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-primary-500/10 dark:bg-primary-500/20 rounded-lg flex items-center justify-center group-hover:bg-primary-500/20 dark:group-hover:bg-primary-500/30 transition-colors">
                            <svg className="w-6 h-6 text-primary-500 dark:text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white font-semibold text-lg">GitHub</h3>
                            <p className="text-slate-500 dark:text-dark-400 text-sm">Report issues or contribute</p>
                        </div>
                    </div>
                    <p className="text-slate-600 dark:text-dark-300 text-sm">
                        Visit our GitHub repository to report bugs, request features, or contribute to the project.
                    </p>
                    <div className="mt-4 flex items-center text-primary-400 text-sm group-hover:text-primary-300">
                        <span>View Repository</span>
                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </a>

                {/* Email */}
                <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-primary-500/10 dark:bg-primary-500/20 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-primary-500 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white font-semibold text-lg">Email</h3>
                            <p className="text-slate-500 dark:text-dark-400 text-sm">For general inquiries</p>
                        </div>
                    </div>
                    <p className="text-slate-600 dark:text-dark-300 text-sm mb-4">
                        Have a question or feedback? Send us an email and we'll get back to you as soon as possible.
                    </p>
                    <a
                        href="mailto:contact@dataanalyzer.com"
                        className="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm"
                    >
                        <span>contact@dataanalyzer.com</span>
                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-dark-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-slate-900 dark:text-white font-semibold mb-2">Is DataAnalyzer really free?</h3>
                        <p className="text-slate-600 dark:text-dark-300 text-sm leading-relaxed">
                            Yes! DataAnalyzer is completely free to use with no hidden fees, subscriptions, or feature limitations.
                            It's open source and will always remain free.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-slate-900 dark:text-white font-semibold mb-2">Is my data safe?</h3>
                        <p className="text-slate-600 dark:text-dark-300 text-sm leading-relaxed">
                            Absolutely. All data processing happens entirely in your browser. Your files are never uploaded to any server,
                            and we don't collect or store any of your data. Your privacy is our top priority.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-slate-900 dark:text-white font-semibold mb-2">What file formats are supported?</h3>
                        <p className="text-slate-600 dark:text-dark-300 text-sm leading-relaxed">
                            DataAnalyzer currently supports CSV (Comma-Separated Values) and Excel files (.xlsx, .xls).
                            We're working on adding support for more formats in future updates.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-slate-900 dark:text-white font-semibold mb-2">How large can my dataset be?</h3>
                        <p className="text-slate-600 dark:text-dark-300 text-sm leading-relaxed">
                            DataAnalyzer can handle datasets with hundreds of thousands of rows efficiently thanks to WebWorker processing
                            and data sampling. However, performance may vary depending on your device's capabilities.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-slate-900 dark:text-white font-semibold mb-2">Can I use DataAnalyzer offline?</h3>
                        <p className="text-slate-600 dark:text-dark-300 text-sm leading-relaxed">
                            Once you've loaded the application, you can use it offline for data analysis. However, you'll need an
                            internet connection for the initial load and any future updates.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-slate-900 dark:text-white font-semibold mb-2">How can I contribute to the project?</h3>
                        <p className="text-slate-600 dark:text-dark-300 text-sm leading-relaxed">
                            We welcome contributions! Visit our GitHub repository to report bugs, suggest features, or submit pull requests.
                            Check out the CONTRIBUTING.md file for guidelines.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-slate-900 dark:text-white font-semibold mb-2">Can I export my charts?</h3>
                        <p className="text-slate-600 dark:text-dark-300 text-sm leading-relaxed">
                            Yes! You can export your visualizations as high-quality PNG images directly from the chart interface.
                            Simply click the download button on any chart.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-slate-900 dark:text-white font-semibold mb-2">Do you offer commercial support?</h3>
                        <p className="text-slate-600 dark:text-dark-300 text-sm leading-relaxed">
                            DataAnalyzer is a community-driven open-source project. While we don't offer official commercial support,
                            you can reach out via GitHub issues or email for assistance.
                        </p>
                    </div>
                </div>
            </div>

            {/* Additional Help */}
            <div className="bg-gradient-to-r from-primary-500/10 to-primary-700/10 rounded-2xl p-8 border border-primary-500/20 text-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Still have questions?</h2>
                <p className="text-slate-600 dark:text-dark-300 mb-6">
                    Check out our tutorials and documentation for detailed guides on using DataAnalyzer.
                </p>
                <div className="flex justify-center space-x-4">
                    <a
                        href="/DataAnalyzer/tutorials"
                        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                    >
                        View Tutorials
                    </a>
                    <a
                        href="/DataAnalyzer/blog"
                        className="px-6 py-3 bg-slate-200 dark:bg-dark-700 hover:bg-slate-300 dark:hover:bg-dark-600 text-slate-900 dark:text-white rounded-lg transition-colors"
                    >
                        Read Blog
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Contact;
