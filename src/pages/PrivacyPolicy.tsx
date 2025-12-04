const PrivacyPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="text-center">
                <h1 className="text-5xl font-bold text-white mb-4">Privacy Policy</h1>
                <p className="text-dark-400">Last updated: December 4, 2025</p>
            </div>

            {/* Introduction */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <p className="text-dark-300 leading-relaxed">
                    At DataAnalyzer, we take your privacy seriously. This Privacy Policy explains how we handle your information
                    when you use our service. The most important thing to know: <strong className="text-white">we don't collect,
                        store, or transmit your data</strong>. All processing happens locally in your browser.
                </p>
            </div>

            {/* Information We Collect */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>

                <h3 className="text-lg font-semibold text-white mb-2 mt-4">1.1 Data You Upload</h3>
                <p className="text-dark-300 leading-relaxed mb-4">
                    When you upload CSV or Excel files to DataAnalyzer:
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                    <li>Your files are processed entirely in your web browser</li>
                    <li>No data is uploaded to our servers or any third-party servers</li>
                    <li>Your files remain on your device at all times</li>
                    <li>We have no access to your data whatsoever</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mb-2 mt-6">1.2 Local Storage</h3>
                <p className="text-dark-300 leading-relaxed mb-4">
                    DataAnalyzer may use your browser's local storage to:
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                    <li>Remember your chart preferences and settings</li>
                    <li>Cache application resources for faster loading</li>
                    <li>Store your session state (which charts you've created, etc.)</li>
                </ul>
                <p className="text-dark-300 leading-relaxed mt-4">
                    This data is stored locally on your device and is never transmitted to any server.
                    You can clear this data at any time through your browser settings.
                </p>

                <h3 className="text-lg font-semibold text-white mb-2 mt-6">1.3 Analytics (Optional)</h3>
                <p className="text-dark-300 leading-relaxed">
                    We may use privacy-focused analytics tools (such as Google Analytics) to understand how users interact with our application.
                    This helps us improve the service. The information collected includes:
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4 mt-2">
                    <li>Pages visited and features used</li>
                    <li>Browser type and version</li>
                    <li>Device type and screen resolution</li>
                    <li>General geographic location (country/city level)</li>
                    <li>Time spent on the application</li>
                </ul>
                <p className="text-dark-300 leading-relaxed mt-4">
                    <strong className="text-white">Important:</strong> Analytics never capture your actual data, file names, or any personally identifiable information.
                </p>
            </div>

            {/* How We Use Information */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Information</h2>
                <p className="text-dark-300 leading-relaxed mb-4">
                    Since we don't collect your data, there's nothing to "use" in the traditional sense. However, the limited information
                    we may collect through analytics is used to:
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                    <li>Improve the user experience and application performance</li>
                    <li>Understand which features are most valuable to users</li>
                    <li>Identify and fix bugs or issues</li>
                    <li>Make informed decisions about future development</li>
                </ul>
            </div>

            {/* Cookies */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">3. Cookies and Similar Technologies</h2>
                <p className="text-dark-300 leading-relaxed mb-4">
                    DataAnalyzer may use cookies and similar technologies for:
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                    <li><strong className="text-white">Essential Cookies:</strong> Required for the application to function properly</li>
                    <li><strong className="text-white">Preference Cookies:</strong> Remember your settings and preferences</li>
                    <li><strong className="text-white">Analytics Cookies:</strong> Help us understand how you use the application (if analytics are enabled)</li>
                </ul>
                <p className="text-dark-300 leading-relaxed mt-4">
                    You can control cookies through your browser settings. Note that disabling certain cookies may affect the functionality of DataAnalyzer.
                </p>
            </div>

            {/* Data Security */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
                <p className="text-dark-300 leading-relaxed mb-4">
                    Your data security is inherently protected because:
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                    <li>All data processing occurs locally in your browser</li>
                    <li>No data is transmitted over the internet to our servers</li>
                    <li>We have no access to your files or data</li>
                    <li>Your data never leaves your device</li>
                </ul>
                <p className="text-dark-300 leading-relaxed mt-4">
                    The security of your data is ultimately in your hands and depends on your device's security measures.
                </p>
            </div>

            {/* Third-Party Services */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Services</h2>
                <p className="text-dark-300 leading-relaxed mb-4">
                    DataAnalyzer may use the following third-party services:
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                    <li><strong className="text-white">GitHub Pages:</strong> For hosting the application</li>
                    <li><strong className="text-white">Google Analytics:</strong> For usage analytics (if enabled)</li>
                    <li><strong className="text-white">CDN Services:</strong> For delivering application resources</li>
                </ul>
                <p className="text-dark-300 leading-relaxed mt-4">
                    These services have their own privacy policies. We recommend reviewing them if you have concerns.
                </p>
            </div>

            {/* Your Rights */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
                <p className="text-dark-300 leading-relaxed mb-4">
                    You have the following rights regarding your data:
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                    <li><strong className="text-white">Access:</strong> You can access all your data since it's stored locally on your device</li>
                    <li><strong className="text-white">Deletion:</strong> You can delete all local data by clearing your browser's cache and local storage</li>
                    <li><strong className="text-white">Portability:</strong> Your data is already in a portable format (CSV/Excel) on your device</li>
                    <li><strong className="text-white">Opt-out:</strong> You can opt out of analytics by using browser extensions or privacy settings</li>
                </ul>
            </div>

            {/* Children's Privacy */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">7. Children's Privacy</h2>
                <p className="text-dark-300 leading-relaxed">
                    DataAnalyzer is not directed to children under the age of 13. We do not knowingly collect personal information from children.
                    If you are a parent or guardian and believe your child has used our service, please contact us.
                </p>
            </div>

            {/* Changes to Privacy Policy */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">8. Changes to This Privacy Policy</h2>
                <p className="text-dark-300 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy
                    on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-r from-primary-500/10 to-primary-700/10 rounded-2xl p-8 border border-primary-500/20">
                <h2 className="text-2xl font-bold text-white mb-2">Questions About Privacy?</h2>
                <p className="text-dark-300 mb-4">
                    If you have any questions about this Privacy Policy, please contact us.
                </p>
                <a
                    href="/DataAnalyzer/contact"
                    className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                >
                    Contact Us
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
