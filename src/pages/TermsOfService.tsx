const TermsOfService = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="text-center">
                <h1 className="text-5xl font-bold text-white mb-4">Terms of Service</h1>
                <p className="text-dark-400">Last updated: December 4, 2025</p>
            </div>

            {/* Introduction */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <p className="text-dark-300 leading-relaxed">
                    Welcome to DataAnalyzer. By accessing or using our service, you agree to be bound by these Terms of Service.
                    Please read them carefully. If you do not agree to these terms, please do not use DataAnalyzer.
                </p>
            </div>

            {/* Acceptance of Terms */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-dark-300 leading-relaxed mb-4">
                    By using DataAnalyzer, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service
                    and our Privacy Policy. These terms apply to all users of the service.
                </p>
                <p className="text-dark-300 leading-relaxed">
                    We reserve the right to modify these terms at any time. Your continued use of DataAnalyzer after any changes
                    constitutes acceptance of those changes.
                </p>
            </div>

            {/* Description of Service */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
                <p className="text-dark-300 leading-relaxed mb-4">
                    DataAnalyzer is a free, browser-based data analysis and visualization tool that allows users to:
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                    <li>Upload and process CSV and Excel files locally in their browser</li>
                    <li>Create various types of charts and visualizations</li>
                    <li>Analyze and explore their data interactively</li>
                    <li>Export visualizations as images</li>
                </ul>
                <p className="text-dark-300 leading-relaxed mt-4">
                    The service is provided "as is" without any guarantees or warranties.
                </p>
            </div>

            {/* User Responsibilities */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">3. User Responsibilities</h2>
                <p className="text-dark-300 leading-relaxed mb-4">
                    When using DataAnalyzer, you agree to:
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                    <li>Use the service only for lawful purposes</li>
                    <li>Not attempt to interfere with or disrupt the service</li>
                    <li>Not attempt to gain unauthorized access to any part of the service</li>
                    <li>Not use the service to process or analyze data that you don't have the right to use</li>
                    <li>Not reverse engineer, decompile, or disassemble any part of the service</li>
                    <li>Comply with all applicable laws and regulations</li>
                </ul>
            </div>

            {/* Data and Privacy */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">4. Data and Privacy</h2>
                <p className="text-dark-300 leading-relaxed mb-4">
                    <strong className="text-white">Important:</strong> All data processing in DataAnalyzer occurs locally in your browser.
                    We do not collect, store, or transmit your data to any servers.
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                    <li>You retain all rights to your data</li>
                    <li>You are solely responsible for the security and backup of your data</li>
                    <li>We are not responsible for any data loss that may occur</li>
                    <li>You should not rely on browser storage as a permanent storage solution</li>
                </ul>
            </div>

            {/* Intellectual Property */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
                <p className="text-dark-300 leading-relaxed mb-4">
                    DataAnalyzer is open-source software released under the MIT License. This means:
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                    <li>You are free to use, modify, and distribute the software</li>
                    <li>The software is provided "as is" without warranty</li>
                    <li>You must include the original copyright notice in any copies</li>
                </ul>
                <p className="text-dark-300 leading-relaxed mt-4">
                    The DataAnalyzer name, logo, and branding are property of the project maintainers.
                    Unauthorized use of these elements is prohibited.
                </p>
            </div>

            {/* Disclaimer of Warranties */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">6. Disclaimer of Warranties</h2>
                <p className="text-dark-300 leading-relaxed mb-4">
                    DATAANALYZER IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND,
                    EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                    <li>Warranties of merchantability or fitness for a particular purpose</li>
                    <li>Warranties that the service will be uninterrupted, timely, secure, or error-free</li>
                    <li>Warranties regarding the accuracy or reliability of any results obtained through the service</li>
                    <li>Warranties that defects will be corrected</li>
                </ul>
                <p className="text-dark-300 leading-relaxed mt-4">
                    You use DataAnalyzer at your own risk. We do not guarantee that the service will meet your requirements
                    or that the operation of the service will be error-free.
                </p>
            </div>

            {/* Limitation of Liability */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
                <p className="text-dark-300 leading-relaxed mb-4">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL DATAANALYZER, ITS DEVELOPERS,
                    OR CONTRIBUTORS BE LIABLE FOR ANY:
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                    <li>Indirect, incidental, special, consequential, or punitive damages</li>
                    <li>Loss of profits, revenue, data, or use</li>
                    <li>Business interruption</li>
                    <li>Any other damages arising out of or related to your use of the service</li>
                </ul>
                <p className="text-dark-300 leading-relaxed mt-4">
                    This limitation applies whether the alleged liability is based on contract, tort, negligence,
                    strict liability, or any other basis, even if we have been advised of the possibility of such damage.
                </p>
            </div>

            {/* Indemnification */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">8. Indemnification</h2>
                <p className="text-dark-300 leading-relaxed">
                    You agree to indemnify, defend, and hold harmless DataAnalyzer, its developers, and contributors from any claims,
                    damages, losses, liabilities, and expenses (including legal fees) arising from:
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4 mt-4">
                    <li>Your use of the service</li>
                    <li>Your violation of these Terms of Service</li>
                    <li>Your violation of any rights of another party</li>
                    <li>Any data you upload or process using the service</li>
                </ul>
            </div>

            {/* Service Modifications */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">9. Service Modifications and Termination</h2>
                <p className="text-dark-300 leading-relaxed mb-4">
                    We reserve the right to:
                </p>
                <ul className="list-disc list-inside text-dark-300 space-y-2 ml-4">
                    <li>Modify, suspend, or discontinue the service at any time without notice</li>
                    <li>Change these Terms of Service at any time</li>
                    <li>Refuse service to anyone for any reason</li>
                </ul>
                <p className="text-dark-300 leading-relaxed mt-4">
                    We will not be liable to you or any third party for any modification, suspension, or discontinuation of the service.
                </p>
            </div>

            {/* Third-Party Links */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">10. Third-Party Links and Services</h2>
                <p className="text-dark-300 leading-relaxed">
                    DataAnalyzer may contain links to third-party websites or services. We are not responsible for the content,
                    privacy policies, or practices of any third-party sites. You access third-party sites at your own risk.
                </p>
            </div>

            {/* Governing Law */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law</h2>
                <p className="text-dark-300 leading-relaxed">
                    These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction
                    in which the service is operated, without regard to its conflict of law provisions.
                </p>
            </div>

            {/* Severability */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">12. Severability</h2>
                <p className="text-dark-300 leading-relaxed">
                    If any provision of these Terms of Service is found to be unenforceable or invalid, that provision will be
                    limited or eliminated to the minimum extent necessary so that these Terms of Service will otherwise remain
                    in full force and effect.
                </p>
            </div>

            {/* Entire Agreement */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
                <h2 className="text-2xl font-bold text-white mb-4">13. Entire Agreement</h2>
                <p className="text-dark-300 leading-relaxed">
                    These Terms of Service, together with our Privacy Policy, constitute the entire agreement between you and
                    DataAnalyzer regarding the use of the service, superseding any prior agreements.
                </p>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-r from-primary-500/10 to-primary-700/10 rounded-2xl p-8 border border-primary-500/20">
                <h2 className="text-2xl font-bold text-white mb-2">Questions About These Terms?</h2>
                <p className="text-dark-300 mb-4">
                    If you have any questions about these Terms of Service, please contact us.
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

export default TermsOfService;
