import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark-800/50 backdrop-blur-sm border-t border-dark-700 mt-auto">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Left: Brand */}
                    <div className="text-center md:text-left">
                        <p className="text-white font-semibold mb-1">DataAnalyzer</p>
                        <p className="text-dark-400 text-xs">Free data analysis & visualization</p>
                    </div>

                    {/* Center: Links */}
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
                        <Link to="/about" className="text-dark-400 hover:text-white transition-colors">
                            About
                        </Link>
                        <Link to="/tutorials" className="text-dark-400 hover:text-white transition-colors">
                            Tutorials
                        </Link>
                        <Link to="/blog" className="text-dark-400 hover:text-white transition-colors">
                            Blog
                        </Link>
                        <Link to="/contact" className="text-dark-400 hover:text-white transition-colors">
                            Contact
                        </Link>
                        <Link to="/privacy-policy" className="text-dark-400 hover:text-white transition-colors">
                            Privacy
                        </Link>
                        <Link to="/terms-of-service" className="text-dark-400 hover:text-white transition-colors">
                            Terms
                        </Link>
                    </div>

                    {/* Right: Copyright */}
                    <div className="text-center md:text-right">
                        <p className="text-dark-400 text-xs">
                            © 2025 DataAnalyzer
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

